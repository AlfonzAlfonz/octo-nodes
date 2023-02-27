import { DependencyList } from "react";

export const areHookInputsEqual = (nextDeps: DependencyList, prevDeps: DependencyList) => {
  if (nextDeps.length !== prevDeps.length) {
    return false;
  }

  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (Object.is(nextDeps[i], prevDeps[i])) {
      continue;
    }

    return false;
  }

  return true;
};

export const more = <T>(x: T | T[]) => Array.isArray(x) ? x : [x];
