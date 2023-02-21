import { numberType } from "../argTypes";
import { nodeType } from "./nodeType";

export const Clock = nodeType({
  id: "clock",
  name: "Clock",
  args: [],
  returns: [{ type: numberType, name: "Impuls" }],
  render: (_, { useEffect, useState }) => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
      const h = setInterval(() => {
        setCount(count + 1);
      }, 1000);
      return () => {
        clearInterval(h);
      };
    }, [count]);

    return count;
  }
});
