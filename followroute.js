// Mock dữ liệu lộ trình
const routeData = [
  {
    //20.995138677903643, 105.72965542105241
    time: "08:00",
    lat: 20.995138677903643,
    lng: 105.72965542105241,
    speed: 0,
    km: 0.0,
    hasCustomer: true,
  },
  {
    //20.991682925631054, 105.72983781126428
    time: "08:05",
    lat: 20.991682925631054,
    lng: 105.72983781126428,
    speed: 25,
    km: 1.2,
    hasCustomer: true,
  },
  {
    //20.99329561997819, 105.7357386710601
    time: "08:15",
    lat: 20.99329561997819,
    lng: 105.7357386710601,
    speed: 35,
    km: 3.5,
    hasCustomer: true,
  }, // bắt đầu có khách
  {
    //20.986714515017542, 105.73878566036986
    time: "08:25",
    lat: 20.986714515017542,
    lng: 105.73878566036986,
    speed: 30,
    km: 5.8,
    hasCustomer: true,
  },
  {
    //20.979391818889795, 105.74485818159121
    time: "08:30",
    lat: 20.979391818889795,
    lng: 105.74485818159121,
    speed: 40,
    km: 6.0,
    hasCustomer: true,
  },
  {
    //20.970115220823345, 105.75087705861124
    time: "08:30",
    lat: 20.970115220823345,
    lng: 105.75087705861124,
    speed: 40,
    km: 6.8,
    hasCustomer: true,
  },
  {
    //20.965747206367386, 105.75885931264163
    time: "08:35",
    lat: 20.965747206367386,
    lng: 105.75885931264163,
    speed: 40,
    km: 7.8,
    hasCustomer: true,
  },
  {
    //20.95847068864613, 105.76818192340983
    time: "08:40",
    lat: 20.95847068864613,
    lng: 105.76818192340983,
    speed: 40,
    km: 8.8,
    hasCustomer: true,
  },
  {
    //20.953154932074753, 105.77863728297582
    time: "08:45",
    lat: 20.953154932074753,
    lng: 105.77863728297582,
    speed: 55,
    km: 9.9,
    hasCustomer: true,
  },
  {
    //20.951097594248466, 105.78703157469002
    time: "08:50",
    lat: 20.951097594248466,
    lng: 105.78703157469002,
    speed: 50,
    km: 10.5,
    hasCustomer: true,
  },
  {
    //20.93776667098708, 105.7837034166812
    time: "08:55",
    lat: 20.93776667098708,
    lng: 105.7837034166812,
    speed: 50,
    km: 11.5,
    hasCustomer: true,
  },
  {
    //20.93429059525142, 105.78366481833501
    time: "09:00",
    lat: 20.93429059525142,
    lng: 105.78366481833501,
    speed: 20,
    km: 12.2,
    hasCustomer: true,
  },
  {
    //20.93429059525142, 105.78366481833501
    time: "09:05",
    lat: 20.93429059525142,
    lng: 105.78366481833501,
    speed: 0,
    km: 12.2,
    hasCustomer: false,
  },
  {
    //20.921780054506296, 105.78416076470313
    time: "09:05",
    lat: 20.921780054506296,
    lng: 105.78416076470313,
    speed: 20,
    km: 13.2,
    hasCustomer: false,
  },
];
var map = L.map("map").setView([21.0285, 105.8542], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Biến toàn cục
let polylineNoCustomer = L.polyline([], { color: "gray", weight: 4 }).addTo(
  map
);
let polylineHasCustomer = L.polyline([], { color: "green", weight: 4 }).addTo(
  map
);
let marker = null;
let index = 0;

const tbody = document.querySelector("#log-table tbody");
// const tfoot = document.querySelector("#log-table tfoot");
// function addFooter(data) {
//   const noCustomer = document.querySelector(".noCustomer");
//   const hasCustomer = document.querySelector(".hasCustomer");
//   const total = document.querySelector(".total");

//   const a = data.filter((item, index) => {
//     return item.hasCustomer === false;
//   });
//   const b = data.filter((item, index) => {
//     return item.hasCustomer === true;
//   });

//   const tolalNoCustomer = a.reduce((total, currentItem) => {
//     return total + currentItem.km;
//   }, 0);
//   const tolalHasCustomer = b.reduce((total, currentItem) => {
//     return total + currentItem.km;
//   }, 0);
//   const totalKm = data.reduce((total, currentItem) => {
//     return total + currentItem.km;
//   }, 0);

//   noCustomer.textContent = tolalNoCustomer.toFixed(2) + " km";
//   hasCustomer.textContent = tolalHasCustomer.toFixed(2) + " km";
//   total.textContent = totalKm.toFixed(2) + " km";
// }
let totalHasCustomer = 0;
let totalNoCustomer = 0;

function updateTotals(newData) {
  if (newData.hasCustomer) {
    totalHasCustomer += newData.km;
  } else {
    totalNoCustomer += newData.km;
  }
  const total = totalHasCustomer + totalNoCustomer;

  document.querySelector(".hasCustomer").textContent =
    totalHasCustomer.toFixed(2) + " km";
  document.querySelector(".noCustomer").textContent =
    totalNoCustomer.toFixed(2) + " km";
  document.querySelector(".total").textContent = total.toFixed(2) + " km";
}

// Hàm thêm dòng vào bảng
function addRow(data) {
  const row = document.createElement("tr");
  if (data.hasCustomer) row.classList.add("has-customer");

  row.innerHTML = `
        <td>${data.time}</td>
        <td>${data.speed} km/h</td>
        <td>${data.km.toFixed(1)} km</td>
        <td>${data.hasCustomer ? "Có khách" : "Trống"}</td>
      `;
  tbody.appendChild(row);
  tbody.scrollTop = tbody.scrollHeight; // auto scroll xuống dòng mới nhất
}
// Hàm cập nhật map theo dữ liệu
function updateMap() {
  if (index >= routeData.length) {
    return;
  }

  const point = routeData[index];
  const latlng = [point.lat, point.lng];

  // Cập nhật marker
  if (!marker) {
    marker = L.marker(latlng).addTo(map);
  } else {
    marker.setLatLng(latlng);
  }
  map.panTo(latlng);
  // Vẽ polyline
  if (point.hasCustomer) {
    polylineHasCustomer.addLatLng(latlng);
  } else {
    polylineNoCustomer.addLatLng(latlng);
  }

  // Thêm vào bảng
  addRow(point);
  updateTotals(point);

  index++;
  if (index < routeData.length) {
    setTimeout(updateMap, 3000); // mô phỏng cập nhật mỗi 3s
  }
}
updateMap();
// addFooter(routeData);
