import { Box } from "@mui/joy";
import { FC, useEffect, useMemo, useState } from "react";

import { OctoNodesLib } from "../../lib";
import { useEditorAppState } from "../../state";
import { analyseTypes } from "../../typeAnalysis";
import { Inputs } from "../Inputs";
import { NodeEditor } from "../NodeEditor";
import { SVGRenderer } from "../SVGRenderer";
import { OctoNodesProvider, OctoNodesUiProvider } from "./context";

interface Props {
  lib: OctoNodesLib;
}

export const EditorApp: FC<Props> = ({ lib }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(true), []);

  const { state, ui, mutate } = useEditorAppState();

  const analysis = useMemo(() => analyseTypes(lib, state.nodes, state.argValues), [lib, state.argValues, state.nodes]);

  return (
    <OctoNodesProvider
      lib={lib}
      mutate={mutate}
      nodes={state.nodes}
      nodeArgs={state.argValues}
      nodeState={state.nodeState}
      analysis={analysis}
    >
      <OctoNodesUiProvider nodePosition={ui.nodePosition}>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>
          <Box sx={{ minWidth: 0, display: "flex" }}>
            <Box sx={{ p: 2, display: ui.tab === "inputs" ? "block" : "none", width: "100%", height: "100%" }}>
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
      </OctoNodesUiProvider>
    </OctoNodesProvider>
  );
};
