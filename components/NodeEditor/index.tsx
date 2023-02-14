import "reactflow/dist/style.css";

import { styled } from "@mui/joy";
import { ArgRef } from "model";
import { FC, useCallback, useMemo } from "react";
import ReactFlow, { Background, Controls, Edge, MiniMap, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";

import { useNodeData, useNodes, useNodeState } from "../NodeContext";
import { EditorNode } from "./EditorNode";
import { Toolbar } from "./Toolbar";

const nodeTypes = {
  default: EditorNode
};

export const NodeEditor: FC = () => {
  const [nodesCtx] = useNodes();
  const [dataCtx, setData] = useNodeData();
  const [stateCtx, setState] = useNodeState();

  const nodes = useMemo<Node[]>(() =>
    nodesCtx.map((n, i) => ({
      id: `${n.id}`,
      type: "default",
      position: stateCtx.nodes[n.id]?.position ?? { x: 0, y: 0 },
      data: n
    })),
  [nodesCtx, stateCtx]);

  const edges = useMemo<Edge[]>(() => dataCtx.map((d, i) => "from" in d ? {
    id: `${i}`,
    source: `${d.from[0]}`,
    sourceHandle: `${d.from[1]}`,
    target: `${d.to[0]}`,
    targetHandle: `${d.to[1]}`
  } : null!).filter(Boolean), [dataCtx]);

  const onNodesChange = useCallback<OnNodesChange>((events) => {
    for (const e of events) {
      switch (e.type) {
        case "position":
          e.position && setState(state => ({
            ...state,
            nodes: { ...state.nodes, [e.id]: { ...state.nodes[e.id], position: e.position! } }
          }));
          break;
        case "dimensions": break;
        case "select": break;
        case "remove": break;
        case "add": break;
        case "reset": break;
      }
    }
  }, [setState]);

  const onEdgesChange = useCallback<OnEdgesChange>((events) => {
    for (const e of events) {
      switch (e.type) {
        case "select": break;
        case "remove":
          setData(data => data.filter(d => +e.id !== d.id));
          break;
        case "add": break;
        case "reset": break;
      }
    }
  }, [setData]);

  const onConnect = useCallback<OnConnect>(({ source, sourceHandle, target, targetHandle }) => {
    if (!source || !sourceHandle || !target || !targetHandle) return;
    setData((data) => [
      ...data.filter(d => !(`${d.to[0]}` === target && `${d.to[1]}` === targetHandle)),
      { from: [+source, +sourceHandle], to: [+target, +targetHandle] } as ArgRef
    ]);
  }, [setData]);

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
  .react-flow__node-default {
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
