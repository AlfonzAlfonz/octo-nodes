import { more } from "../utils";

export interface ArgType<T extends unknown = unknown> {
  id: ArgTypeId;
  name: string;
  help?: string;
  color: string;

  includes?: ArgType<unknown> | ArgType<unknown>[];
  testValue: (value: unknown) => value is T;
}

export type ArgTypeId =
  | string;

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
