import Person from "../models/person.js";
import PersonServices from "../service/PersonServices.js";
import { getEle } from "../util/util.js";
import {
  kiemTraChucVu,
  kiemTraChuoi,
  kiemTraDate,
  kiemTraDodai,
  kiemTraEmail,
  kiemTraGioLam,
  kiemTraLuong,
  kiemTraMK,
  kiemTraRong,
} from "../util/validation.js";

const personServices = new PersonServices();

const renderPersonList = (arrPerson) => {
  console.log("arrPerson: ", arrPerson);
  const content = arrPerson.map(
    ({ id, account, name, email, date, chucVu, tongLuong, xepLoai }) => `
    <tr id="userList">
        
        <td>${account}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${date}</td>
        <td>${chucVu}</td>
        <td>${tongLuong}</td>
        <td>${xepLoai}</td>
        <td>
              <button id="btnXem" type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="showDetail('${id}')">
                            Xem
                 </button>
                 <button id="btnXoa" type="button" class="btn btn-danger text-white" onclick="deletePerson('${id}')">
                            Xóa
                </button>
        </td>
    </tr>
    `
  );

  getEle("#tableDanhSach").innerHTML = content;
};

const setLocalStorage = () => {
  let data = JSON.stringify(personServices.arrPerson);

  localStorage.setItem("personList", data);
};

const getLocalStorage = () => {
  let data = localStorage.getItem("personList");

  if (data != null) {
    personServices.arrPerson = JSON.parse(data);

    renderPersonList(personServices.arrPerson);
  }
};

getLocalStorage();

const getInfo = () => {
  let id = getEle("#idNV") && generateUniqueID();
  let account = getEle("#tknv").value;
  let name = getEle("#name").value;
  let email = getEle("#email").value;
  let password = getEle("#password").value;
  let date = getEle("#datepicker").value;
  let luongCB = +getEle("#luongCB").value;
  let chucVu = getEle("#chucvu").value;
  let gioLam = getEle("#gioLam").value;

  return new Person(
    id,
    account,
    name,
    email,
    password,
    date,
    luongCB,
    chucVu,
    gioLam
  );
};

const resetForm = () => {
  getEle("#tknv").value = "";
  getEle("#name").value = "";
  getEle("#email").value = "";
  getEle("#password").value = "";
  getEle("#datepicker").value = "";
  getEle("#luongCB").value = "";
  getEle("#chucvu").value = "";
  getEle("#gioLam").value = "";
};

getEle("#btnThem").onclick = () => {
  getEle("#btnCapNhat").disabled = true;
  getEle("#btnThemNV").disabled = false;
  resetForm();
};

function generateUniqueID() {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 9);
  return `${timestamp}-${randomPart}`;
}

