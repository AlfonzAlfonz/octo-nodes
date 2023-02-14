import { Box, FormControl, FormLabel, Sheet, styled, Tooltip, useTheme } from "@mui/joy";
import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";

import { NodeModel } from "../model";
import { useMutate, useNodeState } from "../NodeContext";
import { renderableType, stringType } from "../SVGRenderer/args";
import { ArgumentInput } from "./ArgumentInput";

export const InputNode: FC<NodeProps<NodeModel>> = ({ data: node, selected }) => {
  const nodeState = useNodeState();
  const { setNodeState } = useMutate();
  const { vars } = useTheme();

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
                value={nodeState[node.id]?.value as string ?? ""}
                arg={{ type: stringType, name: "Value" }}
                setValue={v => {
                  setNodeState(node.id, v);
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
