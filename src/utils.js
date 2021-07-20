export function on(source, event, callback, options) {
  source.addEventListener(event, callback, options);
  return () => source.removeEventListener(event, callback);
}

export function noop() {}


/**
 *
 * @param {AbortSignal} signal
 * @returns {AbortController}
 */
export function chainSignal(signal) {
  const controller = new AbortController();
  signal?.addEventListener('abort', () => controller.abort());
  return controller;
}