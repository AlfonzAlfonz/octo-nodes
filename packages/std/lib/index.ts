import { boolType, intType, neverType, numberType, renderableType, stringType } from "../argTypes";
import { anyType } from "../argTypes/anyType";
import { arrayType } from "../argTypes/arrayType";
import { imageImplicitCasts, imageType } from "../argTypes/imageType";
import { tupleType } from "../argTypes/tupleType";
import { unionType } from "../argTypes/unionType";
import { Clone, Image, Input, Output, Position, Text } from "../nodeTypes";
import { Clock } from "../nodeTypes/Clock";
import { Combine } from "../nodeTypes/Combine";
import { ArgType, Cast, GenericArgType, SpreadGenericArgType } from "./argType";
import { NodeType } from "./nodeType";

export interface OctoNodesLib {
  nodeTypes: NodeType<any, any>[];
  argTypes: ArgType[];
  genericArgTypes: (GenericArgType | SpreadGenericArgType)[];

  implicitCasts: Cast<any, unknown>[];
}

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
