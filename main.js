
const mymap = L.map('mapid',{
    gestureHandling: true
}).setView([0, 0], 8);


var issIcon = L.icon({
    iconUrl: '/img/iss3.png',
    iconSize: [150, 128],
    iconAnchor: [75, 64],
    
});

const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap);
//this is open source
/*
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);
*/
//this uses personal api key
L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9obnN2cGF1bCIsImEiOiJja2N1c3JqYnEwN25kMnRvNnE1d3o0NDFlIn0.V-9LIXoLHdDukr3DYTpHHw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'johnsvpaul/ckcwlxkce00v81ip69gvi5kta',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoiam9obnN2cGF1bCIsImEiOiJja2N1c3JqYnEwN25kMnRvNnE1d3o0NDFlIn0.V-9LIXoLHdDukr3DYTpHHw'
    }).addTo(mymap);

    

    const url = "https://api.wheretheiss.at/v1/satellites/25544"; //url to api

    let firstLoad = true;//makes sures it doesnt keep zooming on centre when we move the map
//=====function to get ISS location================
    async function getISS(){
      const response = await fetch(url);//api call
      const data = await response.json();
      //console.log(data);
      const {latitude, longitude} = data;
      document.getElementById("lat").innerHTML = latitude.toFixed(2);
      document.getElementById("long").innerHTML = longitude.toFixed(2);
      document.getElementById("vel").innerHTML = data.velocity.toFixed(2);
  

      marker.setLatLng([latitude,longitude]);
      if (firstLoad){
          //zoom that looks good is 3
      mymap.setView([latitude,longitude], 2.5)
      firstLoad = false;
      }
      setTimeout(getISS, 2000)
    }
    getISS()

    
//===========friends in space==================================

    //const url2 = "http://api.open-notify.org/astros.json";
    const url2 = "https://www.howmanypeopleareinspacerightnow.com/peopleinspace.json";
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

     async function getPeople(){
        const response = fetch(proxyurl+url2)
        const data = await (await response).json();
            console.log(data)
            //heading showing no. of people on ISS
            var heading = "<div class = numpeople ><p>There are currently " +data.number + " people in space:</p></div>"
            //people profiles
            var html = "";
            data.people.forEach(function(data){
                html += "<div class = pic>"
                html +=  "<img src= "+data.biophoto+" " +"class= dp "+"/>";
                html += "<h3 class = name>"+data.name +"</h3>";
                html +=  "<div class = flagandtitle > <img src= "+data.countryflag+" " +"class= flag "+"/> "+ data.title+"</div>";
                html += "<p class = bio>"+data.bio +"</p>";
                html += "</div>"

                document.getElementById("demo").innerHTML = html;
                document.getElementById("heading").innerHTML = heading;
        
        });
        
      }
      getPeople()

  