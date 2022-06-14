export const config = `{
  "epochLength": "86400",
  "poolAddress": "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",
  "period": 604800,
  "candleWidth": 300
}`

export const configForm = 
`{
  "title": "Uniswapv3 Swap To Candle Config",
  "description": "Input config for converting swap data from a Uniswap v3 pool into OHLC data",
  "type": "object",
  "required": [
    "candleWidth",
    "poolAddress",
    "period",
    "epochLength"
  ],
  "properties": {
    "epochLength": {
      "type": "integer",
      "title": "Epoch Length",
      "description": "Duration in seconds of how often this bundle + strategy should run"
    },
    "poolAddress": {
      "type": "string",
      "title": "Pool Address",
      "description": "Address of the pool to pull swaps from"
    },
    "period": {
      "type": "integer",
      "title": "Period",
      "description": "Duration in seconds of how far back in time from the current to pull swap data for"
    },
    "candleWidth": {
      "type": "integer",
      "title": "Candle Width",
      "description": "The size or width of each candle to make from the swap data, measured in seconds"
    }
  }
}`;

export const firstCall = `{
"method": "post",
"url": "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
"headers": {},
"data": {
    "query": "{ swaps (first: 1000, skip: 0, where: {timestamp_gt: 1653407358, timestamp_lt: 1654012158, pool: \\"0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8\\"}, orderBy: timestamp, orderDirection: asc){id, timestamp, amount0, amount1, transaction {id, blockNumber}, tick, sqrtPriceX96}}"
    }
}`

export const secondCall = `{
"method": "post",
"url": "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
"headers": {},
"data": {
    "query": "{ swaps (first: 1000, skip: 0, where: {timestamp_gt: 1653574937, timestamp_lt: 1654012158, pool: \\"0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8\\"}, orderBy: timestamp, orderDirection: asc){id, timestamp, amount0, amount1, transaction {id, blockNumber}, tick, sqrtPriceX96}}"
    }
}`

export const candles = `{"data": [{
        "high": 22578.318359375,
        "low": 22565.576171875,
        "open": 22565.576171875,
        "close": 22578.318359375
      },{
        "high": 22578.556640625,
        "low": 22578.556640625,
        "open": 22578.556640625,
        "close": 22578.556640625
      },{
        "high": 22577.828125,
        "low": 22562.26171875,
        "open": 22577.828125,
        "close": 22562.26171875
      },{
        "high": 22551.052734375,
        "low": 22538.79296875,
        "open": 22551.052734375,
        "close": 22538.79296875
      },{
        "high": 22540.263671875,
        "low": 22538.826171875,
        "open": 22538.826171875,
        "close": 22540.263671875
      },{
        "high": 22579.83984375,
        "low": 22553.41796875,
        "open": 22553.41796875,
        "close": 22579.83984375
      },{
        "high": 22597.6640625,
        "low": 22579.91015625,
        "open": 22579.91015625,
        "close": 22597.6640625
      },{
        "high": 22614.84765625,
        "low": 22604.357421875,
        "open": 22604.357421875,
        "close": 22614.84765625
      },{
        "high": 22641.759765625,
        "low": 22627.0625,
        "open": 22627.0625,
        "close": 22641.759765625
      },{
        "high": 22654.1015625,
        "low": 22641.7734375,
        "open": 22641.7734375,
        "close": 22654.1015625
      },{
        "high": 22719.779296875,
        "low": 22664.23828125,
        "open": 22664.23828125,
        "close": 22719.779296875
      },{
        "high": 22719.9609375,
        "low": 22704.916015625,
        "open": 22719.9609375,
        "close": 22704.916015625
      },{
        "high": 22701.546875,
        "low": 22680.220703125,
        "open": 22701.546875,
        "close": 22680.220703125
      },{
        "high": 22676.28515625,
        "low": 22670.732421875,
        "open": 22676.28515625,
        "close": 22670.732421875
      },{
        "high": 22637.17578125,
        "low": 22623.34375,
        "open": 22637.17578125,
        "close": 22623.34375
      },{
        "high": 22615.84375,
        "low": 22615.84375,
        "open": 22615.84375,
        "close": 22615.84375
      },{
        "high": 22597.453125,
        "low": 22597.453125,
        "open": 22597.453125,
        "close": 22597.453125
      },{
        "high": 22578.79296875,
        "low": 22559.962890625,
        "open": 22578.79296875,
        "close": 22559.962890625
      },{
        "high": 22562.021484375,
        "low": 22562.0,
        "open": 22562.0,
        "close": 22562.021484375
      },{
        "high": 22596.06640625,
        "low": 22570.888671875,
        "open": 22570.888671875,
        "close": 22596.06640625
      },{
        "high": 22644.66015625,
        "low": 22613.1328125,
        "open": 22613.1328125,
        "close": 22644.66015625
      },{
        "high": 22664.42578125,
        "low": 22657.927734375,
        "open": 22664.42578125,
        "close": 22657.927734375
      },{
        "high": 22679.466796875,
        "low": 22675.576171875,
        "open": 22675.576171875,
        "close": 22679.466796875
      },{
        "high": 22679.5625,
        "low": 22679.5625,
        "open": 22679.5625,
        "close": 22679.5625
      },{
        "high": 22679.556640625,
        "low": 22673.212890625,
        "open": 22679.556640625,
        "close": 22673.212890625
      },{
        "high": 22662.39453125,
        "low": 22620.09765625,
        "open": 22662.39453125,
        "close": 22620.09765625
      },{
        "high": 22608.96875,
        "low": 22585.259765625,
        "open": 22608.96875,
        "close": 22585.259765625
      },{
        "high": 22576.927734375,
        "low": 22576.80078125,
        "open": 22576.927734375,
        "close": 22576.80078125
      },{
        "high": 22576.84765625,
        "low": 22576.84765625,
        "open": 22576.84765625,
        "close": 22576.84765625
      },{
        "high": 22577.298828125,
        "low": 22577.298828125,
        "open": 22577.298828125,
        "close": 22577.298828125
      },{
        "high": 22611.9921875,
        "low": 22610.927734375,
        "open": 22611.439453125,
        "close": 22611.9921875
      },{
        "high": 22597.052734375,
        "low": 22596.986328125,
        "open": 22597.052734375,
        "close": 22596.986328125
      },{
        "high": 22586.591796875,
        "low": 22586.572265625,
        "open": 22586.591796875,
        "close": 22586.572265625
      },{
        "high": 22572.169921875,
        "low": 22568.748046875,
        "open": 22572.169921875,
        "close": 22568.748046875
      },{
        "high": 22556.796875,
        "low": 22556.796875,
        "open": 22556.796875,
        "close": 22556.796875
      },{
        "high": 22556.794921875,
        "low": 22530.48046875,
        "open": 22556.794921875,
        "close": 22530.48046875
      },{
        "high": 22530.478515625,
        "low": 22530.47265625,
        "open": 22530.478515625,
        "close": 22530.47265625
      },{
        "high": 22529.880859375,
        "low": 22529.880859375,
        "open": 22529.880859375,
        "close": 22529.880859375
      },{
        "high": 22518.08203125,
        "low": 22518.08203125,
        "open": 22518.08203125,
        "close": 22518.08203125
      },{
        "high": 22508.677734375,
        "low": 22482.6953125,
        "open": 22508.677734375,
        "close": 22482.6953125
      },{
        "high": 22478.19921875,
        "low": 22478.193359375,
        "open": 22478.19921875,
        "close": 22478.193359375
      },{
        "high": 22477.2421875,
        "low": 22477.2421875,
        "open": 22477.2421875,
        "close": 22477.2421875
      },{
        "high": 22466.876953125,
        "low": 22466.876953125,
        "open": 22466.876953125,
        "close": 22466.876953125
      },{
        "high": 22466.869140625,
        "low": 22464.548828125,
        "open": 22466.869140625,
        "close": 22464.548828125
      },{
        "high": 22474.0234375,
        "low": 22470.14453125,
        "open": 22470.14453125,
        "close": 22474.0234375
      },{
        "high": 22475.12890625,
        "low": 22474.578125,
        "open": 22474.578125,
        "close": 22475.12890625
      },{
        "high": 22476.30859375,
        "low": 22475.67578125,
        "open": 22475.67578125,
        "close": 22476.30859375
      },{
        "high": 22476.861328125,
        "low": 22476.85546875,
        "open": 22476.859375,
        "close": 22476.861328125
      },{
        "high": 22486.66796875,
        "low": 22479.54296875,
        "open": 22479.54296875,
        "close": 22483.208984375
      },{
        "high": 22490.234375,
        "low": 22490.234375,
        "open": 22490.234375,
        "close": 22490.234375
      },{
        "high": 22501.18359375,
        "low": 22492.630859375,
        "open": 22492.630859375,
        "close": 22501.18359375
      },{
        "high": 22507.70703125,
        "low": 22501.248046875,
        "open": 22501.248046875,
        "close": 22507.70703125
      },{
        "high": 23374.005859375,
        "low": 23344.099609375,
        "open": 23374.005859375,
        "close": 23355.814453125
      },{
        "high": 23343.78515625,
        "low": 23343.78515625,
        "open": 23343.78515625,
        "close": 23343.78515625
      },{
        "high": 23311.064453125,
        "low": 23008.171875,
        "open": 23311.064453125,
        "close": 23012.630859375
      }]}`

