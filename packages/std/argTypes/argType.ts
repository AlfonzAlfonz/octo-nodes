import { more } from "../utils";

export interface ArgType<T extends unknown = unknown> {
  id: string;
  name: string;
  help?: string;
  color: string;

  includes?: ArgType<unknown> | ArgType<unknown>[];
  testValue: (value: unknown) => value is T;
}

export const argType = <T extends unknown>(
  a: Omit<ArgType<T>, "testValue"> & { testValue?: (x: unknown) => boolean }
): ArgType<T> => ({
  ...a,
  testValue: (v): v is T =>
    (more(a.includes ?? []).some(t => t?.testValue?.(v) ?? false) ?? false) ||
    (a.testValue?.(v) ?? false)
});
