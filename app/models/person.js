export default class Person {
  constructor(
    id,
    account,
    name,
    email,
    password,
    date,
    luongCB,
    chucVu,
    gioLam
  ) {
    this.id = id;
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.date = date;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = this.tinhTongLuong();
  }
  tinhTongLuong() {
    let luongTheoChucVu = this.luongCB;

    if (this.chucVu === "Sếp") {
      luongTheoChucVu = this.luongCB * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      luongTheoChucVu = this.luongCB * 2;
    }
    let tongLuong = luongTheoChucVu;
    return tongLuong;
  }
  xepLoaiNhanVien() {
    if (this.gioLam >= 192) {
      this.xepLoai = "Nhân viễn xuất sắc";
    } else if (this.gioLam >= 176) {
      this.xepLoai = "Nhân viên giỏi";
    } else if (this.gioLam >= 160) {
      this.xepLoai = "Nhân viên khá";
    } else {
      this.xepLoai = "Nhân viên trung bình";
    }
  }
}
