import { Platform,  } from "react-native";
import axios from 'axios'
import AsyncStorage from "@react-native-community/async-storage";

export const APIConfiguration = {
  baseURLOflocalServer: "http://112.196.64.119:8000/api/user/", //Local development server base URL.
  

  requestHeaders(
    acceptType = APIContentTypes.applicationJSON,
    contentType = APIContentTypes.applicationJSON
  ) {
    return new Headers({
      Accept: acceptType,
      "Content-Type": contentType,
    });
  },
};

export const RequestHeader = (
  acceptType = APIContentTypes.applicationJSON,
  contentType = APIContentTypes.applicationJSON
) => {
  var header = new Headers({
    Accept: acceptType,
    "Content-Type": contentType,
  });
  return header;
};

export const APIContentTypes = {
  applicationJSON: "application/json",
  formURLEncoded: "application/x-www-form-urlencoded",
  formData: "multipart/form-data",
  xhtmlxml: "application/xhtml+xml",
};

export default class APIManager {
  static shared = APIManager.shared == null ? new APIManager() : this.shared;

  mediaBaseURL = APIConfiguration.baseURLOflocalServer;

  

  async getAPI(
    name,
    parameters = {},
    requestHeader = APIConfiguration.requestHeaders()
  ) {
    var request = {
      method: "GET",
      
      //body: JSON.stringify(parameters)
    };
    let requestURL = name.startsWith("http") ? name : this.mediaBaseURL + name;
    console.log("REQUEST URL\t: " + requestURL);
    console.log("Parameter\t: " + JSON.stringify(parameters));
    try {
      let response = await axios.get(requestURL,request)
      
      console.log("API Name\t: (" + name + ")");
      console.log("STATUS CODE\t: " + response.status);
      // let responseJson = await response.json();
      // console.log("API Response\t: " + JSON.stringify(responseJson));
      // return new Promise((apiResponse) => {
      //   apiResponse({ code: response.status, json: responseJson });
      // });
    } catch (error) {
      console.log("API Name\t: (" + name + ")");
      console.log("STATUS CODE\t: 0");
      console.log("SERVER ERROR\t: " + error);
      return new Promise((apiResponse) => {
        apiResponse({ code: 0, json: error });
      });
    }
  }

