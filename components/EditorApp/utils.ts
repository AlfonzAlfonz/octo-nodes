import { DependencyList } from "react";
import { Arg } from "./model";

export const validateValue = <T extends unknown>(
  argDeclaration: Arg<T>,
  value: unknown = argDeclaration.defaultValue
): T | null =>
  argDeclaration.type.testValue(value) ? value as T : null;

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
