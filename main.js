
const mymap = L.map('mapid').setView([0, 0], 8);

const attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

var myIcon = L.icon({
    iconUrl: '/img/iss.svg',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
    
});

const marker = L.marker([0, 0], {icon: myIcon}).addTo(mymap);

L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9obnN2cGF1bCIsImEiOiJja2N1c3JqYnEwN25kMnRvNnE1d3o0NDFlIn0.V-9LIXoLHdDukr3DYTpHHw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoiam9obnN2cGF1bCIsImEiOiJja2N1c3JqYnEwN25kMnRvNnE1d3o0NDFlIn0.V-9LIXoLHdDukr3DYTpHHw'
    }).addTo(mymap);

    

    const url = "https://api.wheretheiss.at/v1/satellites/25544"; //url to api

    async function getISS(){
      const response = await fetch(url);
      const data = await response.json();
      const {latitude, longitude} = data;
      console.log(latitude)
      console.log(longitude)
     
      marker.setLatLng([latitude,longitude]);
      
    }
    getISS()