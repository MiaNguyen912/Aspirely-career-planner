"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";

import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, Panel, Connection, ReactFlowInstance, Node, Edge } from "@xyflow/react";
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
  const [resumeAnalysis, setResumeAnalysis] = useState<string | null>(null);

  // Load file info and major info from localStorage
  useEffect(() => {
    const loadData = async () => {
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

      // Load and analyze resume text
      const storedResumeText = localStorage.getItem("uploadedResumeText");
      if (storedResumeText) {
        try {
          const response = await fetch("/api/googleGemini/getCareerPaths", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              resume: `${storedResumeText}`,
              major: `${majorInfo?.name}`,
            }),
          });

          const data = await response.json();
          if (data.status === 200) {
            setResumeAnalysis(data.data.response);
            const careers = data.data.response.map((career: any) => ({
              id: `career-${career.id}`,
              type: "careerNode",
              position: { x: 0, y: 0 }, // Position will be set by the layout algorithm
              data: {
                name: career.name,
                averageSalary: career.averageSalary,
                demandIn5Years: career.demandIn5Years,
                percentageMen: career.percentageMenInTheWorkforce,
                percentageWomen: career.percentageWomenInTheWorkforce,
              },
            }));

            const rootNode = {
              id: "root",
              type: "rootNode",
              position: { x: 50, y: 300 },
              data: {
                fileInfo: {
                  name: fileInfo?.name,
                  url: fileInfo?.url,
                },
                majorInfo: {
                  name: majorInfo?.name,
                  code: majorInfo?.code,
                },
              },
            };

            // Create skill nodes for each career
            const skillNodes: any[] = [];
            const skillNodePromises = careers.map(async (career: any) => {
              const response = await fetch("/api/googleGemini/getSkillRequirements", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ career: career.data.name }),
              });
              const data = await response.json();

              // Create skill nodes for this career
              const careerSkillNodes = data.data.response.map((skill: any) => ({
                id: `skill-${skill.id}`,
                type: "skillNode",
                position: { x: 0, y: 0 },
                data: {
                  name: skill.name,
                  resources: skill.learningResources,
                  careerId: career.id,
                  isCompleted: false,
                },
              }));

              // Add these skill nodes to our collection
              skillNodes.push(...careerSkillNodes);
            });

            // Wait for all skill node requests to complete
            await Promise.all(skillNodePromises);
            // console.log("Skill nodes created:", skillNodes);

            // Combine all nodes
            const newNodes = [rootNode, ...careers, ...skillNodes];
            // console.log("All nodes created:", newNodes);

            const newEdges: any[] = [];
            // Add edges between root node and careers
            careers.forEach((career: any) => {
              newEdges.push({
                id: `root-${career.id}`,
                source: "root",
                target: `${career.id}`,
                type: "smoothstep",
                animated: true,
              });
            });

            // Add edges between careers and skills
            careers.forEach((career: any) => {
              skillNodes.forEach((skill: any) => {
                if (skill.data.careerId === career.id) {
                  newEdges.push({
                    id: `${career.id}-${skill.id}`,
                    source: `${career.id}`,
                    target: `${skill.id}`,
                    type: "smoothstep",
                    animated: true,
                  });
                }
              });
            });

            // Apply layout to all nodes
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(newNodes, newEdges);

            // Update the nodes and edges
            setNodes(layoutedNodes);
            setEdges(layoutedEdges);
          } else {
            console.error("Error analyzing resume:", data.message);
          }
        } catch (error) {
          console.error("Error making API request:", error);
        }
      }
    };

    loadData(); // Load initially

    // Listen for storage changes and custom majorChanged event
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "uploadedResume" || e.key === "selectedMajor" || e.key === "uploadedResumeText") {
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

  const onConnect = useCallback((connection: Connection) => setEdges((eds) => addEdge({ ...connection, ...defaultEdgeOptions }, eds)), [setEdges]);

  // Add useLayoutEffect to apply initial layout
  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, []);

  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [nodes, edges]);

  // Update root node data when fileInfo or majorInfo changes
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "root" && node.type === "rootNode") {
          // Log the fileInfo to debug
          console.log("File info being passed to root node:", fileInfo);
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
          fitViewOptions={{
            padding: 0.2,
            minZoom: 0.5,
            maxZoom: 1.5,
            duration: 800,
            includeHiddenNodes: true,
          }}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          elementsSelectable={true}
          selectNodesOnDrag={false}
          proOptions={{ hideAttribution: true }}>
          <Controls style={{ marginBottom: "10px" }} />
          <Background bgColor="#fafafa" color="#A9A9A9" gap={12} size={1} />
          <MiniMap nodeStrokeWidth={3} />
        </ReactFlow>
      </div>
    </main>
  );
};

export default MainContent;
