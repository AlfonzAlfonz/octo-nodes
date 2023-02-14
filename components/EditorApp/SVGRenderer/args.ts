import { ReactNode, isValidElement } from "react";

const argType = <T extends unknown>(
  a: Omit<ArgType<T>, "testValue"> & { testValue: (x: unknown) => boolean }
): ArgType<T> => a as ArgType<T>;

export const anyType = argType<unknown>({
  id: "any",
  name: "Any",
  color: "indigo",
  testValue: () => true
});

export const boolType = argType<boolean>({
  id: "bool",
  name: "Boolean",
  color: "black",
  extends: anyType,
  testValue: x => typeof x === "boolean"
});

export const numberType = argType<number>({
  id: "number",
  name: "Number",
  color: "darkOrange",
  extends: anyType,
  testValue: x => typeof x === "number" && !Object.is(x, NaN)
});

export const intType = argType<number>({
  id: "int",
  name: "Integer",
  color: "darkOrange",
  extends: numberType,
  testValue: x => Math.round(x as number) === x
});

export const stringType = argType<string>({
  id: "string",
  name: "Text",
  color: "white",
  extends: anyType,
  testValue: x => typeof x === "string"
});

export const arrayType = <T extends ArgType>(type: T) =>
  argType<T extends ArgType<infer U> ? U[] : never>({
    id: `array<${type.id}`,
    name: `Array<${type.name}`,
    color: type.color,
    testValue: x => Array.isArray(x) && x.every(e => type.testValue(e))
  });

export const unionType = <T extends ArgType[]>(...types: T) =>
  argType({
    id: `union<${types.map(t => t.id).join(" or ")}`,
    name: `${types.map(t => t.name).join(" or ")}`,
    color: types[0]?.color ?? "violet",
    testValue: x => types.some(t => t.testValue(x))
  });

export const tupleType = <const T extends readonly ArgType[]>(...types: T) =>
  argType<{ [K in keyof T]: T[K] extends ArgType<infer U> ? U : never }>({
    id: `tuple<${types.map(t => t.id).join(", ")}>`,
    name: `Tuple<${types.map(t => t.name).join(", ")}>`,
    color: "violet",
    extends: arrayType(unionType(...types)),
    testValue: x => Array.isArray(x) && x.every((e, i) => types[i].testValue(e))
  });

export const renderableType = argType<ReactNode>({
  id: "renderable",
  name: "Renderable",
  color: "white",
  extends: unionType(numberType, stringType, boolType, arrayType(unionType(numberType, stringType, boolType))),
  testValue: x => x === null || x === undefined || isValidElement(x)
});

export interface ArgType<T extends unknown = unknown> {
  id: string;
  name: string;
  help?: string;
  color: string;

  extends?: ArgType<unknown>;
  testValue: (value: unknown) => value is T;
}
