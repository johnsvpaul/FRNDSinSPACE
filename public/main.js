
//initialise map======================
const mymap = L.map('mapid',{
    gestureHandling: true
}).setView([0, 0], 8);

//custom icons for markers on map=================
var issIcon = L.icon({
    iconUrl: './img/iss.png',
    iconSize: [150, 128],
    iconAnchor: [75, 64],
    
});

//initialize markers=======================
const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap);//iss location
const marker2 = L.marker([0, 0]).addTo(mymap);// your ip location
//setting map style/theme - this is defualt theme ==========================/*


const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);


//setting map  custom style/theme  ==========================/*
/*
L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'johnsvpaul/link here',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: '' //
    }).addTo(mymap);
    */
    var line = L.polyline([]).addTo(mymap);//orbital line path

    
    
    
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
      line.addLatLng([latitude,longitude]);

      if (firstLoad){
          //zoom that looks good is  around 3
      mymap.setView([latitude,longitude], 2.5)
      firstLoad = false;
      }
      setTimeout(getISS, 2000) //this makes sures it keeps updating the lat/long and marker positions
    }
    getISS()
  //======== API to get your IP location ===============
  const url3 = 'https://ipapi.co/json/';

  async function IPlocation(){
      const response = fetch(url3)
      const data = await (await response).json();
      //console.log(data.longitude, data.latitude);
      const {latitude, longitude} = data;
  
      marker2.setLatLng([latitude,longitude]);//setting latlong of marker2
      marker2.bindPopup('Your IP Location: '+data.region);//adding popup to marker
  
  }
  
  IPlocation();
  
//============== API to get info about people in space==================================

    //const url2 = "http://api.open-notify.org/astros.json";
    const url2 = "https://www.howmanypeopleareinspacerightnow.com/peopleinspace.json";
    //we send the request to the proxy url below because it adds CORS headers to the request
    const proxyurl = "https://cors-anywhere.herokuapp.com/"; 

     async function getPeople(){
        const response = fetch(proxyurl+url2)
        const data = await (await response).json();
            marker.bindPopup('There are currently '+data.number+' people abroad the ISS');//adding popup to ISS marker
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

//=============== wikipedia on current expeditions ================

const url4 = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&titles=List_of_International_Space_Station_expeditions&rvprop=content&rvsection=2&rvparse'
async function missions(){
    const response = fetch(proxyurl+url4)
    const data = await (await response).json();
    let content = data.query.pages['9835533'].revisions['0']['*']
    document.getElementById("missions").innerHTML = content;

    //console.log(content)
    //console.log(data.query.pages[0].revisions[0].slots.main.content);

}

missions();