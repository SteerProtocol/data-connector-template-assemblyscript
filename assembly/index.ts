import { JSON } from "assemblyscript-json";
// import {UniswapSwap} from "./types/Uniswap";
import {Uniswapv3Subgraph} from "./Uniswapv3Subgraph";
import {HttpHandler} from "./HttpHandler";
// import { CustomStrategy } from "./CustomStrategy";

// export class DataConfig {
//   constructor(public calls: Array<DataCall>){}
// }

// export class DataCall  {
//     name: string;
//     params: string;
//     transform: DataTransform;
// }

// class DataTransform {
//   type: string;
//   params: string;
// }

// The class designed for a certain number of data sources
export class DataConnector {

  public uniswapHandler: Uniswapv3Subgraph;
  public config: Array<JSON.Value>;
  public callsLength: i32;
  private index: number = 0;

  // public _config: Array<Map<string,string>> = [];

  public TransformedData: Array<string> = [];

  // I'd imagine this input would be standardized something like this, any config and then state info necessary for getting the data
  constructor(config: string, epochTimestamp: string) {

    this.uniswapHandler = new Uniswapv3Subgraph(i32(parseInt(epochTimestamp)));

    // Parse the config
    const configObj = <JSON.Obj>JSON.parse(config);

    const temp = configObj.getValue("calls");
    if (temp != null){
      const notNull = <JSON.Value>temp;
      if (notNull.isArr){
        const pArr = <JSON.Arr>notNull;
        const pVArr = pArr._arr;
        this.config = pVArr;
        this.callsLength = pVArr.length;
      }
      else {this.config = [];}
    }
    else {this.config = [];}
  }

  public getConfig(): string {
    const response = HttpHandler.MakeRequest("http://localhost:3000/api/v1/config");
    return response;
  }

  // To be called back until the boolean returns true.
  // After getting each call from the string, the response is passed in
  public main<T>(response: T): [string, string] {

    const config = JSON.parse(this.config);
    // See if we are done with callbacks
    if ( config.get("calls").length  == this.index) {
      return [true, null];
    }

    // Loop through the calls in config and see if they are supported in this bundle, if so call them
    const CallName = config.calls[this.index].name;

    // Pass in the response from the previous call, if the helper gives a true then we can increment the index and call the next call
    if (CallName == "UniswapSwapData") {
      // Process response
      const swapResult = this.uniswapHandler['GetSwaps'](response.toString(), this.config.calls[this.index].params);
      // See if this call is done, continue to next if so
      if (swapResult[0]) {
        // Transform the data
        if (this.config.calls[this.index].transform.type == "candle") {
          // Pass in the data to the candle transformer, append to the transformed data
          const candles = this.uniswapHandler.TransformSwapsToCandles(this.uniswapHandler.getGetSwapData(), this.config.calls[this.index].transform.params);
          this.TransformedData.push(candles);
        }
        else if (this.config.calls[this.index].transform.type == "custom") {
          // @Note additional transformations can be added like this
        }
        else {throw new Error("Invalid transformation type");}
        this.index++;
        return [false, null];
      }
      else {
        // @TODO Maybe add empty slot to the transformed data array?
        return [false, swapResult[1]];
      }
    }
    // Future data collections would be added here
    else if (CallName == "OtherUniswapData") {
      // @Note this is an example of how to add a new call, which is defined in the helper class
    }
    // If the call is not supported, we can move onto the next call
    else {
      this.index++;
      return [false, null];
    }
  }

  // To be called after the main function returns true, to get all data
  public results(): Array<string> {
    return this.TransformedData;
  }

  // An array of function to be called, the parameters to be passed, the transformation type, and the transformation parameters
  static exampleInputConfig(): string {
    return `{
      "name": "UniswapSwapData",
      "poolAddress": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      "period": 604800,
      "transform": "candle",
      "candleWidth": 14400,
    }`
  }

  // Renders the config object in JSON Schema format, which is used
  // by the frontend to display input value options and validate user input.
  static config(): string {
    return `{
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Uniswapv3 Subgraph Data Connector",
      "type": "object",
      "functionOptions": [
        {
          "name": "UniswapSwapData",
          "params": [
            {
              "name": "poolAddress",
              "type": "string",
              "description": "The address of the Uniswap pool to get data from"
            },
            {
              "name": "period",
              "type": "number",
              "description": "The period of time to get data from epoch time"
            },
          ]
          "transformOptions": [
            {
              "name": "candle",
              "params": [
                {
                  "name": "candleWidth",
                  "type": "number",
                  "description": "The width of the candle in seconds"
                }
              ]
            }
          ]
        }
      ]
    }`; 
  }

}
