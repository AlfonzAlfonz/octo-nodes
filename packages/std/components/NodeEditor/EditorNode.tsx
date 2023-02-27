import { Box, FormControl, FormLabel, Sheet, styled, Tooltip, useTheme } from "@mui/joy";
import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";

import { renderableType } from "../../argTypes";
import { NodeModel, NodeValueArg } from "../../lib/state";
import { Input, Output } from "../../nodeTypes";
import { useMutate, useNodeArgs } from "../EditorApp/context";
import { ArgumentInput } from "./ArgumentInput";

export const EditorNode: FC<NodeProps<NodeModel>> = ({ data: node, selected }) => {
  const argValues = useNodeArgs();
  const { setValue } = useMutate();
  const { vars } = useTheme();

  const nodeValues = Object.fromEntries(
    argValues.filter((d): d is NodeValueArg<unknown> => d.to[0] === node.id && "value" in d).map(d => [d.to[1], d])
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

                {nodeValues[i] && "id" in nodeValues[i]
                  ? <FormLabel>{a.name}</FormLabel>
                  : (
                    <FormControl>
                      <ArgumentInput
                        value={nodeValues[i]?.value as string ?? ""}
                        arg={a}
                        setValue={v => setValue(v, [node.id, i])}
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
