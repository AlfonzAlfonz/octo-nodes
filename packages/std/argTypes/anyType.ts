import { argType } from "../lib";

export const anyType = argType<unknown>({
  id: "any",
  name: "Any",
  color: "cyan",
  testValue: x => true
});
