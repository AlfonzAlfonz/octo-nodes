import { nodeDeclaration } from "../../model";
import { renderableType, stringType } from "../args";

export const Text = nodeDeclaration({
  id: "text",
  name: "Text",
  args: [{ type: stringType, name: "Text" }],
  returns: [
    { type: renderableType, name: "Output" }
  ],
  render: ([children]) => {
    return <text>{children}</text>;
  }
});
