import { anyType } from "./anyType";
import { ArgType, spreadGenericArgType } from "../lib/argType";

interface TupleType {
  <T extends unknown[]>(...type: { [K in keyof T]: ArgType<T[K]> }): ArgType<T>;
  spreadGenerics: ArgType<unknown>;
}
export const tupleType: TupleType = spreadGenericArgType(anyType, (...types) => ({
  id: ["tuple", types.map(t => t.id)],
  name: `(${types.map(t => t.name).join(", ")})`,
  color: types[0]?.color ?? "violet",
  includes: types
}));
