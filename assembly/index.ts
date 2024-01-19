import { JSON } from "json-as/assembly";

@serializable
class Config {
  lookback: i32 = 0;
  isValid(): boolean {
    if (!this.lookback) return false;
    return true;
  }
}

let configObj: Config = new Config();
let data: MarketableAsset[] = [];

/**
 * Recieves config from host
 */
export function initialize(config: string): void {
  configObj = JSON.parse<Config>(config);
  if (!configObj.isValid()) throw new Error("Config not properly formatted");
  if (configObj.lookback > 100) throw new Error("Config lookback cannot exceed 100!");
}

/**
 * Handles the execution logic
 * Where:
 * - If `res` empty, initiate request
 * - If `res` full, process request
 * - If return `true` exit loop
 */
export function execute(res: string | null): string {
  if (!configObj) throw new Error("Missing config: Must call config() first!");

  if (!res) {
    return `{
        "method": "get",
        "url": "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?sort=-record_date&filter=security_desc:in:(Treasury Bills,Treasury Notes,Treasury Bonds)",
        "headers": {}
        }`
  }
  data = JSON.parse<ResponseObj>(res).data;
  return "true";
}

/*
 * Transform data after execution
*/
export function transform(): string {
  const bills: Array<f64> = [];
  const notes: Array<f64> = [];
  const bonds: Array<f64> = [];
  // desired number of objects
  for (let i = 0; i < data.length - 1; i += 3) {
    // Fill our arrays
    bonds.push(f64.parse(data.at(i).avg_interest_rate_amt));
    notes.push(f64.parse(data.at(i + 1).avg_interest_rate_amt));
    bills.push(f64.parse(data.at(i + 2).avg_interest_rate_amt));
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
    "lookback": 12
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
  return 1;
}

@serializable
class MarketableAsset {
  avg_interest_rate_amt: string = "";
}

@serializable
class ResponseObj {
  data: Array<MarketableAsset> = [];
}