import { more } from "../utils";

export interface GenericArgType<T extends unknown = unknown, TGenerics extends readonly ArgType<unknown>[] = ArgType<unknown>[]> {
  (...types: TGenerics): ArgType<T>;
  generics: TGenerics;
}

export interface SpreadGenericArgType<T extends unknown = unknown> {
  (...type: ArgType<unknown>[]): ArgType<T>;
  spreadGenerics: ArgType<unknown>;
}

export interface ArgType<T extends unknown = unknown> {
  id: ArgTypeId;
  name: string;
  help?: string;
  color: string;

  includes?: ArgType<unknown> | ArgType<unknown>[];
  testValue: (value: unknown) => value is T;
}

export type ArgTypeId =
  | string
  | [id: string, generics: ArgTypeId[]]
  | [id: string, generics: ArgTypeId[], ordered: false];

export interface ArgTypeDeclaration {
  id: ArgTypeId;
  name: string;
  help?: string;
  color: string;

  includes?: ArgType<unknown> | ArgType<unknown>[];
  testValue?: (value: unknown) => boolean;
}

export type Cast<From, To> = {
  from: ArgType<From>;
  to: ArgType<To>;

  cast: (v: From) => To;
};
export const implicitCast = <From, To>(
  from: ArgType<From>,
  to: ArgType<To>,
  cast: (v: From) => To
): Cast<From, To> => ({ from, to, cast });

export const argType = <T extends unknown>(
  a: ArgTypeDeclaration
): ArgType<T> => ({
  ...a,
  testValue: (v): v is T =>
    (more(a.includes ?? []).some(t => t?.testValue?.(v) ?? false) ?? false) ||
    (a.testValue?.(v) ?? false)
});

export const genericArgType = <const TGenerics extends readonly ArgType<unknown>[]>(
  generics: TGenerics,
  type: (...types: TGenerics) => ArgTypeDeclaration
): GenericArgType<any, TGenerics> => {
  const clone: GenericArgType<unknown, TGenerics> = ((...args: any[]) => type(...args as any)) as any;
  clone.generics = generics;
  return clone as any;
};

export const spreadGenericArgType = <TGeneric extends ArgType<unknown>>(
  generic: TGeneric,
  type: (...type: TGeneric[]) => ArgTypeDeclaration
): SpreadGenericArgType<any> => {
  const clone: SpreadGenericArgType<unknown> = ((...t: any) => type(...t)) as any;
  clone.spreadGenerics = generic;
  return clone as any;
};
