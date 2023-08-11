const { loadWasm } = require("../app-loader");

loadWasm("./build/debug.wasm", {}).then(mod => {
  mod.initialize(
`{
  "poolAddress": "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",
  "lookback": 30000,
  "candleWidth": "5m",
  "subgraphEndpoint": "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon",
  "executionContext": {"epochTimestamp": 1674666008}
}`);
  console.log("Executing...");
  mod.execute();
  console.log("Finished executing");
  console.log("Writing transformed data to STDOUT");
  console.log(mod.transform());
});