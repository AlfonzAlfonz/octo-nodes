import { Box, Stack } from "@mui/joy";
import { FC, useMemo } from "react";

import { DbgTypeValueContainer, dbgType, renderableType } from "../../argTypes";
import { cast, resolveGenerics } from "../../argTypes/utils";
import { ArgDeclaration, NodeModel, NodeType } from "../../lib";
import { createRenderNode } from "../../renderNode";
import { useLib, useMutate, useNodeArgs, useNodeState, useNodes, useTypeAnalysis } from "../OctoNodesProvider";
import { ErrorBoundary } from "./ErrorBoundary";

interface Props {
  node: NodeModel<NodeType<[], any, readonly ArgDeclaration<unknown>[]>>;
}

export const DebugPreview: FC<Props> = ({ node }) => {
  const nodes = useNodes();
  const args = useNodeArgs();
  const nodeState = useNodeState();
  const lib = useLib();
  const analysis = useTypeAnalysis();

  const { prevEffectList, setNodeState } = useMutate();

  const preview = useMemo(() =>
    createRenderNode({
      lib,
      nodes,
      args,
      nodeState,
      setNodeState,
      prevEffectList: prevEffectList.current,
      analysis
    })(node)?.map((v, i) =>
      cast(
        lib.implicitCasts,
        analysis.nodes[node.id]?.returns[i]!,
        dbgType,
        v
      ) ?? cast(
        lib.implicitCasts,
        analysis.nodes[node.id]?.returns[i]!,
        renderableType,
        v
      ) ?? <i key={i}>Empty</i>
    ),
  [analysis, args, lib, nodeState, nodes, prevEffectList, node, setNodeState]);

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          overflow: "scroll",
          p: 5
        }}
      >
        <ErrorBoundary>
          <Stack spacing={2}>
            {preview.map((p, i) => (
              <Box key={i}>
                <Box sx={{ color: "white", mb: 1 }}>
                  {resolveGenerics(node.type.returns, node.type.generics)[i].name}
                </Box>
                {p instanceof DbgTypeValueContainer
                  ? (
                    <Box sx={!p.full ? { background: "white", p: 2, color: "black", maxWidth: "100%" } : {}}>
                      {p.value}
                    </Box>
                  )
                  : p}
              </Box>
            ))}
          </Stack>
        </ErrorBoundary>
      </Box>
    </>
  );
};
