import { OctoNodesLib } from "../lib";
import { ArgType, ArgTypeId } from "../lib/argType";
import { ArgDeclaration } from "../lib/state";
import { more } from "../utils";

export const resolveGenerics = <const TArgs extends readonly ArgDeclaration[] = readonly ArgDeclaration[]>(
  args: TArgs | ((...generics: any[]) => TArgs),
  generics?: readonly any[]
) => typeof args === "function" ? args(...generics ?? []) : args;

export const validateValue = <T extends unknown>(
  from: ArgType<unknown>,
  to: ArgType<T>,
  value: unknown,
  lib: OctoNodesLib
): T | null => {
  if (to.testValue(value)) {
    return value ?? null;
  }

  for (const impl of lib.implicitCasts) {
    if (argTypeEquals(impl.from.id, to.id) && argTypeEquals(impl.to.id, to.id)) {
      const converted = impl.cast(value);
      if (to.testValue(converted)) {
        return converted;
      }
    }
  }

  return null;
};

export const isSubType = <T>(type: ArgType<T>, subType: ArgType): boolean =>
  type.id === "any" || argTypeEquals(type.id, subType.id) || more(type.includes ?? []).some(t => isSubType(t, subType));

export const argTypeEquals = (a: ArgTypeId, b: ArgTypeId): boolean => {
  // simple string compare
  if (typeof a === "string" && typeof b === "string") return a === b;

  return false;
};
