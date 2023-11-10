import { loadWasm } from "@steerprotocol/app-loader";

(async () => {
  const bundle = await loadWasm("./build/debug.wasm", {});
  const version = bundle.version();
  console.log("Version: " + version);
  bundle.initialize(JSON.stringify({
    lookback: 12
  }));

  console.log("Executing Bundle...");
  await bundle.execute();
  console.log("Executed Bundle.");
  console.log("Transforming Data...");
  const transformed = await bundle.transform();
  console.log("Finished Transformation. ");
  console.log(JSON.parse(transformed));
})();