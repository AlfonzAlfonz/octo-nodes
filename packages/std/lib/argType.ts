import { more } from "../utils";

export interface ArgType<T extends unknown = unknown> {
  id: ArgTypeId;
  name: string;
  help?: string;
  color: string;

  includes?: ArgType<unknown> | ArgType<unknown>[];
  testValue: (value: unknown) => value is T;
}

export const argType = <T extends unknown>(a: ArgTypeDeclaration): ArgType<T> => ({
  ...a,
  testValue: (v): v is T =>
    (more(a.includes ?? []).some(t => t?.testValue?.(v) ?? false) ?? false) ||
    (a.testValue?.(v) ?? false)
});

export interface GenericArgType<T extends unknown = unknown, TGenerics extends readonly ArgType<unknown>[] = ArgType<unknown>[]> {
  (...types: TGenerics): ArgType<T>;
  generics: TGenerics;
}

export const genericArgType = <const TGenerics extends readonly ArgType<unknown>[]>(
  generics: TGenerics,
  type: (...types: TGenerics) => ArgTypeDeclaration
): GenericArgType<any, TGenerics> => {
  const clone: GenericArgType<unknown, TGenerics> = ((...args: any[]) => type(...args as any)) as any;
  clone.generics = generics;
  return clone as any;
};

export interface SpreadGenericArgType<T extends unknown = unknown> {
  (...type: ArgType<unknown>[]): ArgType<T>;
  spreadGenerics: ArgType<unknown>;
}

export const spreadGenericArgType = <TGeneric extends ArgType<unknown>>(
  generic: TGeneric,
  type: (...type: TGeneric[]) => ArgTypeDeclaration
): SpreadGenericArgType<any> => {
  const clone: SpreadGenericArgType<unknown> = ((...t: any) => type(...t)) as any;
  clone.spreadGenerics = generic;
  return clone as any;
};

export interface ArgTypeDeclaration extends Omit<ArgType<unknown>, "testValue"> {
  testValue?: (value: unknown) => boolean;
}

export type ArgTypeId =
  | string
  | [id: string, generics: ArgTypeId[]]
  | [id: string, generics: ArgTypeId[], ordered: false];
