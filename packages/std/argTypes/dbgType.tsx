import { ReactNode } from "react";
import { argType, implicitCast } from "../lib";
import { boolType, numberType, stringType } from "./primitives";

type DbgTypeValue = DbgTypeValueContainer;

export const dbgType = argType<DbgTypeValue>({
  id: "dbg",
  name: "Debug type",
  color: "purple",
  testValue: x =>
    x === null ||
    x === undefined ||
    x === true ||
    x === false ||
    typeof x === "number" ||
    typeof x === "string" ||
    x instanceof DbgTypeValueContainer
});

export const dbgTypeImplicitCasts = [
  implicitCast(stringType, dbgType, x => new DbgTypeValueContainer(x)),
  implicitCast(boolType, dbgType, x => new DbgTypeValueContainer(x)),
  implicitCast(numberType, dbgType, x => new DbgTypeValueContainer(x))
];

export class DbgTypeValueContainer {
  public readonly value: ReactNode;

  public constructor (value: ReactNode) {
    this.value = value;
  }
}
