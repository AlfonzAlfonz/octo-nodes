import { numberType, renderableType, tupleType } from "../args";
import { nodeDeclaration } from "../nodeDeclaration";

export const Position = nodeDeclaration({
  id: "position",
  name: "Position",
  args: [
    { type: renderableType, name: "Input" },
    { type: tupleType(numberType, numberType), name: "Position", defaultValue: 20 }
  ],
  returns: [
    { type: renderableType, name: "Output" }
  ],
  render: ([children, pos], { renderArg }) => {
    const posVal = renderArg(pos);
    return (
      <g transform={`${posVal ? `translate(${posVal[0]}, ${posVal[1]})` : ""}`}>
        {renderArg(children)}
      </g>
    );
  }
});
