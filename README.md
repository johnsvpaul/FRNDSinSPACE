
<h1 align="center">
  <img src="https://frndsinspace.netlify.app/img/logo.png" alt="frndsinspace logo" title="frndsinspace logo" width="300">
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;">The International Space Station (ISS) constantly flies over our planet. FRNDSinSPACE
                allows you to track the position of the ISS and see who is currently abroad on it.</p>

<p align="center" >View Live Version at:
https://frndsinspace.netlify.app/ </p>
<p align="center" >View Github Repo at:
https://github.com/johnsvpaul/friends-in-space/ </p>

## Prerequisites

- NodeJS and NPM
- Express (dependancy) - for option 1 installation
- Internet connection

## Installation


Option 1 - using Node:

Go to root folder and open terminal.

- install the dependencies (express) - run `npm install express`
- run `node app.js`
- This sets up a server that listening on port 3000.
- The server should start and you can view FRNDSinSPACE response by visiting http://localhost:3000 in
your browser. You can use Ctrl+C to stop the server.

Option 2 (easier):


Assuming you have a code editor such as VS Code or Atom you can simply install a package called live-server. Then simply open up index.html and right click anywhere on the page and open with live server
> NOTE: Using this method no dependacies such as express is needed.



## API's Used

- [ISS location](https://wheretheiss.at/)
  - [Documentation](https://wheretheiss.at/w/developer)
  - [Endpoint](https://api.wheretheiss.at/v1/satellites/25544)
- [People in ISS](https://www.howmanypeopleareinspacerightnow.com/)
  - [Endpoint](https://www.howmanypeopleareinspacerightnow.com/peopleinspace.json)
- [LeafletJS](https://leafletjs.com/)
  - [Documentation](https://leafletjs.com/reference-1.1.0.html#popup)
- [Mapbox](https://www.mapbox.com/)
  - [Documentation](https://docs.mapbox.com/api/)
- [ipapi](https://ipapi.co/)
  - [Documentation](https://ipapi.co/api/#introduction)
  - [Endpoint](https://ipapi.co/json)


## Included Files
<table>
	
  <tr>
    <th>File</th>
    <th>Explaination</th>
  </tr>
	
  <tr>
    <td>app.js</td>
    <td>Server-side JS code. The code NodeJS executes when we start our
		server.</td>
  </tr>
	 <tr>
    <td>index.html</td>
    <td>A static page served by app.js. We have all the
elements here with items appropriately named
so we can refer to them in our client-side code.
We also include our other two static
main.css and main.js so that the
browser loads them when we open the app</td>
  </tr>
	 <tr>
    <td>main.js</td>
    <td>The client-side JS code. Includes all API calls and fetch functions to display and map the data fetched from the API</td>
  </tr>
	 <tr>
    <td>main.css</td>
    <td>An external CSS stylesheet that defines the
styles for the index.html.</td>
  </tr>
		 <tr>
    <td>moment.js</td>
    <td>Moment. js is a free and open source JavaScript library that removes the need to use the native JavaScript Date object directly.</td>
  </tr>
	

  
</table>

## Attributions

- Main homescreen image: <a href='https://www.freepik.com/free-photos-vectors/technology'>Technology vector created by upklyak - www.freepik.com</a>
- Astronaunt in logo: <a href='https://www.freepik.com/free-photos-vectors/travel'>Travel vector created by pch.vector - www.freepik.com</a>

## Author
Johns Paul

## License
[MIT](https://choosealicense.com/licenses/mit/)
