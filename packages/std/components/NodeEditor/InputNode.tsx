import { Box, FormLabel, Sheet, styled, useTheme } from "@mui/joy";
import { FC, useMemo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

import { renderableType } from "../../argTypes";
import { NodeModel, NodeValueArg } from "../../lib";
import { useMutate, useNodeArgs, useTypeAnalysis } from "../OctoNodesProvider";
import { TypeTooltip } from "./EditorNode";
import { EditorNodeArgument } from "./EditorNodeArgument";

export const InputNode: FC<NodeProps<NodeModel>> = ({ data: node, selected }) => {
  const args = useNodeArgs();
  const { setValue } = useMutate();
  const { vars } = useTheme();
  const analysis = useTypeAnalysis();

  const nodeVal = useMemo(() =>
    args.find((a): a is NodeValueArg<unknown> => a.to[0] === node.id && "value" in a), [args, node.id]);

  const analysedNode = analysis.nodes[node.id]!;

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
        {analysedNode.args.map((a, i) => (
          <Box key={i} sx={{ p: 1, px: 1, position: "relative" }}>
            <TypeTooltip analysedArg={a}>
              <div>
                <EditorNodeArgument
                  nodeArg={nodeVal}
                  argDeclaration={{ type: a.type, name: "Value" }}
                  analysedArg={a}
                  setValue={(v, t) => setValue(v, t, [node.id, 0])}
                />
              </div>
            </TypeTooltip>
          </Box>
        ))}

        {analysedNode.returns.map((a, i) => (
          <Box key={i} sx={{ p: 1, px: 1, position: "relative" }}>
            <TypeTooltip analysedArg={{ type: a }} result>
              <div>
                <StyledHandle
                  type="source"
                  color={renderableType.color}
                  position={Position.Right}
                  id="0"
                />
                <FormLabel sx={{ textAlign: "right", display: "block" }}>{a.name}</FormLabel>
              </div>
            </TypeTooltip>
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
