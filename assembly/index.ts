import { JSON } from "json-as/assembly";
import { fetchSync } from "as-fetch/sync";
import { Config, MarketableAsset, ResponseObj } from "./types";
import { isInvalidConfig } from "./util";
export { reset } from "./util";

let configObj: Config | null = null;
let data: MarketableAsset[] = [];

/**
 * Recieves config from host
 */
export function initialize(config: string): void {
  configObj = JSON.parse<Config>(config);
  if (isInvalidConfig(configObj!)) {
    throw new Error("Config not properly formatted");
  }
}

/**
 * Handles the execution logic
 */
export function execute(): void {
  if (!configObj) throw new Error("Missing config: Must call config() first!");

  while (true) {
    const res = fetchSync("https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?sort=-record_date&filter=security_desc:in:(Treasury%20Bills,Treasury%20Notes,Treasury%20Bonds)", {
      method: "GET",
      mode: "no-cors",
      headers: [],
      body: null
    });

    const swapText = res.text();
    if (!res.ok) break;
    if (!swapText.length) break;

    data = data.concat(JSON.parse<ResponseObj>(swapText).data);
    if (data.length >= configObj!.lookback * 3) break;
  }
}

/*
 * Transform data after execution
*/
export function transform(): string {
  const bills: Array<f64> = [];
  const notes: Array<f64> = [];
  const bonds: Array<f64> = [];
  // desired number of objects
  for (let i = 0; i < (configObj!.lookback * 3) - 3;) {
    // Fill our arrays
    bonds.push(f64.parse(data.at(i++).avg_interest_rate_amt));
    notes.push(f64.parse(data.at(i++).avg_interest_rate_amt));
    bills.push(f64.parse(data.at(i++).avg_interest_rate_amt));
  }
  // JSON serialization might be preferred here
  return `{
      "bills": [`+ bills.toString() + `],
      "notes": [`+ notes.toString() + `],
      "bonds": [`+ bonds.toString() + `]
    }`;
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
    "title": "Average Interest Rates on US Treasury Securities",
    "description": "Returns arrays of interest rates for treasury bills, notes, and bonds",
    "type": "object",
    "required": [
      "lookback"
    ],
    "properties": {
      "numMonths": {
        "type": "integer",
        "title": "Number of months",
        "description": "Number of months back from the present to pull data from"
      }
    }
  }`;
}

export function version(): i32 {
  return 2;
}