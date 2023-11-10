import { Config } from "./types";

/**
 * Resets memory allocator state
 * Memory references are freed and allowed to be overwritten
 * May be called manually or by host
 */
export function reset(): void {
    if (isDefined(__reset())) {
        __reset();
    } else {
        throw new Error("__reset() is not implemented. Build with the --runtime stub flag.");
    }
}

/**
 * Validates that a specified configuration is incorrectly formatted
 * @param config - Config
 * @returns void
 */
export function isInvalidConfig(config: Config): boolean {
    return !config.lookback;
}