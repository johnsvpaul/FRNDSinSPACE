
const mymap = L.map('mapid').setView([0, 0], 8);


var issIcon = L.icon({
    iconUrl: '/img/iss3.png',
    iconSize: [150, 128],
    iconAnchor: [75, 64],
    
});

const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap);
//this is open source
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);

/* this uses personal api key
L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9obnN2cGF1bCIsImEiOiJja2N1c3JqYnEwN25kMnRvNnE1d3o0NDFlIn0.V-9LIXoLHdDukr3DYTpHHw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'johnsvpaul/ckcuxj5ea01jz1ip6pn54urs3',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoiam9obnN2cGF1bCIsImEiOiJja2N1c3JqYnEwN25kMnRvNnE1d3o0NDFlIn0.V-9LIXoLHdDukr3DYTpHHw'
    }).addTo(mymap);

    */

    const url = "http://api.open-notify.org/iss-now.json"; //url to api

    let firstLoad = true;//makes sures it doesnt keep zooming on centre when we move the map
//function to get ISS location
    async function getISS(){
      const response = await fetch(url);//api call
      const data = await response.json();
      const {latitude, longitude} = data.iss_position;
      document.getElementById("lat").innerHTML = latitude;
      document.getElementById("long").innerHTML = longitude;
     
     
      marker.setLatLng([latitude,longitude]);
      if (firstLoad){
      mymap.setView([latitude,longitude], 3)
      firstLoad = false;
      }
      //setTimeout(getISS, 6000)
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
           
            var html = "";
            //var pic = "<div class=pic>"+html+ "</div>";
            data.people.forEach(function(data){
                html += "<div class = pic>"
                html += "<h3>"+data.name +"</h3>";
                html += "<h3>"+data.country +"</h3>";
                html +=  "<img src= "+data.biophoto+" " +"class= dp "+"/>";
                html += "</div>"

                document.getElementById("demo").innerHTML = html;
        
        });
        console.log(data.people[0].biophoto)

        //var dp = data.people[0].biophoto;
       // document.getElementById("dp").src= dp;


        
        //document.getElementById("numpeople").innerHTML = dp;
        
      }
      getPeople()