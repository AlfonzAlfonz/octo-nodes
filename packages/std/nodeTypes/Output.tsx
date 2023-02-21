import { renderableType } from "../argTypes";
import { nodeType } from "./nodeType";

export const Output = nodeType({
  id: "output",
  name: "Output",
  args: [
    { type: renderableType, name: "Result" }
  ],
  returns: [
    { type: renderableType, name: "Output" }
  ],
  render: ([result]) => {
    return (
      <svg>{result}</svg>
    );
  }
});
