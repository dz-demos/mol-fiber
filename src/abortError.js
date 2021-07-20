export class AbortError extends Error {
  constructor() {
    super('Aborted');
    this.name = 'AbortError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AbortError)
    }
  }
}