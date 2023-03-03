import { ArgType } from "./argType";
import { NodeType } from "./nodeType";

export type ArgDeclaration<T extends unknown = unknown> = {
  type: ArgType<T>;
  name: string;
  defaultValue?: T;
};

export type NodeArg = NodeRefArg | NodeValueArg<unknown>;

export type NodeValueArg<T extends unknown> = {
  type: ArgType<T>;
  value: T;
  to: NodeArgId;
};

export type NodeRefArg = {
  from: NodeArgId;
  to: NodeArgId;
};

export interface NodeModel<T extends NodeType<any, any, any> = NodeType> {
  id: NodeId;
  type: T;
}

declare const nodeId: unique symbol;
export type NodeId = number & {
  [nodeId]: "nodeId";
};

export type NodeArgId = [node: NodeId, index: number];
