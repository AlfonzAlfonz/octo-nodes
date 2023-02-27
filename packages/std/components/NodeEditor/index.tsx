import { styled } from "@mui/joy";
import { FC, useCallback, useMemo } from "react";
import ReactFlow, { Background, Controls, MiniMap, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";

import { useMutate, useNodeArgs, useNodePosition, useNodes } from "../EditorApp/context";
import { EditorNode } from "./EditorNode";
import { InputNode } from "./InputNode";
import { Toolbar } from "./Toolbar";

const nodeTypes = {
  default: EditorNode,
  input: InputNode
};

export const NodeEditor: FC = () => {
  const nodesCtx = useNodes();
  const dataCtx = useNodeArgs();
  const nodePosition = useNodePosition();
  const { addRef, removeRef, moveNode } = useMutate();

  const nodes = useMemo<Node[]>(() =>
    nodesCtx.map((n, i) => ({
      id: `${n.id}`,
      type: n.type.id === "input" ? "input" : "default",
      position: nodePosition[n.id] ?? { x: 0, y: 0 },
      data: n
    })),
  [nodesCtx, nodePosition]);

  const edges = useMemo(() => dataCtx.map((d, i) => "id" in d ? {
    id: `${i}`,
    source: `${d.from[0]}`,
    sourceHandle: `${d.from[1]}`,
    target: `${d.to[0]}`,
    targetHandle: `${d.to[1]}`
  } : null).filter(Boolean), [dataCtx]);

  const onNodesChange = useCallback<OnNodesChange>((events) => {
    for (const e of events) {
      switch (e.type) {
        case "position":
          e.position && moveNode(+e.id, e.position);
          break;
        case "dimensions": break;
        case "select": break;
        case "remove": break;
        case "add": break;
        case "reset": break;
      }
    }
  }, [moveNode]);

  const onEdgesChange = useCallback<OnEdgesChange>((events) => {
    for (const e of events) {
      switch (e.type) {
        case "select": break;
        case "remove":
          removeRef(+e.id);
          break;
        case "add": break;
        case "reset": break;
      }
    }
  }, [removeRef]);

  const onConnect = useCallback<OnConnect>(({ source, sourceHandle, target, targetHandle }) => {
    if (!source || !sourceHandle || !target || !targetHandle) return;
    addRef([+source, +sourceHandle], [+target, +targetHandle]);
  }, [addRef]);

  return (
    <>
      <Toolbar />
      <StyledReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <MiniMap />
        <Controls />
        <Background />
      </StyledReactFlow>
    </>
  );
};

const StyledReactFlow = styled(ReactFlow)`
  .react-flow__node-default, .react-flow__node-input {
    background: transparent;
    color: inherit;
    padding: 0;
    width: initial;
    border: none;
    text-align: initial;
    border-radius: initial;
    font-size: initial;
    box-shadow: none !important;
  }
`;
