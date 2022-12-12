/*Map */
const position = [22.684282675883896, 72.88051636361853];
const map = L.map('map').setView(position, 8);
//Google layer
googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(map);
//Osi Layer
let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    maxZoom: 16
});
var googleHybrid = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
/*My Location Icon*/
var myIcon = L.icon({
    iconUrl: './assest/Images/Location.png',
    iconSize: [50, 50],
});
let MyLoc = L.marker(position, { icon: myIcon, draggable: true }).addTo(map);

/* Layer Management*/
var base = {
    "Google Street": googleStreets,
    "OSM": osm,
    "Google": Esri_WorldImagery,
    "Netro": Esri_NatGeoWorldMap,
    "Hybrid": googleHybrid
};
var overlayMaps = {
    "Marker": MyLoc
};
L.control.layers(base, overlayMaps).addTo(map);
