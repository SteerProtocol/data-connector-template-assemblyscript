import { parsePrices, console } from "@steerprotocol/strategy-utils";
import { JSON } from "assemblyscript-json";
import {UniswapSwap} from "./types/Uniswap";
import {UniswapDataCollector} from "./UniswapDataCollector";
// import { CustomStrategy } from "./CustomStrategy";


// The class designed for a certain number of data sources
export class DataConnector {

  public SwapData: Array<UniswapSwap> = [];
  public uniswapHandler: UniswapDataCollector;

  // I'd imagine this input would be standardized something like this, any config and then state info necessary for getting the data
  constructor(config: string, epochTimestamp: string) {

    // pull out the candle width and num candles from the config so we can calculate the dates
    // we might have a config for holding variables for this module as well (for things like pool address or tokens)
    // but we could also just put this in the execution config
    width = ...
    numCandles = ...
    this.uniswapHandler = new UniswapDataCollector(width * numCandles, epochTimestamp);

  }

  // First call from node is here to get names of functions to call, in this case only UniswapData
  static functionCalls(): string {
    return `{
      "calls" : [
        "UniswapData"
      ]
    }`
  }

  // We might do this part a bit differently but essentially we get what functions we need to call from the above function,
  // which we then call and pass the result back in too see if it is ok to continue, if not we return the next request
  // to make and that request's result gets passed in again. The boolean tells us when no more calls are necessary from this source, the string is the next request to make.
  public UniswapData(data: string | null): [boolean, string] {
    if (data != null) {
      // here we would parse data into an array of swaps to pass to the call
    }
    // go look at this function vvv
    return this.uniswapHandler.call(data)
  }

  // I was thinking after we loop through all the calls, we can then have a function that aggregates the results to be passed to the execution bundle
  public results(): string {
    return this.uniswapHandler.getData();
  }

}
