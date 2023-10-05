import { loadWasm, loadWasmSync } from "../app-loader";
import {
  DataConnector,
  DataConnectorExecution
} from "../data-connector-loader";

(async () => {
  const connector = new DataConnector("./build/release.wasm", `{
  "poolAddress": "0x5645dcb64c059aa11212707fbf4e7f984440a8cf",
  "lookback": 30000,
  "candleWidth": "30m",
  "subgraphEndpoint": "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon",
  "executionContext": {"epochTimestamp": 1685678400}
}`);

  await connector.load();

  const version = connector.version();

  console.log(`Version: ${version}`);

  const executionManager = new DataConnectorExecution([connector]);

  const config = '{"strategyConfigData":{"lookback":5,"multiplier":1.1,"binWidth":600,"poolFee":3000,"epochStart":1674644400.236,"epochLength":"3600"},"vaultPayload":{"maxTotalSupply":"10000000000000000000000000","ratioErrorTolerance":20,"maxTickChange":750,"twapInterval":45,"fee":500,"slippage":1},"dataConnectorsData":[{"bundleHash":"QmZx9ZBU5H2o8WQUCCERpVNHneUQu4WZJy1ASGTnBESk7Z","configData":{"poolAddress":"0x45dda9cb7c25131df268515131f647d726f50608","lookback":30000,"candleWidth":120}}]}';
  const data = await executionManager.execute(config);
  console.log("Data: ", data);
})();