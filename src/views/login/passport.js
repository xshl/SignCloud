
export function validPhoneNumber(phone) {
    const reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,3,5-9]))\d{8}$/;
    if (value == '' || value == undefined || value == null) {
      return false;
    } else if (!reg.test(value)) {
        return false;
    } else {
        return true;
    }
}

export default {}