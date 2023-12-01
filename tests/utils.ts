export const config = `{
  "poolAddress": "0x5645dcb64c059aa11212707fbf4e7f984440a8cf",
  "lookback": 30000,
  "candleWidth": "30m",
  "subgraphEndpoint": "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon",
  "executionContext": {"epochTimestamp": 1685678400}
}`;

export const configForm = `{
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