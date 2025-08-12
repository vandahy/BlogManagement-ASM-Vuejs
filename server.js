const fs = require("fs"); // Thư viện để làm việc với file
const path = require("path"); // Thư viện để xử lý đường dẫn file

// Tạo đường dẫn tuyệt đối tới file db.json
const dbPath = path.join(__dirname, "db.json");
//dirname như kiểu lấy path của folder hiện tại rồi nối thêm db.json vào

// Hàm đọc dữ liệu từ db.json và chuyển thành object
function readDB() {
  const data = fs.readFileSync(dbPath, "utf-8"); // Đọc file db.json dưới dạng chuỗi
  return JSON.parse(data); // Chuyển chuỗi thành object JSON
}

// Hàm ghi dữ liệu vào db.json
function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 4)); // Ghi object vào file db.json dưới dạng chuỗi JSON, format đẹp
}

// Đăng ký tài khoản mới
app.post("/register", (req, res) => {
  const { username, password } = req.body; // Lấy thông tin username và password từ client gửi lên
  const account = { id: Date.now(), username, password }; // Tạo object tài khoản mới, id là thời gian hiện tại
  const accountStr = JSON.stringify(account); // Chuyển object tài khoản thành chuỗi JSON

  // Đọc dữ liệu hiện tại từ db.json
  const db = readDB();
  db.accounts = db.accounts || []; // Nếu chưa có mảng accounts thì tạo mới
  db.accounts.push(account); // Thêm tài khoản mới vào mảng accounts
  writeDB(db); // Ghi lại dữ liệu vào db.json

  res.send(accountStr); // Trả về chuỗi JSON của tài khoản vừa đăng ký cho client
});

// Đăng nhập tài khoản
app.post("/login", (req, res) => {
  const { username, password } = req.body; // Lấy thông tin đăng nhập từ client
  const db = readDB(); // Đọc dữ liệu từ db.json
  // Tìm tài khoản có username và password trùng khớp
  const account = db.accounts?.find(
    (acc) => acc.username === username && acc.password === password
  );
  if (account) {
    res.send(JSON.stringify(account)); // Nếu tìm thấy, trả về thông tin tài khoản dưới dạng chuỗi JSON
  } else {
    res.status(401).send("Sai tài khoản hoặc mật khẩu"); // Nếu không tìm thấy, trả về lỗi 401
  }
});
