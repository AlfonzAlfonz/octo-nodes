import { ArgType, OctoNodesLib } from "../../lib";
import { isSubType } from "./isSubType";

export const cast = <T>(
  implicitCasts: OctoNodesLib["implicitCasts"],
  from: ArgType<unknown>,
  to: ArgType<T>,
  value: unknown
): T | null => {
  if (isSubType(to, from, [])) return value as T;

  for (const impl of implicitCasts) {
    if (isSubType(impl.from, from, []) && isSubType(to, impl.to, [])) {
      const converted = impl.cast(value);
      if (to.testValue(converted)) {
        return converted;
      }
    }
  }
  return null;
};
