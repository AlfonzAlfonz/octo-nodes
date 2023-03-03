import { NodeId } from "../../lib";
import { AppState, AppStateAction } from "../useEditorAppStateReducer";
import { reducer } from "../utils";

export type UiAction =
  | { action: "moveNode"; id: NodeId; position: { x: number; y: number }}
  | { action: "setTab"; tab: "inputs" | "nodes" }
  | { action: "previewNode"; id?: NodeId }
  | { action: "selectNode"; id?: NodeId };

export const uiReducer = reducer((ui: AppState["ui"], action: AppStateAction): AppState["ui"] => {
  switch (action.action) {
    case "moveNode": return {
      ...ui,
      nodePosition: {
        ...ui.nodePosition,
        [action.id]: action.position
      }
    };
    case "setTab": return {
      ...ui,
      tab: action.tab
    };
    case "previewNode": return {
      ...ui,
      previewedNode: action.id
    };
    case "selectNode": return {
      ...ui,
      selectedNode: action.id
    };
    default: return ui;
  }
});
