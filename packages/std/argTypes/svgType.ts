import { ReactNode } from "react";
import { argType } from "../lib";

export const svgType = argType<SvgTypeValue>({
  id: "svg",
  name: "SVG",
  color: "brown",
  testValue: x => x instanceof SvgTypeValue
});

export class SvgTypeValue {
  public readonly value: ReactNode;
  public readonly width: number;
  public readonly height: number;

  public constructor (value: ReactNode, width: number, height: number) {
    this.value = value;
    this.width = width;
    this.height = height;
  }
}
