import { renderableType, stringType } from "../args";
import { nodeDeclaration } from "../nodeDeclaration";

export const Text = nodeDeclaration({
  id: "text",
  name: "Text",
  args: [{ type: stringType, name: "Text" }],
  returns: [
    { type: renderableType, name: "Output" }
  ],
  render: ([children], { renderArg }) => {
    return <text>{renderArg(children)}</text>;
  }
});
