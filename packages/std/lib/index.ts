import { ArgType, GenericArgType, SpreadGenericArgType } from "./argType";
import { NodeType } from "./nodeType";

export * from "./argType";
export * from "./nodeType";
export * from "./state";

export interface OctoNodesLib {
  nodeTypes: NodeType<any, any, any>[];
  argTypes: ArgType[];
  genericArgTypes: (GenericArgType | SpreadGenericArgType)[];

  implicitCasts: Cast<any, unknown>[];
}

export type Cast<From, To> = {
  from: ArgType<From>;
  to: ArgType<To>;

  cast: (v: From) => To;
};
export const implicitCast = <From, To>(
  from: ArgType<From>,
  to: ArgType<To>,
  cast: (v: From) => To
): Cast<From, To> => ({ from, to, cast });
