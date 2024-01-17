import { JSON } from "json-as/assembly";
import { fetchSync } from "as-fetch/sync";
import { SwapParser } from "./parser";
import { ExecutionContext, generateCandles, RawTradeData } from "@steerprotocol/strategy-utils/assembly/index";

// @ts-ignore: Decorator valid here
@serializable
class Config {
  subgraphEndpoint: string = "";
  poolAddress: string = "";
  candleWidth: string = "";
  lookback: u32 = 0;
  executionContext: ExecutionContext | null = null;
  isValid(): boolean {
    if (!this.subgraphEndpoint) return false;
    if (!this.poolAddress) return false;
    if (!this.candleWidth) return false;
    if (!this.lookback) return false;
    if (!this.executionContext) return false;
    if (!this.executionContext!.epochTimestamp) return false;
    return true;
  }
}

let configObj: Config | null = null;
const swaps: Swap[] = [];

/**
 * Recieves config from host
 */
export function initialize(config: string): void {
  configObj = JSON.parse<Config>(config);
  if (!configObj!.isValid()) throw new Error("Config not properly formatted");
}

/**
 * Handles the execution logic
 */
export function execute(): void {
  if (!configObj) throw new Error("Missing config: Must call config() first!");
  let currentTimestamp = <u32>configObj!.executionContext!.epochTimestamp - configObj!.lookback;

  while (true) {
    const res = fetchSync(configObj!.subgraphEndpoint, {
      method: "POST",
      mode: "no-cors",
      headers: [
        ["Content-Type", "application/json"]
      ],
      body: String.UTF8.encode(
        `{"query":"{ swaps (first: 500, skip: 0, where: {timestamp_gt: ${currentTimestamp}, timestamp_lt: ${configObj!.executionContext!.epochTimestamp}, pool: \\"${configObj!.poolAddress.toLowerCase()}\\"}, orderBy: timestamp, orderDirection: asc){id, timestamp, amount0, amount1, transaction {id, blockNumber}, tick, sqrtPriceX96}}"}`
      )
    });

    const swapText = res.text();
    if (!res.ok) break;

    if (swapText.length <= '{"data":{"swaps":[]}}'.length) break;

    new SwapParser(swapText).parseTo<Swap>(swaps);
    currentTimestamp = u32.parse(swaps[swaps.length - 1].timestamp);
  }
}

// Main transform function to be called after main function
export function transform(): string {
  const X192 = Math.pow(2, 192);

  const rawTradeData: Array<RawTradeData> = [];

  for (let i = 0; i < swaps.length; i++) {
    const swap = swaps[i];
    const sqrtPriceX96 = f64.parse(swap.sqrtPriceX96)
    rawTradeData.push(new RawTradeData(i32.parse(swap.timestamp), (sqrtPriceX96 * sqrtPriceX96) / X192, f64.parse(swap.amount0)))
  }

  const candles = generateCandles(JSON.stringify<Array<RawTradeData>>(rawTradeData), configObj!.candleWidth);
  return candles;
}

// An example of what the config object will look like after being created via the configForm
export function exampleConfig(): string {
  return `{
    "poolAddress": "0x5645dcb64c059aa11212707fbf4e7f984440a8cf",
    "lookback": 30000,
    "candleWidth": "30m",
    "subgraphEndpoint": "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon",
    "executionContext": {"epochTimestamp": 1685678400}
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

// @ts-ignore: Decorator valid here
@serializable
class Swap {
  id: string = "";
  timestamp: string = "";
  amount0: string = "";
  amount1: string = "";
  transaction: Transaction = new Transaction();
  tick: string = "";
  sqrtPriceX96: string = "";
}

// @ts-ignore: Decorator valid here
@serializable
class Transaction {
  id: string = "";
  blockNumber: string = "";
}