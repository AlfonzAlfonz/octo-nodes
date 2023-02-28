import { Box } from "@mui/joy";
import { FC, ReactNode, useEffect, useState } from "react";

import { useUi } from "../OctoNodesProvider";

interface Props {
  inputs: ReactNode;
  editor: ReactNode;
  preview: ReactNode;
}

export const Ui: FC<Props> = ({ inputs, editor, preview }) => {
  const ui = useUi();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(true), []);

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>
      <Box sx={{ minWidth: 0, display: "flex" }}>
        <Box sx={{ p: 2, display: ui.tab === "inputs" ? "block" : "none", width: "100%", height: "100%" }}>
          {inputs}
        </Box>
        <Box
          sx={{
            display: ui.tab === "nodes" ? "block" : "none",
            width: "100%",
            height: "100%",
            position: "relative"
          }}
        >
          {editor}
        </Box>
      </Box>
      <Box sx={{ minWidth: 0 }}>
        {open && preview}
      </Box>
    </Box>
  );
};
