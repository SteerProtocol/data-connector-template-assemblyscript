import { JSON } from "json-as/assembly";
import { fetchSync } from "as-fetch/sync";
import { Config, Swap } from "./types";
import { isValidConfig } from "./util";
import { SwapParser } from "./parser";
import { Candle, generateCandles, RawTradeData } from "@steerprotocol/strategy-utils/assembly/index";

export { reset } from "./util";

let configObj: Config | null = null;
let currentTimestamp: i64 = 0;
const swaps: Swap[] = [];

/**
 * Recieves config from host
 */
export function initialize(config: string): void {
  configObj = JSON.parse<Config>(config);
  currentTimestamp = configObj!.executionContext.epochTimestamp - configObj!.lookback;
  if (isValidConfig(configObj!)) {
    throw new Error("Config not properly formatted");
  }
}

/**
 * Handles the execution logic
 */
export function execute(): void {
  if (!configObj) throw new Error("Missing config: Must call config() first!");

  while (true) {
    const res = fetchSync(configObj!.subgraphEndpoint, {
      method: "POST",
      mode: "no-cors",
      headers: [
        ["Content-Type", "application/json"]
      ],
      body: String.UTF8.encode(
        `{"query":"{ swaps (first: 500, skip: 0, where: {timestamp_gt: ${currentTimestamp}, timestamp_lt: ${configObj!.executionContext.epochTimestamp}, pool: \\"${configObj!.poolAddress.toLowerCase()}\\"}, orderBy: timestamp, orderDirection: asc){id, timestamp, amount0, amount1, transaction {id, blockNumber}, tick, sqrtPriceX96}}"}`
      )
    });

    const swapText = res.text();
    if (!res.ok) break;

    if (swapText.length <= '{"data":{"swaps":[]}}'.length) break;

    new SwapParser(swapText).parseTo<Swap>(swaps);
    currentTimestamp = i64.parse(swaps[swaps.length - 1].timestamp);
  }
}

// Main transform function to be called after main function
export function transform(): string {
  // Utility constant for Uniswap price conversion
  const X192 = Math.pow(2, 192);

  // this array will be used to generate candles
  const rawTradeData: Array<RawTradeData> = [];

  // iterate through swaps and create raw trade data
  for (let i = 0; i < swaps.length; i++) {
    const swap = swaps[i];
    const sqrtPriceX96 = f64.parse(swap.sqrtPriceX96)
    rawTradeData.push(new RawTradeData(i32.parse(swap.timestamp), (sqrtPriceX96 * sqrtPriceX96) / X192, f64.parse(swap.amount0)))
  }

  // generate candles using @steerprotocol/strategy-utils library
  const formattedCandles = generateCandles(JSON.stringify<Array<RawTradeData>>(rawTradeData), configObj!.candleWidth);

  // calculate candles data
  const candles: Array<Candle> = JSON.parse<Array<Candle>>(formattedCandles);

  // craft object to return
  return JSON.stringify(candles);
}

// An example of what the config object will look like after being created via the configForm
export function exampleConfig(): string {
  return `{
      "poolAddress": "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",
      "lookback": 604800,
      "candleWidth": "30m",
      "subgraphEndpoint": "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon"
    }`;
}

// Renders the config object in JSON Schema format, which is used
// by the frontend to display input value options and validate user input.
export function config(): string {
  return `{
  "title": "Uniswapv3 Interfacing Candles Config",
  "description": "Input config for converting swap data from a Uniswap v3 compatable pool into OHLC data",
  "type": "object",
  "required": [
    "candleWidth",
    "poolAddress",
    "lookback",
    "subgraphEndpoint"
  ],
  "properties": {
    "poolAddress": {
      "type": "string",
      "title": "Pool Address",
      "description": "Address of the pool to pull swaps from on the given subgraph",
      "detailedDescription": "i.e. '0x50eaEDB835021E4A108B7290636d62E9765cc6d7'"
    },
    "lookback": {
      "type": "integer",
      "title": "Lookback",
      "description": "Duration in seconds of how far back in time from the current time to pull data (a value of 60 would pull the last 60 seconds of data)",
      "detailedDescription": "For example: If you want to fetch the past 14 days of candles with day candles, you would put the duration of time in seconds (14 days * 24 hours in day * 60 minutes in hour * 60 seconds in minute = 1209600)"
    },
    "candleWidth": {
      "type": "string",
      "title": "Candle Width",
      "description": "The size or width of each candle in mhdw format (a value of '15m' will make each candle size 15 minutes wide)",
      "detailedDescription": "Examples: 1m, 5m, 15m, 1h, 1d, 1w"
    },
    "subgraphEndpoint" : {
      "type": "string",
      "title": "Subgraph Endpoint",
      "description": "The Graph API endpoint that indexes the desired pool on the desired chain for this data connector",
      "detailedDescription": "Examples: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon'"
    }
  }
}`;
}

export function version(): i32 {
  return 2;
}