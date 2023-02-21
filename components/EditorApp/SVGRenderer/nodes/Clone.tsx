import { nodeDeclaration } from "../../model";
import { intType, numberType, renderableType } from "../argTypes";

export const Clone = nodeDeclaration({
  id: "clone",
  name: "Clone",
  args: [
    { type: renderableType, name: "Input" },
    { type: intType, name: "#", defaultValue: 50 },
    { type: numberType, name: "Y", defaultValue: 25 }
  ],
  returns: [{ type: renderableType, name: "Output" }],
  render: ([children, n, y]) => {
    return (
      <>
        {([...Array(n)].map((_, i) => (
          <g key={i} transform={`translate(0, ${i * y})`}>
            {(children)}
          </g>
        )))}
      </>
    );
  }
});
