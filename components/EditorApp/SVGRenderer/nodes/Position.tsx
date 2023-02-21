import { nodeDeclaration } from "../../model";
import { numberType, renderableType, tupleType } from "../argTypes";

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
  render: ([children, pos]) => {
    return (
      <g transform={`${pos ? `translate(${pos[0]}, ${pos[1]})` : ""}`}>
        {children}
      </g>
    );
  }
});
