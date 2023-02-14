import { Box } from "@mui/joy";
import { Inputs } from "components/Inputs";
import { AppState, DataProvider, NodesProvider, StateProvider } from "components/NodeContext";
import { NodeEditor } from "components/NodeEditor";
import { SVGRenderer } from "components/SVGRenderer";
import { Input, Output, Position, Text } from "components/SVGRenderer/nodes";
import { Clone } from "components/SVGRenderer/nodes/Clone";
import { addNode, addRef, addValue } from "model";
import { useEffect, useState } from "react";

export default function Home () {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(true), []);

  const nodes = useState(() => {
    let n = addNode([], Output);
    n = addNode(n, Clone);
    n = addNode(n, Text);
    n = addNode(n, Input);
    n = addNode(n, Position);
    return n;
  });
  const data = useState(() => {
    let n = addValue([], { value: "Hello World", to: [4, 0] });
    n = addRef(n, { from: [4, 0], to: [3, 0] });
    n = addRef(n, { from: [3, 0], to: [2, 0] });
    n = addRef(n, { from: [2, 0], to: [1, 0] });

    return n;
  });
  const state = useState<AppState>({ tab: "nodes", nodes: {} });

  return (
    <NodesProvider value={nodes}>
      <DataProvider value={data}>
        <StateProvider value={state}>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>
            <Box sx={{ minWidth: 0, display: "flex" }}>
              <Box
                sx={{
                  p: 2,
                  display: state[0].tab === "inputs" ? "block" : "none",
                  width: "100%",
                  height: "100%"
                }}
              >
                <Inputs />
              </Box>
              <Box
                sx={{
                  display: state[0].tab === "nodes" ? "block" : "none",
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
        </StateProvider>
      </DataProvider>
    </NodesProvider>
  );
}
