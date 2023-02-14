import styled from "@emotion/styled";
import SaveIcon from "@mui/icons-material/Save";
import { Box, IconButton } from "@mui/joy";
import { FC, ReactNode, useMemo, useRef } from "react";

import { useArgValues, useMutate, useNodes, useNodeState } from "../NodeContext";
import { renderNode } from "./renderNode";
import { Output } from "./nodes/Output";

export const SVGRenderer: FC = () => {
  const nodes = useNodes();
  const args = useArgValues();
  const state = useNodeState();

  const { prevEffectList, setNodeState } = useMutate();

  const output = useMemo(() => nodes.find(n => n.type.id === Output.id)!, [nodes]);
  const svgRef = useRef<SVGSVGElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const imgRef = useRef<HTMLImageElement>(null!);

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
        <Box sx={{ aspectRatio: "16 / 9" }}>
          <StyledSvg
            id="image-renderer"
            viewBox="0 0 1280 720"
            width={1280}
            height={720}
            ref={svgRef}
            style={{ background: "white", pointerEvents: "none", userSelect: "none" }}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  #image-renderer * {
                    font-family: sans-serif;
                    color: black;
                    line-height: 1.5;
                    font-size: 1rem;
                  }
                `
              }}
            />
            {renderNode(nodes, args, prevEffectList.current, state, setNodeState, output) as ReactNode[]}
          </StyledSvg>
        </Box>

        <IconButton
          sx={{ position: "absolute", bottom: 16, right: 16, color: "white" }}
          color="success"
          onClick={() => {
            const canvas = canvasRef.current;
            const img = imgRef.current;
            if (svgRef.current && canvas) {
              const ctx = canvas.getContext("2d")!;

              img.width = canvas.width;
              img.height = canvas.height;
              img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, 1280, 720, 0, 0, 1280 * window.devicePixelRatio, 720 * window.devicePixelRatio);
                downloadURI(canvas.toDataURL("image/png"), "img.png");
              };
              img.src = svgDataURL(svgRef.current);
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
          width={1280 * window.devicePixelRatio}
          height={720 * window.devicePixelRatio}
          ref={canvasRef}
          style={{ background: "white", width: "1280px", height: "720px" }}
        />
      </Box>
    </>
  );
};

const StyledSvg = styled.svg`
  background: white;
  max-width: 100%;
  max-height: 100%;
`;

const svgDataURL = (svg: SVGElement) => {
  const svgAsXML = new XMLSerializer().serializeToString(svg);
  return "data:image/svg+xml," + encodeURIComponent(svgAsXML);
};

const downloadURI = (uri: string, name: string) => {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
};
