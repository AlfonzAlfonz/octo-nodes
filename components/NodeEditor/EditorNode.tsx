import { Box, FormControl, FormLabel, Sheet, Tooltip, styled, useTheme } from "@mui/joy";
import { useNodeData } from "components/NodeContext";
import { renderableType } from "components/SVGRenderer/args";
import { Input, Output } from "components/SVGRenderer/nodes";
import { ArgValue, getNewId, NodeModel } from "model";
import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";

import { ArgumentInput } from "./ArgumentInput";

export const EditorNode: FC<NodeProps<NodeModel>> = ({ data: node, selected }) => {
  const [data, setData] = useNodeData();
  const { vars } = useTheme();

  const nodeData = Object.fromEntries(
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

                {nodeData[i] !== undefined && !("value" in nodeData[i])
                  ? <FormLabel>{a.name}</FormLabel>
                  : (
                    <FormControl>
                      <ArgumentInput
                        value={(nodeData[i] as ArgValue)}
                        argDeclaration={a}
                        setValue={v => setData(dats => {
                          let updated = false;

                          // eslint-disable-next-line no-return-assign
                          const result = dats.map(d =>
                            d.to[0] === node.id && d.to[1] === i
                              ? (updated = true, { ...d, value: v })
                              : d
                          );

                          return updated ? result : [...result, { id: getNewId(dats), value: v, to: [node.id, i] }];
                        })}
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
