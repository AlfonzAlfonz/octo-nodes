import ScreenRotationAltIcon from "@mui/icons-material/ScreenRotationAlt";
import { FormControl, FormLabel, IconButton, Input as FormInput, Stack } from "@mui/joy";
import { FC } from "react";

import { useMutate, useNodes, useNodeState } from "../NodeContext";
import { Input } from "../SVGRenderer/nodes";

export const Inputs: FC = () => {
  const nodes = useNodes();
  const nodeState = useNodeState();
  const { setTab, setNodeState } = useMutate();

  return (
    <>
      <Stack direction="row">
        <IconButton onClick={() => setTab("nodes")}>
          <ScreenRotationAltIcon />
        </IconButton>
      </Stack>
      {nodes.map(n => n.type.id === Input.id && (
        <FormControl key={n.id}>
          <FormLabel>Input</FormLabel>
          <FormInput
            value={nodeState[n.id]?.value as string ?? ""}
            onChange={e => setNodeState(n.id, e.target.value)}
          />
        </FormControl>
      ))}
    </>
  );
};
