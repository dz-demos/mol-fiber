import $mol_fiber_module from "mol_fiber";
import { pause } from "../pause.js";
import { postponedFetch } from "../postponedFetch.js";
import { chainSignal } from "../utils.js";

const { $mol_fiber, $mol_fiber_sync, $mol_fiber_func } = $mol_fiber_module;

export const f_pause = $mol_fiber_sync((ms, signal) => {
  const controller = chainSignal(signal);
  $mol_fiber.current.abort = () => controller.abort();
  return pause(ms, controller.signal);
});

export const f_postponedFetch = $mol_fiber_sync((url, init) => {
  const signal = url.signal ?? init?.signal;
  const controller = chainSignal(signal);
  $mol_fiber.current.abort = () => controller.abort();
  const newUrl =
    typeof url === "string"
      ? url
      : {
          ...url,
          signal: controller.signal,
        };
  const newInit = {
    ...init,
    signal: controller.signal,
  };
  return postponedFetch(newUrl, newInit);
});

/** @type {typeof console}*/
export const f_console = Object.fromEntries(
  Object.entries(console).map(([key, value]) => [
    key,
    typeof value === "function" ? $mol_fiber_func(value) : value,
  ])
);
