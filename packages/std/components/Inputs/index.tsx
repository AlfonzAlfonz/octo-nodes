import ScreenRotationAltIcon from "@mui/icons-material/ScreenRotationAlt";
import { FormControl, Input as FormInput, FormLabel, IconButton, Stack } from "@mui/joy";
import { FC } from "react";

import { stringType } from "../../argTypes";
import { NodeValueArg } from "../../lib";
import { Input } from "../../nodeTypes";
import { useMutate, useNodeArgs, useNodes } from "../OctoNodesProvider";

export const Inputs: FC = () => {
  const nodes = useNodes();
  const args = useNodeArgs();
  const { setTab, setValue } = useMutate();

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
            value={args.find((a): a is NodeValueArg<unknown> =>
              a.to[0] === n.id && "value" in a
            )?.value as string ?? ""}
            onChange={e => setValue(e.target.value, stringType, [n.id, 0])}
          />
        </FormControl>
      ))}
    </>
  );
};
