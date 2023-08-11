//import { Candle, ExecutionContext, DataConnectorConfig, generateCandles, RawTradeData } from "@steerprotocol/strategy-utils/assembly";
import { JSON } from "json-as/assembly";
import { fetchSync } from "as-fetch/sync";
import { Config, Swap } from "./types";
import { SwapParser } from "graph-packet-parser/src/Swap";

let configObj: Config = {
  "poolAddress": "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",
  "lookback": 30000,
  "candleWidth": "5m",
  "subgraphEndpoint": "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon",
  "executionContext": { "epochTimestamp": i32(1691778189730), executionTimestamp: 0, epochLength: 0, vaultAddress: "", blockTime: 0, blockNumber: 0 }
}

export function initialize(config: string): void {
  //configObj = JSON.parse<Config>(config);
  //console.log("Received config: " + JSON.stringify(configObj));
}

export function execute(): void {
  while (true) {
    const swapData: Swap[] = [];
    const swapText = fetchSync(configObj.subgraphEndpoint, {
      method: "POST",
      mode: "no-cors",
      headers: [],
      body: String.UTF8.encode(
        `{"query":"{ swaps (first: 500, skip: 0, where: {timestamp_gt: ${configObj.executionContext.epochTimestamp - configObj.lookback}, timestamp_lt: ${configObj.executionContext.epochTimestamp}, pool: \\"${configObj.poolAddress.toLowerCase()}\\"}, orderBy: timestamp, orderDirection: asc){id, timestamp, amount0, amount1, transaction {id, blockNumber}, tick, sqrtPriceX96}}"}`
      )
    }).text();
    console.log("Response: " + swapText.slice(0, 300) + "...");
    // We have iterated through all the swaps.
    // {"data":{"swaps":[]}}
    if (swapText.length <= 21) return;

    const swaps = changetype<Swap[]>(new SwapParser(swapText).parseToSwaps());
    console.log(JSON.stringify(swaps));
    swapData.concat(swaps);
  }
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
