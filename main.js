
//initialise map======================
const mymap = L.map('mapid',{
    gestureHandling: true
}).setView([0, 0], 8);

//custom ISS icon  for marker on map=================
var issIcon = L.icon({
    iconUrl: '/img/iss.png',
    iconSize: [150, 128],
    iconAnchor: [75, 64],
    
});
//add marker=======================
const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap);
//setting map style/theme - this is public ==========================/*

/*
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);
*/

//setting map style/theme - this uses personal API Key ==========================/*
L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9obnN2cGF1bCIsImEiOiJja2N1c3JqYnEwN25kMnRvNnE1d3o0NDFlIn0.V-9LIXoLHdDukr3DYTpHHw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'johnsvpaul/ckcwlxkce00v81ip69gvi5kta',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoiam9obnN2cGF1bCIsImEiOiJja2N1c3JqYnEwN25kMnRvNnE1d3o0NDFlIn0.V-9LIXoLHdDukr3DYTpHHw' //
    }).addTo(mymap);

//======================== API Section ============================

    

//======== API to get ISS location ===============
const url = "https://api.wheretheiss.at/v1/satellites/25544"; //url to api for ISS lat/long
    let firstLoad = true;//makes sures it doesnt keep zooming on centre when we move the map

    async function getISS(){
      const response = await fetch(url);//api call
      const data = await response.json();
      const {latitude, longitude} = data;
      document.getElementById("lat").innerHTML = latitude.toFixed(2);
      document.getElementById("long").innerHTML = longitude.toFixed(2);
      document.getElementById("vel").innerHTML = data.velocity.toFixed(2);
      document.getElementById("alt").innerHTML = data.altitude.toFixed(2);
  

      marker.setLatLng([latitude,longitude]);
      if (firstLoad){
          //zoom that looks good is  around 3
      mymap.setView([latitude,longitude], 2.5)
      firstLoad = false;
      }
      setTimeout(getISS, 2000) //this makes sures it keeps updating the lat/long and marker positions
    }
    getISS()

    
//============== API to get info about people in space==================================

    //const url2 = "http://api.open-notify.org/astros.json";
    const url2 = "https://www.howmanypeopleareinspacerightnow.com/peopleinspace.json";
    //we send the request to the proxy url below because it adds CORS headers to the request
    const proxyurl = "https://cors-anywhere.herokuapp.com/"; 

     async function getPeople(){
        const response = fetch(proxyurl+url2)
        const data = await (await response).json();
            //console.log(data)
            //heading showing no. of people on ISS
            var heading = "<div class = numpeople ><p>There are currently " +data.number + " people in space:</p></div>"
            //summary on each person in space w/ photo, country, title, and bio
            var html = "";
            //today's date
            var today = moment();

            data.people.forEach(function(data){
                html += "<div class = pic>"
                html +=  "<img src= "+data.biophoto+" " +"class= dp "+"/>";
                html += "<h3 class = name>"+data.name +"</h3>";
                html +=  "<div class = flagandtitle > <img src= "+data.countryflag+" " +"class= flag "+"/> "+ data.title+"</div>";
                //days spent in space
                var launch = moment(data.launchdate);
                var days = today.diff(launch, 'days');
                html += "<div class = days><span class = day> "+days+"</span> <span class = name> Days in Space</span></div>";
                //html += "<p class = bio>"+data.bio +"</p>"; //uncomment for astronaut bio
                html += "</div>"

                document.getElementById("demo").innerHTML = html;
                document.getElementById("heading").innerHTML = heading;
        
        });
        
      }
      getPeople()

  