export const response_swaps = `{
  "data": {
      "swaps": [
          {
              "id": "0x83949082002f1a19ee3a8caadefb980b955f2c487b2a4633f428f11fe0f3dd6c#346081",
              "timestamp": "1653407760",
              "amount0": "-489410.948255",
              "amount1": "249.795408163240098401",
              "transaction": {
                  "id": "0x83949082002f1a19ee3a8caadefb980b955f2c487b2a4633f428f11fe0f3dd6c",
                  "blockNumber": "14836638"
              },
              "tick": "200493",
              "sqrtPriceX96": "1787829209708643762003470022868992"
          },
          {
              "id": "0x2204ea129f8f1eb7a4c6f3e08adb550781e71c6b61e03c33ec22fd5dc20f76c2#346083",
              "timestamp": "1653407867",
              "amount0": "-1628.857207",
              "amount1": "0.832157046535542692",
              "transaction": {
                  "id": "0x2204ea129f8f1eb7a4c6f3e08adb550781e71c6b61e03c33ec22fd5dc20f76c2",
                  "blockNumber": "14836651"
              },
              "tick": "200496",
              "sqrtPriceX96": "1788087557669535154354397098767999"
          },
          {
              "id": "0x77a97a854066406a377a6f33f306eaa801ef0fdc33b6f534a61d873ddc5af374#346082",
              "timestamp": "1653407867",
              "amount0": "-105352.462868",
              "amount1": "53.815108614756819187",
              "transaction": {
                  "id": "0x77a97a854066406a377a6f33f306eaa801ef0fdc33b6f534a61d873ddc5af374",
                  "blockNumber": "14836651"
              },
              "tick": "200496",
              "sqrtPriceX96": "1788083623601224282957215566809820"
          },
          {
              "id": "0x7084e1b5026b93f56fd7199d0a12abfd810f52e03ef59fad5d02afa9f702d7e0#346084",
              "timestamp": "1653407910",
              "amount0": "-98278.844255",
              "amount1": "50.215863268194100954",
              "transaction": {
                  "id": "0x7084e1b5026b93f56fd7199d0a12abfd810f52e03ef59fad5d02afa9f702d7e0",
                  "blockNumber": "14836654"
              },
              "tick": "200499",
              "sqrtPriceX96": "1788324955931328297305487152600575"
          },
          {
              "id": "0xc05c2ae919a71c7f91c8c604800b8df858b60aa140373b1a22434a0aa4b12d32#346085",
              "timestamp": "1653407941",
              "amount0": "-212610.313428",
              "amount1": "108.6795",
              "transaction": {
                  "id": "0xc05c2ae919a71c7f91c8c604800b8df858b60aa140373b1a22434a0aa4b12d32",
                  "blockNumber": "14836658"
              },
              "tick": "200504",
              "sqrtPriceX96": "1788838744258629430830402887349475"
          },
          {
              "id": "0xe75fd021eaaee5883c4e755ba226fd87f6c7cd819df031ca5b0872f9fe9afeca#346086",
              "timestamp": "1653408004",
              "amount0": "-7804.065754",
              "amount1": "3.99037360811758576",
              "transaction": {
                  "id": "0xe75fd021eaaee5883c4e755ba226fd87f6c7cd819df031ca5b0872f9fe9afeca",
                  "blockNumber": "14836663"
              },
              "tick": "200505",
              "sqrtPriceX96": "1788857608969834592091513598662855"
          },
          {
              "id": "0x67bca643b2d631214871ec0b7fc17a5e1f95f1c866b6c3142af9c56e56f0d5d4#346087",
              "timestamp": "1653408674",
              "amount0": "24000",
              "amount1": "-12.197890638326637846",
              "transaction": {
                  "id": "0x67bca643b2d631214871ec0b7fc17a5e1f95f1c866b6c3142af9c56e56f0d5d4",
                  "blockNumber": "14836702"
              },
              "tick": "200504",
              "sqrtPriceX96": "1788799769250263953370909410227201"
          },
          {
              "id": "0xfa0c99b5cc8f813d26829b4a34e6079c2e6a25d67cca2bd3455cbcb45146cd6c#346088",
              "timestamp": "1653408708",
              "amount0": "320382.658524",
              "amount1": "-162.757510895948776451",
              "transaction": {
                  "id": "0xfa0c99b5cc8f813d26829b4a34e6079c2e6a25d67cca2bd3455cbcb45146cd6c",
                  "blockNumber": "14836703"
              },
              "tick": "200495",
              "sqrtPriceX96": "1788028008864197048291986496000000"
          },
          {
              "id": "0x1583ed429f40787cdb040c43cf47913ec35a5fa2f6f428c7e406399b383128de#346090",
              "timestamp": "1653408784",
              "amount0": "191704.881704",
              "amount1": "-97.320805819165400321",
              "transaction": {
                  "id": "0x1583ed429f40787cdb040c43cf47913ec35a5fa2f6f428c7e406399b383128de",
                  "blockNumber": "14836707"
              },
              "tick": "200490",
              "sqrtPriceX96": "1787566534968105344633109252318299"
          },
          {
              "id": "0x33ce3c09f7c516938c6e257248c45c206a93a8af0956d86f5744576a156b299c#346091",
              "timestamp": "1653408907",
              "amount0": "369203.187681",
              "amount1": "-187.288041941842742746",
              "transaction": {
                  "id": "0x33ce3c09f7c516938c6e257248c45c206a93a8af0956d86f5744576a156b299c",
                  "blockNumber": "14836716"
              },
              "tick": "200480",
              "sqrtPriceX96": "1786678456189073408285259818000000"
          },
          {
              "id": "0x83930ecf13a02663dec5cc28827f9ca844e8d8287c7e68d9432809f055c447f4#346092",
              "timestamp": "1653408924",
              "amount0": "404198.1",
              "amount1": "-204.826862172327723541",
              "transaction": {
                  "id": "0x83930ecf13a02663dec5cc28827f9ca844e8d8287c7e68d9432809f055c447f4",
                  "blockNumber": "14836717"
              },
              "tick": "200469",
              "sqrtPriceX96": "1785707212174853704914014157406208"
          },
          {
              "id": "0x367c38bf0107716c1e12a587ff96760e5627c2ff1edf8d552243aa6b07ce9eb5#346095",
              "timestamp": "1653409665",
              "amount0": "-1079.433463",
              "amount1": "0.55",
              "transaction": {
                  "id": "0x367c38bf0107716c1e12a587ff96760e5627c2ff1edf8d552243aa6b07ce9eb5",
                  "blockNumber": "14836774"
              },
              "tick": "200469",
              "sqrtPriceX96": "1785709812416455314571417688088497"
          },
          {
              "id": "0x2b1d4cfbd7079d8e7a0294ff458fe3c0362d31b558d932867928c79f26cda26b#346096",
              "timestamp": "1653409699",
              "amount0": "-47246.666347",
              "amount1": "24.075",
              "transaction": {
                  "id": "0x2b1d4cfbd7079d8e7a0294ff458fe3c0362d31b558d932867928c79f26cda26b",
                  "blockNumber": "14836776"
              },
              "tick": "200471",
              "sqrtPriceX96": "1785823632082925773665944962954157"
          },
          {
              "id": "0xfc7015bd8de7dfd00643031fc05d0d4a50f650909be4215961b3e7177ac85857#346097",
              "timestamp": "1653409799",
              "amount0": "-432350.715725",
              "amount1": "220.451152620285426926",
              "transaction": {
                  "id": "0xfc7015bd8de7dfd00643031fc05d0d4a50f650909be4215961b3e7177ac85857",
                  "blockNumber": "14836783"
              },
              "tick": "200482",
              "sqrtPriceX96": "1786865861643227711849394215000000"
          },
          {
              "id": "0x23f27f5c6e1524599b88365233663e86aa85490e8d2618df27d6a802a50e8164#346098",
              "timestamp": "1653409881",
              "amount0": "-266226.847776",
              "amount1": "135.874365003857468185",
              "transaction": {
                  "id": "0x23f27f5c6e1524599b88365233663e86aa85490e8d2618df27d6a802a50e8164",
                  "blockNumber": "14836787"
              },
              "tick": "200490",
              "sqrtPriceX96": "1787508236509546485534525073000000"
          },
          {
              "id": "0xedd8e7761793c4eb43b3f11a80314531c5293551ed9aec86796df31d1657b8a5#346099",
              "timestamp": "1653409881",
              "amount0": "-126899.176077",
              "amount1": "64.8",
              "transaction": {
                  "id": "0xedd8e7761793c4eb43b3f11a80314531c5293551ed9aec86796df31d1657b8a5",
                  "blockNumber": "14836787"
              },
              "tick": "200493",
              "sqrtPriceX96": "1787814592247336132443159233386077"
          },
          {
              "id": "0x4f23714e605f1a509817d140530492ba42e738f46ceb092a9bba7fca1a6733d8#346100",
              "timestamp": "1653409887",
              "amount0": "-167651.416031",
              "amount1": "85.643853963630395828",
              "transaction": {
                  "id": "0x4f23714e605f1a509817d140530492ba42e738f46ceb092a9bba7fca1a6733d8",
                  "blockNumber": "14836789"
              },
              "tick": "200498",
              "sqrtPriceX96": "1788219491723696884999255330000000"
          },
          {
              "id": "0xd97d00f28481b7b3f09fa82bcde79d5088b42aec922c45e42fcbce8ea361ed22#346101",
              "timestamp": "1653409922",
              "amount0": "-306113.06439",
              "amount1": "156.476389142551936043",
              "transaction": {
                  "id": "0xd97d00f28481b7b3f09fa82bcde79d5088b42aec922c45e42fcbce8ea361ed22",
                  "blockNumber": "14836790"
              },
              "tick": "200506",
              "sqrtPriceX96": "1788959267026820749094739450000000"
          },
          {
              "id": "0xfcf5c4457ef9cfbcc5498751404fa21b921dfa2d874f19a49c9d79558fd5dcbf#346102",
              "timestamp": "1653410118",
              "amount0": "-2282.123",
              "amount1": "1.167043290078307582",
              "transaction": {
                  "id": "0xfcf5c4457ef9cfbcc5498751404fa21b921dfa2d874f19a49c9d79558fd5dcbf",
                  "blockNumber": "14836795"
              },
              "tick": "200506",
              "sqrtPriceX96": "1788964784471391187317472259192102"
          },
          {
              "id": "0x4fb9e20b33faeeed7d6d4b06ab1f8150e059b6db823e26c9d3147bca53d664d2#346103",
              "timestamp": "1653410183",
              "amount0": "-551763.385315",
              "amount1": "282.375076923076968448",
              "transaction": {
                  "id": "0x4fb9e20b33faeeed7d6d4b06ab1f8150e059b6db823e26c9d3147bca53d664d2",
                  "blockNumber": "14836802"
              },
              "tick": "200521",
              "sqrtPriceX96": "1790312566432797846385425153601913"
          },
          {
              "id": "0x4aa9e37eed3b8da616366d82d1cdfc98eeb5919ba60bb223d53fd8b8a2da8757#346104",
              "timestamp": "1653410250",
              "amount0": "-21834.678057",
              "amount1": "11.183158116417711117",
              "transaction": {
                  "id": "0x4aa9e37eed3b8da616366d82d1cdfc98eeb5919ba60bb223d53fd8b8a2da8757",
                  "blockNumber": "14836805"
              },
              "tick": "200522",
              "sqrtPriceX96": "1790371427202746851636563999273280"
          },
          {
              "id": "0x0eaec49bf7ce4fd37f3da18c66040252276bb3a5dd383ff09e937eb4a92568f6#346105",
              "timestamp": "1653411059",
              "amount0": "-196664.07067",
              "amount1": "100.759406221005516445",
              "transaction": {
                  "id": "0x0eaec49bf7ce4fd37f3da18c66040252276bb3a5dd383ff09e937eb4a92568f6",
                  "blockNumber": "14836853"
              },
              "tick": "200527",
              "sqrtPriceX96": "1790901758274527563734691956000000"
          },
          {
              "id": "0x1f2365d778fdab20b29e188e84dc6e8789ac5c11bd0121ac11028e52380ec3db#346106",
              "timestamp": "1653411139",
              "amount0": "-243066.696495",
              "amount1": "124.615964869569098034",
              "transaction": {
                  "id": "0x1f2365d778fdab20b29e188e84dc6e8789ac5c11bd0121ac11028e52380ec3db",
                  "blockNumber": "14836854"
              },
              "tick": "200535",
              "sqrtPriceX96": "1791557654539589998239995201000000"
          },
          {
              "id": "0x392de5a7492eaeb36b7fc2b7838870f3edd106fab343dd4d382125a030d11f57#346107",
              "timestamp": "1653411187",
              "amount0": "-2262.804",
              "amount1": "1.160528126380333083",
              "transaction": {
                  "id": "0x392de5a7492eaeb36b7fc2b7838870f3edd106fab343dd4d382125a030d11f57",
                  "blockNumber": "14836857"
              },
              "tick": "200535",
              "sqrtPriceX96": "1791563762794374122173216320268423"
          },
          {
              "id": "0xa5788f6f806f7dbd4b51af921c0f95c4867f7dd669f5da25f48c0105bf534260#346108",
              "timestamp": "1653411217",
              "amount0": "-62641.120811",
              "amount1": "32.13",
              "transaction": {
                  "id": "0xa5788f6f806f7dbd4b51af921c0f95c4867f7dd669f5da25f48c0105bf534260",
                  "blockNumber": "14836858"
              },
              "tick": "200537",
              "sqrtPriceX96": "1791732873927273613327918743229090"
          },
          {
              "id": "0x782001eceb0914a47db2c91ae786ec3f0e4edd62debd00f943c962a82565969b#346109",
              "timestamp": "1653411790",
              "amount0": "-358198.490736",
              "amount1": "183.844410256409386209",
              "transaction": {
                  "id": "0x782001eceb0914a47db2c91ae786ec3f0e4edd62debd00f943c962a82565969b",
                  "blockNumber": "14836900"
              },
              "tick": "200548",
              "sqrtPriceX96": "1792700509672549063761289810018304"
          },
          {
              "id": "0x65ae6751af8dad51a749c87e677543c198c77a3008d8ea3b83f7245c8bb6fc56#346110",
              "timestamp": "1653411799",
              "amount0": "-430565.368083",
              "amount1": "221.249487179487215616",
              "transaction": {
                  "id": "0x65ae6751af8dad51a749c87e677543c198c77a3008d8ea3b83f7245c8bb6fc56",
                  "blockNumber": "14836901"
              },
              "tick": "200561",
              "sqrtPriceX96": "1793865021077166384860347386601142"
          },
          {
              "id": "0x5f66811f96e7ee55d537d46a760dc96c12c26c71846667b2ed65f8b688d92c5a#346111",
              "timestamp": "1653411861",
              "amount0": "-420",
              "amount1": "0.215960718107361981",
              "transaction": {
                  "id": "0x5f66811f96e7ee55d537d46a760dc96c12c26c71846667b2ed65f8b688d92c5a",
                  "blockNumber": "14836906"
              },
              "tick": "200561",
              "sqrtPriceX96": "1793866157751978116066006353398429"
          },
          {
              "id": "0x88f9d3cf3da5e98d2c7b61c5e6766da28b540af5e629765e6392cfc0f77ee15f#346113",
              "timestamp": "1653411889",
              "amount0": "-583413.449924",
              "amount1": "300",
              "transaction": {
                  "id": "0x88f9d3cf3da5e98d2c7b61c5e6766da28b540af5e629765e6392cfc0f77ee15f",
                  "blockNumber": "14836908"
              },
              "tick": "200561",
              "sqrtPriceX96": "1793944928521439454459507229153356"
          },
          {
              "id": "0xabdc275425099f333557f7fc6f6e080cb53a5eb5e08de036651a8e9929b630b4#346115",
              "timestamp": "1653411931",
              "amount0": "-2656.54935",
              "amount1": "1.366103224511680683",
              "transaction": {
                  "id": "0xabdc275425099f333557f7fc6f6e080cb53a5eb5e08de036651a8e9929b630b4",
                  "blockNumber": "14836911"
              },
              "tick": "200562",
              "sqrtPriceX96": "1793952118787980220666610312550752"
          },
          {
              "id": "0x09f8426e4dba43ad9156be75c32cff8d394d6ec077f423e7fdb92244ec6ad2a9#346116",
              "timestamp": "1653411964",
              "amount0": "-328476.307876",
              "amount1": "169",
              "transaction": {
                  "id": "0x09f8426e4dba43ad9156be75c32cff8d394d6ec077f423e7fdb92244ec6ad2a9",
                  "blockNumber": "14836913"
              },
              "tick": "200571",
              "sqrtPriceX96": "1794841623346337332560314311316791"
          },
          {
              "id": "0x6bcd6afcf1c9a72cfb282a75a248fc9407699e09df314b18a33c3a2e99f4d4a1#346117",
              "timestamp": "1653411964",
              "amount0": "-425",
              "amount1": "0.218769688222564534",
              "transaction": {
                  "id": "0x6bcd6afcf1c9a72cfb282a75a248fc9407699e09df314b18a33c3a2e99f4d4a1",
                  "blockNumber": "14836913"
              },
              "tick": "200571",
              "sqrtPriceX96": "1794842774805715464722020110350452"
          },
          {
              "id": "0x8f13c770a375d19c5e9758f269a0ae1658e4676fbf48313e90f4ff541735a21a#346119",
              "timestamp": "1653412925",
              "amount0": "-292292.487034",
              "amount1": "150.524793814433038336",
              "transaction": {
                  "id": "0x8f13c770a375d19c5e9758f269a0ae1658e4676fbf48313e90f4ff541735a21a",
                  "blockNumber": "14836973"
              },
              "tick": "200580",
              "sqrtPriceX96": "1795645921596118104515562483506364"
          },
          {
              "id": "0x92839bbaefab0f60c76d1d9c039c616c60ddd4815f43d657b35e6a9368848683#346120",
              "timestamp": "1653412932",
              "amount0": "-303277.785902",
              "amount1": "156.335515463879285598",
              "transaction": {
                  "id": "0x92839bbaefab0f60c76d1d9c039c616c60ddd4815f43d657b35e6a9368848683",
                  "blockNumber": "14836975"
              },
              "tick": "200591",
              "sqrtPriceX96": "1796597005252384273793408768671744"
          },
          {
              "id": "0xcbb36fb41a81e45a039f247cc64c4810556899f8c159fbf6f528f8a0e677728c#346121",
              "timestamp": "1653412936",
              "amount0": "-8530.985206",
              "amount1": "4.4",
              "transaction": {
                  "id": "0xcbb36fb41a81e45a039f247cc64c4810556899f8c159fbf6f528f8a0e677728c",
                  "blockNumber": "14836976"
              },
              "tick": "200591",
              "sqrtPriceX96": "1796623773118119414566689462397262"
          },
          {
              "id": "0x1ba74ed2975948878bef6b0b681e71ca6d53783dcf4918f36404494541bf44b0#346122",
              "timestamp": "1653412956",
              "amount0": "-315241.630168",
              "amount1": "162.683195876288692224",
              "transaction": {
                  "id": "0x1ba74ed2975948878bef6b0b681e71ca6d53783dcf4918f36404494541bf44b0",
                  "blockNumber": "14836978"
              },
              "tick": "200602",
              "sqrtPriceX96": "1797613473560069437937312009984466"
          },
          {
              "id": "0x8e49bd6dfb6badadbae0fe2297e616cc6ee0a8c933a04b0cda6bcfa0d0222e11#346123",
              "timestamp": "1653412967",
              "amount0": "-626345.780434",
              "amount1": "323.763626943005196288",
              "transaction": {
                  "id": "0x8e49bd6dfb6badadbae0fe2297e616cc6ee0a8c933a04b0cda6bcfa0d0222e11",
                  "blockNumber": "14836980"
              },
              "tick": "200624",
              "sqrtPriceX96": "1799583123854599567223579037100905"
          },
          {
              "id": "0xfd0780ef6f19a0cbc48e60c028cfdcbcde1ddd4addebd215c890fc51fb5cc9ac#346124",
              "timestamp": "1653412967",
              "amount0": "-147118.952452",
              "amount1": "76.15",
              "transaction": {
                  "id": "0xfd0780ef6f19a0cbc48e60c028cfdcbcde1ddd4addebd215c890fc51fb5cc9ac",
                  "blockNumber": "14836980"
              },
              "tick": "200629",
              "sqrtPriceX96": "1800046390439992969470243770555050"
          },
          {
              "id": "0xf3eed50b6108b500dba8d8231fbdbd98326aaac8296646a5487774e4b3d3c4a0#346125",
              "timestamp": "1653413722",
              "amount0": "-4551.169368",
              "amount1": "2.356348520738513696",
              "transaction": {
                  "id": "0xf3eed50b6108b500dba8d8231fbdbd98326aaac8296646a5487774e4b3d3c4a0",
                  "blockNumber": "14837023"
              },
              "tick": "200630",
              "sqrtPriceX96": "1800060725535635770858549503060380"
          },
          {
              "id": "0x4dd5968ca060ce877560211e1021560969f1e383c52a2bc990921d052e033e75#346126",
              "timestamp": "1653413916",
              "amount0": "379817.9",
              "amount1": "-195.343090781704078068",
              "transaction": {
                  "id": "0x4dd5968ca060ce877560211e1021560969f1e383c52a2bc990921d052e033e75",
                  "blockNumber": "14837035"
              },
              "tick": "200616",
              "sqrtPriceX96": "1798868759267209567237690936524800"
          },
          {
              "id": "0x740784f23d947eca981fb04a8aa25a43c5f352ac01f2fe28a4e030275be37478#346127",
              "timestamp": "1653413970",
              "amount0": "85137.13852",
              "amount1": "-43.751156940619371727",
              "transaction": {
                  "id": "0x740784f23d947eca981fb04a8aa25a43c5f352ac01f2fe28a4e030275be37478",
                  "blockNumber": "14837039"
              },
              "tick": "200613",
              "sqrtPriceX96": "1798601793575875662864561056983368"
          },
          {
              "id": "0x0db7600a3f5447c0cd7372cae793b631ac488445b427e2c21f831fa04ede77e5#346129",
              "timestamp": "1653414052",
              "amount0": "200",
              "amount1": "-0.102587839043923416",
              "transaction": {
                  "id": "0x0db7600a3f5447c0cd7372cae793b631ac488445b427e2c21f831fa04ede77e5",
                  "blockNumber": "14837040"
              },
              "tick": "200596",
              "sqrtPriceX96": "1797069494261226191418574425281652"
          },
          {
              "id": "0xa11a9c59a0bb311121d184daf14d7aea2ec812f1d3e6b66b2c690eeac2375dd5#346130",
              "timestamp": "1653414052",
              "amount0": "250",
              "amount1": "-0.128234698300523373",
              "transaction": {
                  "id": "0xa11a9c59a0bb311121d184daf14d7aea2ec812f1d3e6b66b2c690eeac2375dd5",
                  "blockNumber": "14837040"
              },
              "tick": "200596",
              "sqrtPriceX96": "1797068711784435206031877147436363"
          },
          {
              "id": "0xc64be3d4d761c5b8c3cba736d7d39fd0c43f1efc4f0edab231ee9fa411981749#346128",
              "timestamp": "1653414052",
              "amount0": "488949.72299",
              "amount1": "-251.015327201893524953",
              "transaction": {
                  "id": "0xc64be3d4d761c5b8c3cba736d7d39fd0c43f1efc4f0edab231ee9fa411981749",
                  "blockNumber": "14837040"
              },
              "tick": "200596",
              "sqrtPriceX96": "1797070120243149594804737404000000"
          },
          {
              "id": "0x45b0ac84bcb87293f0950a2476ac548919f6c4a66e0467462ad61930540c369d#346131",
              "timestamp": "1653414079",
              "amount0": "50000",
              "amount1": "-25.644695259474420694",
              "transaction": {
                  "id": "0x45b0ac84bcb87293f0950a2476ac548919f6c4a66e0467462ad61930540c369d",
                  "blockNumber": "14837042"
              },
              "tick": "200594",
              "sqrtPriceX96": "1796912230121372332783109550144416"
          },
          {
              "id": "0x38e0b9d0a5684264a52eea541dd693a5eb4778ae46c3fd485663d2567ec7a175#346132",
              "timestamp": "1653414354",
              "amount0": "99642.196",
              "amount1": "-51.092558889362956372",
              "transaction": {
                  "id": "0x38e0b9d0a5684264a52eea541dd693a5eb4778ae46c3fd485663d2567ec7a175",
                  "blockNumber": "14837069"
              },
              "tick": "200591",
              "sqrtPriceX96": "1796600467844447184428270675288417"
          },
          {
              "id": "0x4d77b8c1687bb522d4961c852d765954d024df7e72a7cf0dd2e3fa9c1460fbdd#346134",
              "timestamp": "1653414382",
              "amount0": "81802.566798",
              "amount1": "-41.931855837628813442",
              "transaction": {
                  "id": "0x4d77b8c1687bb522d4961c852d765954d024df7e72a7cf0dd2e3fa9c1460fbdd",
                  "blockNumber": "14837071"
              },
              "tick": "200588",
              "sqrtPriceX96": "1796344603367587759124197056160190"
          },
          {
              "id": "0x76ccbde7a307bb777f9e97473c155b3abace29daaaca9bb5fe47383b9d882316#346135",
              "timestamp": "1653414382",
              "amount0": "58867.024759",
              "amount1": "-30.167747029297417932",
              "transaction": {
                  "id": "0x76ccbde7a307bb777f9e97473c155b3abace29daaaca9bb5fe47383b9d882316",
                  "blockNumber": "14837071"
              },
              "tick": "200586",
              "sqrtPriceX96": "1796160522442537169809132931329704"
          },
          {
              "id": "0x45c8dbf9f826831a34f66aa3ee8684b7b91b9f784607fd11bd255f4f1a5e613b#346137",
              "timestamp": "1653414925",
              "amount0": "983410.2",
              "amount1": "-503.151052272055744524",
              "transaction": {
                  "id": "0x45c8dbf9f826831a34f66aa3ee8684b7b91b9f784607fd11bd255f4f1a5e613b",
                  "blockNumber": "14837116"
              },
              "tick": "200557",
              "sqrtPriceX96": "1793501898038607610949443333336617"
          },
          {
              "id": "0xd06120457090e947222ccbfe2cc9fe8f5989e8e9246ef15ec294d9f702902c3a#346138",
              "timestamp": "1653414925",
              "amount0": "17349.983982",
              "amount1": "-8.863960885769654248",
              "transaction": {
                  "id": "0xd06120457090e947222ccbfe2cc9fe8f5989e8e9246ef15ec294d9f702902c3a",
                  "blockNumber": "14837116"
              },
              "tick": "200556",
              "sqrtPriceX96": "1793456805379961628028327399172580"
          },
          {
              "id": "0xedd0e555683dc0ca5825a9b66da05b083a9ed8ee70648bda366b588e83f9c5d3#346139",
              "timestamp": "1653415008",
              "amount0": "404586.9",
              "amount1": "-206.573734028995327619",
              "transaction": {
                  "id": "0xedd0e555683dc0ca5825a9b66da05b083a9ed8ee70648bda366b588e83f9c5d3",
                  "blockNumber": "14837119"
              },
              "tick": "200544",
              "sqrtPriceX96": "1792405925418527012751555825224217"
          },
          {
              "id": "0xeb6c37b059922721c34f19b78f0dcc5046562e6580cbf5e97861aa7a3aebdefb#346140",
              "timestamp": "1653415163",
              "amount0": "228968",
              "amount1": "-116.799109513560107722",
              "transaction": {
                  "id": "0xeb6c37b059922721c34f19b78f0dcc5046562e6580cbf5e97861aa7a3aebdefb",
                  "blockNumber": "14837128"
              },
              "tick": "200538",
              "sqrtPriceX96": "1791811746084556223281152059381264"
          },
          {
              "id": "0xf426a59b48d955f861366631af94af07213a338e97744840d0c97b5df58e025a#346143",
              "timestamp": "1653415667",
              "amount0": "569291.4",
              "amount1": "-290.0695078033858221",
              "transaction": {
                  "id": "0xf426a59b48d955f861366631af94af07213a338e97744840d0c97b5df58e025a",
                  "blockNumber": "14837166"
              },
              "tick": "200521",
              "sqrtPriceX96": "1790354716768658365649039719923712"
          },
          {
              "id": "0xa2555411b4ebc1242c530ba9f87fa67402c0c9d79705f00fbb9f84a92b507090#346144",
              "timestamp": "1653415766",
              "amount0": "633918.6",
              "amount1": "-322.467026426268085096",
              "transaction": {
                  "id": "0xa2555411b4ebc1242c530ba9f87fa67402c0c9d79705f00fbb9f84a92b507090",
                  "blockNumber": "14837167"
              },
              "tick": "200505",
              "sqrtPriceX96": "1788876235531978309425225107338907"
          },
          {
              "id": "0xace5e75eb2f4b58735706d749c1bea27aa0507437c812eb0969f96aeb2576036#346145",
              "timestamp": "1653415874",
              "amount0": "647850.490419",
              "amount1": "-329.00996040356150607",
              "transaction": {
                  "id": "0xace5e75eb2f4b58735706d749c1bea27aa0507437c812eb0969f96aeb2576036",
                  "blockNumber": "14837173"
              },
              "tick": "200488",
              "sqrtPriceX96": "1787384422165260423324365541606314"
          },
          {
              "id": "0xbb288ae40e5597d1ed0b36c9d6dce22a232ee0b24b1a4b99d4749bfc8c0fb3e9#346146",
              "timestamp": "1653417065",
              "amount0": "-69911.157655",
              "amount1": "35.691706047375",
              "transaction": {
                  "id": "0xbb288ae40e5597d1ed0b36c9d6dce22a232ee0b24b1a4b99d4749bfc8c0fb3e9",
                  "blockNumber": "14837246"
              },
              "tick": "200490",
              "sqrtPriceX96": "1787545771773049919497297741325257"
          },
          {
              "id": "0x31d67dca9e8490f38fbb4c698a416858369d86cf58d65fd141052f6fd642c91d#346148",
              "timestamp": "1653417197",
              "amount0": "-783.428804",
              "amount1": "0.4",
              "transaction": {
                  "id": "0x31d67dca9e8490f38fbb4c698a416858369d86cf58d65fd141052f6fd642c91d",
                  "blockNumber": "14837256"
              },
              "tick": "200490",
              "sqrtPriceX96": "1787547580031893868626724078914191"
          },
          {
              "id": "0x4d16c5f9ad84c9a3d2921fbcb6e87d43acc73a97fe2b30abe7ce76ae576ca6f8#346149",
              "timestamp": "1653417698",
              "amount0": "-304236.44871",
              "amount1": "155.397053436",
              "transaction": {
                  "id": "0x4d16c5f9ad84c9a3d2921fbcb6e87d43acc73a97fe2b30abe7ce76ae576ca6f8",
                  "blockNumber": "14837288"
              },
              "tick": "200498",
              "sqrtPriceX96": "1788250075272392074753549734747826"
          },
          {
              "id": "0x2f7e1918517cf285f80118771209abdeae12a0614e283a7870cb9ae64a09770c#346150",
              "timestamp": "1653417835",
              "amount0": "-430543.497729",
              "amount1": "220.120663265306181632",
              "transaction": {
                  "id": "0x2f7e1918517cf285f80118771209abdeae12a0614e283a7870cb9ae64a09770c",
                  "blockNumber": "14837292"
              },
              "tick": "200509",
              "sqrtPriceX96": "1789245163112605670145770957720516"
          },
          {
              "id": "0xc4dcb30cba02b824f7f8539b57a6f0e3d38d65414d4897f6afa30b4450b2dcfe#346151",
              "timestamp": "1653417849",
              "amount0": "-166925.327558",
              "amount1": "85.408544628",
              "transaction": {
                  "id": "0xc4dcb30cba02b824f7f8539b57a6f0e3d38d65414d4897f6afa30b4450b2dcfe",
                  "blockNumber": "14837295"
              },
              "tick": "200513",
              "sqrtPriceX96": "1789631265003036682416698712728314"
          },
          {
              "id": "0xf06c727d650641167ec5f017344bc6df09758d30595e6104aa918641a9ae2ae7#346152",
              "timestamp": "1653417854",
              "amount0": "-262697.933655",
              "amount1": "134.486000000000016384",
              "transaction": {
                  "id": "0xf06c727d650641167ec5f017344bc6df09758d30595e6104aa918641a9ae2ae7",
                  "blockNumber": "14837297"
              },
              "tick": "200520",
              "sqrtPriceX96": "1790244875391354575881692851821628"
          },
          {
              "id": "0x278e15862f271a7540f0e5275911d03ebfd918e1f85c790ddeb4b02f6b8631f9#346154",
              "timestamp": "1653417878",
              "amount0": "-528696.063253",
              "amount1": "270.959588986678728598",
              "transaction": {
                  "id": "0x278e15862f271a7540f0e5275911d03ebfd918e1f85c790ddeb4b02f6b8631f9",
                  "blockNumber": "14837298"
              },
              "tick": "200535",
              "sqrtPriceX96": "1791597034171893140510944053000000"
          },
          {
              "id": "0x07d07106aadc42565034ae76266cb63399f98cbd004e23c519a4905cc453a2c2#346155",
              "timestamp": "1653417926",
              "amount0": "-2071.106",
              "amount1": "1.062257865912069189",
              "transaction": {
                  "id": "0x07d07106aadc42565034ae76266cb63399f98cbd004e23c519a4905cc453a2c2",
                  "blockNumber": "14837299"
              },
              "tick": "200535",
              "sqrtPriceX96": "1791602335114760527931115189853385"
          },
          {
              "id": "0x5132ceea837ce9e8a26536d8e70a57ca95462a213a3968cb42180fc1b6fce0fe#346156",
              "timestamp": "1653417965",
              "amount0": "-545.919715",
              "amount1": "0.28",
              "transaction": {
                  "id": "0x5132ceea837ce9e8a26536d8e70a57ca95462a213a3968cb42180fc1b6fce0fe",
                  "blockNumber": "14837300"
              },
              "tick": "200535",
              "sqrtPriceX96": "1791603732387541929336127416308578"
          },
          {
              "id": "0xa97f92ecb716615f1e69e2b7aadc396e84e83e50ef827ad5aa258938c10f5f8f#346157",
              "timestamp": "1653418065",
              "amount0": "-213173.237347",
              "amount1": "109.36907821875",
              "transaction": {
                  "id": "0xa97f92ecb716615f1e69e2b7aadc396e84e83e50ef827ad5aa258938c10f5f8f",
                  "blockNumber": "14837304"
              },
              "tick": "200541",
              "sqrtPriceX96": "1792149512516549145889782214444890"
          },
          {
              "id": "0x2ab4725189012296231cc52407de93866888fff07fe5d652f27aff66e01be28e#346158",
              "timestamp": "1653418067",
              "amount0": "-148035.638982",
              "amount1": "75.989277915",
              "transaction": {
                  "id": "0x2ab4725189012296231cc52407de93866888fff07fe5d652f27aff66e01be28e",
                  "blockNumber": "14837305"
              },
              "tick": "200546",
              "sqrtPriceX96": "1792528718765509775920659179004279"
          },
          {
              "id": "0x38a263fa840778fce8770612b6e166f8821869dfdea1a794ba52e8ae212c6935#346159",
              "timestamp": "1653418094",
              "amount0": "-156517.78403",
              "amount1": "80.378293107749993703",
              "transaction": {
                  "id": "0x38a263fa840778fce8770612b6e166f8821869dfdea1a794ba52e8ae212c6935",
                  "blockNumber": "14837309"
              },
              "tick": "200550",
              "sqrtPriceX96": "1792929827341134644549518223887479"
          },
          {
              "id": "0x6a4960bd9c37ae629ee9e67b55fc4e4e8de8d2a03a5ca421e8586cab36d8e5b7#346160",
              "timestamp": "1653418128",
              "amount0": "-354264.748541",
              "amount1": "182.062379420127487346",
              "transaction": {
                  "id": "0x6a4960bd9c37ae629ee9e67b55fc4e4e8de8d2a03a5ca421e8586cab36d8e5b7",
                  "blockNumber": "14837310"
              },
              "tick": "200560",
              "sqrtPriceX96": "1793838365938566499739709064000000"
          },
          {
              "id": "0xbecb45ccfd6c59b1f9e38b4bc768cdb4a95d8042a1023001696b1be3eedeacdd#346161",
              "timestamp": "1653418128",
              "amount0": "-99951.36586",
              "amount1": "51.4",
              "transaction": {
                  "id": "0xbecb45ccfd6c59b1f9e38b4bc768cdb4a95d8042a1023001696b1be3eedeacdd",
                  "blockNumber": "14837310"
              },
              "tick": "200563",
              "sqrtPriceX96": "1794094865299152329088382063274842"
          },
          {
              "id": "0x610fc82086994b8f8e1aea980ae8c67c51451d9ab5de821202086f8bc5027af0#346163",
              "timestamp": "1653418170",
              "amount0": "-194209.298098",
              "amount1": "100.031457005128980399",
              "transaction": {
                  "id": "0x610fc82086994b8f8e1aea980ae8c67c51451d9ab5de821202086f8bc5027af0",
                  "blockNumber": "14837311"
              },
              "tick": "200581",
              "sqrtPriceX96": "1795660817252783450850330728000000"
          },
          {
              "id": "0x7640dea6d38a2435f55334d70e3ec2676e22791097a899411d0e6e02a5e6b719#346162",
              "timestamp": "1653418170",
              "amount0": "-409298.560944",
              "amount1": "210.635257731958767616",
              "transaction": {
                  "id": "0x7640dea6d38a2435f55334d70e3ec2676e22791097a899411d0e6e02a5e6b719",
                  "blockNumber": "14837311"
              },
              "tick": "200575",
              "sqrtPriceX96": "1795145989986410671331271875723224"
          },
          {
              "id": "0x5abd8893cc3097caab381b76f81cdb0f8ce20b2d1dca66dcf56c403b50974585#346164",
              "timestamp": "1653418542",
              "amount0": "-287252.925547",
              "amount1": "148.07180412367808881",
              "transaction": {
                  "id": "0x5abd8893cc3097caab381b76f81cdb0f8ce20b2d1dca66dcf56c403b50974585",
                  "blockNumber": "14837331"
              },
              "tick": "200590",
              "sqrtPriceX96": "1796544285180641137522134524887040"
          },
          {
              "id": "0x5df6f1e76de3cad412a886de1f227f87a4873b5e698d6d76b694d6803890277b#346165",
              "timestamp": "1653418645",
              "amount0": "-10000",
              "amount1": "5.157378043699655751",
              "transaction": {
                  "id": "0x5df6f1e76de3cad412a886de1f227f87a4873b5e698d6d76b694d6803890277b",
                  "blockNumber": "14837338"
              },
              "tick": "200591",
              "sqrtPriceX96": "1796575056589961174681881761821402"
          },
          {
              "id": "0x1fec79729a2c5473dd1856cc2751850a1650975578ac1eebd2c5cb5094c7d15c#346166",
              "timestamp": "1653418670",
              "amount0": "-90146.627788",
              "amount1": "46.5",
              "transaction": {
                  "id": "0x1fec79729a2c5473dd1856cc2751850a1650975578ac1eebd2c5cb5094c7d15c",
                  "blockNumber": "14837340"
              },
              "tick": "200594",
              "sqrtPriceX96": "1796852498057555295435422226538553"
          },
          {
              "id": "0xe528b1bc2173e489d0b14e6f27c74fc86f250bc738457ee03c662cd3886cf54a#346167",
              "timestamp": "1653418769",
              "amount0": "-2481.061868",
              "amount1": "1.28",
              "transaction": {
                  "id": "0xe528b1bc2173e489d0b14e6f27c74fc86f250bc738457ee03c662cd3886cf54a",
                  "blockNumber": "14837347"
              },
              "tick": "200594",
              "sqrtPriceX96": "1796860135156018101340035813524315"
          },
          {
              "id": "0x3fa91ef8d558614e855f7de3332e8c7dc4fe0f5a5dc66aa8fee4653dc899095b#346168",
              "timestamp": "1653419174",
              "amount0": "176",
              "amount1": "-0.090256206352021338",
              "transaction": {
                  "id": "0x3fa91ef8d558614e855f7de3332e8c7dc4fe0f5a5dc66aa8fee4653dc899095b",
                  "blockNumber": "14837386"
              },
              "tick": "200594",
              "sqrtPriceX96": "1796859595023483944404629053235721"
          },
          {
              "id": "0x563686fd9d5b338d6eb9d1a7eb396e595423fef5a1c9e3baec97be258187c168#346169",
              "timestamp": "1653419257",
              "amount0": "63716.037797",
              "amount1": "-32.671252141937501633",
              "transaction": {
                  "id": "0x563686fd9d5b338d6eb9d1a7eb396e595423fef5a1c9e3baec97be258187c168",
                  "blockNumber": "14837391"
              },
              "tick": "200592",
              "sqrtPriceX96": "1796664075990203528929879257368794"
          },
          {
              "id": "0x9b1f4a7ee1e7ad437242d1dd43a9ee764e00756f242444d4f06d6ced775252a9#346170",
              "timestamp": "1653419331",
              "amount0": "100000",
              "amount1": "-51.262006185084397829",
              "transaction": {
                  "id": "0x9b1f4a7ee1e7ad437242d1dd43a9ee764e00756f242444d4f06d6ced775252a9",
                  "blockNumber": "14837395"
              },
              "tick": "200588",
              "sqrtPriceX96": "1796357301770171201612545002326966"
          },
          {
              "id": "0xa7f353b2e820ec60502e29f61bb8e342ea61081699a7e8737e3161bb3c14462f#346171",
              "timestamp": "1653419348",
              "amount0": "120.391536",
              "amount1": "-0.061704566100664155",
              "transaction": {
                  "id": "0xa7f353b2e820ec60502e29f61bb8e342ea61081699a7e8737e3161bb3c14462f",
                  "blockNumber": "14837396"
              },
              "tick": "200588",
              "sqrtPriceX96": "1796356932503114629170567252122672"
          },
          {
              "id": "0x8aec3b2646f0a35c6aaa74ddd17d6762b2e5084cbfc120f57768b50b251d43c1#346172",
              "timestamp": "1653420309",
              "amount0": "283703.2",
              "amount1": "-145.33674982939628096",
              "transaction": {
                  "id": "0x8aec3b2646f0a35c6aaa74ddd17d6762b2e5084cbfc120f57768b50b251d43c1",
                  "blockNumber": "14837465"
              },
              "tick": "200579",
              "sqrtPriceX96": "1795499940806363246348523301825549"
          },
          {
              "id": "0xa6481b6575af28db7caf6d0b45a185773c7a545a132ffc52325eb1d70671c6ae#346173",
              "timestamp": "1653420389",
              "amount0": "92519.555622",
              "amount1": "-47.367773193839607085",
              "transaction": {
                  "id": "0xa6481b6575af28db7caf6d0b45a185773c7a545a132ffc52325eb1d70671c6ae",
                  "blockNumber": "14837469"
              },
              "tick": "200576",
              "sqrtPriceX96": "1795262852039350253149503025729063"
          },
          {
              "id": "0xa5ec2f25848b25f87fc15149c19bffa30108042337c0ca89231ff005fc24fbb4#346174",
              "timestamp": "1653420394",
              "amount0": "923203.6",
              "amount1": "-471.973604994761125909",
              "transaction": {
                  "id": "0xa5ec2f25848b25f87fc15149c19bffa30108042337c0ca89231ff005fc24fbb4",
                  "blockNumber": "14837470"
              },
              "tick": "200550",
              "sqrtPriceX96": "1792900493994504723920695854445121"
          },
          {
              "id": "0x97d5e0d7444dab06cb0cd2b68682c73d194ac15045f13af17734f84efff2fa70#346175",
              "timestamp": "1653420420",
              "amount0": "994.374737",
              "amount1": "-0.507689090128572861",
              "transaction": {
                  "id": "0x97d5e0d7444dab06cb0cd2b68682c73d194ac15045f13af17734f84efff2fa70",
                  "blockNumber": "14837471"
              },
              "tick": "200550",
              "sqrtPriceX96": "1792897952870607850802788661127311"
          },
          {
              "id": "0x5d7f2cfe553a1b84590040500bafefe25d700e4b3c6ba5e8b748e98bcad03754#346176",
              "timestamp": "1653420433",
              "amount0": "293315.4",
              "amount1": "-149.692647374295494412",
              "transaction": {
                  "id": "0x5d7f2cfe553a1b84590040500bafefe25d700e4b3c6ba5e8b748e98bcad03754",
                  "blockNumber": "14837473"
              },
              "tick": "200541",
              "sqrtPriceX96": "1792148699891126472409238069111436"
          },
          {
              "id": "0xcec070059bd40432dbebe900cf7a867603bd47ce488dfa59aafbb0ee3ceebf81#346178",
              "timestamp": "1653420957",
              "amount0": "345460.435827",
              "amount1": "-176.144337246945699655",
              "transaction": {
                  "id": "0xcec070059bd40432dbebe900cf7a867603bd47ce488dfa59aafbb0ee3ceebf81",
                  "blockNumber": "14837513"
              },
              "tick": "200532",
              "sqrtPriceX96": "1791267048909491757832077710000000"
          },
          {
              "id": "0x40f8da92ee251260fc28080061e5f0bdd3076aa3a6f41925afc65412b92eaac9#346179",
              "timestamp": "1653420970",
              "amount0": "66344.468612",
              "amount1": "-33.808068175966611064",
              "transaction": {
                  "id": "0x40f8da92ee251260fc28080061e5f0bdd3076aa3a6f41925afc65412b92eaac9",
                  "blockNumber": "14837515"
              },
              "tick": "200530",
              "sqrtPriceX96": "1791097830205329122812647363407827"
          },
          {
              "id": "0x934b5cacc13d5c88f99e9ed0ccc4f860f2a3bd72b5bf744594002a82216015be#346180",
              "timestamp": "1653421042",
              "amount0": "320176.8",
              "amount1": "-163.067162713036283613",
              "transaction": {
                  "id": "0x934b5cacc13d5c88f99e9ed0ccc4f860f2a3bd72b5bf744594002a82216015be",
                  "blockNumber": "14837523"
              },
              "tick": "200521",
              "sqrtPriceX96": "1790281634088409507934438101614592"
          },
          {
              "id": "0x08b8bd372a495d577e5649ed8650c8002773964e1f485c79c820fa5e688f91e7#346182",
              "timestamp": "1653421061",
              "amount0": "500",
              "amount1": "-0.254321290301252002",
              "transaction": {
                  "id": "0x08b8bd372a495d577e5649ed8650c8002773964e1f485c79c820fa5e688f91e7",
                  "blockNumber": "14837526"
              },
              "tick": "200512",
              "sqrtPriceX96": "1789526863092020845115170148977326"
          },
          {
              "id": "0xc2ab84765478ed8a863f41302789eec638d8e471faabddf901ac90e5330d8b89#346181",
              "timestamp": "1653421061",
              "amount0": "323676.95499",
              "amount1": "-164.704571711096968572",
              "transaction": {
                  "id": "0xc2ab84765478ed8a863f41302789eec638d8e471faabddf901ac90e5330d8b89",
                  "blockNumber": "14837526"
              },
              "tick": "200512",
              "sqrtPriceX96": "1789528012566690912210161705000000"
          },
          {
              "id": "0xef643687ed72d4ed99faa3d4b37e587d5621f7e082f25285f08d2853bf67cf29#346183",
              "timestamp": "1653421101",
              "amount0": "58172.075748",
              "amount1": "-29.586564663866639049",
              "transaction": {
                  "id": "0xef643687ed72d4ed99faa3d4b37e587d5621f7e082f25285f08d2853bf67cf29",
                  "blockNumber": "14837528"
              },
              "tick": "200511",
              "sqrtPriceX96": "1789393138516248474347933175809172"
          },
          {
              "id": "0x286882403fa495326ba18fa1acc5546cc28ec3b70416659feb41291e614f6a66#346184",
              "timestamp": "1653421146",
              "amount0": "1966.317168",
              "amount1": "-1",
              "transaction": {
                  "id": "0x286882403fa495326ba18fa1acc5546cc28ec3b70416659feb41291e614f6a66",
                  "blockNumber": "14837532"
              },
              "tick": "200511",
              "sqrtPriceX96": "1789388618742584596250573331757793"
          },
          {
              "id": "0x8603ffbf592af5e34c9b11aad82d4c7e0bfc29be4ee320dd5ed9f64f15756204#346185",
              "timestamp": "1653421162",
              "amount0": "287312.125945",
              "amount1": "-146.062601494352320009",
              "transaction": {
                  "id": "0x8603ffbf592af5e34c9b11aad82d4c7e0bfc29be4ee320dd5ed9f64f15756204",
                  "blockNumber": "14837534"
              },
              "tick": "200503",
              "sqrtPriceX96": "1788728448843072901006608320000000"
          },
          {
              "id": "0x1e8db77321108491162c32a8e5bd13a0f3434f38ecb83b676dfb8cc4c11cba90#346186",
              "timestamp": "1653421184",
              "amount0": "2000",
              "amount1": "-1.016374357913883085",
              "transaction": {
                  "id": "0x1e8db77321108491162c32a8e5bd13a0f3434f38ecb83b676dfb8cc4c11cba90",
                  "blockNumber": "14837535"
              },
              "tick": "200503",
              "sqrtPriceX96": "1788723855061017360826578304573107"
          },
          {
              "id": "0x43465a023239714f87a97b5a88ddb20021c1bebd5e207ca9a47c1b0cab475998#346187",
              "timestamp": "1653421184",
              "amount0": "2376.694347",
              "amount1": "-1.20779880701740104",
              "transaction": {
                  "id": "0x43465a023239714f87a97b5a88ddb20021c1bebd5e207ca9a47c1b0cab475998",
                  "blockNumber": "14837535"
              },
              "tick": "200503",
              "sqrtPriceX96": "1788718396083778140192828792786567"
          },
          {
              "id": "0xb545120d3add690d436b1d513df8d2f033c165984adac89643d5a93291eab782#346190",
              "timestamp": "1653423202",
              "amount0": "-1606.957011",
              "amount1": "0.821551473389132278",
              "transaction": {
                  "id": "0xb545120d3add690d436b1d513df8d2f033c165984adac89643d5a93291eab782",
                  "blockNumber": "14837704"
              },
              "tick": "200503",
              "sqrtPriceX96": "1788722098170810945807085528226193"
          },
          {
              "id": "0x76bf89ce1c455d3f1119904c4cacf4022b086cf09c62e2d39e2873fec5653600#346192",
              "timestamp": "1653423486",
              "amount0": "-15544.737271",
              "amount1": "7.947371236997484194",
              "transaction": {
                  "id": "0x76bf89ce1c455d3f1119904c4cacf4022b086cf09c62e2d39e2873fec5653600",
                  "blockNumber": "14837722"
              },
              "tick": "200504",
              "sqrtPriceX96": "1788757910719474007384390630639845"
          },
          {
              "id": "0x52eea0a84fec635f85f3f28497f766732422361a6e91232a02a5bbfcaf5f85e7#346196",
              "timestamp": "1653423693",
              "amount0": "-15600.496128",
              "amount1": "8",
              "transaction": {
                  "id": "0x52eea0a84fec635f85f3f28497f766732422361a6e91232a02a5bbfcaf5f85e7",
                  "blockNumber": "14837744"
              },
              "tick": "200534",
              "sqrtPriceX96": "1791462783756419007940303693505968"
          },
          {
              "id": "0xac655f5fa5d6a4771a2de0caf7416398168412b8bef5322e13a74242bef2c6dc#346194",
              "timestamp": "1653423693",
              "amount0": "-1102846.332514",
              "amount1": "564.668923076923162624",
              "transaction": {
                  "id": "0xac655f5fa5d6a4771a2de0caf7416398168412b8bef5322e13a74242bef2c6dc",
                  "blockNumber": "14837744"
              },
              "tick": "200533",
              "sqrtPriceX96": "1791422262845758367194949126305352"
          },
          {
              "id": "0xb51619a33e4c951b9152ce69625619d4310870a74ac81b1337ed48613cf91f72#346195",
              "timestamp": "1653423693",
              "amount0": "-234.012735",
              "amount1": "0.12",
              "transaction": {
                  "id": "0xb51619a33e4c951b9152ce69625619d4310870a74ac81b1337ed48613cf91f72",
                  "blockNumber": "14837744"
              },
              "tick": "200533",
              "sqrtPriceX96": "1791422861676950396368525794786149"
          },
          {
              "id": "0xbe8df4ff90c9e82fc279d6f7fc82e2fa73720c3fc17e38fdb42f062e79abcce3#346198",
              "timestamp": "1653423693",
              "amount0": "-487.497682",
              "amount1": "0.25",
              "transaction": {
                  "id": "0xbe8df4ff90c9e82fc279d6f7fc82e2fa73720c3fc17e38fdb42f062e79abcce3",
                  "blockNumber": "14837744"
              },
              "tick": "200534",
              "sqrtPriceX96": "1791476191144396730221104614919895"
          },
          {
              "id": "0xebce2d86f10faa69cc8a841f20413f1b1c23bb408746cc37c6e15c4cc0ee20c3#346197",
              "timestamp": "1653423693",
              "amount0": "-4751.600095",
              "amount1": "2.436711344936575577",
              "transaction": {
                  "id": "0xebce2d86f10faa69cc8a841f20413f1b1c23bb408746cc37c6e15c4cc0ee20c3",
                  "blockNumber": "14837744"
              },
              "tick": "200534",
              "sqrtPriceX96": "1791474943579413336109486555584901"
          },
          {
              "id": "0xfab33ab0ff961b9f7ee094f9ad7334747d92a2ee8404bc7599e33a586baa3e49#346199",
              "timestamp": "1653423786",
              "amount0": "-11858.306051",
              "amount1": "6.08131875",
              "transaction": {
                  "id": "0xfab33ab0ff961b9f7ee094f9ad7334747d92a2ee8404bc7599e33a586baa3e49",
                  "blockNumber": "14837749"
              },
              "tick": "200534",
              "sqrtPriceX96": "1791506538505698162419594603209950"
          },
          {
              "id": "0xe2e2f7555982f23b621472edd504184130e9e222ddcded67b37d9eb18f9a5625#346200",
              "timestamp": "1653425123",
              "amount0": "464167.8",
              "amount1": "-236.461687556771914539",
              "transaction": {
                  "id": "0xe2e2f7555982f23b621472edd504184130e9e222ddcded67b37d9eb18f9a5625",
                  "blockNumber": "14837862"
              },
              "tick": "200521",
              "sqrtPriceX96": "1790322982552598432175303647900993"
          },
          {
              "id": "0x0444ae8453072081798ad1c4969713f8043a42af3fa21570c4d70cfa25d35b4d#346201",
              "timestamp": "1653425186",
              "amount0": "1964.275727",
              "amount1": "-1",
              "transaction": {
                  "id": "0x0444ae8453072081798ad1c4969713f8043a42af3fa21570c4d70cfa25d35b4d",
                  "blockNumber": "14837867"
              },
              "tick": "200521",
              "sqrtPriceX96": "1790317977276837573151760781963202"
          },
          {
              "id": "0x99993ccb5c408efadfe617aeaf3a575be72475227a7fda89128681f11e068c7d#346202",
              "timestamp": "1653425309",
              "amount0": "120.981911",
              "amount1": "-0.061590921307391762",
              "transaction": {
                  "id": "0x99993ccb5c408efadfe617aeaf3a575be72475227a7fda89128681f11e068c7d",
                  "blockNumber": "14837872"
              },
              "tick": "200521",
              "sqrtPriceX96": "1790317668997292064288211112610611"
          },
          {
              "id": "0x666699b13ea7ad6872f1d73e913b66cfef7172c991605d291ccb9b63976ee22d#346203",
              "timestamp": "1653425362",
              "amount0": "352547.377068",
              "amount1": "-179.395370076805611463",
              "transaction": {
                  "id": "0x666699b13ea7ad6872f1d73e913b66cfef7172c991605d291ccb9b63976ee22d",
                  "blockNumber": "14837875"
              },
              "tick": "200512",
              "sqrtPriceX96": "1789494153075344375862383646000000"
          },
          {
              "id": "0xe0f31c329f53a8eca2e57d32db1e928c445f7b5f83bc73f4967a729935bc9862#346204",
              "timestamp": "1653425362",
              "amount0": "641.450529",
              "amount1": "-0.326256646412076077",
              "transaction": {
                  "id": "0xe0f31c329f53a8eca2e57d32db1e928c445f7b5f83bc73f4967a729935bc9862",
                  "blockNumber": "14837875"
              },
              "tick": "200512",
              "sqrtPriceX96": "1789492678469146257372382957915119"
          },
          {
              "id": "0x8bfa57485e5ff0d42efcc9d153ee48913b72bec2290d9aec136e72344db46462#346206",
              "timestamp": "1653425696",
              "amount0": "496694.7",
              "amount1": "-252.469151727649885192",
              "transaction": {
                  "id": "0x8bfa57485e5ff0d42efcc9d153ee48913b72bec2290d9aec136e72344db46462",
                  "blockNumber": "14837900"
              },
              "tick": "200499",
              "sqrtPriceX96": "1788351479406384791053428805231325"
          },
          {
              "id": "0xdc6e3fb71437928a93220b4a2322defeb32458df7f9c44f5d0a697ad32b17933#346207",
              "timestamp": "1653425696",
              "amount0": "124.685433",
              "amount1": "-0.063336986060643371",
              "transaction": {
                  "id": "0xdc6e3fb71437928a93220b4a2322defeb32458df7f9c44f5d0a697ad32b17933",
                  "blockNumber": "14837900"
              },
              "tick": "200499",
              "sqrtPriceX96": "1788351193113550058855498120905586"
          },
          {
              "id": "0xb313afd4ace056734ff80675311677ea98e048395f075b69a8450dd6201ebd86#346208",
              "timestamp": "1653425735",
              "amount0": "17884.170291",
              "amount1": "-9.084487521987635917",
              "transaction": {
                  "id": "0xb313afd4ace056734ff80675311677ea98e048395f075b69a8450dd6201ebd86",
                  "blockNumber": "14837902"
              },
              "tick": "200499",
              "sqrtPriceX96": "1788310129844731600940552044521921"
          },
          {
              "id": "0x64e02a67d4236380834a4f0d4abadfece6e5eadfed0a029989f16ea77273ec64#346209",
              "timestamp": "1653425779",
              "amount0": "100000",
              "amount1": "-50.788561045685650413",
              "transaction": {
                  "id": "0x64e02a67d4236380834a4f0d4abadfece6e5eadfed0a029989f16ea77273ec64",
                  "blockNumber": "14837908"
              },
              "tick": "200496",
              "sqrtPriceX96": "1788080557804473534269722418962849"
          },
          {
              "id": "0x46a1f0aad3cdf43afeae78a75dde6a8472d5768770b7837f7e781c6c2264c27f#346210",
              "timestamp": "1653425880",
              "amount0": "33.945856",
              "amount1": "-0.017238397584165354",
              "transaction": {
                  "id": "0x46a1f0aad3cdf43afeae78a75dde6a8472d5768770b7837f7e781c6c2264c27f",
                  "blockNumber": "14837913"
              },
              "tick": "200496",
              "sqrtPriceX96": "1788080479884287911827424576585939"
          },
          {
              "id": "0xf9894bcff2f6afcb98b747f7aa54e0e14a5185d61fdac92a3b9f318a5ca33907#346211",
              "timestamp": "1653425990",
              "amount0": "412718.4",
              "amount1": "-209.47582447149864941",
              "transaction": {
                  "id": "0xf9894bcff2f6afcb98b747f7aa54e0e14a5185d61fdac92a3b9f318a5ca33907",
                  "blockNumber": "14837925"
              },
              "tick": "200485",
              "sqrtPriceX96": "1787133617216424481741075155779584"
          },
          {
              "id": "0xc63c2470ca497bb5b39e9b0467f9bea8b2cee259e7c2dd4ca528cd121087b9ae#346215",
              "timestamp": "1653426742",
              "amount0": "90.009173",
              "amount1": "-0.045660089491241553",
              "transaction": {
                  "id": "0xc63c2470ca497bb5b39e9b0467f9bea8b2cee259e7c2dd4ca528cd121087b9ae",
                  "blockNumber": "14837979"
              },
              "tick": "200485",
              "sqrtPriceX96": "1787133410880148374371112263230373"
          },
          {
              "id": "0x2cd83c2a49e795b053355a24594194eb37417dfdbf5c9d8ba572a2be7a8ae6b3#346216",
              "timestamp": "1653426772",
              "amount0": "302",
              "amount1": "-0.153199276327776045",
              "transaction": {
                  "id": "0x2cd83c2a49e795b053355a24594194eb37417dfdbf5c9d8ba572a2be7a8ae6b3",
                  "blockNumber": "14837982"
              },
              "tick": "200485",
              "sqrtPriceX96": "1787132718578216161103009089569336"
          },
          {
              "id": "0xa2c5c10dd592ac0fe9a0b11d79b13c554d61be7e4628c141236fad11b0dd8fda#346217",
              "timestamp": "1653426774",
              "amount0": "34967.136289",
              "amount1": "-17.73740938895114578",
              "transaction": {
                  "id": "0xa2c5c10dd592ac0fe9a0b11d79b13c554d61be7e4628c141236fad11b0dd8fda",
                  "blockNumber": "14837983"
              },
              "tick": "200484",
              "sqrtPriceX96": "1787052563873267321468084979327234"
          },
          {
              "id": "0xcf721e2e7c982329af755f607b8a15a21dac9b4dda80fc42fe9f8017a822ec89#346218",
              "timestamp": "1653426847",
              "amount0": "875250",
              "amount1": "-443.46104594809951946",
              "transaction": {
                  "id": "0xcf721e2e7c982329af755f607b8a15a21dac9b4dda80fc42fe9f8017a822ec89",
                  "blockNumber": "14837988"
              },
              "tick": "200462",
              "sqrtPriceX96": "1785048579609566701056527452870610"
          },
          {
              "id": "0x19326d31c31df3529b097aeec1418610f4b71704dcaefa0c0aad84745defffd4#346219",
              "timestamp": "1653426921",
              "amount0": "100",
              "amount1": "-0.050609962418455384",
              "transaction": {
                  "id": "0x19326d31c31df3529b097aeec1418610f4b71704dcaefa0c0aad84745defffd4",
                  "blockNumber": "14837989"
              },
              "tick": "200462",
              "sqrtPriceX96": "1785048350904995691375869833884059"
          },
          {
              "id": "0x25e3603c9fcc19f33a3626187441f3d3b37c611b13604cca232a080f98de13b9#346220",
              "timestamp": "1653426968",
              "amount0": "200",
              "amount1": "-0.10121988593132497",
              "transaction": {
                  "id": "0x25e3603c9fcc19f33a3626187441f3d3b37c611b13604cca232a080f98de13b9",
                  "blockNumber": "14837991"
              },
              "tick": "200462",
              "sqrtPriceX96": "1785047893496029484935262075130193"
          },
          {
              "id": "0x91680d559ebef316ab7809e01da388aa668c51721fc1b929b50cf2a4c62bebd8#346222",
              "timestamp": "1653428816",
              "amount0": "20500",
              "amount1": "-10.37476316965680534",
              "transaction": {
                  "id": "0x91680d559ebef316ab7809e01da388aa668c51721fc1b929b50cf2a4c62bebd8",
                  "blockNumber": "14838120"
              },
              "tick": "200461",
              "sqrtPriceX96": "1785001012749583135776998668249256"
          },
          {
              "id": "0xe2deb4753e2b54dee259ad2cf7e5ebea7a646258d8c868136b3dd9204869c8ed#346223",
              "timestamp": "1653429182",
              "amount0": "427863.063525",
              "amount1": "-216.415485418104903421",
              "transaction": {
                  "id": "0xe2deb4753e2b54dee259ad2cf7e5ebea7a646258d8c868136b3dd9204869c8ed",
                  "blockNumber": "14838148"
              },
              "tick": "200451",
              "sqrtPriceX96": "1784066229687257861299439021000000"
          },
          {
              "id": "0xaebd8693476a61be9b5e352eff41dea7469b90789543c63b07056f0ba9dbecd4#346224",
              "timestamp": "1653429279",
              "amount0": "344848.856186",
              "amount1": "-174.263052532063290871",
              "transaction": {
                  "id": "0xaebd8693476a61be9b5e352eff41dea7469b90789543c63b07056f0ba9dbecd4",
                  "blockNumber": "14838157"
              },
              "tick": "200443",
              "sqrtPriceX96": "1783321165039796745335250650000000"
          },
          {
              "id": "0x5cbe895dbec53e96c615dee2ef13cecf477506a50290d49f7b5eb6be06a94255#346225",
              "timestamp": "1653429345",
              "amount0": "52850.37784",
              "amount1": "-26.694108408794292599",
              "transaction": {
                  "id": "0x5cbe895dbec53e96c615dee2ef13cecf477506a50290d49f7b5eb6be06a94255",
                  "blockNumber": "14838159"
              },
              "tick": "200441",
              "sqrtPriceX96": "1783207033924899468348126807406262"
          },
          {
              "id": "0x331e884a9ecf812defc01da1423c4ac12ed0b79014556197621e807022fab68e#346227",
              "timestamp": "1653429372",
              "amount0": "463.457373",
              "amount1": "-0.233561905048642395",
              "transaction": {
                  "id": "0x331e884a9ecf812defc01da1423c4ac12ed0b79014556197621e807022fab68e",
                  "blockNumber": "14838160"
              },
              "tick": "200420",
              "sqrtPriceX96": "1781262766182246029217542499309737"
          },
          {
              "id": "0xecf844ae1c8f6b59c5a0ec11d9a9255a6c52364ec1fc3b61ad9268f73f183cc5#346226",
              "timestamp": "1653429372",
              "amount0": "900903.6",
              "amount1": "-454.510912858256611764",
              "transaction": {
                  "id": "0xecf844ae1c8f6b59c5a0ec11d9a9255a6c52364ec1fc3b61ad9268f73f183cc5",
                  "blockNumber": "14838160"
              },
              "tick": "200420",
              "sqrtPriceX96": "1781263764780146828614202661273600"
          },
          {
              "id": "0xb20d34c80f1f65ae77ac5e328505ed0e44010ca30bbfced8d16755ea26b9adc8#346228",
              "timestamp": "1653429388",
              "amount0": "40",
              "amount1": "-0.020158208876345914",
              "transaction": {
                  "id": "0xb20d34c80f1f65ae77ac5e328505ed0e44010ca30bbfced8d16755ea26b9adc8",
                  "blockNumber": "14838161"
              },
              "tick": "200420",
              "sqrtPriceX96": "1781262679995480839053231166059443"
          },
          {
              "id": "0xe8fb8b54c40b54ee7a085ad53382d473c8681cf0ca0d6dd12d163f6563e91450#346229",
              "timestamp": "1653430273",
              "amount0": "165363.548502",
              "amount1": "-83.31915352379442941",
              "transaction": {
                  "id": "0xe8fb8b54c40b54ee7a085ad53382d473c8681cf0ca0d6dd12d163f6563e91450",
                  "blockNumber": "14838224"
              },
              "tick": "200416",
              "sqrtPriceX96": "1780906447536305119578760180379768"
          },
          {
              "id": "0xa671136881f9e21c939ea0be4c455a1c8924b689b142b1e13f137c9978b5db43#346230",
              "timestamp": "1653430455",
              "amount0": "193.184935",
              "amount1": "-0.097317592708962375",
              "transaction": {
                  "id": "0xa671136881f9e21c939ea0be4c455a1c8924b689b142b1e13f137c9978b5db43",
                  "blockNumber": "14838241"
              },
              "tick": "200416",
              "sqrtPriceX96": "1780906031453280921856006708509103"
          },
          {
              "id": "0x8d7b664d6bc42cf840cfd4a4d2092499ea7ae1f7a500f555fdf2eb7970cd584c#346231",
              "timestamp": "1653430589",
              "amount0": "34997.629995",
              "amount1": "-17.629429328776712737",
              "transaction": {
                  "id": "0x8d7b664d6bc42cf840cfd4a4d2092499ea7ae1f7a500f555fdf2eb7970cd584c",
                  "blockNumber": "14838253"
              },
              "tick": "200415",
              "sqrtPriceX96": "1780830656528092067428187874787164"
          },
          {
              "id": "0x1067788316f6e383a680f257f90e625c6963840815d99c5e4192db8e119e37de#346232",
              "timestamp": "1653433781",
              "amount0": "381506.4",
              "amount1": "-192.080262807090105785",
              "transaction": {
                  "id": "0x1067788316f6e383a680f257f90e625c6963840815d99c5e4192db8e119e37de",
                  "blockNumber": "14838455"
              },
              "tick": "200405",
              "sqrtPriceX96": "1780009414094809938622740208549888"
          },
          {
              "id": "0x94e77abbeef1c754fc0d8e1ce8342655a67ae503d5f5e73328cc00cee49b77b7#346235",
              "timestamp": "1653434397",
              "amount0": "278.271822",
              "amount1": "-0.140039217818488822",
              "transaction": {
                  "id": "0x94e77abbeef1c754fc0d8e1ce8342655a67ae503d5f5e73328cc00cee49b77b7",
                  "blockNumber": "14838492"
              },
              "tick": "200405",
              "sqrtPriceX96": "1780008825407897313577789848779849"
          },
          {
              "id": "0xf48e6d3ec538f8110382508a77cdf9c4cacda32c656892ea2cc4fb20647e856e#346236",
              "timestamp": "1653434622",
              "amount0": "86907.226252",
              "amount1": "-43.731194100719223451",
              "transaction": {
                  "id": "0xf48e6d3ec538f8110382508a77cdf9c4cacda32c656892ea2cc4fb20647e856e",
                  "blockNumber": "14838509"
              },
              "tick": "200403",
              "sqrtPriceX96": "1779824991321692069842644937114695"
          },
          {
              "id": "0x2e1b43b8cd9af541e8df383e6f4fcef537abcd4020a13fc048b5a78442a370b5#346237",
              "timestamp": "1653435263",
              "amount0": "-208907.799802",
              "amount1": "105.77014150400930396",
              "transaction": {
                  "id": "0x2e1b43b8cd9af541e8df383e6f4fcef537abcd4020a13fc048b5a78442a370b5",
                  "blockNumber": "14838538"
              },
              "tick": "200408",
              "sqrtPriceX96": "1780268286439465597087111897000000"
          },
          {
              "id": "0x9ebca91b077186e928cec7d107deeb41e4501976a3465963f171919be1afd084#346238",
              "timestamp": "1653435424",
              "amount0": "-114525.255047",
              "amount1": "58.006565959499998999",
              "transaction": {
                  "id": "0x9ebca91b077186e928cec7d107deeb41e4501976a3465963f171919be1afd084",
                  "blockNumber": "14838550"
              },
              "tick": "200411",
              "sqrtPriceX96": "1780511398787837370014582950027335"
          },
          {
              "id": "0x90bd555f8bd852ea98766ca2a29ba90209bb619615708ae359059a314e036b96#346239",
              "timestamp": "1653435502",
              "amount0": "-8888.000612",
              "amount1": "4.502397861241833603",
              "transaction": {
                  "id": "0x90bd555f8bd852ea98766ca2a29ba90209bb619615708ae359059a314e036b96",
                  "blockNumber": "14838553"
              },
              "tick": "200411",
              "sqrtPriceX96": "1780530268867443785402790315549165"
          },
          {
              "id": "0x7c66f7dbb3d8103d5ea0e2f8cddfc97bb5906c8032c957221cc2292d1ba5f439#346240",
              "timestamp": "1653435526",
              "amount0": "-20883.310191",
              "amount1": "10.579241965986273976",
              "transaction": {
                  "id": "0x7c66f7dbb3d8103d5ea0e2f8cddfc97bb5906c8032c957221cc2292d1ba5f439",
                  "blockNumber": "14838556"
              },
              "tick": "200412",
              "sqrtPriceX96": "1780574607716258587823253565407305"
          },
          {
              "id": "0x872f0c51c0af6a37eda3c730765d0e5cc9115f28ecad7a7a99b24042bdeae026#346241",
              "timestamp": "1653435526",
              "amount0": "-493.484739",
              "amount1": "0.25",
              "transaction": {
                  "id": "0x872f0c51c0af6a37eda3c730765d0e5cc9115f28ecad7a7a99b24042bdeae026",
                  "blockNumber": "14838556"
              },
              "tick": "200412",
              "sqrtPriceX96": "1780575655495696787600502294190971"
          },
          {
              "id": "0x4e02cdfe8740c4f10c8e252bc8726f6c7fa342462adc3aba54d25d8b5ee3f595#346242",
              "timestamp": "1653435592",
              "amount0": "-20676.225261",
              "amount1": "10.474866569032869401",
              "transaction": {
                  "id": "0x4e02cdfe8740c4f10c8e252bc8726f6c7fa342462adc3aba54d25d8b5ee3f595",
                  "blockNumber": "14838562"
              },
              "tick": "200412",
              "sqrtPriceX96": "1780619556894932463153012822526891"
          },
          {
              "id": "0x2a6b5bf1015e0129f7b6fcd815801fbe597bd4bf2977d46d159c3f5b5fa384ac#346243",
              "timestamp": "1653435654",
              "amount0": "-20550.553536",
              "amount1": "10.41171134909718897",
              "transaction": {
                  "id": "0x2a6b5bf1015e0129f7b6fcd815801fbe597bd4bf2977d46d159c3f5b5fa384ac",
                  "blockNumber": "14838565"
              },
              "tick": "200413",
              "sqrtPriceX96": "1780663193603204684343069433342194"
          },
          {
              "id": "0x41fba0e554e7e4863b76b2f36bda3987a160c8d820f2a578dfc00d524a611240#346244",
              "timestamp": "1653435879",
              "amount0": "-20359.73597",
              "amount1": "10.315538968684368543",
              "transaction": {
                  "id": "0x41fba0e554e7e4863b76b2f36bda3987a160c8d820f2a578dfc00d524a611240",
                  "blockNumber": "14838582"
              },
              "tick": "200413",
              "sqrtPriceX96": "1780706427241706028412130624704646"
          },
          {
              "id": "0xc53a882761ae5bdae8e68f1de37fa411025c74732c8af9fb5071dc4b7951f27d#346245",
              "timestamp": "1653435899",
              "amount0": "-2184.983",
              "amount1": "1.107081314253533308",
              "transaction": {
                  "id": "0xc53a882761ae5bdae8e68f1de37fa411025c74732c8af9fb5071dc4b7951f27d",
                  "blockNumber": "14838585"
              },
              "tick": "200413",
              "sqrtPriceX96": "1780711067149855988564841759319793"
          },
          {
              "id": "0x8a52ddf3a4d203a1d0e7c3651d1fd6ad6c2b5d087e8613234f3588118bcc491f#346246",
              "timestamp": "1653435973",
              "amount0": "-19990.402121",
              "amount1": "10.128951079783208556",
              "transaction": {
                  "id": "0x8a52ddf3a4d203a1d0e7c3651d1fd6ad6c2b5d087e8613234f3588118bcc491f",
                  "blockNumber": "14838586"
              },
              "tick": "200414",
              "sqrtPriceX96": "1780753518776543701674447843695681"
          },
          {
              "id": "0xf89ba5f9bc8979fe588823a068939aff78983ee77cc422b7cd9f84c6eaaaef25#346247",
              "timestamp": "1653435990",
              "amount0": "-1000",
              "amount1": "0.506703395405555408",
              "transaction": {
                  "id": "0xf89ba5f9bc8979fe588823a068939aff78983ee77cc422b7cd9f84c6eaaaef25",
                  "blockNumber": "14838587"
              },
              "tick": "200414",
              "sqrtPriceX96": "1780755642430139589484192991931299"
          },
          {
              "id": "0xed173fb3c8e75d3e278fb1c968028b65e14eb83ff4a811c4f73892e241c70bcc#346248",
              "timestamp": "1653436116",
              "amount0": "-453.411",
              "amount1": "0.229745291426289897",
              "transaction": {
                  "id": "0xed173fb3c8e75d3e278fb1c968028b65e14eb83ff4a811c4f73892e241c70bcc",
                  "blockNumber": "14838595"
              },
              "tick": "200414",
              "sqrtPriceX96": "1780756605319709108212704255452166"
          },
          {
              "id": "0x02060ce54f01ca46b301f6ca0377f27defa99173650fe0729a6c499b732e3114#346250",
              "timestamp": "1653436190",
              "amount0": "-190.039036",
              "amount1": "0.096298349860315958",
              "transaction": {
                  "id": "0x02060ce54f01ca46b301f6ca0377f27defa99173650fe0729a6c499b732e3114",
                  "blockNumber": "14838598"
              },
              "tick": "200414",
              "sqrtPriceX96": "1780800317957897910327548331878227"
          },
          {
              "id": "0x1faf29e66495d113c9765c859ffe5ade345d5b21f5cb4324ecfca2fe3f7440fb#346249",
              "timestamp": "1653436190",
              "amount0": "-20393.104031",
              "amount1": "10.333529864727042957",
              "transaction": {
                  "id": "0x1faf29e66495d113c9765c859ffe5ade345d5b21f5cb4324ecfca2fe3f7440fb",
                  "blockNumber": "14838598"
              },
              "tick": "200414",
              "sqrtPriceX96": "1780799914360174245497739389998574"
          },
          {
              "id": "0x2d4a4c28120f486a675dadf3a9434f172c7d2265301f9f669b804d68ed1bfa5d#346252",
              "timestamp": "1653436208",
              "amount0": "-58.685161",
              "amount1": "0.0297375",
              "transaction": {
                  "id": "0x2d4a4c28120f486a675dadf3a9434f172c7d2265301f9f669b804d68ed1bfa5d",
                  "blockNumber": "14838600"
              },
              "tick": "200414",
              "sqrtPriceX96": "1780800442591259551318140054101909"
          },
          {
              "id": "0x9d2c7eba050626a4491c200d72b51b0db1c106d5ef493bc673a6759bf8e8ce7d#346254",
              "timestamp": "1653437523",
              "amount0": "-100000",
              "amount1": "50.678993447665796767",
              "transaction": {
                  "id": "0x9d2c7eba050626a4491c200d72b51b0db1c106d5ef493bc673a6759bf8e8ce7d",
                  "blockNumber": "14838700"
              },
              "tick": "200417",
              "sqrtPriceX96": "1781012844220392053161444875097581"
          },
          {
              "id": "0xbee1f061afe78b244eb00d64851ddc08b108adae9bf83f62ada4f81023f46236#346255",
              "timestamp": "1653437557",
              "amount0": "-128676.923621",
              "amount1": "65.229959047499994889",
              "transaction": {
                  "id": "0xbee1f061afe78b244eb00d64851ddc08b108adae9bf83f62ada4f81023f46236",
                  "blockNumber": "14838705"
              },
              "tick": "200420",
              "sqrtPriceX96": "1781286230659770389248255475541251"
          },
          {
              "id": "0xddcd360d4db3af88202554a836ffc4d31a7758831b7a0a75cdf1ea14b7e01dff#346256",
              "timestamp": "1653437557",
              "amount0": "-5917.048013",
              "amount1": "3",
              "transaction": {
                  "id": "0xddcd360d4db3af88202554a836ffc4d31a7758831b7a0a75cdf1ea14b7e01dff",
                  "blockNumber": "14838705"
              },
              "tick": "200420",
              "sqrtPriceX96": "1781298804013028786575240220945247"
          },
          {
              "id": "0x80119176a142bcda5af90bde1e9fda17f58ac5dd691a5da8080cdcb739f3781a#346258",
              "timestamp": "1653437569",
              "amount0": "-128881.030687",
              "amount1": "65.354763766113129218",
              "transaction": {
                  "id": "0x80119176a142bcda5af90bde1e9fda17f58ac5dd691a5da8080cdcb739f3781a",
                  "blockNumber": "14838706"
              },
              "tick": "200423",
              "sqrtPriceX96": "1781577319249682753178112608464627"
          },
          {
              "id": "0xf54361adfd5923e4a7be6f237764432cb8c3b1e9a4bcafcd9090cdda8a13a1fc#346257",
              "timestamp": "1653437569",
              "amount0": "-2167.444",
              "amount1": "1.09892545985898374",
              "transaction": {
                  "id": "0xf54361adfd5923e4a7be6f237764432cb8c3b1e9a4bcafcd9090cdda8a13a1fc",
                  "blockNumber": "14838706"
              },
              "tick": "200420",
              "sqrtPriceX96": "1781303409739032604486622178553052"
          },
          {
              "id": "0x88501d4350633527ecbf666adbbfbb6ec85217a84229c79f394b02444e02ae51#346260",
              "timestamp": "1653437710",
              "amount0": "-132926.932148",
              "amount1": "67.427473844624994717",
              "transaction": {
                  "id": "0x88501d4350633527ecbf666adbbfbb6ec85217a84229c79f394b02444e02ae51",
                  "blockNumber": "14838714"
              },
              "tick": "200426",
              "sqrtPriceX96": "1781859915731554493459028487832209"
          },
          {
              "id": "0x12ec228c1b822583f80d2c50a3ecd7a9da58fb2a6d16d6d8795eb8e6b4befc4c#346263",
              "timestamp": "1653440496",
              "amount0": "-89303.631542",
              "amount1": "45.311474384629740424",
              "transaction": {
                  "id": "0x12ec228c1b822583f80d2c50a3ecd7a9da58fb2a6d16d6d8795eb8e6b4befc4c",
                  "blockNumber": "14838905"
              },
              "tick": "200428",
              "sqrtPriceX96": "1782049821468431336379821100850525"
          },
          {
              "id": "0xf8a1b73afb07f7f72ef8c9923b1405dc7a9751ebed72f568dc7a982061da0804#346264",
              "timestamp": "1653440503",
              "amount0": "-184519.345169",
              "amount1": "93.653261997434044663",
              "transaction": {
                  "id": "0xf8a1b73afb07f7f72ef8c9923b1405dc7a9751ebed72f568dc7a982061da0804",
                  "blockNumber": "14838906"
              },
              "tick": "200433",
              "sqrtPriceX96": "1782442333342566594082827460019329"
          },
          {
              "id": "0xacbad8a092fd4d1ec7c6f10dc156ebd765e0c71e51622b0e3c58b2d884bf45d0#346265",
              "timestamp": "1653440530",
              "amount0": "-133997.494672",
              "amount1": "68.03663104649999467",
              "transaction": {
                  "id": "0xacbad8a092fd4d1ec7c6f10dc156ebd765e0c71e51622b0e3c58b2d884bf45d0",
                  "blockNumber": "14838911"
              },
              "tick": "200436",
              "sqrtPriceX96": "1782727482893071759119098462654571"
          },
          {
              "id": "0x7dfcb57afbc6e3a9aecb1ad38532deaf8ed8a7b02202f631e4ac21eca9a2da87#346269",
              "timestamp": "1653441933",
              "amount0": "-2363.003839",
              "amount1": "1.2",
              "transaction": {
                  "id": "0x7dfcb57afbc6e3a9aecb1ad38532deaf8ed8a7b02202f631e4ac21eca9a2da87",
                  "blockNumber": "14839013"
              },
              "tick": "200436",
              "sqrtPriceX96": "1782732512235004000473147055811858"
          },
          {
              "id": "0x0bb88a949534be8ae06058459b96d0e54bf5a2ee59ab9350c0085c3f24f18d96#346270",
              "timestamp": "1653441997",
              "amount0": "-4824.424773",
              "amount1": "2.45",
              "transaction": {
                  "id": "0x0bb88a949534be8ae06058459b96d0e54bf5a2ee59ab9350c0085c3f24f18d96",
                  "blockNumber": "14839015"
              },
              "tick": "200436",
              "sqrtPriceX96": "1782742780474782326570996266841319"
          },
          {
              "id": "0xa01741256ba16c9ac8d1a7114fa42a81dfc20bc2936453d757a38e8165d2e743#346271",
              "timestamp": "1653442127",
              "amount0": "-26694.584963",
              "amount1": "13.556889659762003067",
              "transaction": {
                  "id": "0xa01741256ba16c9ac8d1a7114fa42a81dfc20bc2936453d757a38e8165d2e743",
                  "blockNumber": "14839026"
              },
              "tick": "200437",
              "sqrtPriceX96": "1782799599002812835125468649707719"
          },
          {
              "id": "0x040fa4aef1178b159c6cc01b2ae63a542105e5fa09d0365422cf10622c72e5e4#346272",
              "timestamp": "1653442143",
              "amount0": "-208841.840453",
              "amount1": "106.090511405999991689",
              "transaction": {
                  "id": "0x040fa4aef1178b159c6cc01b2ae63a542105e5fa09d0365422cf10622c72e5e4",
                  "blockNumber": "14839028"
              },
              "tick": "200442",
              "sqrtPriceX96": "1783244236884168772966329974155256"
          },
          {
              "id": "0x1c34591a1dc4342103fb4a651508ddcd3c54f5029ce5bbe6266efa03912e8c34#347044",
              "timestamp": "1653554161",
              "amount0": "-8471.10699",
              "amount1": "4.641950724678192609",
              "transaction": {
                  "id": "0x1c34591a1dc4342103fb4a651508ddcd3c54f5029ce5bbe6266efa03912e8c34",
                  "blockNumber": "14847004"
              },
              "tick": "201197",
              "sqrtPriceX96": "1851879572259519174679350174035103"
          },
          {
              "id": "0x70ffb63b0ad972cee1020eb4ca222a5370a41518d6878c5e76ab60a9cd2d771c#347046",
              "timestamp": "1653554318",
              "amount0": "130889.953931",
              "amount1": "-71.269134606990691182",
              "transaction": {
                  "id": "0x70ffb63b0ad972cee1020eb4ca222a5370a41518d6878c5e76ab60a9cd2d771c",
                  "blockNumber": "14847016"
              },
              "tick": "201189",
              "sqrtPriceX96": "1851170575830047150929351752741772"
          },
          {
              "id": "0x10776f209d050942de33ffbcee0d84dc062eb92a9d3cc7975101bd202a21bfa1#347048",
              "timestamp": "1653554355",
              "amount0": "182807.180827",
              "amount1": "-99.37057474732263328",
              "transaction": {
                  "id": "0x10776f209d050942de33ffbcee0d84dc062eb92a9d3cc7975101bd202a21bfa1",
                  "blockNumber": "14847018"
              },
              "tick": "201172",
              "sqrtPriceX96": "1849510154346135371573992187609004"
          },
          {
              "id": "0xc0e1608db3548a47244ad7d03aa67b7d821e298213d413464e13b50033551502#347047",
              "timestamp": "1653554355",
              "amount0": "135295.823408",
              "amount1": "-73.610780844582446741",
              "transaction": {
                  "id": "0xc0e1608db3548a47244ad7d03aa67b7d821e298213d413464e13b50033551502",
                  "blockNumber": "14847018"
              },
              "tick": "201182",
              "sqrtPriceX96": "1850438284339807316139965990314914"
          },
          {
              "id": "0xdeee1230d12d360ffdd7b6339afc981e6d3d3ea6d12f50b474657eb7e6687160#347049",
              "timestamp": "1653554399",
              "amount0": "5000",
              "amount1": "-2.716524156428964016",
              "transaction": {
                  "id": "0xdeee1230d12d360ffdd7b6339afc981e6d3d3ea6d12f50b474657eb7e6687160",
                  "blockNumber": "14847019"
              },
              "tick": "201171",
              "sqrtPriceX96": "1849485181869613704834494936288264"
          },
          {
              "id": "0xfccf31aafa50ad52cd1f6c6c81de81754ea241db7136ffcb81b956275c6d1551#347437",
              "timestamp": "1653574846",
              "amount0": "-513191.602526",
              "amount1": "279.378474495683075544",
              "transaction": {
                  "id": "0xfccf31aafa50ad52cd1f6c6c81de81754ea241db7136ffcb81b956275c6d1551",
                  "blockNumber": "14848427"
              },
              "tick": "201143",
              "sqrtPriceX96": "1846892828987879972521405318000000"
          },
          {
              "id": "0x607310e7d2d3ed59044a4e2b5916f635d066b7acbaf5de015dbc378619b7939f#347440",
              "timestamp": "1653574849",
              "amount0": "-141077.685716",
              "amount1": "76.720236143974383691",
              "transaction": {
                  "id": "0x607310e7d2d3ed59044a4e2b5916f635d066b7acbaf5de015dbc378619b7939f",
                  "blockNumber": "14848428"
              },
              "tick": "201124",
              "sqrtPriceX96": "1845115676418990791738721863000000"
          },
          {
              "id": "0xdb3f8c19f8a529fb376d7486190cf8b941aa097a2914439f5862d9ae92443ae3#347438",
              "timestamp": "1653574849",
              "amount0": "1825644.683791",
              "amount1": "-985.002105962015061906",
              "transaction": {
                  "id": "0xdb3f8c19f8a529fb376d7486190cf8b941aa097a2914439f5862d9ae92443ae3",
                  "blockNumber": "14848428"
              },
              "tick": "201061",
              "sqrtPriceX96": "1839306572851724755278433279047612"
          },
          {
              "id": "0xe9d6dfada4d55b4ccb2f00ca6e4ea09424212d45ccd889736ef6d39c2f7d5ed0#347439",
              "timestamp": "1653574849",
              "amount0": "-1263045.064865",
              "amount1": "684.702440886141830102",
              "transaction": {
                  "id": "0xe9d6dfada4d55b4ccb2f00ca6e4ea09424212d45ccd889736ef6d39c2f7d5ed0",
                  "blockNumber": "14848428"
              },
              "tick": "201118",
              "sqrtPriceX96": "1844519423162071422028022198000000"
          },
          {
              "id": "0x2f724e5917cc213892f119856badc7f3482a408a6dbe528e5ff56d79a71033e9#347444",
              "timestamp": "1653574937",
              "amount0": "-2184010.453282",
              "amount1": "1178.246142184689308296",
              "transaction": {
                  "id": "0x2f724e5917cc213892f119856badc7f3482a408a6dbe528e5ff56d79a71033e9",
                  "blockNumber": "14848437"
              },
              "tick": "201090",
              "sqrtPriceX96": "1841946821201656159553004218000000"
          },
          {
              "id": "0x9a023d2d94db87d41b03eec66b5ea25381c9cd8b78be7b0096b4ef0a13201cdd#347446",
              "timestamp": "1653574937",
              "amount0": "442233.914142",
              "amount1": "-237.761530300086251924",
              "transaction": {
                  "id": "0x9a023d2d94db87d41b03eec66b5ea25381c9cd8b78be7b0096b4ef0a13201cdd",
                  "blockNumber": "14848437"
              },
              "tick": "201057",
              "sqrtPriceX96": "1838918758066959268087366658014660"
          },
          {
              "id": "0xb335977c4580d16dadcb81bfea98f5a37b888d9ed0a4489a2e03708fb6193a15#347445",
              "timestamp": "1653574937",
              "amount0": "294900.97019",
              "amount1": "-158.810911746338909706",
              "transaction": {
                  "id": "0xb335977c4580d16dadcb81bfea98f5a37b888d9ed0a4489a2e03708fb6193a15",
                  "blockNumber": "14848437"
              },
              "tick": "201076",
              "sqrtPriceX96": "1840734106733780947716479168556112"
          },
          {
              "id": "0xc01cb996fe3aa919af18323460964337c45f3944bac87456bb53d6028afdbd35#347443",
              "timestamp": "1653574937",
              "amount0": "-2558873.573133",
              "amount1": "1366.47295311208339",
              "transaction": {
                  "id": "0xc01cb996fe3aa919af18323460964337c45f3944bac87456bb53d6028afdbd35",
                  "blockNumber": "14848437"
              },
              "tick": "200992",
              "sqrtPriceX96": "1833019857178568395665127964218365"
          },
          {
              "id": "0xc306dc4581b469e6dc3212b543174d3a9126bb221b56936e0867fb871e9215ea#347441",
              "timestamp": "1653574937",
              "amount0": "5616791.074478",
              "amount1": "-3000",
              "transaction": {
                  "id": "0xc306dc4581b469e6dc3212b543174d3a9126bb221b56936e0867fb871e9215ea",
                  "blockNumber": "14848437"
              },
              "tick": "200882",
              "sqrtPriceX96": "1822895227372084041236746803845456"
          },
          {
              "id": "0xd823dd14c1bbd6307820fe4524641ffd85ccf27b21959c99353cdaa0d7facb3a#347442",
              "timestamp": "1653574937",
              "amount0": "-93545.109464",
              "amount1": "49.67917064647613",
              "transaction": {
                  "id": "0xd823dd14c1bbd6307820fe4524641ffd85ccf27b21959c99353cdaa0d7facb3a",
                  "blockNumber": "14848437"
              },
              "tick": "200886",
              "sqrtPriceX96": "1823248510413210145276430360520710"
          }
      ]
  }
}`
