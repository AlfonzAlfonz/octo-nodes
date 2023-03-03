import SaveIcon from "@mui/icons-material/Save";
import { Box, IconButton } from "@mui/joy";
import { FC, useMemo } from "react";

import { NodeModel } from "../../lib";
import { SvgOutput } from "../../nodeTypes";
import { createRenderNode } from "../../renderNode";
import { useLib, useMutate, useNodeArgs, useNodes, useNodeState, useTypeAnalysis } from "../OctoNodesProvider";
import { ErrorBoundary } from "./ErrorBoundary";
import { downloadImage } from "./renderToImg";
import { svgType } from "../../argTypes/svgType";
import { renderableType } from "../../argTypes";
import { cast } from "../../argTypes/utils";

interface Props {
  node: NodeModel<typeof SvgOutput>;
}

export const SvgPreview: FC<Props> = ({ node }) => {
  const nodes = useNodes();
  const args = useNodeArgs();
  const nodeState = useNodeState();
  const lib = useLib();
  const analysis = useTypeAnalysis();

  const { prevEffectList, setNodeState } = useMutate();

  const [svg] = useMemo(() =>
    createRenderNode({
      lib,
      nodes,
      args,
      nodeState,
      setNodeState,
      prevEffectList: prevEffectList.current,
      analysis
    })(node),
  [analysis, args, lib, node, nodeState, nodes, prevEffectList, setNodeState]);

  const o = useMemo(() => cast(
    lib.implicitCasts,
    svgType,
    renderableType,
    svg
  ), [lib.implicitCasts, svg]);

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
          <div>
            {o}
          </div>
        </ErrorBoundary>

        {svg && (
          <IconButton
            sx={{ position: "absolute", bottom: 16, right: 16, color: "white" }}
            color="success"
            onClick={() => {
              downloadImage(svg.width, svg.height, document.querySelector("#image-renderer svg")!);
            }}
          >
            <SaveIcon />
          </IconButton>
        )}
      </Box>
    </>
  );
};
