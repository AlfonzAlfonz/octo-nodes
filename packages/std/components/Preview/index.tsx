/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import SaveIcon from "@mui/icons-material/Save";
import { Box, IconButton } from "@mui/joy";
import { FC, useMemo } from "react";

import { NodeModel } from "../../lib";
import { Output } from "../../nodeTypes";
import { createRenderNode } from "../../renderNode";
import { useLib, useMutate, useNodeArgs, useNodes, useNodeState, useTypeAnalysis } from "../OctoNodesProvider";
import { ErrorBoundary } from "./ErrorBoundary";
import { downloadImage } from "./renderToImg";

export const Preview: FC = () => {
  const nodes = useNodes();
  const args = useNodeArgs();
  const nodeState = useNodeState();
  const lib = useLib();
  const analysis = useTypeAnalysis();

  const { prevEffectList, setNodeState } = useMutate();

  const output = useMemo(() => nodes.find(n => n.type.id === Output.id) as any as NodeModel<typeof Output>, [nodes]);

  const [renderedOutput, width, height] = useMemo(() =>
    createRenderNode({
      lib,
      nodes,
      args,
      nodeState,
      setNodeState,
      prevEffectList: prevEffectList.current,
      analysis
    })(output),
  [analysis, args, lib, nodeState, nodes, output, prevEffectList, setNodeState]);

  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 5
        }}
      >
        <ErrorBoundary>
          <Box sx={{ aspectRatio: `${width!} / ${height!}` }} id="image-renderer">
            {renderedOutput}
          </Box>
        </ErrorBoundary>

        <IconButton
          sx={{ position: "absolute", bottom: 16, right: 16, color: "white" }}
          color="success"
          onClick={() => {
            downloadImage(width!, height!, document.querySelector("#image-renderer svg")!);
          }}
        >
          <SaveIcon />
        </IconButton>
      </Box>
    </>
  );
};
