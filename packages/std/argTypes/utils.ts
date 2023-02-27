import { OctoNodesLib } from "../lib";
import { ArgType, ArgTypeId } from "../lib/argType";
import { ArgDeclaration } from "../lib/state";
import { more } from "../utils";

export const resolveGenerics = <const TArgs extends readonly ArgDeclaration[] = readonly ArgDeclaration[]>(
  args: TArgs | ((...generics: any[]) => TArgs),
  generics?: readonly (GenericPlaceholder<unknown> | ArgType<unknown>)[]
) => typeof args === "function" ? args(...generics ?? []) : args;

export const validateValue = <T extends unknown>(
  from: ArgType<unknown>,
  to: ArgType<T>,
  value: unknown,
  implicitCasts: OctoNodesLib["implicitCasts"]
): T | null => {
  if (to.testValue(value)) {
    return value ?? null;
  }

  for (const impl of implicitCasts) {
    if (isSubType(from, impl.from, []) && isSubType(to, impl.to, [])) {
      const converted = impl.cast(value);
      if (to.testValue(converted)) {
        return converted;
      }
    }
  }

  return null;
};

export const isSubType = <T>(
  type: GenericPlaceholder<T> | ArgType<T>,
  subType: ArgType,
  implicitCasts: OctoNodesLib["implicitCasts"]
): boolean => {
  if ("infered" in type) {
    if (isSubType(type.base, subType, implicitCasts)) {
      type.infered = subType as ArgType<T>;
      return true;
    }
    return false;
  }

  return (
    type.id === "any" ||
    argTypeEquals(type.id, subType.id) ||
    more(type.includes ?? []).some(t => isSubType(t, subType, implicitCasts)) ||
    implicitCasts.some(c => isSubType(subType, c.from, []) && isSubType(type, c.to, []))
  );
};

export const argTypeEquals = (a: ArgTypeId, b: ArgTypeId): boolean => {
  // simple string compare
  if (typeof a === "string" && typeof b === "string") return a === b;

  if (Array.isArray(a) && Array.isArray(b)) {
    // generics are ordered
    if (a.length === 2 && b.length === 2) {
      return a[0] === b[0] && a[1].length === b[1].length && a[1].every((ga, i) => argTypeEquals(ga, b[1][i]));
    }

    // generics are not ordered
    if (a[0] !== b[0] || a[1].length !== b[1].length) return false;

    for (const ga of a[1]) {
      if (!b[1].some(gb => argTypeEquals(ga, gb))) return false;
    }

    for (const gb of b[1]) {
      if (!a[1].some(ga => argTypeEquals(ga, gb))) return false;
    }
    return true;
  }

  return false;
};

type GenericPlaceholder<T extends unknown> = {
  infered: ArgType<T>;
  base: ArgType<T>;
};

export const genericPlaceholder = <T>(base: ArgType<T>): GenericPlaceholder<T> => ({ infered: null!, base });
