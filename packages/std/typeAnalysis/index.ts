import { genericPlaceholder, isSubType, resolveGenerics } from "../argTypes/utils";
import { ArgType, NodeArg, NodeModel, NodeValueArg, OctoNodesLib } from "../lib";

export interface TypeAnalysis {
  nodes: PartialRecord<number, AnalysedNode>;
}

type AnalysedNode = {
  args: readonly AnalysedArg[];
  returns: readonly ArgType<unknown>[];
};

export type AnalysedArg<T extends unknown = unknown> = {
  type: ArgType<T>;
  error?: TypeError;
};

interface TypeError {
  error: string;
}

type PartialRecord<K extends number | string, V> = Partial<Record<K, V>>;

export const analyseTypes = (lib: OctoNodesLib, nodes: NodeModel[], nodeArgs: NodeArg[]): TypeAnalysis => {
  const analysis: TypeAnalysis = {
    nodes: {}
  };

  let updated = true;
  let cycles = 0;
  while (updated) {
    updated = false;

    for (const node of nodes) {
      if (node.id in analysis.nodes) continue;

      const resolvedArgs = resolveNodeArgTypes(node.id, nodeArgs, analysis);
      if (!resolvedArgs) continue;

      const an = analyseNode(node, resolvedArgs, lib.implicitCasts);
      if (!an) continue;

      analysis.nodes[node.id] = an;
      updated = true;
    }

    if (cycles > 100) {
      throw new Error("Too many cycles");
    }
    cycles++;
  }

  return analysis;
};

const isNodeValueArg = (x: NodeArg): x is NodeValueArg<unknown> => "value" in x;
const isTypeError = (x: TypeError | ArgType<unknown>): x is TypeError => "error" in x;

const resolveNodeArgTypes = (nodeId: number, nodeArgs: NodeArg[], analysis: TypeAnalysis) => {
  const assignedTypes = new Map<number, ArgType<unknown>>();
  for (const a of nodeArgs.filter(x => x.to[0] === nodeId)) {
    const t = isNodeValueArg(a) ? a.type : analysis.nodes[a.from[0]]?.returns[a.from[1]];
    if (!t) return;
    assignedTypes.set(a.to[1], t);
  }
  return assignedTypes;
};

const analyseNode = (
  node: NodeModel,
  assignedTypes: Map<number, ArgType<unknown>>,
  implicitCasts: OctoNodesLib["implicitCasts"]
): AnalysedNode | undefined => {
  const generics = [...node.type.generics ?? []].map(t => genericPlaceholder(t));

  const args: AnalysedArg[] = [];
  for (const [i, declaration] of resolveGenerics(node.type.args, generics).entries()) {
    const assigned = assignedTypes.get(i);
    args.push(
      assigned
        ? isSubType(declaration.type, assigned, implicitCasts)
          ? { type: assigned }
          : { type: declaration.type, error: { error: `Argument of type ${assigned.name} is not assignable to ${declaration.type.name}` } }
        : { type: declaration.type }
    );
  }

  const resolvedReturns = resolveGenerics(node.type.returns, generics.map(g => g.infered ?? g.base));

  return {
    args,
    returns: resolvedReturns.map(d => d.type)
  };
};
