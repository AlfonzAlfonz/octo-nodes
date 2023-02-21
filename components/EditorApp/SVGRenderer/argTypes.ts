import { ReactNode, isValidElement } from "react";
import { more } from "../utils";

const argType = <T extends unknown>(
  a: Omit<ArgType<T>, "testValue"> & { testValue?: (x: unknown) => boolean }
): ArgType<T> => ({
  ...a,
  testValue: (v): v is T =>
    (more(a.includes ?? []).some(t => t?.testValue?.(v) ?? false) ?? false) ||
    (a.testValue?.(v) ?? false)
});

export const anyType = argType<unknown>({
  id: "never",
  name: "Never",
  color: "cyan",
  testValue: () => true
});

export const neverType = argType<never>({
  id: "never",
  name: "Never",
  color: "indigo"
});

export const boolType = argType<boolean>({
  id: "bool",
  name: "Boolean",
  color: "black",
  includes: neverType,
  testValue: x => typeof x === "boolean"
});

export const intType = argType<number>({
  id: "int",
  name: "Integer",
  color: "darkOrange",
  includes: neverType,
  testValue: x => typeof x === "number" && Math.round(x) === x
});

export const numberType = argType<number>({
  id: "number",
  name: "Number",
  color: "darkOrange",
  includes: intType,
  testValue: x => typeof x === "number" && !Object.is(x, NaN)
});

export const stringType = argType<string>({
  id: "string",
  name: "Text",
  color: "white",
  includes: neverType,
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
    id: `union<${types.map(t => t.id).join(" or ")}>`,
    name: `${types.map(t => t.name).join(" or ")}`,
    color: types[0]?.color ?? "violet",
    includes: types as ArgType[]
  });

export const tupleType = <const T extends readonly ArgType[]>(...types: T) =>
  argType<{ [K in keyof T]: T[K] extends ArgType<infer U> ? U : never }>({
    id: `tuple<${types.map(t => t.id).join(", ")}>`,
    name: `Tuple<${types.map(t => t.name).join(", ")}>`,
    color: "violet",
    testValue: x => Array.isArray(x) && x.every((e, i) => types[i].testValue(e))
  });

export const renderableType = argType<ReactNode>({
  id: "renderable",
  name: "Renderable",
  color: "white",
  includes: unionType(numberType, stringType, boolType, arrayType(unionType(numberType, stringType, boolType))),
  testValue: x => x === null || x === undefined || isValidElement(x)
});

export interface ArgType<T extends unknown = unknown> {
  id: string;
  name: string;
  help?: string;
  color: string;

  includes?: ArgType<unknown> | ArgType<unknown>[];
  testValue: (value: unknown) => value is T;
}
