import { ArgType, genericArgType } from "../lib";
import { anyType } from "./anyType";

interface ArrayType {
  <T extends unknown>(type: ArgType<T>): ArgType<T[]>;
  generics: [ArgType<unknown>];
}
export const arrayType: ArrayType = genericArgType([anyType], (type) => ({
  id: ["array", [type.id]],
  name: `Array<${type.name}>`,
  color: type.color,
  testValue: x => Array.isArray(x) && x.every(e => type.testValue(e))
}));
