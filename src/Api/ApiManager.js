import APIManager, { APIConfiguration, APIContentTypes } from "../Api/ApiUrl";
const apiName = {
  registerUser: "register",
  loginUser: 'login',
  forgotPassword: 'forget_password',
  pinLogin: 'pin_login',
  forgotPin: 'forgetPin'
};

export default class ApiManager {

 
  static registerUser(param) {
    console.log(
      "===================== Register User ====================="
    , param);
    return APIManager.shared.postAPI(apiName.registerUser, param);
  }

  static loginUser(param) {
    console.log("===================== Login User =====================",param);
    return APIManager.shared.postAPI(apiName.loginUser, param);
  }

  static forgotPassword(param) {
    console.log("===================== Login User =====================",param);
    return APIManager.shared.postAPI(apiName.forgotPassword, param);
  }

  static pinLogin(param) {
    console.log("===================== Login User =====================",param);
    return APIManager.shared.postAPI(apiName.pinLogin, param);
  }

  static forgotPin(param) {
    console.log("===================== Login User =====================",param);
    return APIManager.shared.postAPI(apiName.forgotPin, param);
  }

}

