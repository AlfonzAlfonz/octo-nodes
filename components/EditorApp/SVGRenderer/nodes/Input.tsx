import { nodeDeclaration } from "../../model";
import { stringType } from "../args";

export const Input = nodeDeclaration({
  id: "input",
  name: "Input",
  args: [],
  returns: [
    { type: stringType, name: "Output" }
  ],
  render: (_, { useState }) => {
    const [value] = useState("");
    return value;
  }
});
