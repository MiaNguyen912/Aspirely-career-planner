"use client";

import React, { useCallback } from "react";
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type MainContentProps = {
  isExpanded: boolean;
};

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const MainContent: React.FC<MainContentProps> = ({ isExpanded }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <main className={`pt-16 min-h-screen transition-all duration-300 ease-in-out ${isExpanded ? "ml-[20%]" : "ml-16"}`}>
      {/* <div className="p-8 h-full flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10 max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Main Content Area</h2>
          <p className="text-white/70">
            This area represents the main content section of your application. 
            It takes up the remaining viewport width based on sidebar state.
          </p>
        </div>
      </div> */}

      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView>
          <Controls />
          <MiniMap />
          <Background bgColor="white" color="black" gap={12} size={1} />
        </ReactFlow>
      </div>
    </main>
  );
};

export default MainContent;
