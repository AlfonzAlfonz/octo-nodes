import { arrayType, numberType, stringType, unionType } from "../argTypes";
import { nodeType } from "../lib";
import { parse } from "csv-parse/browser/esm";

export const Dataset = nodeType({
  id: "dataset",
  name: "Dataset",
  args: [{
    type: stringType,
    name: "Src",
    defaultValue: "https://media.githubusercontent.com/media/datablist/sample-csv-files/main/files/organizations/organizations-100.csv"
  }],
  returns: [
    { type: arrayType(arrayType(unionType(numberType, stringType))), name: "Output" },
    { type: numberType, name: "AAAAAA" }
  ],
  render: ([src], { useEffect, useState }) => {
    const [data, setData] = useState<(string | number)[][] | undefined>();

    useEffect(() => {
      const abortController = new AbortController();
      if (!src?.trim()) {
        setData(undefined);
      } else {
        void fetch(src, { signal: abortController.signal })
          .then(r => r.ok ? r.text() : Promise.reject(new Error()))
          .then(t => {
            // eslint-disable-next-line n/handle-callback-err
            parse(t, (err, v) => setData(v));
          }).catch(() => setData(undefined));
      }

      return () => {
        abortController.abort();
      };
    }, [src]);

    return data ? [data, 1] as const : [null, 1] as const;
  }
});
