import { ArgType } from "components/SVGRenderer/args";

export type ArgDeclaration<T extends unknown = unknown> = {
  type: ArgType<T>;
  name: string;
  defaultValue?: T;
};

export type NodeDeclaration<
  TArgs extends readonly ArgDeclaration[] = readonly ArgDeclaration[],
  TReturns extends readonly ArgDeclaration[] = readonly ArgDeclaration[]
> = {
  id: string;
  name: string;
  args: TArgs;
  returns: TReturns;
  render: (
    args: { [K in keyof TArgs]: RenderPhaseArg<ArgTypeType<TArgs[K]["type"]>> },
    opts: { renderArg: RenderArg }
  ) => TReturns["length"] extends 1
    ? ArgTypeType<TReturns[0]["type"]>
    : { [K in keyof TReturns]: ArgTypeType<TReturns[K]["type"]> };
};

export type Arg = ArgRef | ArgValue;

export type ArgRef = {
  id: number;
  from: [id: number, index: number];
  to: [id: number, index: number];
};

export type ArgValue = {
  id: number;
  value: string | number;
  to: [id: number, index: number];
};

export interface NodeModel {
  id: number;
  type: NodeDeclaration;
}

export interface NodeState {
  position: { x: number; y: number };
}

export type RenderArg = <T extends unknown>(id: RenderPhaseArg<T> | null | undefined) => T | null;

export type RenderPhaseArg<T extends unknown> = { index: number };

export const addNode = <const T extends readonly ArgDeclaration[]>(nodes: NodeModel[], type: NodeDeclaration<T>): NodeModel[] =>
  [...nodes as any, { id: getNewId(nodes), type }];

export const addRef = (data: Arg[], ref: Omit<ArgRef, "id">) =>
  [...data, { id: getNewId(data), ...ref }];

export const addValue = (data: Arg[], value: Omit<ArgValue, "id">) =>
  [...data, { id: getNewId(data), ...value }];

export const getNewId = (array: { id: number }[]) => array.reduce((acc, x) => x.id > acc ? x.id : acc, 0) + 1;

type ArgTypeType<T extends ArgType> = T extends ArgType<infer U> ? U : never;
