import { DataConnectorConfig, ExecutionContext } from "@steerprotocol/strategy-utils/assembly";
import { JSON } from "json-as/assembly";

// Candle/TheGraph Config
@serializable
export class Config extends DataConnectorConfig {
    candleWidth: string = "";
    poolAddress: string = "";
    subgraphEndpoint: string = "";
    lookback: i64 = 0;
}

/*
// CCXT Config
@serializable
export class Config extends DataConnectorConfig {
  exchangeId: string = "";
  symbol: string = "";
  timeframe: string = "";
  limit: i32 = 0;
}*/

// Swap root object
@serializable
export class Root {
    data: Data = { swaps: [] };
}

// Swaps data object
@serializable
export class Data {
    swaps: Swap[] = [];
}

// swap object
@serializable
export class Swap {
    id: string = "";
    timestamp: string = "";
    amount0: string = "";
    amount1: string = "";
    transaction: Transaction = new Transaction();
    tick: string = "";
    sqrtPriceX96: string = "";
}

// transaction object inside each swap
@serializable
export class Transaction {
    id: string = "";
    blockNumber: string = "";
}