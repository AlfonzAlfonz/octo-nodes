import { Box, FormLabel, Sheet, styled, Tooltip, useTheme } from "@mui/joy";
import { FC, ReactElement } from "react";
import { Handle, NodeProps, Position } from "reactflow";

import { renderableType } from "../../argTypes";
import { NodeModel } from "../../lib/state";
import { Input, Output } from "../../nodeTypes";
import { AnalysedArg } from "../../typeAnalysis";
import { useMutate, useNodeArgs, useTypeAnalysis } from "../EditorApp/context";
import { EditorNodeArgument } from "./EditorNodeArgument";

export const EditorNode: FC<NodeProps<NodeModel>> = ({ data: node, selected }) => {
  const argValues = useNodeArgs();
  const { setValue } = useMutate();
  const analysis = useTypeAnalysis();
  const { vars } = useTheme();

  const nodeValues = Object.fromEntries(
    argValues.filter((d) => d.to[0] === node.id).map(d => [d.to[1], d])
  );

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
        {node.type.args.map((a, i) => (
          <Box key={i} sx={{ p: 1, px: 1, position: "relative" }}>
            <TypeTooltip analysedArg={analysedNode.args[i]}>
              <div>
                {node.type.id !== Input.id && (
                  <StyledHandle
                    key={i}
                    type="target"
                    color={analysedNode.args[i].type.color}
                    id={`${i}`}
                    position={Position.Left}
                  />
                )}

                <EditorNodeArgument
                  nodeArg={nodeValues[i]}
                  argDeclaration={a}
                  analysedArg={analysedNode.args[i]}
                  setValue={(v, t) => setValue(v, t, [node.id, i])}
                />

              </div>
            </TypeTooltip>
          </Box>
        ))}
        {node.type.id !== Output.id && node.type.returns.map((a, i) => (
          <Box key={i} sx={{ p: 1, px: 1, position: "relative" }}>
            <Tooltip title={a.type.name}>
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

export const TypeTooltip: FC<{ analysedArg: AnalysedArg; children: ReactElement }> = ({ analysedArg, children }) => {
  return (
    <Tooltip
      title={(
        <>
          <p>{analysedArg.type.name}</p>
          {analysedArg.error && <p>{analysedArg.error.error}</p>}
        </>
      )}
      variant="soft"
      placement="bottom-start"
    >
      {children}
    </Tooltip>
  );
};
