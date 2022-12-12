
/*Progress Control*/
let Trip = [];
let TripIndex = 0;
let CoordIndex = 0
let Coords = []
Coords[CoordIndex] = L.latLng(22.684282675883896, 72.88051636361853);
CoordIndex++;
/*Step 1*/
let Step = 1;
$("#form").submit(function (e) {
    e.preventDefault();
    Step = 2;
    $(".overlay").css("display", "none");
    $(".overlay2").css("display", "flex");
    $(".ring").css("animation", "search 3s linear 3");
    $(".ring").css("display", "block");
    setTimeout(() => {
        $(".ring").css("display", "none");
        $(".step").css("display", "block");
        $(".service").css("display", "flex");
        choochService("optsrv1", "optsrv2", "optsrv3");
    }, 9500)
});
/*Remove Other Markers */
let markers = [];
const DeleteMarkers = () => {
    for (var i = 0; i < markers.length; i++)
        markers[i].setMap(null);
    markers = [];
};


/*Creating List*/
const ListPlace = (Service, i, id, img, placename) => {
    let container;
    if (Service == "TripRoot") {
        container = "#TripRoot";
    }
    else {
        container = "#places";
    }
    $(container).append(`
     <div id="${id}" class="place"   style="display:flex;justify-content:space-between" >
                            <img src="${img}"
                                alt="" width="90px" height="85px">
                            <div class="place-detail-container">
                                <span class="place-name">${placename}</span>
                                <div class="rating"
                                    style="width: 70px;display: flex;justify-content: space-between;margin-bottom: 5px;">
                                    <img src="./assest/Images/star.png" alt="" style="width:15px;height: 15px;">
                                    <img src="./assest/Images/star.png" alt="" style="width:15px;height: 15px;">
                                    <img src="./assest/Images/star.png" alt="" style="width:15px;height: 15px;">
                                    <img src="./assest/Images/star.png" alt="" style="width:15px;height: 15px;">
                                </div>
                                <span class="distance"><i id="expand-icon" class="fa-solid fa-map-location-dot"
                                        style="font-size: larger;"></i><span>35KM</span></span>
                            </div>
                            <div style="display:flex;flex-direction:column;height:100px;justify-content:space-between;align-items: flex-end;">
                                ${container == "#TripRoot" ? `<input type="checkbox" class="select" id="chk${id}" checked="true" disabled onclick="SelectedPlace('${Service + i}') ">` : `<input type="checkbox" class="select" id="chk${id}" onclick="SelectedPlace('${Service + i}')">`}
                                <div class="wether" style="display: flex;">
                                    <div class="whtext"
                                    style="text-align: right;color:rgba(217, 217, 217, .74);font-size: small;">
                                    67<sup style="color:rgba(217, 217, 217, .74)">o</sup><br />SUNNY</div>
                                    <img src="./assest/Images/sun.png" alt=""
                                        style="height:35px;width:35px;margin-left: 5px;">
                                </div>
                            </div>
                        </div>
    `);
}

/*Add Marker On Map*/
let FetchPlace = (Service, ServiceName) => {
    let lat;
    let lng;
    //console.log(Service)
    for (let i = 0; i < Service.data.length; i++) {
        lat = parseFloat(Service.data[i].latitude);
        lng = parseFloat(Service.data[i].longitude);
        if (ServiceName == "TripRoot") {
            Coords[CoordIndex] = L.latLng(lat, lng)
            CoordIndex++;
        }
        var myIcon = L.icon({
            iconUrl: ServiceName == "Hotel" ? "./assest/Images/Restaurant.png" : Service.data[i].photo.images.thumbnail.url,
            iconSize: [50, 50],
        });
        let marker = L.marker({ lat, lng }, { icon: myIcon }).addTo(map);
        marker.bindPopup(`<span>${Service.data[i].name}</span>`).openPopup()
        markers.push(marker);
        ListPlace(ServiceName, i, Service.data[i].location_id, Service.data[i].photo.images.thumbnail.url, Service.data[i].name);
    }
}


/*Click Mgt Attraction/Res...*/
$("#optsrv1").click(function (e) {
    e.preventDefault();
    choochService("optsrv1", "optsrv2", "optsrv3");
});
$("#optsrv2").click(function (e) {
    e.preventDefault();
    choochService("optsrv2", "optsrv1", "optsrv3");
});
$("#optsrv3").click(function (e) {
    e.preventDefault();
    choochService("optsrv3", "optsrv2", "optsrv1");
});

