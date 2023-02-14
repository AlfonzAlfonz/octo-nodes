import { createContext, useContext } from "react";

import { NodeReference, NodeModel } from "../model";
import { MutateState } from "../state";

const _NodesContext = createContext<NodeModel[]>(null!);
const _ReferenceContext = createContext<NodeReference[]>(null!);
const _NodePositionContext = createContext<Record<string, { x: number; y: number }>>(null!);
const _NodeStateContext = createContext<Record<string, unknown>>(null!);
const _MutateContext = createContext<MutateState>(null!);

export const useNodes = () => useContext(_NodesContext);
export const useRefs = () => useContext(_ReferenceContext);
export const useNodePosition = () => useContext(_NodePositionContext);
export const useNodeState = () => useContext(_NodeStateContext);
export const useMutate = () => useContext(_MutateContext);

export const NodesProvider = _NodesContext.Provider;
export const RefsProvider = _ReferenceContext.Provider;
export const NodePositionProvider = _NodePositionContext.Provider;
export const NodeStateProvider = _NodeStateContext.Provider;
export const MutateProvider = _MutateContext.Provider;
