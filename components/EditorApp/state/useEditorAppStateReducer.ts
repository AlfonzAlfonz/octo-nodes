import { Reducer, useReducer } from "react";

import { NodeReference, Arg, NodeDeclaration, NodeModel } from "../model";
import { Clone, Input, Output, Position, Text } from "../SVGRenderer/nodes";

export type AppState = {
  state: {
    nodes: NodeModel[];
    refs: NodeReference[];
    nodePosition: Record<string, { x: number; y: number }>;
    nodeState: Record<string, unknown>;
  };

  tab: "inputs" | "nodes";
};

export type AppStateAction =
  | { action: "addNode"; node: NodeDeclaration }
  | { action: "moveNode"; id: number; position: { x: number; y: number }}
  | { action: "setNodeState"; id: number; state: unknown }
  | { action: "addRef"; from: [id: number, index: number]; to: [id: number, index: number] }
  | { action: "removeRef"; id: number }
  | { action: "setTab"; tab: "inputs" | "nodes" };

export const useEditorAppStateReducer = () =>
  useReducer<Reducer<AppState, AppStateAction | AppStateAction[]>, []>((_s, _a) =>
    flatten(_a).reduce((state, action): AppState => {
      switch (action.action) {
        case "addNode": return {
          ...state,
          state: {
            ...state.state,
            nodes: addNode(state.state.nodes, action.node)
          }
        };
        case "addRef": return {
          ...state,
          state: {
            ...state.state,
            refs: addRef(state.state.refs, action.from, action.to)
          }
        };
        case "removeRef": return {
          ...state,
          state: {
            ...state.state,
            refs: state.state.refs.filter(a => a.id === action.id)
          }
        };
        case "moveNode": return {
          ...state,
          state: {
            ...state.state,
            nodePosition: {
              ...state.state.nodePosition,
              [action.id]: action.position
            }
          }
        };
        case "setTab": return {
          ...state,
          tab: action.tab
        };
        case "setNodeState": return {
          ...state,
          state: {
            ...state.state,
            nodeState: {
              ...state.state.nodeState,
              [action.id]: action.state
            }
          }
        };
      }
      return state as never;
    }, _s), [], emptyState);

const emptyState = (): AppState => {
  let n = addNode([], Output);
  n = addNode(n, Clone);
  n = addNode(n, Text);
  n = addNode(n, Input);
  n = addNode(n, Position);

  let a = addRef([], [4, 0], [3, 0]);
  a = addRef(a, [3, 0], [2, 0]);
  a = addRef(a, [2, 0], [1, 0]);

  return {
    state: {
      nodes: n,
      refs: a,
      nodePosition: {},
      nodeState: {}
    },
    tab: "nodes"
  };
};

const flatten = <T>(x: T | T[]) => {
  if (Array.isArray(x)) {
    return x;
  } else {
    return [x];
  }
};

const addNode = <const T extends readonly Arg[]>(n: NodeModel[], type: NodeDeclaration<T>): NodeModel[] =>
  [...n as any, { id: getNewId(n), type }];

const addRef = (refs: NodeReference[], from: [number, number], to: [number, number]) =>
  [...refs.filter(d => !(d.to[0] === to[0] && d.to[1] === to[1])), { id: getNewId(refs), from, to }];

export const getNewId = (array: { id: number }[]) => array.reduce((acc, x) => x.id > acc ? x.id : acc, 0) + 1;
