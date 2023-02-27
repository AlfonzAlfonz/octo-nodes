import { DependencyList, Dispatch, EffectCallback, SetStateAction } from "react";

import { ArgType } from "./argType";
import { ArgDeclaration } from "./state";

export type NodeType<
  TGenerics extends readonly ArgType[] = readonly ArgType[],
  TArgs extends readonly ArgDeclaration[] = readonly ArgDeclaration[],
  TReturns extends readonly ArgDeclaration[] = readonly ArgDeclaration[]
> = {
  id: string;
  name: string;
  generics?: TGenerics;
  args: TArgs | ((...generics: TGenerics) => TArgs);
  returns: TReturns | ((...generics: TGenerics) => TReturns);
  render: (
    args: MapArgDeclarationsToArgs<TArgs>,
    opts: {
      useEffect: (effect: EffectCallback, args: DependencyList) => unknown;
      useState: <T>(initialState?: T) => [T, Dispatch<SetStateAction<T>>];
    }
  ) => TReturns["length"] extends 1
    ? ArgTypeType<TReturns[0]["type"]> | null
    : Readonly<{ -readonly [K in keyof TReturns]: ArgTypeType<TReturns[K]["type"]> | null }>;
};

export const nodeType = <
  const TGenerics extends readonly ArgType[],
  const TArgs extends readonly ArgDeclaration[],
  const TReturns extends readonly ArgDeclaration[]
>(node: NodeType<TGenerics, TArgs, TReturns>): NodeType<TGenerics, TArgs, TReturns> => node;

type ArgTypeType<T extends ArgType> = T extends ArgType<infer U> ? U : never;

export type MapArgDeclarationsToArgs<TArgs extends readonly ArgDeclaration[]> = { [K in keyof TArgs]: ArgTypeType<TArgs[K]["type"]> };

export type NodeTypeReturnType<T extends NodeType<any, any, any>> = ReturnType<T["render"]>;
