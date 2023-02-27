import { DependencyList, EffectCallback } from "react";

import { validateValue } from "../argTypes/utils";
import { useMutate } from "../components/EditorApp/context";
import { OctoNodesLib } from "../lib";
import { NodeArg, NodeModel } from "../lib/state";
import { areHookInputsEqual } from "../utils";

type RenderInputState = {
  lib: OctoNodesLib;
  nodes: NodeModel[];
  args: NodeArg[];
  nodeState: Record<string, { value: unknown }>;
  setNodeState: ReturnType<typeof useMutate>["setNodeState"];
};

type RenderInternals = {
  prevEffectList: Map<number, [ReturnType<EffectCallback>, DependencyList]>;
};

export const createRenderNode = (state: RenderInputState, internals: RenderInternals) => (node: NodeModel): unknown[] => {
  const evaluatedArgs = node.type.args.map((argDeclaration, i) => {
    const ref = state.args.find(a => a.to[0] === node.id && a.to[1] === i);

    if (!ref) return null;

    if ("value" in ref) {
      return validateValue(argDeclaration.type, argDeclaration.type, ref.value, state.lib);
    }

    const fromNode = state.nodes.find(n => n.id === ref.from[0])!;

    const nodeValue = createRenderNode(state, internals)(fromNode);

    const value = nodeValue[ref.from[1]];

    return validateValue(fromNode.type.returns[ref.from[1]].type, argDeclaration.type, value, state.lib);
  });

  let effect: [EffectCallback, DependencyList] | undefined;

  const res = node.type.render(evaluatedArgs, {
    useEffect: (...e) => {
      effect = e;
    },
    useState: <T extends unknown>(initialValue?: T) => {
      const s = state.nodeState[node.id];
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      return [s ? s.value as T : initialValue!, x => state.setNodeState(node.id, x)];
    }
  });

  const prevEffect = internals.prevEffectList.get(node.id);
  let equal: boolean | undefined;

  if (prevEffect) {
    if (!effect) throw new Error("Hook rule violation");
    equal = areHookInputsEqual(effect[1], prevEffect[1]);

    if (prevEffect && !equal && prevEffect[0]) {
      prevEffect[0]();
    }
  }

  if (effect && (!prevEffect || (!equal ?? !areHookInputsEqual(effect[1], prevEffect[1])))) {
    internals.prevEffectList.set(node.id, [effect[0](), effect[1]]);
  }

  if (Array.isArray(res)) return res;
  return [res];
};
