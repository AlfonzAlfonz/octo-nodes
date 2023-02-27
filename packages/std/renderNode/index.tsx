import { DependencyList, EffectCallback } from "react";

import { resolveGenerics, validateValue } from "../argTypes/utils";
import { useMutate } from "../components/EditorApp/context";
import { OctoNodesLib } from "../lib";
import { NodeArg, NodeModel } from "../lib/state";
import { TypeAnalysis } from "../typeAnalysis";
import { areHookInputsEqual } from "../utils";
import { NodeType, NodeTypeReturnType } from "../lib/nodeType";

type RenderInput = {
  lib: OctoNodesLib;
  nodes: NodeModel[];
  args: NodeArg[];
  nodeState: Record<string, { value: unknown }>;
  setNodeState: ReturnType<typeof useMutate>["setNodeState"];
  analysis: TypeAnalysis;
  prevEffectList: Map<number, [ReturnType<EffectCallback>, DependencyList]>;
};

export const createRenderNode = (input: RenderInput) =>
  <T extends NodeType<any, any>>(node: NodeModel<T>): More<NodeTypeReturnType<T>> => {
    const analysedNode = input.analysis.nodes[node.id];

    if (!analysedNode) return [] as never;

    const baseArgs = resolveGenerics(node.type.args);

    const evaluatedArgs = analysedNode.args
      .map(({ type, error }, i) => {
        if (error) return null;

        const ref = input.args.find(a => a.to[0] === node.id && a.to[1] === i);

        if (!ref) return null;

        if ("value" in ref) {
          return validateValue(type, type, ref.value, input.lib);
        }

        const fromNode = input.nodes.find(n => n.id === ref.from[0])!;

        const nodeValue = createRenderNode(input)(fromNode);

        const value = nodeValue[ref.from[1]];

        return validateValue(input.analysis.nodes[ref.from[0]]!.args[ref.from[1]].type, type, value, input.lib);
      })
      .map((v, i) => coalesce(v, baseArgs[i].defaultValue));

    let effect: [EffectCallback, DependencyList] | undefined;

    const res = node.type.render(evaluatedArgs, {
      useEffect: (...e) => {
        effect = e;
      },
      useState: <S extends unknown>(initialValue?: S) => {
        const s = input.nodeState[node.id];
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        return [s ? s.value as S : initialValue!, x => input.setNodeState(node.id, x)];
      }
    });

    const prevEffect = input.prevEffectList.get(node.id);
    let equal: boolean | undefined;

    if (prevEffect) {
      if (!effect) throw new Error("Hook rule violation");
      equal = areHookInputsEqual(effect[1], prevEffect[1]);

      if (prevEffect && !equal && prevEffect[0]) {
        prevEffect[0]();
      }
    }

    if (effect && (!prevEffect || (!equal ?? !areHookInputsEqual(effect[1], prevEffect[1])))) {
      input.prevEffectList.set(node.id, [effect[0](), effect[1]]);
    }

    if (Array.isArray(res)) return res as any;
    return [res] as any;
  };

const coalesce = <T,>(a: T | null | undefined, b?: T | null | undefined) => a ?? b ?? null;

type More<T,> = T extends readonly unknown[] ? T : [T];
