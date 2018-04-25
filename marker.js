
let myMap = L.map("mapdiv"); // http://leafletjs.com/reference-1.3.0.html#map-l-map
myLayers = {    
    osm : L.tileLayer ( // http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
	{ 
        attribution : "Datenquelle: <a href='https://www.openstreetmap.org' >Openstreepmap.com</a>"
    }	
    ),
    
    geolandbasemap : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", 
        { subdomains : ["maps","maps1","maps2","maps3","maps4"],                        // http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
        attribution : "Datenquelle: <a href='https://www.basemap.at' >Basemap.at</a>"   // http://leafletjs.com/reference-1.3.0.html#layer-attribution
    }
    ),

    bmapgrau: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png",
        { subdomains : ["maps","maps1","maps2","maps3","maps4"], 
        attribution : "Datenquelle: <a href='https://www.basemap.at' >Basemap.at</a>"
    }
    ),
    bmaporthofoto30cm:  L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",
        { subdomains : ["maps","maps1","maps2","maps3","maps4"], 
        attribution : "Datenquelle: <a href='https://www.basemap.at' >Basemap.at</a>"
    }
    ),
    bmapoverlay: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png",
        { subdomains : ["maps","maps1","maps2","maps3","maps4"], 
        attribution : "Datenquelle: <a href='https://www.basemap.at' >Basemap.at</a>"
    }
    ),
    bmaphidpi: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg",
        { subdomains : ["maps","maps1","maps2","maps3","maps4"], 
        attribution : "Datenquelle: <a href='https://www.basemap.at' >Basemap.at</a>"
    }
    )

}; 

myMap.addLayer(myLayers.geolandbasemap); // http://leafletjs.com/reference-1.3.0.html#map-addlayer

let myMapControl = L.control.layers({  // http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap" : myLayers.osm,
    "Basemap.at" : myLayers.geolandbasemap,
    "Basemap.at (Grau)" : myLayers.bmapgrau,
	"Basemap.at (highdpi)" : myLayers.bmaphidpi,
    "Orthophoto 30cm" : myLayers.bmaporthofoto30cm,    
    
},{"Basemap overlay" : myLayers.bmapoverlay,
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

).addTo(myMap); 

const uni = [47.264,11.385]; 
const usi = [47.257,11.356]; 
const technik = [47.263,11.348]; 
const markeroptions = {
    title: "Uni IBK",
    opacity: 0.5,
    draggable: true
};

L.marker(uni, markeroptions).addTo(myMap);

L.marker(usi, markeroptions).addTo(myMap);

L.marker(technik, markeroptions).addTo(myMap);


myMap.setView(uni, 13);
