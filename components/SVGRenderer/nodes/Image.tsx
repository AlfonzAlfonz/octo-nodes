import { renderableType, stringType } from "../args";
import { nodeDeclaration } from "../nodeDeclaration";

export const Image = nodeDeclaration({
  id: "image",
  name: "Image",
  args: [{ type: stringType, name: "Src" }],
  returns: [
    { type: renderableType, name: "Output" }
  ],
  render: ([src], { renderArg }) => {
    return <image href={renderArg(src) ?? ""} />;
  }
});
