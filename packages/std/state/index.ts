import { DependencyList, Dispatch, EffectCallback, MutableRefObject, useMemo, useRef } from "react";

import { ArgType, NodeType, OctoNodesLib } from "../lib";
import { TypeAnalysis, analyseTypes } from "../typeAnalysis";
import { AppState, AppStateAction, useEditorAppStateReducer } from "./useEditorAppStateReducer";

export interface OctoNodesValue extends AppState {
  lib: OctoNodesLib;
  mutate: Mutate;
  analysis: TypeAnalysis;
}

export type Mutate = ReturnType<typeof mutateFuncs>;
export type PrevEffectList = Map<number, [ReturnType<EffectCallback>, DependencyList]>;

export const useOctoNodes = (lib: OctoNodesLib): OctoNodesValue => {
  const prevEffectList = useRef<PrevEffectList>(new Map());

  const [state, dispatch] = useEditorAppStateReducer();

  const analysis = useMemo(() =>
    analyseTypes(lib, state.state.nodes, state.state.nodeArgs),
  [lib, state.state.nodeArgs, state.state.nodes]);

  const mutate = useMemo<Mutate>(() => mutateFuncs(dispatch, prevEffectList), [dispatch]);

  return {
    ...state,
    lib,
    mutate,
    analysis
  };
};

const mutateFuncs = (
  dispatch: Dispatch<AppStateAction | AppStateAction[]>,
  prevEffectList: MutableRefObject<PrevEffectList>
) => {
  const addNode = (node: NodeType) => dispatch({ action: "addNode", node });
  const moveNode = (id: number, position: { x: number; y: number }) => dispatch({ action: "moveNode", id, position });
  const setNodeState = (id: number, s: unknown) => dispatch({ action: "setNodeState", id, state: s });
  const addRef = (from: [id: number, index: number], to: [id: number, index: number]) => dispatch({ action: "addRef", from, to });
  const removeRef = (id: number) => dispatch({ action: "removeRef", id });
  const setValue = <T>(value: T, type: ArgType<T>, to: [id: number, index: number]) => dispatch({ action: "setValue", value, type, to });
  const setTab = (tab: "inputs" | "nodes") => dispatch({ action: "setTab", tab });

  return {
    addNode,
    setNodeState,
    moveNode,
    addRef,
    removeRef,
    setValue,
    setTab,
    prevEffectList
  };
};
