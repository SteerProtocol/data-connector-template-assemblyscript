import { JSON } from "assemblyscript-json";
// import { Obj } from "assemblyscript-json/assembly/JSON";
// import {UniswapSwap} from "./types/Uniswap";
// import {Uniswapv3Subgraph} from "./Uniswapv3Subgraph";



// The class designed for a certain number of data sources
export class DataConnector {

  // public uniswapHandler: Uniswapv3Subgraph;
  public config: string;
  // Anything to get that MVP
  // private supportedFunctions: Array<string> = ["UniswapSwapData"];

  // public _config: Array<Map<string,string>> = [];

  public TransformedData: string;

  // I'd imagine this input would be standardized something like this, any config and then state info necessary for getting the data
  constructor(config: string, epochTimestamp: string) {

    // this.uniswapHandler = new Uniswapv3Subgraph(i32(parseInt(epochTimestamp)));
    this.config = config;
  }

  // To be called back until the second string is results,
  // which will return the transformed data after performing all the calls
  // Either the response to the request is sent, or null
  public main<T>(response: T): Array<string> {

    // //Get the function name if it exists
    // const config = <JSON.Obj>JSON.parse(this.config);
    // const functionToCall = config.getValue("name");
    // // Null handling
    // if (functionToCall == null) {
    //   throw new Error("No function name provided");
    // }
    // const functionName = functionToCall.toString();
    // // https://www.assemblyscript.org/runtime.html#memory-layout <
    // if (this.supportedFunctions.includes(functionName) == false) {
    //   throw new Error("Function not found");
    // }
    return ["", "functionName"];
  } 

  // All Data functions should return two strings, the first being the request payload,
  // and the second being the callback function to pass off the response too.
  // public SwapData<T>(response: T): [string, string] {
  //   const config = <JSON.Obj>JSON.parse(this.config);
  //   // Get the params we know we need
  //   const poolAddress = config.getString("poolAddress");
  //   const period = config.getInteger("period");
  //   // Null handling
  //   if (poolAddress == null || period == null) {
  //     throw new Error("Invalid parameters");
  //   }
  //   // Send off the response along with the configs, expect a bool and the callback function
  //   const swapsResult = this.uniswapHandler.getUniswapSwap(response, poolAddress.toString(), i32(period));

  //   // if swapsResult is false, then recall this, else call the transformer
  //   if (swapsResult[0] == false) {
  //     return [swapsResult[1], "SwapData"];
  //   }
  //   else {
  //     // Signal callback to transform
  //     return ["", "transform"];
  //   }
    
  // }

  public transform(): Array<string> {
    return ["", "results"];
  }

  // To be called after the main function returns true, to get all data
  // public results(): string {
  //   this.TransformedData = this.uniswapHandler.data.toString()
  //   return this.TransformedData;
  // }

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
      "type": "object",
      "properties": {
        "function": {
          "enum": [
            "SwapData",
            "Other"
          ]
        },
        "transformation": {
          "enum": [
            "candle",
            "raw"
          ]
        }
      },
      "allOf": [
        {
          "if": {
            "properties": {
              "function": {
                "const": "SwapData"
              }
            }
          },
          "then": {
            "properties": {
              "poolAddress": {
                "type": "string",
                "description":"The pool address to pull the swaps from"
              },
              "period": {
                "type": "number",
                "description": "The time in seconds to go back and pull data from"
              }
            },
            "required": [
              "poolAddress", "period"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "transformation": {
                "const": "candle"
              }
            }
          },
          "then": {
            "properties": {
              "candleSize": {
                "type": "number",
                "description":"The size of the candles in seconds"
              }
            },
            "required": [
              "candleSize"
            ]
          }
        },
        {
          "required": [
            "function", "transformation"
          ]
        }
      ]
    }`; 
  }

}
