import { DependencyList } from "react";

import { Arg } from "./model";
import { ArgType } from "./SVGRenderer/args";

export const validateValue = <T extends unknown>(argDeclaration: Arg<T>, value: unknown): T | null =>
  (validateType(argDeclaration.type, value) ? value : null) ?? argDeclaration.defaultValue ?? null;

const validateType = <T extends unknown>(
  argType: ArgType<T>,
  value: unknown
): value is T => {
  if (argType.extends && validateType(argType.extends, value)) {
    return true;
  }
  return argType.testValue(value);
};

const isSubType = (type: ArgType, subType: ArgType) => false;

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
