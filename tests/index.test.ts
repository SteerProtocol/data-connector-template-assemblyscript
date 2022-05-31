import { config } from "./utils";

// We use untouched so that we can run the un-optimized version of the wasm which will provide better stacktraces
const myModule = require("../untouchLoader");

describe("WASM Transformation Module", () => {
  describe("Uniswap Data", () => {
    test("can return example", async () => {
      // Call the config function on the transformation bundle
      const result = myModule.DataConnector.exampleconfig();
      // console.log(myModule.__getString(result));
      // Pull the result from memory and parse the result
      const parsedResult = JSON.parse(myModule.__getString(result));
      // console.log(parsedResult);
      // The result should match the given config
      expect(parsedResult).toStrictEqual(
        JSON.parse(`{
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
        }`)
      );
    });
    
    test("be initialized", async () => {
      let configMemoryRef = myModule.__pin(
        myModule.__newString(
          config
        )
      );

      // Here we pin the array to the WASM memory
      let timestampMemoryRef = myModule.__pin(
        myModule.__newString(JSON.stringify(1654012158))
      );

      // The actual strategy instantiation and execution
      const dataConnector = myModule.DataConnector(configMemoryRef, timestampMemoryRef);
      const parsedConfRef = dataConnector.getConfig();
      console.log(parsedConfRef);
      const parsedConf = (myModule.__getString(parsedConfRef));
      console.log(parsedConf);
      
    });
  });
});
