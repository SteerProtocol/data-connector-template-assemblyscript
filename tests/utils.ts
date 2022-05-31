export const config = `{
  "calls": [
      {
        "name": "UniswapSwapData",
        "params": {
          "poolAddress": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
          "period": "604800"
        },
        "transform": {
          "type": "candle",
          "params": {
            "candleWidth": "28800",
            "numCandles": "21"
        }
      }
    }
  ]
}`