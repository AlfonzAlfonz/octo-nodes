import { DependencyList, Dispatch, EffectCallback, SetStateAction } from "react";

import { ArgType } from "./SVGRenderer/argTypes";

export type Arg<T extends unknown = unknown> = {
  type: ArgType<T>;
  name: string;
  defaultValue?: T;
};

export type NodeDeclaration<
  TArgs extends readonly Arg[] = readonly Arg[],
  TReturns extends readonly Arg[] = readonly Arg[]
> = {
  id: string;
  name: string;
  args: TArgs;
  returns: TReturns;
  render: (
    args: { [K in keyof TArgs]: ArgTypeType<TArgs[K]["type"]> },
    opts: {
      useEffect: (effect: EffectCallback, args: DependencyList) => unknown;
      useState: <T>(initialState?: T) => [T, Dispatch<SetStateAction<T>>];
    }
  ) => TReturns["length"] extends 1
    ? ArgTypeType<TReturns[0]["type"]>
    : { -readonly [K in keyof TReturns]: ArgTypeType<TReturns[K]["type"]> };
};

export const nodeDeclaration = <
  const TArgs extends readonly Arg[],
  const TReturns extends readonly Arg[]
>(node: NodeDeclaration<TArgs, TReturns>): NodeDeclaration<TArgs, TReturns> => node;

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
  type: NodeDeclaration;
}

type ArgTypeType<T extends ArgType> = T extends ArgType<infer U> ? U : never;