import { nodeDeclaration } from "../../model";
import { anyType } from "../args";

export const Input = nodeDeclaration({
  id: "input",
  name: "Input",
  args: [],
  returns: [
    { type: anyType, name: "Output" }
  ],
  render: (_, { useState }) => useState(null)[0]
});
