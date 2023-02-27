import { FC, ReactNode, createContext, useContext } from "react";

import { OctoNodesLib } from "../../lib";
import { NodeArg, NodeModel } from "../../lib/state";
import { MutateState } from "../../state";

const _NodesContext = createContext<NodeModel[]>(null!);
const _NodeArgsContext = createContext<NodeArg[]>(null!);
const _NodePositionContext = createContext<Record<string, { x: number; y: number }>>(null!);
const _NodeStateContext = createContext<Record<string, { value: unknown }>>(null!);
const _MutateContext = createContext<MutateState>(null!);
const _LibContext = createContext<OctoNodesLib>(null!);

export const useNodes = () => useContext(_NodesContext);
export const useNodeArgs = () => useContext(_NodeArgsContext);
export const useNodePosition = () => useContext(_NodePositionContext);
export const useNodeState = () => useContext(_NodeStateContext);
export const useMutate = () => useContext(_MutateContext);
export const useLib = () => useContext(_LibContext);

interface OctoNodesProviderProps {
  lib: OctoNodesLib;
  mutate: MutateState;

  nodes: NodeModel[];
  nodeArgs: NodeArg[];

  nodeState: Record<string, { value: unknown }>;

  children: ReactNode;
}

export const OctoNodesProvider: FC<OctoNodesProviderProps> = p => {
  return (
    <_LibContext.Provider value={p.lib}>
      <_MutateContext.Provider value={p.mutate}>
        <_NodesContext.Provider value={p.nodes}>
          <_NodeArgsContext.Provider value={p.nodeArgs}>
            <_NodeStateContext.Provider value={p.nodeState}>
              {p.children}
            </_NodeStateContext.Provider>
          </_NodeArgsContext.Provider>
        </_NodesContext.Provider>
      </_MutateContext.Provider>
    </_LibContext.Provider>
  );
};

interface OctoNodesUiProviderProps {
  nodePosition: Record<string, { x: number; y: number }>;
  children: ReactNode;
}

export const OctoNodesUiProvider: FC<OctoNodesUiProviderProps> = ({ nodePosition, children }) => {
  return (
    <_NodePositionContext.Provider value={nodePosition}>
      {children}
    </_NodePositionContext.Provider>
  );
};
