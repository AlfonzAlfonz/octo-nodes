import { OctoNodesLib } from ".";
import {
  anyType,
  arrayType,
  boolType,
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
import { Clock, Clone, Combine, Image, Input, Output, Position, Text } from "../nodeTypes";

export const stdLib: OctoNodesLib = {
  nodeTypes: [
    Clock,
    Clone,
    Combine,
    Image,
    Input,
    Output,
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
    ...imageImplicitCasts
  ]
};
