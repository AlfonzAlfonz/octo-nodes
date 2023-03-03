import { ArgDeclaration, ArgType, OctoNodesLib } from "../../lib";
import { cast } from "./cast";
import { GenericPlaceholder } from "./isSubType";

export * from "./areTypesEqual";
export * from "./cast";
export * from "./isSubType";

export const resolveGenerics = <const TArgs extends readonly ArgDeclaration[] = readonly ArgDeclaration[]>(
  args: TArgs | ((...generics: any[]) => TArgs),
  generics?: readonly (GenericPlaceholder<unknown> | ArgType<unknown>)[]
) => typeof args === "function" ? args(...generics ?? []) : args;

export const validateValue = <T extends unknown>(
  from: ArgType<unknown>,
  to: ArgType<T>,
  value: unknown,
  implicitCasts: OctoNodesLib["implicitCasts"]
): T | null => {
  if (to.testValue(value)) {
    return value ?? null;
  }

  // TODO: enable type runtime value checking
  return cast(implicitCasts, from, to, value) ?? value as any ?? null;
};
