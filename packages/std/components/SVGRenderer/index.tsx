/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import SaveIcon from "@mui/icons-material/Save";
import { Box, IconButton } from "@mui/joy";
import { FC, useMemo, useRef } from "react";

import { NodeModel } from "../../lib/state";
import { Output } from "../../nodeTypes";
import { createRenderNode } from "../../renderNode";
import { useLib, useMutate, useNodeArgs, useNodes, useNodeState, useTypeAnalysis } from "../EditorApp/context";
import { ErrorBoundary } from "./ErrorBoundary";

export const SVGRenderer: FC = () => {
  const nodes = useNodes();
  const args = useNodeArgs();
  const nodeState = useNodeState();
  const lib = useLib();
  const analysis = useTypeAnalysis();

  const { prevEffectList, setNodeState } = useMutate();

  const output = useMemo(() => nodes.find(n => n.type.id === Output.id) as any as NodeModel<typeof Output>, [nodes]);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const imgRef = useRef<HTMLImageElement>(null!);

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
            const canvas = canvasRef.current;
            const img = imgRef.current;
            const svg = document.querySelector("#image-renderer svg") as SVGSVGElement;

            if (canvas) {
              const ctx = canvas.getContext("2d")!;

              img.width = canvas.width;
              img.height = canvas.height;
              img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, width!, height!, 0, 0, width! * window.devicePixelRatio, height! * window.devicePixelRatio);
                downloadURI(canvas.toDataURL("image/png"), "img.png");
              };
              img.src = svgDataURL(svg);
            }
          }}
        >
          <SaveIcon />
        </IconButton>
      </Box>

      <Box
        sx={{ position: "absolute", top: "-10000px", left: "-10000px" }}
      >

        {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
        <img ref={imgRef} style={{ background: "white" }} />
        <canvas
          width={width! * window.devicePixelRatio}
          height={height! * window.devicePixelRatio}
          ref={canvasRef}
          style={{ background: "white", width: `${width!}px`, height: `${height!}px` }}
        />
      </Box>
    </>
  );
};

const svgDataURL = (svg: SVGSVGElement) => {
  const svgAsXML = new XMLSerializer().serializeToString(svg);
  return "data:image/svg+xml," + encodeURIComponent(svgAsXML);
};

const downloadURI = (uri: string, name: string) => {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
};
