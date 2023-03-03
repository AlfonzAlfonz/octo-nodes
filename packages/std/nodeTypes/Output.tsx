import styled from "@emotion/styled";
import { Box } from "@mui/joy";
import { numberType, renderableType } from "../argTypes";
import { SvgTypeValue, svgType } from "../argTypes/svgType";
import { implicitCast, nodeType } from "../lib";

export const SvgOutput = nodeType({
  id: "svg_output",
  name: "SVG Output",
  args: [
    { type: renderableType, name: "Result" },
    { type: numberType, name: "Width", defaultValue: 1280 },
    { type: numberType, name: "Height", defaultValue: 720 }
  ],
  returns: [
    { type: svgType, name: "Output" }
  ],
  render: ([result, width, height]) => {
    return new SvgTypeValue(
      // eslint-disable-next-line react/jsx-key
      <StyledSvg
        id="output-image"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
            #output-image {
              background: white;
            }
            #output-image * {
              font-family: sans-serif;
              color: black;
              line-height: 1.5;
              font-size: 1rem;
            }
          `
          }}
        />
        {result}
      </StyledSvg>,
      width,
      height
    );
  }
});

export const svgOutputImplicitCasts = [
  implicitCast(
    svgType,
    renderableType,
    svg => (
      <Box sx={{ aspectRatio: `${svg.width} / ${svg.height}` }} id="image-renderer">
        {svg.value}
      </Box>
    )
  )
];

export const StyledSvg = styled.svg`
  max-width: 100%;
  max-height: 100%;
  pointer-events: none;
  user-select: none;
`;
