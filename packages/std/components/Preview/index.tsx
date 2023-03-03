import { FC, useMemo } from "react";

import { ArgDeclaration, NodeModel, NodeType } from "../../lib";
import { SvgOutput } from "../../nodeTypes";
import { useMutate, useNodes, useUi } from "../OctoNodesProvider";
import { DebugPreview } from "./DebugPreview";
import { SvgPreview } from "./SvgPreview";

export const Preview: FC = () => {
  const nodes = useNodes();
  const { previewedNode } = useUi();

  const output = useMemo(() => nodes.find(n => n.type.id === SvgOutput.id) as any as NodeModel<typeof SvgOutput>, [nodes]);
  const previewed = useMemo<NodeModel<NodeType<[], any, readonly ArgDeclaration<unknown>[]>>>(() =>
    previewedNode !== undefined ? nodes.find(n => n.id === previewedNode) as any : undefined,
  [nodes, previewedNode]);

  return previewed ? <DebugPreview node={previewed} /> : <SvgPreview node={output} />;
};
