import { Box } from "@mui/joy";
import { Inputs } from "components/EditorApp/Inputs";
import { FC, useEffect, useState } from "react";

import { RefsProvider, MutateProvider, NodesProvider, NodePositionProvider, NodeStateProvider } from "./NodeContext";
import { NodeEditor } from "./NodeEditor";
import { useEditorAppState } from "./state";
import { SVGRenderer } from "./SVGRenderer";

interface Props {
  initialData: any;
  onSave: () => {};
}

export const EditorApp: FC = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(true), []);

  const { state, tab, mutate } = useEditorAppState();

  return (
    <MutateProvider value={mutate}>
      <NodesProvider value={state.nodes}>
        <RefsProvider value={state.refs}>
          <NodeStateProvider value={state.nodeState}>
            <NodePositionProvider value={state.nodePosition}>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>
                <Box sx={{ minWidth: 0, display: "flex" }}>
                  <Box
                    sx={{
                      p: 2,
                      display: tab === "inputs" ? "block" : "none",
                      width: "100%",
                      height: "100%"
                    }}
                  >
                    <Inputs />
                  </Box>
                  <Box
                    sx={{
                      display: tab === "nodes" ? "block" : "none",
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
        </RefsProvider>
      </NodesProvider>
    </MutateProvider>

  );
};
