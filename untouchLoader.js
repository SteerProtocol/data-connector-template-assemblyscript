const fs = require("fs");
import * as AsBind from "as-bind/dist/as-bind.cjs.js";
import * as axios from 'axios';


const imports = {
  console: { // File which you are injecting
    log(strPtr) {
      console.log(strPtr)
    }
  },
  HttpHandler: {
    MakeRequest(strPtr) {
      console.log("requested:",strPtr)
      // Make a request for a user with a given ID
      let resp;
      axios.get(strPtr)
      .then(function (response) {
        // handle success
        console.log(response);
        resp = response;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        resp = error;
      })
      .then(function () {
        // always executed
      });
      return resp
    }
  }
};

const asBindInstance = AsBind.instantiateSync(fs.readFileSync(__dirname + "/build/untouched.wasm"), imports)

module.exports = asBindInstance.exports;

