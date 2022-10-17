import { time } from "console";
import { candles, config, configForm, firstCall, response_swaps, secondCall } from "./utils";

// We use untouched so that we can run the un-optimized version of the wasm which will provide better stacktraces
const myModule = require("../untouchLoader");

function hexEncode(str: string): any {
  var hex, i;

  var result = "";
  for (i=0; i<str.length; i++) {
      hex = str.charCodeAt(i).toString(16);
      result += ("000"+hex).slice(-4);
  }

  return result
}

describe("WASM Transformation Module", () => {
  describe("Uniswap Data", () => {
    test("can return input config", async () => {

      const timestamp = 1654012158
      let configMemoryRef = myModule.__pin(
        myModule.__newString(
          config
        )
      );
      // Instantiate
      const connector = myModule.DataConnector(configMemoryRef, timestamp);
      // Call the configForm function on the transformation bundle
      const resultRef = connector.configForm();
      // console.log(resultRef)
      const result = myModule.__getString(resultRef);
      // myModule.__unpin(resultRef);
      // Check that the result is the same as the expected result
      // Fix some funky encoding
      let hexResult = hexEncode(result) as string;
      hexResult = hexResult.replace(/000d/g, '');
      const hexExpected = hexEncode(configForm);
  expect(hexResult).toEqual(hexExpected);
  });

  test("can return version", async () => {

    const version = myModule.version();

expect(version).toEqual(2);
});

    test("can return first axios config obj", async () => {
      const timestamp = 1654012158
      let configMemoryRef = myModule.__pin(
        myModule.__newString(
          '{"poolAddress":"0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8","period":604800,"candleWidth":300}'
        )
      );
      // Instantiate
      const connector = myModule.DataConnector(configMemoryRef, timestamp);

      let paramRef = myModule.__pin(
        myModule.__newString(
          ""
        )
      );

      // First call will be an empty string like so
      const resultRef = connector.main(paramRef);

      const result = myModule.__getString(resultRef);

      console.log(result)
      let hexResult = hexEncode(result) as string;
      hexResult = hexResult.replace(/000d/g, '');
      const hexExpected = hexEncode(firstCall);
      expect(hexResult).toBe(hexExpected);
    });

    test("can process a response and return a new config", async () => {
      const timestamp = 1654012158
      let configMemoryRef = myModule.__pin(
        myModule.__newString(
          '{"poolAddress":"0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8","period":604800,"candleWidth":300}'
        )
      );
      // Instantiate
      const connector = myModule.DataConnector(configMemoryRef, timestamp);

      let paramRef = myModule.__pin(
        myModule.__newString(
          response_swaps
        )
      );
      const resultRef = connector.main(paramRef);
      const result = myModule.__getString(resultRef);
      let hexResult = hexEncode(result) as string;
      hexResult = hexResult.replace(/000d/g, '');
      const hexExpected = hexEncode(secondCall);
      expect(hexResult).toBe(hexExpected);
    });

    test("can process the final response and return true for callback termination", async () => {
      const timestamp = 1654012158
      let configMemoryRef = myModule.__pin(
        myModule.__newString(
          '{"poolAddress":"0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8","period":604800,"candleWidth":300}'
        )
      );
      // Instantiate
      const connector = myModule.DataConnector(configMemoryRef, timestamp);

      let paramRef = myModule.__pin(
        myModule.__newString(
          response_swaps
        )
      );
      connector.main(paramRef);
      let paramRef2 = myModule.__pin(
        myModule.__newString(
          `{"data":{"swaps":[]}}`
        )
      );
      const resultRef = connector.main(paramRef2);
      const result = myModule.__getString(resultRef);
      expect(result).toBe("true");
    });

    test("can run transformation and return candles", async () => {
      const timestamp = 1654012158
      let configMemoryRef = myModule.__pin(
        myModule.__newString(
          '{"poolAddress":"0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8","period":604800,"candleWidth":300}'
        )
      );
      // Instantiate
      const connector = myModule.DataConnector(configMemoryRef, timestamp);

      let paramRef = myModule.__pin(
        myModule.__newString(
          response_swaps
        )
      );
      connector.main(paramRef);
      const resultRef = connector.transform();
      const result = myModule.__getString(resultRef);
      let hexResult = hexEncode(result) as string;
      let hexExpected = hexEncode(candles);
      hexExpected = hexExpected.replace(/000d/g, '');
      hexExpected = hexExpected.replace(/0002/g, '');
      hexResult = hexResult.replace(/000d/g, '');
      hexResult = hexResult.replace(/0002/g, '');
      
      expect(hexResult).toBe(hexExpected);
    });

    test("fails imporper config", async () => {

      const timestamp = 1654012158
      let configMemoryRef = myModule.__pin(
        myModule.__newString(
          `{improper: "config"}`
        )
      );
      // The actual strategy instantiation and execution
      expect(() => {
        const connector = myModule.DataConnector(configMemoryRef, timestamp);
      }).toThrowError();
    });

  });
});
