import { ArgType, spreadGenericArgType } from "../lib";
import { anyType } from "./anyType";

interface UnionType {
  <A extends unknown, B extends unknown>(a: ArgType<A>, b: ArgType<B>): ArgType<A | B>;
  <A extends unknown, B extends unknown, C extends unknown>(a: ArgType<A>, b: ArgType<B>, c: ArgType<C>): ArgType<A | B | C>;
  <T extends unknown>(...type: ArgType<T>[]): ArgType<T>;
  spreadGenerics: ArgType<unknown>;
}
export const unionType: UnionType = spreadGenericArgType(anyType, (...types) => ({
  id: ["union", types.map(t => t.id), false],
  name: `${types.map(t => t.name).join(" or ")}`,
  color: types[0]?.color ?? "violet",
  includes: types
}));
