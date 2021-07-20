import fetch from "node-fetch";
import { pause } from "./pause.js";

/**
 * @param {RequestInfo} url
 * @param {RequestInit=} init
 */
export async function postponedFetch(url, init) {
  const signal = url.signal ?? init?.signal;
  await pause(2000, signal);
  return fetch(url, init);
}
