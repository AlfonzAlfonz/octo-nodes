import { Box } from "@mui/joy";
import { FC, useMemo } from "react";

import { useNodeData, useNodes } from "../NodeContext";
import { createRenderArg } from "./nodeDeclaration";
import { Output } from "./nodes/Output";

export const SVGRenderer: FC = () => {
  const [nodes] = useNodes();
  const [data] = useNodeData();
  const output = useMemo(() => nodes.find(n => n.type.id === Output.id)!, [nodes]);
  const renderArg = useMemo(() => createRenderArg(nodes, data, output), [data, nodes, output]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 5
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 1280 720"
        sx={{ background: "white", maxWidth: "100%", maxHeight: "100%" }}
      >
        {renderArg({ index: 0 })}
      </Box>
    </Box>
  );
};
