import { FormControl, FormLabel, Input as FormInput } from "@mui/joy";
import { Input } from "components/SVGRenderer/nodes";
import { ArgValue } from "model";
import { FC } from "react";

import { useNodeData, useNodes } from "../NodeContext";

export const Inputs: FC = () => {
  const [nodes] = useNodes();
  const [data, setData] = useNodeData();

  return (
    <>
      {nodes.map(n => n.type.id === Input.id && (
        <FormControl key={n.id}>
          <FormLabel>Input</FormLabel>
          <FormInput
            value={(data.find(d => d.to[0] === n.id)! as ArgValue).value}
            onChange={e => setData(dat => dat.map(d => d.to[0] === n.id ? { ...d, value: e.target.value } : d))}
          />
        </FormControl>
      ))}
    </>
  );
};
