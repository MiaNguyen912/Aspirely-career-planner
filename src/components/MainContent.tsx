"use client";

import React, { useCallback, useEffect, useState } from "react";

import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, Panel, Connection } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { RootNode, CareerNode, SkillNode } from "./nodes";
import { initialNodes, initialEdges, FileInfo, MajorInfo } from "@/data/nodeData";
import { defaultEdgeOptions } from "@/styles/flowStyles";
import { getLayoutedElements } from "@/utils/layout";

interface MainContentProps {
  isExpanded: boolean;
}

const nodeTypes = {
  rootNode: RootNode,
  careerNode: CareerNode,
  skillNode: SkillNode,
};

const MainContent: React.FC<MainContentProps> = ({ isExpanded }) => {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [majorInfo, setMajorInfo] = useState<MajorInfo | null>(null);

  // Load file info and major info from localStorage
  useEffect(() => {
    const loadData = () => {
      // Load file info
      const storedFile = localStorage.getItem("uploadedResume");
      if (storedFile) {
        try {
          const parsedFile = JSON.parse(storedFile);
          setFileInfo(parsedFile);
        } catch (error) {
          console.error("Error parsing stored file info:", error);
        }
      }

      // Load major info
      const storedMajor = localStorage.getItem("selectedMajor");
      if (storedMajor) {
        try {
          const parsedMajor = JSON.parse(storedMajor);
          setMajorInfo(parsedMajor);
        } catch (error) {
          console.error("Error parsing stored major info:", error);
        }
      }
    };

    loadData(); // Load initially

    // Listen for storage changes and custom majorChanged event
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "uploadedResume" || e.key === "selectedMajor") {
        loadData();
      }
    };

    const handleMajorChange = () => {
      loadData();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("majorChanged", handleMajorChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("majorChanged", handleMajorChange);
    };
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge({ ...connection, ...defaultEdgeOptions }, eds)),
    [setEdges]
  );

  // Add useLayoutEffect to apply initial layout
  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialNodes,
      initialEdges
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, []);

  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges
    );
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [nodes, edges]);

  // Update root node data when fileInfo or majorInfo changes
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "root" && node.type === "rootNode") {
          return {
            ...node,
            data: {
              fileInfo,
              majorInfo,
            },
          };
        }
        return node;
      })
    );
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.target === "root" && edge.type === "smoothstep") {
          return { ...edge, source: "root" };
        }
        return edge;
      })
    );
  }, [fileInfo, majorInfo, setNodes, setEdges]);

  return (
    <main className={`pt-16 min-h-screen transition-all duration-300 ease-in-out ${isExpanded ? "ml-[20%]" : "ml-16"}`}>
      <div style={{ width: "100%", height: "calc(100vh - 64px)" }}>
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange} 
          onEdgesChange={onEdgesChange} 
          onConnect={onConnect} 
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.5}
          maxZoom={2}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          elementsSelectable={true}
          selectNodesOnDrag={false}
          proOptions={{ hideAttribution: true }}
        >
          <Controls style={{ marginBottom: "10px" }} />
          <Background bgColor="#fafafa" color="#A9A9A9" gap={12} size={1} />
        </ReactFlow>
      </div>
    </main>
  );
};

export default MainContent;
