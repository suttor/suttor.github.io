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



let myMap = L.map("map");    
const BikeGroup = L.featureGroup();
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
        attribution : "Datenquelle: <a href='https://www.basemap.at' >Basemap.at</a>"
    }
    ),
    ekt_winter:  L.tileLayer (
        "http://wmts.kartetirol.at/wmts/gdi_winter/GoogleMapsCompatible/normal/{z}/{x}/{y}.jpeg80",
        {  
        attribution : "Datenquelle: <a href='https://www.basemap.at' >Basemap.at</a>"
    }
    ),
        ekt_ortho: L.tileLayer (
        "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/normal/{z}/{x}/{y}.jpeg80",
        {  
        attribution : "Datenquelle: <a href='https://www.basemap.at' >Basemap.at</a>"
    }
    )

}; 

myMap.addLayer(myLayers.geolandbasemap); // http://leafletjs.com/reference-1.3.0.html#map-addlayer

let myMapControl = L.control.layers({  // http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap" : myLayers.osm,
    "Basemap.at" : myLayers.geolandbasemap,
    "Elektronische Karte Tirol Sommer" : myLayers.ekt_sommer,
	"Elektronische Karte Tirol Winter" : myLayers.ekt_winter,
    "Elektronische Karte Tirol Orthophoto" : myLayers.ekt_ortho,    
    
},{
    "Tirol Bike Trail" :  BikeGroup
},
{collapsed:false  // http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed
}
);


myMap.addControl (myMapControl); // http://leafletjs.com/reference-1.3.0.html#map-addcontrol


myMap.setView([47.267,11.383], 11); // http://leafletjs.com/reference-1.3.0.html#map-setview



L.control.scale( // http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
{imperial: false, // http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
maxWidth:200 // http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
}
// metrische Angaben anzeigen sowie Position unten links ensprechen den defaults
).addTo(myMap); 




async function addGeojson(url) {
    
    const response = await fetch(url);
    
    const wiendata = await response.json()
    
    const geojson = L.geoJSON(wiendata, {
        style: function(feature) {
            return {color: "#ff0000"};
                    },
            pointToLayer: function(geoJsonPoint, latlng){
                return L.marker(latlng, {
               icon: L.icon({
                    iconUrl: "icon_grafik.png"
                })
           });
       }
    });
    BikeGroup.addLayer(geojson);
    myMap.fitBounds(BikeGroup.getBounds())
}




const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&srsName=EPSG:4326&outputFormat=json&typeName=ogdwien:SPAZIERPUNKTOGD,ogdwien:SPAZIERLINIEOGD"

addGeojson(url);

myMap.addLayer(BikeGroup);

// myMap.fitBounds(wienGroup.getBounds());





// let geojson = L.geoJSON(spaziergang).addTo(wienGroup);
// geojson.bindPopup(function(layer) {
       
//     const props = layer.feature.properties;
//     const popupText = `<h1>${props.NAME}</h1>
//     <p>${props.BEMERKUNG}</p>`;
//     return popupText;
//       });

// myMap.fitBounds(wienGroup.getBounds());


