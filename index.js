const { loadWasm } = require("@steerprotocol/app-loader");

(async () => {
  const bundle = await loadWasm("./build/debug.wasm", {});
  const version = bundle.version();
  console.log("Version: " + version);
  bundle.initialize(JSON.stringify({
    url: "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?sort=-record_date&filter=security_desc:in:(Treasury%20Bills,Treasury%20Notes,Treasury%20Bonds)",
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