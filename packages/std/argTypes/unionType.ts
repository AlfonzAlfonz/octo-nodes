import { anyType } from "./anyType";
import { ArgType, spreadGenericArgType } from "../lib/argType";

interface UnionType {
  <T extends ArgType[]>(...type: T): ArgType<T[number]>;
  spreadGenerics: ArgType<unknown>;
}
export const unionType: UnionType = spreadGenericArgType(anyType, (...types) => ({
  id: ["union", types.map(t => t.id), false],
  name: `${types.map(t => t.name).join(" or ")}`,
  color: types[0]?.color ?? "violet",
  includes: types
}));
