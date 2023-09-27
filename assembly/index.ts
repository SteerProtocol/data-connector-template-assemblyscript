import { JSON } from "json-as/assembly";
import { fetchSync } from "as-fetch/sync";
import { Config } from "./types";

let configObj: Config = new Config();

let currentTimestamp: i64 = 0;
export function initialize(config: string): void {
  configObj = JSON.parse<Config>(config);
  currentTimestamp = configObj.executionContext.epochTimestamp - configObj.lookback;
  if (configObj.candleWidth == null || configObj.lookback == 0 || configObj.poolAddress == null || configObj.subgraphEndpoint == null) {
    throw new Error("Config not properly formatted");
  }
  console.log("epochTimestamp: " + configObj.executionContext.epochTimestamp.toString());
}

export function execute(): void {
  fetchSync(configObj.subgraphEndpoint, {
    method: "POST",
    mode: "no-cors",
    headers: [
      ["Content-Type", "application/json"]
    ],
    body: String.UTF8.encode(
      `{"query":"{ swaps (first: 500, skip: 0, where: {timestamp_gt: ${currentTimestamp}, timestamp_lt: ${configObj.executionContext.epochTimestamp}, pool: \\"${configObj.poolAddress.toLowerCase()}\\"}, orderBy: timestamp, orderDirection: asc){id, timestamp, amount0, amount1, transaction {id, blockNumber}, tick, sqrtPriceX96}}"}`
    )
  });
  
  const swapData = fetchSync(configObj.subgraphEndpoint, {
    method: "POST",
    mode: "no-cors",
    headers: [
      ["Content-Type", "application/json"]
    ],
    body: String.UTF8.encode(
      `{"query":"{ swaps (first: 500, skip: 0, where: {timestamp_gt: ${currentTimestamp}, timestamp_lt: ${configObj.executionContext.epochTimestamp}, pool: \\"${configObj.poolAddress.toLowerCase()}\\"}, orderBy: timestamp, orderDirection: asc){id, timestamp, amount0, amount1, transaction {id, blockNumber}, tick, sqrtPriceX96}}"}`
    )
  });
  
  const swapText = swapData.text();

  console.log("Ptr: " + changetype<usize>(swapData.arrayBuffer()).toString());

  console.log("Response: " + swapText);
  console.log("Iterated through all swaps.");
}

export function transform(): string {
  return "Ooga Booga";
}

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
"description": "Duration in seconds of how far back in time from the current to pull swap data for",
"detailedDescription": "For example: If you want to fetch the past 14 days of candles with day candles, you would put the duration of time in seconds (14 * 24 * 60 * 60)"
},
"candleWidth": {
"type": "integer",
"title": "Candle Width",
"description": "The size or width of each candle to make from the swap data, measured in seconds",
"detailedDescription": "For example: If you want to fetch the past 14 days of candles with day candles, this field would be the candle size (day) in seconds (24 * 60 * 60)"
}
}
}`;
}

export function version(): i32 {
  return 1;
}