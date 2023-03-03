import { Box, FormLabel, Sheet, styled, Tooltip, useTheme } from "@mui/joy";
import { FC, ReactElement } from "react";
import { Handle, NodeProps, Position } from "reactflow";

import { resolveGenerics } from "../../argTypes/utils";
import { NodeModel } from "../../lib";
import { Input, SvgOutput } from "../../nodeTypes";
import { AnalysedArg } from "../../typeAnalysis";
import { useMutate, useNodeArgs, useTypeAnalysis, useUi } from "../OctoNodesProvider";
import { EditorNodeArgument } from "./EditorNodeArgument";

export const EditorNode: FC<NodeProps<NodeModel>> = ({ data: node }) => {
  const argValues = useNodeArgs();
  const { setValue, selectNode } = useMutate();
  const analysis = useTypeAnalysis();
  const ui = useUi();
  const { vars } = useTheme();

  const nodeValues = Object.fromEntries(
    argValues.filter((d) => d.to[0] === node.id).map(d => [d.to[1], d])
  );

  const analysedNode = analysis.nodes[node.id]!;

  return (
    <Sheet
      sx={{
        borderColor: ui.selectedNode === node.id ? vars.palette.text.secondary : vars.palette.divider,
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: vars.radius.sm
      }}
      onClick={() => selectNode(node.id)}
    >
      <FormLabel htmlFor="text" sx={{ px: 6, py: 1, textAlign: "center", display: "block" }}>{node.type.name}</FormLabel>
      <Box>
        {resolveGenerics(node.type.args, node.type.generics).map((a, i) => (
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
        {node.type.id !== SvgOutput.id && resolveGenerics(node.type.returns, node.type.generics).map((a, i) => (
          <Box key={i} sx={{ p: 1, px: 1, position: "relative" }}>
            <TypeTooltip analysedArg={{ type: analysedNode.returns[i] }}>
              <div>
                <StyledHandle
                  type="source"
                  color={analysedNode.returns[i].color}
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

export const TypeTooltip: FC<{
  analysedArg: AnalysedArg;
  children: ReactElement;
  result?: boolean;
}> = ({ analysedArg, children, result }) => {
  return (
    <Tooltip
      title={(
        <>
          <p>{analysedArg.type.name}</p>
          {analysedArg.error && <p>{analysedArg.error.error}</p>}
        </>
      )}
      variant="soft"
      placement={result ? "bottom-end" : "bottom-start"}
    >
      {children}
    </Tooltip>
  );
};
