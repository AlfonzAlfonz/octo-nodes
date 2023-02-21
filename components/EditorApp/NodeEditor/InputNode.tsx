import { Box, FormControl, FormLabel, Sheet, styled, Tooltip, useTheme } from "@mui/joy";
import { FC, useMemo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

import { NodeModel, NodeValueArg } from "../model";
import { useMutate, useNodeArgs } from "../NodeContext";
import { renderableType, stringType } from "../SVGRenderer/argTypes";
import { ArgumentInput } from "./ArgumentInput";

export const InputNode: FC<NodeProps<NodeModel>> = ({ data: node, selected }) => {
  const args = useNodeArgs();
  const { setValue } = useMutate();
  const { vars } = useTheme();

  const nodeVal = useMemo(() =>
    args.find((a): a is NodeValueArg => a.to[0] === node.id && "value" in a), [args, node.id]);

  return (
    <Sheet
      sx={{
        borderColor: selected ? vars.palette.text.secondary : vars.palette.divider,
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: vars.radius.sm
      }}
    >
      <FormLabel htmlFor="text" sx={{ px: 6, py: 1, textAlign: "center", display: "block" }}>{node.type.name}</FormLabel>
      <Box>
        <Box sx={{ p: 1, px: 1, position: "relative" }}>
          <Tooltip title="Text" variant="soft" placement="bottom-start">
            <FormControl>
              <ArgumentInput
                value={nodeVal?.value as string ?? ""}
                arg={{ type: stringType, name: "Value" }}
                setValue={v => {
                  setValue(v, [node.id, 0]);
                }}
              />
            </FormControl>
          </Tooltip>
        </Box>
        {node.type.returns.map((a, i) => (
          <Box key={i} sx={{ p: 1, px: 1, position: "relative" }}>
            <Tooltip title={a.type.name} variant="soft" placement="bottom-end">
              <div>
                <StyledHandle
                  type="source"
                  color={renderableType.color}
                  position={Position.Right}
                  id="0"
                />
                <FormLabel sx={{ textAlign: "right", display: "block" }}>{a.name}</FormLabel>
              </div>
            </Tooltip>
          </Box>
        ))}
      </Box>
    </Sheet>
  );
};

export const StyledHandle = styled(Handle)`
  &.react-flow__handle {
    background: ${p => p.color}; 
    width: 8px;
    height: 8px; 
    border: none;
  }
`;
