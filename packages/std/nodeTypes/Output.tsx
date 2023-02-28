import styled from "@emotion/styled";
import { numberType, renderableType } from "../argTypes";
import { nodeType } from "../lib";

export const Output = nodeType({
  id: "output",
  name: "Output",
  args: [
    { type: renderableType, name: "Result" },
    { type: numberType, name: "Width", defaultValue: 1280 },
    { type: numberType, name: "Height", defaultValue: 720 }
  ],
  returns: [
    { type: renderableType, name: "Output" },
    { type: numberType, name: "Width" },
    { type: numberType, name: "Height" }
  ],
  render: ([result, width, height]) => {
    return [(
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
      </StyledSvg>
    ), width, height] as const;
  }
});

export const StyledSvg = styled.svg`
  max-width: 100%;
  max-height: 100%;
  pointer-events: none;
  user-select: none;
`;
