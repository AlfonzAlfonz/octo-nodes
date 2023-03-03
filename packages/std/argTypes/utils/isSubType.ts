import { ArgType, ArgTypeId, OctoNodesLib } from "../../lib";
import { more } from "../../utils";
import { argTypeEquals } from "./areTypesEqual";

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

  if (type.id === "any") return true;

  // TODO: fix this
  if (argNamesEqual(type.id, subType.id) || more(type.includes ?? []).some(t => isSubType(t, subType, implicitCasts))) {
    return true;
  }

  return (
    argTypeEquals(type.id, subType.id) ||
    more(type.includes ?? []).some(t => isSubType(t, subType, implicitCasts)) ||
    implicitCasts.some(c => isSubType(subType, c.from, []) && isSubType(type, c.to, []))
  );
};

export type GenericPlaceholder<T extends unknown> = {
  infered: ArgType<T>;
  base: ArgType<T>;
};

export const genericPlaceholder = <T>(base: ArgType<T>): GenericPlaceholder<T> => ({ infered: null!, base });

const argNamesEqual = (a: ArgTypeId, b: ArgTypeId) =>
  (typeof a === "string" ? a : a[0]) === (typeof b === "string" ? b : a[0]);
