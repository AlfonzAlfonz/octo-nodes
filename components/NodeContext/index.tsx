import { Arg, NodeModel, NodeState } from "model";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

type ContextValue<T> = [T, Dispatch<SetStateAction<T>>];

const _NodesContext = createContext<ContextValue<NodeModel[]>>(null!);
const _DataContext = createContext<ContextValue<Arg[]>>(null!);
const _StateContext = createContext<ContextValue<Record<string, NodeState | undefined>>>(null!);

export const useNodes = () => useContext(_NodesContext);
export const useNodeData = () => useContext(_DataContext);
export const useNodeState = () => useContext(_StateContext);

export const NodesProvider = _NodesContext.Provider;
export const DataProvider = _DataContext.Provider;
export const StateProvider = _StateContext.Provider;
