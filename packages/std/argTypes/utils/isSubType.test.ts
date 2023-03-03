import { anyType } from "../anyType";
import { arrayType } from "../arrayType";
import { intType, numberType, renderableType, stringType } from "../primitives";
import { unionType } from "../unionType";
import { isSubType } from "./isSubType";

test("intType is subtype of numberType", () => {
  expect(isSubType(numberType, intType, [])).toBe(true);
});

test("arrayType(arrayType(unionType(numberType, stringType))) is subtype of arrayType(arrayType(unionType(anyType)))", () => {
  expect(
    isSubType(
      arrayType(arrayType(unionType(anyType))),
      arrayType(arrayType(unionType(numberType, stringType))),
      []
    )
  ).toBe(true);
});

test("arrayType(arrayType(unionType(numberType, stringType))) is subtype of arrayType(arrayType(unionType(renderableType)))", () => {
  expect(
    isSubType(
      arrayType(arrayType(unionType(renderableType))),
      arrayType(arrayType(unionType(numberType, stringType))),
      []
    )
  ).toBe(true);
});
