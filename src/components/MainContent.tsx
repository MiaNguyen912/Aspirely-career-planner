"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { RootNode, CareerNode, SkillNode } from "./nodes";
import { initialNodes, initialEdges, FileInfo, MajorInfo } from "@/data/nodeData";

type MainContentProps = {
  isExpanded: boolean;
};

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

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "uploadedResume" || e.key === "selectedMajor") {
        loadData();
      }
    };

    window.addEventListener("storage", handleStorageChange); // add event listener for storage changes
    return () => window.removeEventListener("storage", handleStorageChange); // remove the event listener to avoid having multiple event listeners
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

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
  }, [fileInfo, majorInfo, setNodes]);

  return (
    <main className={`pt-16 min-h-screen transition-all duration-300 ease-in-out ${isExpanded ? "ml-[20%]" : "ml-16"}`}>
      <div style={{ width: "100vw", height: "calc(100vh - 16px)" }}>
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={nodeTypes} fitView>
          <Controls style={{ marginBottom: "70px" }} />
          <Background bgColor="white" color="#A9A9A9" gap={12} size={1} />
        </ReactFlow>
      </div>
    </main>
  );
};

export default MainContent;
