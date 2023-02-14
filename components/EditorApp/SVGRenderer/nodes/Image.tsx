import { nodeDeclaration } from "../../model";
import { renderableType, stringType } from "../args";

export const Image = nodeDeclaration({
  id: "image",
  name: "Image",
  args: [{ type: stringType, name: "Src" }],
  returns: [{ type: renderableType, name: "Output" }],
  render: ([src], { useEffect, useState }) => {
    const [data, setData] = useState<string>();

    useEffect(() => {
      const abortController = new AbortController();
      void fetch(src, { signal: abortController.signal }).then(r => r.blob()).then(b => {
        const reader = new FileReader();
        reader.onload = () => setData(reader.result as string);
        reader.readAsDataURL(b);
      }).catch(() => null);

      return () => {
        abortController.abort();
      };
    }, [src]);

    return <image href={data} />;
  }
});
