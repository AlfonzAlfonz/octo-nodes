import { DependencyList, Dispatch, EffectCallback, SetStateAction } from "react";

import { ArgType } from "../../argTypes/argType";
import { NodeType } from "../../nodeTypes/nodeType";

export type Arg<T extends unknown = unknown> = {
  type: ArgType<T>;
  name: string;
  defaultValue?: T;
};

export type NodeArg = NodeRefArg | NodeValueArg;

export type NodeValueArg = {
  value: unknown;
  to: [id: number, index: number];
};

export type NodeRefArg = {
  id: number;
  from: [id: number, index: number];
  to: [id: number, index: number];
};

export interface NodeModel {
  id: number;
  type: NodeType;
}
