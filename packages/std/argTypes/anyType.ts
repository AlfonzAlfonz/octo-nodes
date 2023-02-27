import { argType } from "../lib/argType";

export const anyType = argType<unknown>({
  id: "any",
  name: "Any",
  color: "cyan",
  testValue: x => true
});
