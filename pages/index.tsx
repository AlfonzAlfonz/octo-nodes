import { Box, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { Inputs } from "components/Inputs";
import { DataProvider, NodesProvider, StateProvider } from "components/NodeContext";
import { NodeEditor } from "components/NodeEditor";
import { SVGRenderer } from "components/SVGRenderer";
import { Input, Output, Position, Text } from "components/SVGRenderer/nodes";
import { Clone } from "components/SVGRenderer/nodes/Clone";
import { addNode, addRef, addValue, NodeState } from "model";
import { useEffect, useState } from "react";

export default function Home () {
  const [tab, setTab] = useState(1);
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
  const state = useState<Record<string, NodeState | undefined>>({});

  return (
    <NodesProvider value={nodes}>
      <DataProvider value={data}>
        <StateProvider value={state}>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>
            <Box sx={{ minWidth: 0, display: "flex" }}>
              <Tabs aria-label="Basic tabs" value={tab} sx={{ borderRadius: "lg", width: "100%" }}>
                <TabList>
                  <Tab onChange={() => setTab(0)}>Input</Tab>
                  <Tab onChange={() => setTab(1)}>Nodes</Tab>
                </TabList>
                <TabPanel value={tab} sx={{ p: 2, display: tab === 0 ? "block" : "none" }}>
                  <Inputs />
                </TabPanel>
                <TabPanel value={tab} sx={{ display: tab === 1 ? "block" : "none" }}>
                  <NodeEditor />
                </TabPanel>
              </Tabs>
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
