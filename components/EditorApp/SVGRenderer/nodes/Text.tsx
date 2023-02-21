import { nodeDeclaration } from "../../model";
import { renderableType } from "../argTypes";

export const Text = nodeDeclaration({
  id: "text",
  name: "Text",
  args: [{ type: renderableType, name: "Text" }],
  returns: [
    { type: renderableType, name: "Output" }
  ],
  render: ([children]) => {
    return <text>{children}</text>;
  }
});
