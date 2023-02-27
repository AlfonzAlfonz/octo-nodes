import { boolType, intType, neverType, numberType, renderableType, stringType } from "../argTypes";
import { anyType } from "../argTypes/anyType";
import { imageImplicitCasts, imageType } from "../argTypes/imageType";
import { Clone, Image, Input, Output, Position, Text } from "../nodeTypes";
import { Clock } from "../nodeTypes/Clock";
import { Combine } from "../nodeTypes/Combine";
import { ArgType, Cast } from "./argType";
import { NodeType } from "./nodeType";

export interface OctoNodesLib {
  nodeTypes: NodeType<any, any>[];
  argTypes: ArgType[];

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
  implicitCasts: [
    ...imageImplicitCasts
  ]
};
