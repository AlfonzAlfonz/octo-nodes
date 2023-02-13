import { ReactNode, isValidElement } from "react";

const argType = <T extends unknown>(a: ArgType<T>) => a;

export const anyType = argType<unknown>({
  id: "any",
  name: "Any",
  color: "indigo",
  testValue: () => true
});

export const boolType = argType<boolean>({
  id: "bool",
  name: "Boolean",
  color: "yellow",
  testValue: x => typeof x === "boolean"
});

export const intType = argType<number>({
  id: "int",
  name: "Integer",
  color: "pink",
  testValue: x =>
    numberType.testValue(x) && Math.round(x as number) === x
});

export const numberType = argType<number>({
  id: "number",
  name: "Number",
  color: "red",
  testValue: x => typeof x === "number" && !Object.is(x, NaN)
});

export const stringType = argType<string>({
  id: "string",
  name: "Text",
  color: "white",
  testValue: x => typeof x === "string"
});

export const renderableType = argType<ReactNode>({
  id: "renderable",
  name: "Renderable",
  color: "white",
  testValue: x => isValidReactNode(x)
});

const isValidReactNode = (x: unknown): x is ReactNode =>
  numberType.testValue(x) ||
  stringType.testValue(x) ||
  boolType.testValue(x) ||
  x === null || x === undefined ||
  isValidElement(x) ||
  // eslint-disable-next-line @typescript-eslint/no-extra-parens
  (Array.isArray(x) && x.every(y => isValidReactNode(y)));

export const unionType = <T extends ArgType[]>(...types: T) =>
  argType({
    id: `union<${types.map(t => t.id).join(" or ")}`,
    name: `${types.map(t => t.name).join(" or ")}`,
    color: "black",
    testValue: x => types.some(t => t.testValue(x))
  });

export const arrayType = <T extends ArgType>(type: T) =>
  argType<T extends ArgType<infer U> ? U[] : never>({
    id: `array<${type.id}`,
    name: `Array<${type.name}`,
    color: "green",
    testValue: x => Array.isArray(x) && x.every(e => type.testValue(e))
  });

export const tupleType = <const T extends readonly ArgType[]>(...types: T) =>
  argType<{ [K in keyof T]: T[K] extends ArgType<infer U> ? U : never }>({
    id: `tuple<${types.map(t => t.id).join(", ")}>`,
    name: `Tuple<${types.map(t => t.name).join(", ")}>`,
    color: "blue",
    testValue: x => Array.isArray(x) && x.every((e, i) => types[i].testValue(e))
  });

export interface ArgType<T extends unknown = unknown> {
  id: string;
  name: string;
  help?: string;
  color: string;

  testValue: (value: unknown) => boolean;
}
