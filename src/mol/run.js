import $mol_fiber_module from "mol_fiber";
import { $mol_fiber_run_sync } from "./$mol.js";
import { f_console, f_postponedFetch } from "./wrapped.js";

const { $mol_fiber_defer } = $mol_fiber_module;

const task = $mol_fiber_defer(() => {
  f_console.time("app");
  const response = f_postponedFetch(
    "https://jsonplaceholder.typicode.com/todos/"
  );

  /** @type {Array<unknown>} */
  const todos = $mol_fiber_run_sync(() => response.json());
  f_console.log("todos amount:", todos.length);
  f_console.timeEnd("app");
});

setTimeout(() => {
  task.destructor();
}, 2100).unref();
