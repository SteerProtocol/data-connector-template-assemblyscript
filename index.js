const { loadWasm } = require("@steerprotocol/app-loader");

(async () => {
  const bundle = await loadWasm("./build/debug.wasm", {});
  const version = bundle.version();
  console.log("Version: " + version);
  
  bundle.initialize(`{
        "poolAddress": "0x5645dcb64c059aa11212707fbf4e7f984440a8cf",
        "lookback": 30000,
        "candleWidth": "30m",
        "subgraphEndpoint": "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon",
        "executionContext": {"epochTimestamp": 1685678400}
      }`);

  console.log("Executing Bundle...");
  await bundle.execute();
  console.log("Executed Bundle.");
  console.log("Transforming Data...");
  const transformed = await bundle.transform();
  console.log("Finished Transformation. " + transformed);
})();