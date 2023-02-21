import { DependencyList } from "react";

import { Arg } from "../components/EditorApp/model";
import { ArgType } from "../argTypes/argType";

export const validateValue = <T extends unknown>(argDeclaration: Arg<T>, value: unknown): T | null =>
  (argDeclaration.type.testValue(value) ? value : null) ?? argDeclaration.defaultValue ?? null;

export const isSubType = <T>(type: ArgType<T>, subType: ArgType): subType is ArgType<T> =>
  subType.id === type.id || more(type.includes ?? []).some(t => isSubType(t, subType));

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
