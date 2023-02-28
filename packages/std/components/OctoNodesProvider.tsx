import { FC, ReactNode, createContext, useContext } from "react";

import { NodeArg, NodeModel, OctoNodesLib } from "../lib";
import { Mutate, OctoNodesValue } from "../state";
import { TypeAnalysis } from "../typeAnalysis";

const _NodesContext = createContext<NodeModel[]>(null!);
const _NodeArgsContext = createContext<NodeArg[]>(null!);
const _UiContext = createContext<OctoNodesValue["ui"]>(null!);
const _NodeStateContext = createContext<Record<string, { value: unknown }>>(null!);
const _MutateContext = createContext<Mutate>(null!);
const _LibContext = createContext<OctoNodesLib>(null!);
const _TypeAnalysisContext = createContext<TypeAnalysis>(null!);

export const useNodes = () => useContext(_NodesContext);
export const useNodeArgs = () => useContext(_NodeArgsContext);
export const useUi = () => useContext(_UiContext);
export const useNodeState = () => useContext(_NodeStateContext);
export const useMutate = () => useContext(_MutateContext);
export const useLib = () => useContext(_LibContext);
export const useTypeAnalysis = () => useContext(_TypeAnalysisContext);

interface OctoNodesProviderProps {
  value: OctoNodesValue;
  children: ReactNode;
}

export const OctoNodesProvider: FC<OctoNodesProviderProps> = ({ value, children }) => {
  return (
    <_LibContext.Provider value={value.lib}>
      <_MutateContext.Provider value={value.mutate}>
        <_NodesContext.Provider value={value.state.nodes}>
          <_NodeArgsContext.Provider value={value.state.nodeArgs}>
            <_TypeAnalysisContext.Provider value={value.analysis}>
              <_NodeStateContext.Provider value={value.state.nodeState}>
                <_UiContext.Provider value={value.ui}>
                  {children}
                </_UiContext.Provider>
              </_NodeStateContext.Provider>
            </_TypeAnalysisContext.Provider>
          </_NodeArgsContext.Provider>
        </_NodesContext.Provider>
      </_MutateContext.Provider>
    </_LibContext.Provider>
  );
};
