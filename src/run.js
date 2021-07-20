import { postponedFetch } from "./postponedFetch.js";

const controller = new AbortController();

setTimeout(() => {
  controller.abort();
}, 2100);

// I know that
(async () => {
  console.time("app");

  try {
    const response = await postponedFetch(
      "https://jsonplaceholder.typicode.com/todos/",
      { signal: controller.signal }
    );

    /** @type {Array<unknown>} */
    const todos = await response.json();
    console.log("todos amount:", todos.length);
    console.timeEnd("app");
  } catch (err) {
    console.error(err);
    console.timeEnd("app");
    process.exit(1);
  }
})();
