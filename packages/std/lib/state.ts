import { ArgType } from "./argType";
import { NodeType } from "./nodeType";

export type ArgDeclaration<T extends unknown = unknown> = {
  type: ArgType<T>;
  name: string;
  defaultValue?: T;
};

export type NodeArg = NodeRefArg | NodeValueArg<unknown>;

export type NodeValueArg<T extends unknown> = {
  value: T;
  to: [id: number, index: number];
};

export type NodeRefArg = {
  id: number;
  from: [id: number, index: number];
  to: [id: number, index: number];
};

export interface NodeModel<T extends NodeType<any, any> = NodeType> {
  id: number;
  type: T;
}