  async postAPI(
    name,
    parameters ,
    requestHeader = APIConfiguration.requestHeaders()
  ) {
    var request = {
      body: JSON.stringify(parameters)
    };
    let requestURL = this.mediaBaseURL + name;
    console.log("REQUEST URL\t: " + requestURL);
    console.log("Parameter\t: " + JSON.stringify(parameters));

    // axios.post(requestURL,parameters)
    // .then(response=>{
    //   console.log("----", response)
    // })
    // .catch(error=>{
    //   console.log("SERVER ERROR\t: " + error);
    // })
    try {

     let response = await axios.post(requestURL,parameters)

     console.log("----", response)
      console.log("API Name\t: (" + name + ")");
      // console.log("STATUS CODEEE\t: " + response);
      // let responseJson = await response.json();
      // console.log("API Response\t: " + JSON.stringify(responseJson));
     
      return new Promise((apiResponse) => {
        apiResponse({ code: response.status, json: response });
      });
    } catch (error) {
      console.log("API Name\t: (" + name + ")");
      console.log("STATUS CODE\t: 0");
      console.log("SERVER ERROR\t: " + error);
      return new Promise((apiResponse) => {
        apiResponse({ code: 0, json: error });
      });
    }
  }


//   async postAPIForm(
//     name,
//     parameters,
//     requestHeader = APIConfiguration.requestHeaders(
//       APIContentTypes.applicationJSON,
//       APIContentTypes.formData
//     )
//   ) {
//     var request = {
//       method: "POST",
//       headers: await this.addAuthorizationToHeader(requestHeader),
//       body: parameters,
//     };
//     let requestURL = this.apiBaseURL + name;
//     console.log("REQUEST URL\t: " + requestURL);
//     console.log("Parameter\t: " + JSON.stringify(parameters));
//     try {
//       let response = await fetch(requestURL, request);
//       console.log("API Name\t: (" + name + ")");
//       console.log("STATUS CODE\t: " + response.status);
//       let responseJson = await response.json();
//       console.log("API Response\t: " + JSON.stringify(responseJson));
//       return new Promise((apiResponse) => {
//         apiResponse({ code: response.status, json: responseJson });
//       });
//     } catch (error) {
//       console.log("API Name\t: (" + name + ")");
//       console.log("STATUS CODE\t: 0");
//       console.log("SERVER ERROR\t: " + error);
//       return new Promise((apiResponse) => {
//         apiResponse({ code: 0, json: error });
//       });
//     }
//   }



//   async uploadFile(
//     name,
//     file = {},
//     parameters = {},
//     requestHeader = APIConfiguration.requestHeaders(
//       APIContentTypes.applicationJSON,
//       APIContentTypes.formData
//     )
//   ) {
//     var request = {
//       method: "POST",
//       headers: await this.addAuthorizationToHeader(requestHeader),
//       body: this.createFormData(file, parameters),
//     };
//     console.log(requestHeader);
//     let requestURL = this.apiBaseURL + name;
//     console.log("REQUEST URL\t: " + requestURL);
//     console.log("Parameter\t: " + JSON.stringify(parameters));
//     try {
//       let response = await fetch(requestURL, request);
//       console.log("API Name\t: (" + name + ")");
//       console.log("STATUS CODE\t: " + response.status);
//       let responseJson = await response.json();
//       console.log("API Response\t: " + JSON.stringify(responseJson));
//       return new Promise((apiResponse) => {
//         apiResponse({ code: response.status, json: responseJson });
//       });
//     } catch (error) {
//       console.log("API Name\t: (" + name + ")");
//       console.log("STATUS CODE\t: 0");
//       console.log("SERVER ERROR\t: " + error);
//       return new Promise((apiResponse) => {
//         apiResponse({ code: 0, json: error });
//       });
//     }
//   }

//   createFormData = (file, body) => {
//     const data = new FormData();
//     if (file) {
//       console.log("file::" + file.uri);
//       data.append(file.keyname, {
//         name: file.name,
//         type: file.type,
//         uri: file.uri,
//       });
//     }

//     Object.keys(body).forEach((key) => {
//       data.append(key, body[key]);
//     });
//     return data;
//   };

//   async uploadFileUsingRNBlob(name, file = {}, parameters = {}) {
//     const finalFilePath =
//       Platform.OS == "ios" ? file.uri.replace("file://", "") : file.uri;
//     let requestURL = this.apiBaseURL + name;
//     try {
//       let userToken = await YZConstant.shared.getAuthorizationToken();
//       let resp = await RNFetchBlob.fetch(
//         "POST",
//         requestURL,
//         {
//           Accept: APIContentTypes.applicationJSON,
//           "Content-Type": APIContentTypes.formData,
//           Authorization: "Bearer " + userToken,
//         },
//         [
//           // part file from storage
//           {
//             name: file.keyname,
//             filename: file.name,
//             type: file.type,
//             data: RNFetchBlob.wrap(finalFilePath),
//           },
//         ]
//       ).uploadProgress((written, total) => {
//         console.log("uploaded", written / total);
//         let percentage = written / total;
//         return new Promise((uploadingResponse) => {
//           uploadingResponse({ progress: percentage });
//         });
//       });
//       var json = await resp.json();
//       return new Promise((apiResponse) => {
//         apiResponse({ code: resp.respInfo.status, json: json });
//       });
//     } catch (error) {
//       console.log("API Name\t: (" + name + ")");
//       console.log("STATUS CODE\t: 0");
//       console.log("SERVER ERROR\t: " + error);
//       return new Promise((apiResponse) => {
//         apiResponse({ code: 0, json: error });
//       });
//     }
//   }
}