const choochService = (ch, other1, other2) => {
    $("#" + ch).css("text-decoration", "underline");
    $("#" + other1).css("text-decoration", "none");
    $("#" + other2).css("text-decoration", "none");
    $("#places").html('');
    switch (ch) {
        case "optsrv3":
            FetchPlace(RestaurantList, "Restaurant");
            break;
        case "optsrv2":
            FetchPlace(HotelsList, "Hotel");
            break;
        default:
            FetchPlace(Attraction, "Attraction")
    }
}

/*Step Control*/


$("#Back").click(function (e) {
    e.preventDefault();
    Step--;
    StepControl();
});
$("#Next").click(function (e) {
    e.preventDefault();
    Step++;
    if (Step > 4)
        Step = 4;
    StepControl();
});
var myIcon = L.icon({
    iconUrl: "./assest/Images/Location.png",
    iconSize: [50, 50],
});
let marker = L.marker({ lat: 22.684282675883896, lng: 72.88051636361853 }, { icon: myIcon }).addTo(map);

const TripCoord = () => {
    L.Routing.control({
        waypoints: Coords,
        showAlternatives: true,
        altLineOptions: {
            styles: [
                { color: 'black', opacity: 0.15, weight: 9 },
                { color: 'white', opacity: 0.8, weight: 6 },
                { color: 'blue', opacity: 0.5, weight: 2 }
            ]
        }
    }).on("routesfound", (e) => {
        e.routes[0].coordinates.forEach((coord, Index) => {
            setTimeout(() => {
                marker.setLatLng([coord.lat, coord.lng])
            }, 20 * Index);
        });
    }).addTo(map);
}
const StepControl = () => {
    switch (Step) {
        case 1:
            $(".overlay").css("display", "flex");
            $(".step").css("display", "none");
            $(".service").css("display", "none");
            break;
        case 2:
            $("#Next").html(">>");
            $("#TripRoot").html("");
            $(".TripRootContainer").css("display", "none");
            $(".service").css("display", "flex");
            choochService("optsrv1", "optsrv2", "optsrv3");
            break;
        case 3:
            for (let index = 0; index < Selected.length; index++) {
                if (Selected[index].substring(0, Selected[index].length - 1) == "Attraction") {
                    Trip[TripIndex] = Attraction.data[parseInt(Selected[index].substring(Selected[index].length - 1))];
                }
                else if (Selected[index].substring(0, Selected[index].length - 1) == "Hotel") {
                    Trip[TripIndex] = HotelsList.data[parseInt(Selected[index].substring(Selected[index].length - 1))];

                }
                else {
                    Trip[TripIndex] = RestaurantList.data[parseInt(Selected[index].substring(Selected[index].length - 1))];

                }
                TripIndex++;
            }
            Trip = [...Trip.reduce((map, obj) => map.set(obj.location_id, obj), new Map()).values()]
            FetchPlace({ data: Trip }, "TripRoot");
            $(".service").css("display", "none");
            $("#Next").html("Done");
            $(".step").css("display", "flex");
            $("#Next").css({ "display": "flex", "margin-left": "5px" });
            $(".TripRootContainer").css("display", "flex");
            $(".TripContainer").css("display", "none");
            Selected = [];
            Trip = [];
            break;
        case 4:
            TripCoord();
            $("#Trip").html("");
            for (let index = 0; index < Trip.length; index++) {
                $("#Trip").append(`<div style="padding-bottom:10px;width:100%;display:flex;text-align:center;font-size:smaller;font-family: 'Kurale', serif;">
                <div style="font-family: 'Kurale', serif;width:50%;text-align:right;padding-right:10px;border-right:2px dotted gray">10:00am</div><div style="width:50%;overflow:hidden;text-align:left;font-family: 'Kurale', serif;padding-left:10px">${Trip[index].name}</div>
                <div>`);
                //console.log(Trip[index])
            }
            $("#TripRoot").html("");
            $(".TripRootContainer").css("display", "none");
            $(".TripContainer").css("display", "none");
            $("#Next").css("display", "none");
    }
}
/*List Drop Down*/
let i = true;
$("#expand").click(function (e) {
    e.preventDefault();
    $("#expand-icon").toggleClass('fa-chevron-up');
    $("#expand-icon").toggleClass('fa-chevron-down');
    if (i == true) {
        $(".service").css("height", "60px");
        i = false;
    }
    else {
        $(".service").css("height", "97vh");
        i = true;
    }
});