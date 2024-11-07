import { getEle } from "./util.js";

export const kiemTraRong = (value, idErr, message) => {
  if (value.trim() === "") {
    getEle(idErr).innerHTML = message;
    return false;
  } else {
    getEle(idErr).innerHTML = "";
    return true;
  }
};

// kiểm tra độ dài
export const kiemTraDodai = (value, idErr, message) => {
  let length = value.length;

  if (length >= 4 && length <= 6) {
    getEle(idErr).innerHTML = "";
    return true;
  } else {
    getEle(idErr).innerHTML = message;
    return false;
  }
};

export const kiemTraChuoi = (value, idErr, message) => {
  const re =
    /^[A-Za-zàáảãạâầấẩẫậăằắẳẵặđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụôồốổỗộơờớởỡợùúủũụạáảãặéóòêéầấếéàầấấịỉỹ ]/;
  let isString = re.test(value);
  if (isString) {
    getEle(idErr).innerHTML = "";
    return true;
  } else {
    getEle(idErr).innerHTML = message;
    return false;
  }
};

export const kiemTraEmail = (value, idErr, message) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  let isEmail = re.test(value);
  if (isEmail) {
    getEle(idErr).innerHTML = "";
    return true;
  } else {
    getEle(idErr).innerHTML = message;
    return false;
  }
};

export const kiemTraMK = (value, idErr, message) => {
  const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]+$/;
  let isPassWord = re.test(value);
  let length = value.length;

  if (isPassWord && length >= 6 && length <= 10) {
    getEle(idErr).innerHTML = "";
    return true;
  } else {
    getEle(idErr).innerHTML = message;
    return false;
  }
};

function validateDate_MMDDYYYY(date) {
  let parts = date.split(/[\/\-\.]/);

  if (parts.length < 3) {
    return false;
  }
  let dt = new Date(parts[2], parts[0] - 1, parts[1]);
  console.log("date is ", dt.toString());
  return dt && dt.getMonth() === parseInt(parts[0], 10) - 1;
}

export const kiemTraDate = (value, idErr, message) => {
  if (validateDate_MMDDYYYY(value)) {
    getEle(idErr).innerHTML = "";
    return true;
  } else {
    getEle(idErr).innerHTML = message;
    return false;
  }
};

export const kiemTraLuong = (value, idErr, message) => {
  const re = /^\d+$/;
  let isLuongCB = re.test(value);
  if (isLuongCB && value >= 1000000 && value <= 20000000) {
    getEle(idErr).innerHTML = "";
    return true;
  } else {
    getEle(idErr).innerHTML = message;
    return false;
  }
};

export const kiemTraChucVu = (value, idErr, message) => {
  if (value === "") {
    getEle(idErr).innerHTML = message;
    return false;
  } else if (value === "Chọn chức vụ") {
    getEle(idErr).innerHTML = message;
    return false;
  } else {
    getEle(idErr).innerHTML = "";
    return true;
  }
};

export const kiemTraGioLam = (value, idErr, message) => {
  if (value >= 80 && value <= 200) {
    getEle(idErr).innerHTML = "";
    return true;
  } else {
    getEle(idErr).innerHTML = message;
    return false;
  }
};
