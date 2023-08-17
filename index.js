const { loadWasm } = require("../app-loader");

loadWasm("./build/debug.wasm", {}).then(mod => {
  mod.initialize(
`{
  "poolAddress": "0x5645dcb64c059aa11212707fbf4e7f984440a8cf",
  "lookback": 30000,
  "candleWidth": "30m",
  "subgraphEndpoint": "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon",
  "executionContext": {"epochTimestamp": 1685678400}
}`);
  // Timestamp: 6/1/2023
  console.log("Executing...");
  mod.execute();
  console.log("Finished executing");
  console.log("Writing transformed data to STDOUT");
  console.log(mod.transform());
});