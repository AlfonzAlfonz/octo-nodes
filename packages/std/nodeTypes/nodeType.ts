import { DependencyList, Dispatch, EffectCallback, SetStateAction } from "react";

import { ArgType } from "../argTypes/argType";
import { Arg } from "../components/EditorApp/model";

export type NodeType<
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

export const nodeType = <
  const TArgs extends readonly Arg[],
  const TReturns extends readonly Arg[]
>(node: NodeType<TArgs, TReturns>): NodeType<TArgs, TReturns> => node;

type ArgTypeType<T extends ArgType> = T extends ArgType<infer U> ? U : never;
