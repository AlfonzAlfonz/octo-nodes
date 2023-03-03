import { ArgTypeId } from "../../lib";

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
