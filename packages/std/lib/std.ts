import { OctoNodesLib } from ".";
import {
  anyType,
  arrayType,
  boolType,
  dbgTypeImplicitCasts,
  imageImplicitCasts,
  imageType,
  intType,
  neverType,
  numberType,
  renderableType,
  stringType,
  tupleType,
  unionType
} from "../argTypes";
import { Clock, Clone, Combine, Image, Input, SvgOutput, Position, Text, svgOutputImplicitCasts } from "../nodeTypes";

export const stdLib: OctoNodesLib = {
  nodeTypes: [
    Clock,
    Clone,
    Combine,
    Image,
    Input,
    SvgOutput,
    Position,
    Text
  ],
  argTypes: [
    neverType,
    boolType,
    intType,
    numberType,
    stringType,
    renderableType,
    imageType,
    anyType
  ],
  genericArgTypes: [
    arrayType,
    tupleType,
    unionType
  ],
  implicitCasts: [
    ...imageImplicitCasts,
    ...svgOutputImplicitCasts,
    ...dbgTypeImplicitCasts
  ]
};
