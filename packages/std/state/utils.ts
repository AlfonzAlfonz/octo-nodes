import { NodeId } from "../lib";
import { more } from "../utils";

export const reducer = <S, A>(r: (state: S, action: A) => S) => (state: S, action: A): S =>
  more(action).reduce(r, state);

export const getNewId = (array: ({} | { id: number })[]) =>
  array.reduce<number>((acc, x) => "id" in x ? x.id > acc ? x.id : acc : acc, 0) + 1 as NodeId;
