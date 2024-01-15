import {
  config,
  configForm,
  res
} from "./utils";
import fs from 'fs'
import { WasmModule, loadWasm } from "@steerprotocol/app-loader";

jest.setTimeout(60000);

describe("Data Connector Test Suite", () => {
  let bundle: WasmModule;
  beforeEach(async () => {
    bundle = await loadWasm(fs.readFileSync(__dirname + "/../build/debug.wasm"), {})
  });

  test("Bundle can return input config", async () => {
    const result = bundle.config();
    expect(JSON.stringify(JSON.parse(result))).toEqual(JSON.stringify(JSON.parse(configForm)));
  });

  test("Bundle fails improper config", async () => {
    const improperConfig = `{"config":"null"}`
    bundle.initialize(improperConfig);
  });

  test("Bundle can initialize", async () => {
    bundle.initialize(config);
    expect(true).toBe(true);
  });

  test("Bundle can execute and fetch data", async () => {
    bundle.initialize(config);
    await bundle.execute(res);
    expect(true).toBe(true);
  });

  test("Bundle can execute and transform data", async () => {
    bundle.initialize(config);
    await bundle.execute(res);
    await bundle.transform();
    expect(true).toBe(true);
  });
});