const addPerson = () => {
  let newPerson = getInfo();
  newPerson.tinhTongLuong();
  newPerson.xepLoaiNhanVien();

  // kiểm tra account
  let isValid =
    kiemTraRong(
      newPerson.account,
      "#errAccount",
      "Tài Khoản không được để trống !"
    ) &&
    kiemTraDodai(
      newPerson.account,
      "#errAccount",
      "Tài khoản phải có 4-6 kí tự !"
    );

  // kiểm tra name
  isValid &=
    kiemTraRong(
      newPerson.name,
      "#errTenNV",
      "Tên nhân viên không được để trống !"
    ) &&
    kiemTraChuoi(newPerson.name, "#errTenNV", "Tên nhân viên phải là chữ !");

  // kiểm tra email
  isValid &=
    kiemTraRong(newPerson.email, "#errEmail", "Email không được để trống !") &&
    kiemTraEmail(newPerson.email, "#errEmail", "Email không đúng định dạng !");

  // kiểm tra mật khẩu
  isValid &=
    kiemTraRong(
      newPerson.password,
      "#errPassWord",
      "Mật khẩu không được để trống !"
    ) &&
    kiemTraMK(
      newPerson.password,
      "#errPassWord",
      "Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    );

  // kiểm tra ngày
  isValid &=
    kiemTraRong(newPerson.date, "#errDate", "ngày làm không được để trống !") &&
    kiemTraDate(
      newPerson.date,
      "#errDate",
      "ngày tháng năm không đúng định dạng !"
    );

  // kiểm tra Lương cơ bản
  isValid = kiemTraLuong(
    newPerson.luongCB,
    "#errLuongCB",
    "Lương cơ bản phải trên 1 triệu và dưới 20 triệu !"
  );

  // kiểm tra chức vụ
  isValid = kiemTraChucVu(
    newPerson.chucVu,
    "#errChucVu",
    "Vui lòng chọn 1 chức vụ !"
  );

  // kiểm tra giờ làm
  isValid &=
    kiemTraRong(
      newPerson.gioLam,
      "#errGioLam",
      "Giờ làm không được để trống !"
    ) &&
    kiemTraGioLam(
      newPerson.gioLam,
      "#errGioLam",
      "Giờ làm phải từ 80h - 200h !"
    );
  if (isValid) {
    personServices.addNewPerson(newPerson);
    renderPersonList(personServices.arrPerson);
    $("#myModal").modal("hide");
    getEle("#btnCapNhat").disabled = false;
    resetForm();
    setLocalStorage();
  }
};

window.addPerson = addPerson;

const deletePerson = (id) => {
  personServices.delPerson(id);

  renderPersonList(personServices.arrPerson);
  setLocalStorage();
};

window.deletePerson = deletePerson;

const showDetail = (idDetail) => {
  let person = personServices.getDetail(idDetail);

  const { account, name, email, password, date, luongCB, chucVu, gioLam } =
    person;
  getEle("#tknv").value = account;
  getEle("#name").value = name;
  getEle("#email").value = email;
  getEle("#password").value = password;
  getEle("#datepicker").value = date;
  getEle("#luongCB").value = luongCB;
  getEle("#chucvu").value = chucVu;
  getEle("#gioLam").value = gioLam;

  getEle("#btnThemNV").disabled = true;
  getEle("#btnCapNhat").disabled = false;
};

window.showDetail = showDetail;

const upPerson = () => {
  let personUp = getInfo();

  personUp.xepLoaiNhanVien();
  personUp.tinhTongLuong();

  // kiểm tra account
  let isValid =
    kiemTraRong(
      personUp.account,
      "#errAccount",
      "Tài Khoản không được để trống !"
    ) &&
    kiemTraDodai(
      personUp.account,
      "#errAccount",
      "Tài khoản phải có 4-6 kí tự !"
    );

  // kiểm tra name
  isValid &=
    kiemTraRong(
      personUp.name,
      "#errTenNV",
      "Tên nhân viên không được để trống !"
    ) &&
    kiemTraChuoi(personUp.name, "#errTenNV", "Tên nhân viên phải là chữ !");

  // kiểm tra email
  isValid &=
    kiemTraRong(personUp.email, "#errEmail", "Email không được để trống !") &&
    kiemTraEmail(personUp.email, "#errEmail", "Email không đúng định dạng !");

  // kiểm tra mật khẩu
  isValid &=
    kiemTraRong(
      personUp.password,
      "#errPassWord",
      "Mật khẩu không được để trống !"
    ) &&
    kiemTraMK(
      personUp.password,
      "#errPassWord",
      "Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    );

  // kiểm tra ngày
  isValid &=
    kiemTraRong(personUp.date, "#errDate", "ngày làm không được để trống !") &&
    kiemTraDate(
      personUp.date,
      "#errDate",
      "ngày tháng năm không đúng định dạng !"
    );

  // kiểm tra Lương cơ bản
  isValid = kiemTraLuong(
    personUp.luongCB,
    "#errLuongCB",
    "Lương cơ bản phải trên 1 triệu và dưới 20 triệu !"
  );

  // kiểm tra chức vụ
  isValid = kiemTraChucVu(
    personUp.chucVu,
    "#errChucVu",
    "Vui lòng chọn 1 chức vụ !"
  );

  // kiểm tra giờ làm
  isValid &=
    kiemTraRong(
      personUp.gioLam,
      "#errGioLam",
      "Giờ làm không được để trống !"
    ) &&
    kiemTraGioLam(
      personUp.gioLam,
      "#errGioLam",
      "Giờ làm phải từ 80h - 200h !"
    );

  if (isValid) {
    personServices.updatePerson(personUp);
    renderPersonList(personServices.arrPerson);

    setLocalStorage();
    $("#myModal").modal("hide");

    resetForm();
  }
};

window.upPerson = upPerson;

const searchPersonByXepLoai = () => {
  let keyWord = getEle("#searchName").value.trim().toLowerCase();
  const result = personServices.arrPerson.filter((sp) => {
    return sp.xepLoai.toLowerCase().includes(keyWord);
  });
  if (result.length > 0) {
    renderPersonList(result);
  } else {
    getEle(
      "#tableDanhSach"
    ).innerHTML = `không tìm thấy từ khóa khớp với loại nhân viên`;
  }
};

window.searchPersonByXepLoai = searchPersonByXepLoai;
