import { Reducer, useReducer } from "react";

import { ArgDeclaration, ArgType, NodeArg, NodeModel, NodeType } from "../lib";
import { Clone, Image, Input, Output, Position, Text } from "../nodeTypes";

export type AppState = {
  state: {
    nodes: NodeModel[];
    nodeArgs: NodeArg[];
    nodeState: Record<string, { value: unknown }>;
  };

  ui: {
    nodePosition: Record<string, { x: number; y: number }>;
    tab: "inputs" | "nodes";
  };
};

export type AppStateAction =
  | { action: "addNode"; node: NodeType }
  | { action: "moveNode"; id: number; position: { x: number; y: number }}
  | { action: "setNodeState"; id: number; state: unknown }
  | { action: "addRef"; from: [id: number, index: number]; to: [id: number, index: number] }
  | { action: "removeRef"; id: number }
  | { action: "setValue"; value: unknown; type: ArgType<unknown>; to: [id: number, index: number]}
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
            nodeArgs: addRef(state.state.nodeArgs, action.from, action.to)
          }
        };
        case "removeRef": return {
          ...state,
          state: {
            ...state.state,
            nodeArgs: state.state.nodeArgs.filter(a => "id" in a && a.id === action.id)
          }
        };
        case "moveNode": return {
          ...state,
          ui: {
            ...state.ui,
            nodePosition: {
              ...state.ui.nodePosition,
              [action.id]: action.position
            }
          }
        };
        case "setTab": return {
          ...state,
          ui: {
            ...state.ui,
            tab: action.tab
          }
        };
        case "setNodeState": return {
          ...state,
          state: {
            ...state.state,
            nodeState: {
              ...state.state.nodeState,
              [action.id]: { value: action.state }
            }
          }
        };
        case "setValue": {
          let updated = false;

          // eslint-disable-next-line no-return-assign
          const result = state.state.nodeArgs.map(d =>
            d.to[0] === action.to[0] && d.to[1] === action.to[1]
              ? (updated = true, { ...d, value: action.value, type: action.type })
              : d
          );

          return {
            ...state,
            state: {
              ...state.state,
              nodeArgs: updated
                ? result
                : [...result, { value: action.value, to: action.to, type: action.type }]
            }
          };
        }
      }
      return state as never;
    }, _s), [], emptyState);

const emptyState = (): AppState => {
  let n = addNode([], Output); // 1
  n = addNode(n, Clone); // 2
  n = addNode(n, Text); // 3
  n = addNode(n, Input); // 4
  n = addNode(n, Position); // 5
  n = addNode(n, Image); // 6

  let a: NodeArg[] = [];
  a = addRef(a, [4, 0], [3, 0]);
  a = addRef(a, [3, 0], [2, 0]);
  a = addRef(a, [2, 0], [1, 0]);
  // a = addRef(a, [6, 0], [1, 0]);

  return {
    state: {
      nodes: n,
      nodeArgs: a,
      nodeState: {}
    },
    ui: {
      nodePosition: {},
      tab: "nodes"
    }
  };
};

const flatten = <T>(x: T | T[]) => {
  if (Array.isArray(x)) {
    return x;
  } else {
    return [x];
  }
};

const addNode = <const T extends readonly ArgDeclaration[]>(n: NodeModel[], type: NodeType<any, T>): NodeModel[] =>
  [...n as any, { id: getNewId(n), type }];

const addRef = (refs: NodeArg[], from: [number, number], to: [number, number]) =>
  [...refs.filter(d => !(d.to[0] === to[0] && d.to[1] === to[1])), { id: getNewId(refs), from, to }];

export const getNewId = (array: ({} | { id: number })[]) =>
  array.reduce<number>((acc, x) => "id" in x ? x.id > acc ? x.id : acc : acc, 0) + 1;
