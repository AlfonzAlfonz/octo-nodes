import { FormControl, FormLabel, Input as FormInput, Box, Stack, IconButton } from "@mui/joy";
import { Input } from "components/SVGRenderer/nodes";
import { ArgValue } from "model";
import { FC } from "react";

import { useNodeData, useNodeState, useNodes } from "../NodeContext";
import ScreenRotationAltIcon from "@mui/icons-material/ScreenRotationAlt";

export const Inputs: FC = () => {
  const [, setState] = useNodeState();
  const [nodes] = useNodes();
  const [data, setData] = useNodeData();

  return (
    <>
      <Stack direction="row">
        <IconButton onClick={() => setState(n => ({ ...n, tab: "nodes" }))}>
          <ScreenRotationAltIcon />
        </IconButton>
      </Stack>
      {nodes.map(n => n.type.id === Input.id && (
        <FormControl key={n.id}>
          <FormLabel>Input</FormLabel>
          <FormInput
            value={(data.find(d => d.to[0] === n.id)! as ArgValue)?.value}
            onChange={e => setData(dat => dat.map(d => d.to[0] === n.id ? { ...d, value: e.target.value } : d))}
          />
        </FormControl>
      ))}
    </>
  );
};
