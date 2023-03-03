import { Reducer, useReducer } from "react";

import { ArgDeclaration, NodeArg, NodeId, NodeModel, NodeRefArg, NodeType } from "../lib";
import { Clone, Image, Input, SvgOutput, Position, Text } from "../nodeTypes";
import { more } from "../utils";
import { StateAction, stateReducer } from "./reducers/stateReducer";
import { UiAction, uiReducer } from "./reducers/uiReducer";
import { getNewId } from "./utils";
import { Dataset } from "../nodeTypes/Dataset";

export type AppState = {
  state: {
    nodes: NodeModel[];
    nodeArgs: NodeArg[];
    nodeState: Record<NodeId, { value: unknown }>;
  };

  ui: {
    nodePosition: Record<NodeId, { x: number; y: number }>;
    previewedNode?: NodeId;
    selectedNode?: NodeId;
    tab: "inputs" | "nodes";
  };
};

export type AppStateAction = StateAction | UiAction;

export const useEditorAppStateReducer = () =>
  useReducer<Reducer<AppState, AppStateAction | AppStateAction[]>, []>((_s, _a) =>
    more(_a).reduce((state, action): AppState => {
      return {
        state: stateReducer(state.state, action),
        ui: uiReducer(state.ui, action)
      };
    }, _s), [], emptyState);

const emptyState = (): AppState => {
  let n = addNode([], SvgOutput); // 1
  n = addNode(n, Clone); // 2
  n = addNode(n, Text); // 3
  n = addNode(n, Input); // 4
  n = addNode(n, Position); // 5
  n = addNode(n, Image); // 6
  n = addNode(n, Dataset);

  let a: NodeArg[] = [];
  a = addRef(a, [4, 0], [3, 0]);
  a = addRef(a, [3, 0], [2, 0]);
  a = addRef(a, [2, 0], [1, 0]);
  a = addRef(a, [6, 0], [1, 0]);

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

const addNode = <const T extends readonly ArgDeclaration[]>(n: NodeModel[], type: NodeType<any, T>): NodeModel[] =>
  [...n as any, { id: getNewId(n), type }];

const addRef = (refs: NodeArg[], from: [number, number], to: [number, number]) =>
  [...refs.filter(d => !(d.to[0] === to[0] && d.to[1] === to[1])), { from, to } as NodeRefArg];
