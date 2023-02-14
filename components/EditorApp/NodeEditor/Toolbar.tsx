import AddIcon from "@mui/icons-material/Add";
import ScreenRotationAltIcon from "@mui/icons-material/ScreenRotationAlt";
import { Box, IconButton, Menu, MenuItem, Stack } from "@mui/joy";
import { NodeDeclaration } from "components/EditorApp/model";
import { FC, useState } from "react";

import { useMutate } from "../NodeContext";
import { Clone, Combine, Image, Input, Text } from "../SVGRenderer/nodes";
import { Clock } from "../SVGRenderer/nodes/Clock";

export const Toolbar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { addNode, setTab } = useMutate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (handler?: () => unknown) => () => {
    handler?.();
    setAnchorEl(null);
  };

  const addInput = (node: NodeDeclaration<any>) => handleClose(() => {
    addNode(node);
  });

  return (
    <>
      <Stack
        sx={{ position: "absolute", p: 2, width: "100%", left: 0, top: 0, zIndex: 100, pointerEvents: "none" }}
        spacing={1}
        direction="row"
      >
        <IconButton onClick={() => setTab("inputs")} sx={{ pointerEvents: "auto" }}>
          <ScreenRotationAltIcon />
        </IconButton>

        <Box my={3} />

        <IconButton onClick={handleClick} sx={{ pointerEvents: "auto" }}>
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
        <MenuItem onClick={addInput(Clock)}>Clock</MenuItem>
      </Menu>
    </>
  );
};
