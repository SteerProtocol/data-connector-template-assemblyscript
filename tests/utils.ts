export const config = `{
  "poolAddress": "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",
  "lookback": 30000,
  "candleWidth": "5m",
  "subgraphEndpoint": "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon",
  "executionContext": {"epochTimestamp": 1674666008}
}`;

export const configForm = `{
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