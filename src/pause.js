import { AbortError } from "./abortError.js";
import { noop, on } from "./utils.js";

/**
 * @param {number} ms
 * @param {AbortSignal} signal
 * @return {Promise<void>}
 */
export function pause(ms, signal) {
  if (signal?.aborted) {
    return Promise.reject(new AbortError());
  }
  return new Promise((resolve, reject) => {
    const cleaners = {
      timeoutId: 0,
      unsubscribeAbort: noop,
    };
    const clean = () => {
      clearTimeout(cleaners.timeoutId);
      cleaners.unsubscribeAbort();
    };

    if (signal != undefined) {
      cleaners.unsubscribeAbort = on(signal, "abort", () => {
        clean();
        reject(new AbortError());
      });
    }

    cleaners.timeoutId = setTimeout(() => {
      clean();
      resolve();
    }, ms);
  });
}
