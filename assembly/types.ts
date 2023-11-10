import { JSON } from "json-as/assembly";

@serializable
export class MarketableAsset {
  avg_interest_rate_amt: string = "";
}

@serializable
export class ResponseObj {
  data: Array<MarketableAsset> = [];
}

@serializable
export class Config {
  lookback: i32 = 0;
}