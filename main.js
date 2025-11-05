//setview([latitude, longtitude], zoom) (vĩ độ, kinh độ)
var map = L.map("map").setView([21.0285, 105.8542], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Dùng HTML5 Geolocation, yêu cầu trình duyệt lấy vị trí hiện tại
map.locate({ setView: true, maxZoom: 16 });
map.on("locationfound", function (e) {
  //e.latlng chua {latitude, longtitude}
  L.marker(e.latlng).addTo(map).bindPopup("You are here").openPopup();
});

//đánh giấu vị trí
var marker = L.marker([20.995237, 105.729336]).addTo(map);

var circle = L.circle([20.995237, 105.729336], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.2,
  radius: 500,
}).addTo(map);

var polygon = L.polygon([
  [20.995237, 105.729336],
  [20.995067, 105.729691],
  [20.994993, 105.729276],
]).addTo(map);

marker.bindPopup("<b>Hello bro. This is my house :D").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup()
  .setLatLng([20.994993, 105.729276])
  .setContent("I am a standalone popup.")
  .openOn(map);

// function onMapClick(e) {
//   alert("You clicked the map at " + e.latlng);
// }

// map.on("click", onMapClick);

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on("click", onMapClick);
