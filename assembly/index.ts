import { JSON } from "assemblyscript-json";

// Local Variables
  var poolAddress: string;
  var timestamp: i64;                 // epoch timestamp/end date
  var period: i64;                    // period in seconds
  var startTime: i64;                 // start date
  var candleWidth: i64;
  var data: Array<JSON.Value> = [];   // collector array of swaps
  const first: string = "first";      // saved to memory for comparison


  // Initializes variables from the config file
  export function initialize(config: string, _timestamp: i32): void {
    // parse through the config and assing locals
    const configObj = <JSON.Obj>JSON.parse(config);
    const _poolAddress = configObj.getString("poolAddress");
    const _period = configObj.getInteger("period");
    const _candleWidth = configObj.getInteger("candleWidth");
    if (_poolAddress == null || _period == null || _candleWidth == null) {
      throw new Error("Flawed config");
    }
    poolAddress = _poolAddress._str;
    timestamp = _timestamp;
    period = i64(_period._num);
    startTime = timestamp - period;
    candleWidth = i64(_candleWidth._num);
  }

  // To be called back until "true" is returned,
  // using the all other return payloads as axios request config objects
  // Ref: https://axios-http.com/docs/req_config/
  export function main(response: string): string {

    if (response == first) { // Presumably the first call
      return `{
"method": "post",
"url": "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
"headers": {},
"data": {
    "query": "{ swaps (first: 1000, skip: 0, where: {timestamp_gt: `+ startTime.toString()+`, timestamp_lt: `+timestamp.toString()+`, pool: \\"`+poolAddress+`\\"}, orderBy: timestamp, orderDirection: asc){id, timestamp, amount0, amount1, transaction {id, blockNumber}, tick, sqrtPriceX96}}"
    }
}`
    }
    else{ 
      // We have a response, parse it and test condition, update iteration logic
      const new_response = <JSON.Obj>JSON.parse(response);
      // const new_data = new_response.getObj("data");
      // if (new_data == null) {throw new Error("No data in response");}
      const nested_response = new_response.getObj("data");
      if (nested_response == null) {throw new Error("No data in response");}
      const new_arr = nested_response.getArr("swaps");
      if (new_arr == null) {throw new Error("No swaps in response");}
      const new_swaps = new_arr._arr;
      // If we recieved 0 swaps, we have exhausted the remaining data, so we have completed our loop
      if (new_swaps.length == 0) { 
        // end loop
        return "true";
      }
      else {
        // update data
        data = data.concat(new_swaps);
        const last_swap = <JSON.Obj>new_swaps[new_swaps.length - 1]
        const _timestamp = last_swap.getString("timestamp");
        if (_timestamp == null) {throw new Error("No timestamp in last swap");}
        // update iteration logic, TheGraph has a skip limit of 5, so we use the start date to filter
        startTime = i32(parseInt(_timestamp._str));
        return `{
"method": "post",
"url": "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
"headers": {},
"data": {
    "query": "{ swaps (first: 1000, skip: 0, where: {timestamp_gt: `+ startTime.toString()+`, timestamp_lt: `+timestamp.toString()+`, pool: \\"`+poolAddress+`\\"}, orderBy: timestamp, orderDirection: asc){id, timestamp, amount0, amount1, transaction {id, blockNumber}, tick, sqrtPriceX96}}"
    }
}`
      }
    }
  } 

  export class Candle {
    constructor(
      public high: f32,
      public low: f32,
      public open: f32,
      public close: f32
    ) {}
    public toString(): string {
      return `{
        "high": ${this.high},
        "low": ${this.low},
        "open": ${this.open},
        "close": ${this.close}
      },`
    }
  }

  export function getString (candles: Candle[]): string {
    let base: string = ''
    for (let i = 0; i < candles.length; i++) {
      base += candles[i].toString()
      // if (i != candles.length - 1) {
      //   base += ', '
      // }
    }
    return base.substr(0,base.length-1);
  }

  export function transform(): string {
    const X96 = Math.pow(2,96);
    // Gen arr of prices, data is already ordered by timestamp
    const prices: Array<f32> = [];
    const timestamps: Array<i32> = [];
    // Fill our arrays with properly typed data
    for (let i = 0; i < data.length; i++) {
      const swap = <JSON.Obj>data[i];
      const _sqrtPriceX96 = swap.getString("sqrtPriceX96");
      const _timestamp = swap.getString("timestamp");
      if (_sqrtPriceX96 == null || _timestamp == null) {continue;}
      const _price = f32(parseFloat(_sqrtPriceX96._str));
      const _timestamp_i32 = i32(parseInt(_timestamp._str));
      prices.push(f32(_price/X96));
      timestamps.push(_timestamp_i32);
    }
    // Get start point, and interval
    let candle_index = timestamp - period;
    const Candles: Array<Candle> = [];
    // Loop through all intervals, and create candles
    while (candle_index < timestamp) {
      // Get batch of prices for this interval
      const prices_batch: Array<f32> = [];
      for (let i = 0; i < timestamps.length; i++) {
        if (timestamps[i] >= candle_index && timestamps[i] < candle_index + candleWidth) {
          prices_batch.push(prices[i]);
        }
      }
      //Now we have our batch of prices, calculate & push OHLC
      if (prices_batch.length != 0) {
        Candles.push(getCandle(prices_batch));
      }
      // Increment candle_index
      candle_index += candleWidth;
    }

    // craft object to return
    return `{"data": [` + getString(Candles) + "]}";
  }

  function getCandle(data: Array<f32>): Candle {
    //initials
    let open = data[0];
    let close = data[data.length - 1];
    let high = data[0];
    let low = data[0];
    //loop
    for (let i = 0; i < data.length; i++) {
      if (data[i] > high) {
        high = data[i];
      }
      if (data[i] < low) {
        low = data[i];
      }
    }
    return new Candle(high, low, open, close);
  }

  // An example of what the config object will look like after being created via the configForm
  export function exampleInputConfig(): string {
    return `{
      "poolAddress": "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",
      "period": 604860,
      "candleWidth": 14400
    }`
  }

  // Renders the config object in JSON Schema format, which is used
  // by the frontend to display input value options and validate user input.
  export function config(): string {
    return `{
  "title": "Uniswapv3 Swap To Candle Config",
  "description": "Input config for converting swap data from a Uniswap v3 pool into OHLC data",
  "type": "object",
  "required": [
    "candleWidth",
    "poolAddress",
    "period"
  ],
  "properties": {
    "poolAddress": {
      "type": "string",
      "title": "Pool Address",
      "description": "Address of the pool to pull swaps from"
    },
    "period": {
      "type": "integer",
      "title": "Period",
      "description": "Duration in seconds of how far back in time from the current to pull swap data for"
    },
    "candleWidth": {
      "type": "integer",
      "title": "Candle Width",
      "description": "The size or width of each candle to make from the swap data, measured in seconds"
    }
  }
}`; 
  }


