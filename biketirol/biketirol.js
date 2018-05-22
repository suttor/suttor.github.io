/*
    Vorbereitung: GPX Track herunterladen und nach GeoJSON konvertieren
    -------------------------------------------------------------------
    Datenquelle https://www.data.gv.at/suche/?search-term=bike+trail+tirol&searchIn=catalog
    Download Einzeletappen / Zur Ressource ...
    Alle Dateien im unterverzeichnis data/ ablegen
    Die .gpx Datei der eigenen Etappe als etappe00.gpx speichern
    Die .gpx Datei über https://mapbox.github.io/togeojson/ in .geojson umwandeln und als etappe00.geojson speichern
    Die etappe00.geojson Datei in ein Javascript Objekt umwandeln und als etappe00.geojson.js speichern

    -> statt 00 natürlich die eigene Etappe (z.B. 01,02, ...25)
*/

// eine neue Leaflet Karte definieren

// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung) über L.featureGroup([]) definieren
// WMTS URLs siehe https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol

// Maßstab metrisch ohne inch

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen



let myMap = L.map("map", {
    fullscreenControl: true
})
const BikeGroup = L.featureGroup();
const BikeGroup_marker = L.featureGroup();
myLayers = {    
    osm : L.tileLayer ( 
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
	{ 
        attribution : "Datenquelle: <a href='https://www.openstreetmap.org' >Openstreepmap.com</a>"
    }	
    ),
    
    geolandbasemap : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", 
        { subdomains : ["maps","maps1","maps2","maps3","maps4"],                        
        attribution : "Datenquelle: <a href='https://www.basemap.at' >Basemap.at</a>"   
    }
    ),

    ekt_sommer: L.tileLayer (
        "http://wmts.kartetirol.at/wmts/gdi_summer/GoogleMapsCompatible/normal/{z}/{x}/{y}.jpeg80",
        {  
        attribution : "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol' >www.data.gv.at</a>"
    }
    ),
    ekt_winter:  L.tileLayer (
        "http://wmts.kartetirol.at/wmts/gdi_winter/GoogleMapsCompatible/normal/{z}/{x}/{y}.jpeg80",
        {  
        attribution : "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol' >www.data.gv.at</a>"
    }
    ),
        ekt_ortho: L.tileLayer (
        "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/normal/{z}/{x}/{y}.jpeg80",
        {  
        attribution : "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol' >www.data.gv.at</a>"
    }
    )

}; 

myMap.addLayer(myLayers.geolandbasemap); 

let myMapControl = L.control.layers({  
    "Openstreetmap" : myLayers.osm,
    "Basemap.at" : myLayers.geolandbasemap,
    "Elektronische Karte Tirol Sommer" : myLayers.ekt_sommer,
	"Elektronische Karte Tirol Winter" : myLayers.ekt_winter,
    "Elektronische Karte Tirol Orthophoto" : myLayers.ekt_ortho,    
    
},{
    "Route" :  BikeGroup, 
    "Start- & Endpunkt" :  BikeGroup_marker
},
{collapsed:false  
}
);

myMap.addControl (myMapControl); 


L.control.scale( 
{imperial: false, 
maxWidth:200 
}

).addTo(myMap); 


 // let geojson = L.geoJSON(etappe30).addTo(BikeGroup);



 //  BikeGroup.addLayer(geojson);
 //  myMap.fitBounds(BikeGroup.getBounds())


//  myMap.addLayer(BikeGroup);



const start_icon = L.icon({
    iconUrl: 'images/start.png',
    iconAnchor: [15, 35],
    popupAnchor: [1, -30]
      });

const finish_icon = L.icon({
     iconUrl: 'images/finish.png',
     iconAnchor: [15, 35],
     popupAnchor: [1, -30]
      });


L.marker([47.009528, 10.288781], {icon: start_icon}).addTo(BikeGroup_marker).bindPopup("<a href='https://de.wikipedia.org/wiki/Ischgl'>Ischgl</a>");

L.marker([47.123801, 10.247665], {icon: finish_icon}).addTo(BikeGroup_marker).bindPopup("<a href='https://de.wikipedia.org/wiki/St._Anton_am_Arlberg'>St. Anton</a>");

myMap.addLayer(BikeGroup_marker);

// myMap.setView([47, 11], 13)

let gpxTrack = new L.GPX("data/etappe30.gpx",{
    async : true,
}).addTo(BikeGroup);
gpxTrack.on("loaded", function(evt){
    myMap.fitBounds(evt.target.getBounds());

    // console.log (evt.target.get_distance().toFixed(0))
    // console.log (evt.target.get_elevation_min().toFixed(0))
    // console.log (evt.target.get_elevation_max().toFixed(0))
    // console.log (evt.target.get_elevation_gain().toFixed(0))
    // console.log (evt.target.get_elevation_loss().toFixed(0))

    let laenge = evt.target.get_distance().toFixed(0)
    let tiefsterpunkt = evt.target.get_elevation_min().toFixed(0)
    let hoechsterpunkt = evt.target.get_elevation_max().toFixed(0)
    let aufstieg = evt.target.get_elevation_gain().toFixed(0)
    let abstieg = evt.target.get_elevation_loss().toFixed(0)

    document.getElementById("laenge").innerHTML = laenge;
    document.getElementById("tiefsterpunkt").innerHTML = tiefsterpunkt;
    document.getElementById("hoechsterpunkt").innerHTML = hoechsterpunkt;
    document.getElementById("aufstieg").innerHTML = aufstieg;
    document.getElementById("abstieg").innerHTML = abstieg;
    
    });

    