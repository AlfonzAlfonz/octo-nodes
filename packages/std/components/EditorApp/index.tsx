import { Box } from "@mui/joy";
import { FC, useEffect, useState } from "react";

import { NodeArgsProvider, MutateProvider, NodesProvider, NodePositionProvider, NodeStateProvider } from "./state/context";
import { NodeEditor } from "../NodeEditor";
import { useEditorAppState } from "../../state";
import { SVGRenderer } from "../SVGRenderer";
import { Inputs } from "../Inputs";

export const EditorApp: FC = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(true), []);

  const { state, ui, mutate } = useEditorAppState();

  return (
    <MutateProvider value={mutate}>
      <NodesProvider value={state.nodes}>
        <NodeArgsProvider value={state.argValues}>
          <NodeStateProvider value={state.nodeState}>
            <NodePositionProvider value={ui.nodePosition}>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>
                <Box sx={{ minWidth: 0, display: "flex" }}>
                  <Box
                    sx={{
                      p: 2,
                      display: ui.tab === "inputs" ? "block" : "none",
                      width: "100%",
                      height: "100%"
                    }}
                  >
                    <Inputs />
                  </Box>
                  <Box
                    sx={{
                      display: ui.tab === "nodes" ? "block" : "none",
                      width: "100%",
                      height: "100%",
                      position: "relative"
                    }}
                  >
                    <NodeEditor />
                  </Box>
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  {open && <SVGRenderer />}
                </Box>
              </Box>
            </NodePositionProvider>
          </NodeStateProvider>
        </NodeArgsProvider>
      </NodesProvider>
    </MutateProvider>

  );
};
