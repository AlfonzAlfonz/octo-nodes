import { Box, FormControl, FormLabel, Sheet, styled, Tooltip, useTheme } from "@mui/joy";
import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";

import { NodeModel } from "../model";
import { useMutate, useNodeState, useRefs } from "../NodeContext";
import { renderableType } from "../SVGRenderer/args";
import { Input, Output } from "../SVGRenderer/nodes";
import { ArgumentInput } from "./ArgumentInput";

export const EditorNode: FC<NodeProps<NodeModel>> = ({ data: node, selected }) => {
  const data = useRefs();
  const nodeState = useNodeState();
  const { setNodeState } = useMutate();
  const { vars } = useTheme();

  const nodeRefs = Object.fromEntries(
    data.filter(d => d.to[0] === +node.id).map(d => [d.to[1], d])
  );

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
        {node.type.args.map((a, i) => (
          <Box key={i} sx={{ p: 1, px: 1, position: "relative" }}>
            <Tooltip title={a.type.name} variant="soft" placement="bottom-start">
              <div>
                {node.type.id !== Input.id && (
                  <StyledHandle
                    key={i}
                    type="target"
                    color={a.type.color}
                    id={`${i}`}
                    position={Position.Left}
                  />
                )}

                {nodeRefs[i] !== undefined
                  ? <FormLabel>{a.name}</FormLabel>
                  : (
                    <FormControl>
                      <ArgumentInput
                        value={(nodeState[i] as string) ?? ""}
                        argDeclaration={a}
                        setValue={v => setNodeState(node.id, v)}
                      />
                    </FormControl>
                  )}
              </div>
            </Tooltip>
          </Box>
        )
        )}
        {node.type.id !== Output.id && node.type.returns.map((a, i) => (
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
