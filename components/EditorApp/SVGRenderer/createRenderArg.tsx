import { DependencyList, EffectCallback } from "react";

import { NodeModel, NodeReference } from "../model";
import { useMutate } from "../NodeContext";
import { areHookInputsEqual, validateValue } from "../utils";

export const renderNode = (
  nodes: NodeModel[],
  refs: NodeReference[],
  prevEffectList: Map<number, [ReturnType<EffectCallback>, DependencyList]>,
  nodeState: Record<string, unknown>,
  setNodeState: ReturnType<typeof useMutate>["setNodeState"],
  node: NodeModel
): unknown[] => {
  const evaluatedArgs = node.type.args.map((argDeclaration, i) => {
    const arg = refs.find(a => a.to[0] === node.id && a.to[1] === i);
    const value = !arg ? undefined : "value" in arg
      ? arg.value
      : renderNode(nodes, refs, prevEffectList, nodeState, setNodeState, nodes.find(n => n.id === arg.from[0])!)[arg.from[1]];

    return validateValue(argDeclaration, value) ?? null;
  });

  let effect: [EffectCallback, DependencyList] | undefined;

  const res = node.type.render(evaluatedArgs, {
    useEffect: (...e) => {
      effect = e;
    },
    useState: <T extends unknown>(initialValue?: T) =>
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      [nodeState[node.id] as T ?? initialValue!, x => setNodeState(node.id, x)]
  });

  const prevEffect = prevEffectList.get(node.id);
  let equal: boolean | undefined;

  if (prevEffect) {
    if (!effect) throw new Error("Hook rule violation");
    equal = areHookInputsEqual(effect[1], prevEffect[1]);

    if (prevEffect && !equal && prevEffect[0]) {
      prevEffect[0]();
    }
  }

  if (effect && (!prevEffect || (!equal ?? !areHookInputsEqual(effect[1], prevEffect[1])))) {
    prevEffectList.set(node.id, [effect[0](), effect[1]]);
  }

  if (Array.isArray(res)) return res;
  return [res];
};
