import { ArgType, NodeArgId, NodeId, NodeType } from "../../lib";
import { AppState, AppStateAction } from "../useEditorAppStateReducer";
import { getNewId, reducer } from "../utils";

export type StateAction =
  | { action: "addNode"; node: NodeType }
  | { action: "setNodeState"; id: NodeId; state: unknown }
  | { action: "addRef"; from: NodeArgId; to: NodeArgId }
  | { action: "removeRef"; from: NodeArgId; to: NodeArgId }
  | { action: "setValue"; value: unknown; type: ArgType<unknown>; to: NodeArgId };

export const stateReducer = reducer((state: AppState["state"], action: AppStateAction): AppState["state"] => {
  switch (action.action) {
    case "addNode": return {
      ...state,
      nodes: [...state.nodes, { id: getNewId(state.nodes), type: action.node }]
    };
    case "addRef": return {
      ...state,
      nodeArgs: [...state.nodeArgs, { from: action.from, to: action.to }]

    };
    case "removeRef": return {
      ...state,
      nodeArgs: state.nodeArgs.filter(arg =>
        "from" in arg &&
          arg.from[0] === action.from[0] && arg.from[1] === action.from[1] &&
          arg.to[0] === action.to[0] && arg.to[1] === action.to[1]
      )

    };
    case "setNodeState": return {
      ...state,
      nodeState: {
        ...state.nodeState,
        [action.id]: { value: action.state }
      }

    };
    case "setValue": {
      let updated = false;

      // eslint-disable-next-line no-return-assign
      const result = state.nodeArgs.map(d =>
        d.to[0] === action.to[0] && d.to[1] === action.to[1]
          ? (updated = true, { ...d, value: action.value, type: action.type })
          : d
      );

      return {
        ...state,
        nodeArgs: updated
          ? result
          : [...result, { value: action.value, to: action.to, type: action.type }]
      };
    }
    default: return state;
  }
});
