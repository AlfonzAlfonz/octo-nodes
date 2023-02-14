import AddIcon from "@mui/icons-material/Add";
import ScreenRotationAltIcon from "@mui/icons-material/ScreenRotationAlt";
import { Box, IconButton, Menu, MenuItem, Stack } from "@mui/joy";
import { Clone, Combine, Image, Input, Text } from "components/SVGRenderer/nodes";
import { addNode, NodeDeclaration } from "model";
import { FC, useState } from "react";

import { useNodes, useNodeState } from "../NodeContext";

export const Toolbar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [state, setState] = useNodeState();
  const [nodes, setNodes] = useNodes();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (handler?: () => unknown) => () => {
    handler?.();
    setAnchorEl(null);
  };

  const addInput = (node: NodeDeclaration<any>) => handleClose(() => {
    setNodes(n => addNode(n, node));
  });

  return (
    <>
      <Stack
        sx={{ position: "absolute", p: 2, width: "100%", left: 0, top: 0, zIndex: 100 }}
        spacing={1}
        direction="row"
      >
        <IconButton onClick={() => setState(n => ({ ...n, tab: "inputs" }))}>
          <ScreenRotationAltIcon />
        </IconButton>

        <Box my={3} />

        <IconButton onClick={handleClick}>
          <AddIcon />
        </IconButton>
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose()}
      >
        <MenuItem onClick={addInput(Input)}>Input</MenuItem>
        <MenuItem onClick={addInput(Text)}>Text</MenuItem>
        <MenuItem onClick={addInput(Clone)}>Clone</MenuItem>
        <MenuItem onClick={addInput(Image)}>Image</MenuItem>
        <MenuItem onClick={addInput(Combine)}>Combine</MenuItem>
      </Menu>
    </>
  );
};
