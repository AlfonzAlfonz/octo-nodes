import { isValidElement, ReactNode } from "react";

import { argType } from "../lib";
import { arrayType } from "./arrayType";
import { unionType } from "./unionType";

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

export const renderableType = argType<ReactNode>({
  id: "renderable",
  name: "Renderable",
  color: "white",
  includes: unionType(
    unionType(numberType, stringType, boolType),
    arrayType(unionType(numberType, stringType, boolType))
  ),
  testValue: x => x === null || x === undefined || isValidElement(x)
});
