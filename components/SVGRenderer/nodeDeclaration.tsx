import { Arg, ArgDeclaration, NodeDeclaration, NodeModel, RenderArg, RenderPhaseArg } from "model";

export function nodeDeclaration<
  const TArgs extends readonly ArgDeclaration[],
  const TReturns extends readonly ArgDeclaration[]
> (
  node: NodeDeclaration<TArgs, TReturns>
): NodeDeclaration<TArgs, TReturns> {
  return node;
}

export const createRenderArg = (nodes: NodeModel[], args: Arg[], currentNode: NodeModel): RenderArg =>
  <T extends unknown>(arg?: RenderPhaseArg<T> | null): T | null => {
    if (arg === null || arg === undefined) return null as T;

    const argDeclaration = currentNode.type.args[arg.index] as ArgDeclaration<T>;

    const data = args.find(({ to: [id, index] }) => id === currentNode.id && index === arg.index);

    if (!data) return argDeclaration.defaultValue ?? null;

    if ("value" in data) {
      return validateValue(argDeclaration, data.value);
    }

    const renderedNode = nodes.find(n => n.id === data.from[0])!;

    const res = renderedNode.type.render(
      renderedNode.type.args.map((_, i) => ({ index: i })),
      { renderArg: createRenderArg(nodes, args, renderedNode) }
    );

    return validateValue(argDeclaration, res);
  };

export const validateValue = <T extends unknown>(
  argDeclaration: ArgDeclaration<T>,
  value: unknown = argDeclaration.defaultValue
): T | null =>
  argDeclaration.type.testValue(value) ? value as T : null;
