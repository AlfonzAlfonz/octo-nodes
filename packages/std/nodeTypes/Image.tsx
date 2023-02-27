import { stringType } from "../argTypes";
import { imageType, ImageTypeValue } from "../argTypes/imageType";
import { nodeType } from "../lib/nodeType";

export const Image = nodeType({
  id: "image",
  name: "Image",
  args: [{ type: stringType, name: "Src", defaultValue: "https://placekitten.com/500/300" }],
  returns: [{ type: imageType, name: "Output" }],
  render: ([src], { useEffect, useState }) => {
    const [data, setData] = useState<string | undefined>();

    useEffect(() => {
      const abortController = new AbortController();
      if (!src?.trim()) {
        setData(undefined);
      } else {
        void fetch(src, { signal: abortController.signal })
          .then(r => r.ok ? r.blob() : Promise.reject(new Error()))
          .then(b => {
            const reader = new FileReader();
            reader.onload = () => setData(reader.result as string);
            reader.readAsDataURL(b);
          }).catch(() => setData(undefined));
      }

      return () => {
        abortController.abort();
      };
    }, [src]);

    return data ? new ImageTypeValue(src, data) : null;
  }
});
