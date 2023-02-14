import { createContext, useContext } from "react";

import { ArgValue, NodeModel } from "../model";
import { MutateState } from "../state";

const _NodesContext = createContext<NodeModel[]>(null!);
const _ArgValuesContext = createContext<ArgValue[]>(null!);
const _NodePositionContext = createContext<Record<string, { x: number; y: number }>>(null!);
const _NodeStateContext = createContext<Record<string, { value: unknown }>>(null!);
const _MutateContext = createContext<MutateState>(null!);

export const useNodes = () => useContext(_NodesContext);
export const useArgValues = () => useContext(_ArgValuesContext);
export const useNodePosition = () => useContext(_NodePositionContext);
export const useNodeState = () => useContext(_NodeStateContext);
export const useMutate = () => useContext(_MutateContext);

export const NodesProvider = _NodesContext.Provider;
export const ArgValueProvider = _ArgValuesContext.Provider;
export const NodePositionProvider = _NodePositionContext.Provider;
export const NodeStateProvider = _NodeStateContext.Provider;
export const MutateProvider = _MutateContext.Provider;
