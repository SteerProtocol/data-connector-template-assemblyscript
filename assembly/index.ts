import { parsePrices, console } from "@steerprotocol/strategy-utils";
import { JSON } from "assemblyscript-json";
import {UniswapSwap} from "./types/Uniswap";
import {Uniswapv3Subgraph} from "./Uniswapv3Subgraph";
// import { CustomStrategy } from "./CustomStrategy";


// The class designed for a certain number of data sources
export class DataConnector {

  public uniswapHandler: Uniswapv3Subgraph;
  public config: JSON;
  private index: number = 0;

  public TransformedData: Array<string> = [];

  // I'd imagine this input would be standardized something like this, any config and then state info necessary for getting the data
  constructor(config: string, epochTimestamp: string) {

    // Parse the config
    this.config = JSON.parse(config);
    this.uniswapHandler = new Uniswapv3Subgraph(parseInt(epochTimestamp));
  }

  // To be called back until the boolean returns true.
  // After getting each call from the string, the response is passed in
  public main(response: string | null): [boolean, string | null] {

    // See if we are done with callbacks
    if (this.config.calls.length  == this.index) {
      return [true, null];
    }

    // Loop through the calls in config and see if they are supported in this bundle, if so call them
    const CallName = this.config.calls[this.index].name;

    // Pass in the response from the previous call, if the helper gives a true then we can increment the index and call the next call
    if (CallName == "UniswapSwapData") {
      // Process response
      const swapResult = this.uniswapHandler.GetSwaps(response, this.config.calls[this.index].params);
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
  public exampleConfig(): string {
    return `{
      "calls" : [
          {
            "name": "UniswapSwapData",
            "params": {
              "poolAddress": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
              "period": "604800"
            }
            "transform": {
              "type": "candle",
              "params": {
                "candleWidth": "28800",
                "numCandles": "21"
            }
          }
        }
      ]
    }`
  }

}
