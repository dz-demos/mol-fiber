import $mol_fiber_module from "mol_fiber";
const { $mol_fiber_sync } = $mol_fiber_module;

export function $mol_fiber_run_sync(request) {
  const syncFiber = $mol_fiber_sync(request);
  return syncFiber();
}
