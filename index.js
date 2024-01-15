const { DataConnector, DataConnectorExecution } = require("@steerprotocol/data-connector-loader");

(async () => {
  const bundle = new DataConnector("./build/debug.wasm", `{"lookback":12}`);
  await bundle.load();
  const version = bundle.version();
  console.log("Version: " + version);
  const manager = new DataConnectorExecution([bundle]);
  console.log("Executing Bundle...");
  const executed = await manager.execute(`{"strategyConfigData":{}}`);
  console.log("Executed Bundle.", executed);
})();