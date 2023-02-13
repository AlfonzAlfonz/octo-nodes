import { intType, numberType, renderableType } from "../args";
import { nodeDeclaration } from "../nodeDeclaration";

export const Clone = nodeDeclaration({
  id: "clone",
  name: "Clone",
  args: [
    { type: renderableType, name: "Input" },
    { type: intType, name: "#", defaultValue: 5 },
    { type: numberType, name: "Y", defaultValue: 25 }
  ],
  returns: [{ type: renderableType, name: "Output" }],
  render: ([children, n, y], { renderArg }) => {
    return (
      <>
        {([...Array(renderArg(n))].map((_, i) => (
          <g key={i} transform={`translate(0, ${i * (renderArg(y) ?? 0)})`}>
            {renderArg(children)}
          </g>
        )))}
      </>
    );
  }
});
