const vehicleInfo = [
  {
    bs: "29A-12345",
    driverName: "Nguyễn Văn A",
    phone: "0987654321",
    isActive: true, // Đang hoạt động -> Hiển thị
    color: "red", // Màu xe (nếu muốn custom icon)
    lat: 21.0285,
    lng: 105.8542, // Khu vực Hồ Gươm
  },
  {
    bs: "30B-54321",
    driverName: "Trần Thị B",
    phone: "0123456789",
    isActive: true, // Nếu false -> Xe này sẽ ẩn khỏi map
    color: "blue",
    lat: 21.033,
    lng: 105.84, // Khu vực Lăng Bác
  },
  {
    bs: "30B-54321",
    driverName: "Trần Thị B",
    phone: "0123456789",
    isActive: false, // Nếu false -> Xe này sẽ ẩn khỏi map
    color: "gray",
    lat: 21.04,
    lng: 105.83,
  },
];

var map = L.map("map").setView([21.0285, 105.8542], 13);

L.tileLayer("http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
}).addTo(map);
// Icon xe taxi
const carIcon = L.icon({
  iconUrl: "./car.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

vehicleInfo.forEach((vehicle) => {
  // -- LOGIC CHECK ACTIVE --
  // Nếu isActive là false thì bỏ qua, không làm gì cả (return)
  if (!vehicle.isActive) return;
  // -- TẠO MARKER --
  const marker = L.marker([vehicle.lat, vehicle.lng], { icon: carIcon }).addTo(
    map
  );
  // -- TẠO NỘI DUNG MODAL (POPUP) --
  // NỘI DUNG HTML
  const popupHtml = `
        <div class="card-header">
            <span>${vehicle.bs}</span>
            <span class="badge">Đang chạy</span>
        </div>
        <div class="card-body">
            <div class="info-row">
                <span style="color:#888">Tài xế</span>
                <b>${vehicle.driverName}</b>
            </div>
            <div class="info-row">
                <span style="color:#888">SĐT</span>
                <b>${vehicle.phone}</b>
            </div>
            <div class="info-row">
                <span style="color:#888">Tốc độ</span>
                <b>45 km/h</b>
            </div>
            <div class="card-action">
                <button class="btn-detail">Xem lịch sử</button>
            </div>
        </div>
    `;
  // -- GẮN MODAL VÀO XE --
  marker.bindPopup(popupHtml, {
    className: "right-side-popup", // Class để CSS ẩn mũi tên
    closeButton: false, // Tắt nút X
    autoPan: true, // Tự động trượt bản đồ nếu popup bị che

    // OFFSET: [X, Y]
    // X = 155: Đẩy sang phải (khoảng một nửa chiều rộng popup + icon)
    // Y = 80: Đẩy xuống dưới (để nó nằm ngang hàng xe thay vì nằm trên đầu)
    offset: [165, 80],
  });
  // Hiệu ứng hover (Tùy chọn): Rê chuột vào hiện, ra chuột tắt
  //   marker.on("mouseover", function (e) {
  //     this.openPopup();
  //   });
  //   marker.on("mouseout", function (e) {
  //     this.closePopup();
  //   });
});

// Dùng HTML5 Geolocation, yêu cầu trình duyệt lấy vị trí hiện tại
map.locate({ setView: true, maxZoom: 16 });
map.on("locationfound", function (e) {
  //e.latlng chua {latitude, longtitude}
  L.marker(e.latlng).addTo(map).bindPopup("Vị trí của bạn").openPopup();
});
