import { DependencyList, EffectCallback, useMemo, useRef } from "react";

import { NodeDeclaration } from "../model";
import { useEditorAppStateReducer } from "./useEditorAppStateReducer";

export type MutateState = ReturnType< typeof useEditorAppState>["mutate"];

export const useEditorAppState = () => {
  const prevEffectList = useRef<Map<number, [ReturnType<EffectCallback>, DependencyList]>>(new Map());

  const [state, dispatch] = useEditorAppStateReducer();

  const mutate = useMemo(() => {
    const addNode = (node: NodeDeclaration) => dispatch({ action: "addNode", node });
    const moveNode = (id: number, position: { x: number; y: number }) => dispatch({ action: "moveNode", id, position });
    const setNodeState = (id: number, s: unknown) => dispatch({ action: "setNodeState", id, state: s });
    const addRef = (from: [id: number, index: number], to: [id: number, index: number]) => dispatch({ action: "addRef", from, to });
    const removeRef = (id: number) => dispatch({ action: "removeRef", id });
    const setTab = (tab: "inputs" | "nodes") => dispatch({ action: "setTab", tab });

    return {
      addNode,
      setNodeState,
      moveNode,
      addRef,
      removeRef,
      setTab,
      prevEffectList
    };
  }, [dispatch]);

  return {
    ...state,
    mutate
  };
};
