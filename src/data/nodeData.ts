import { Node } from "@xyflow/react";

export interface FileInfo {
  name: string;
  type: string;
  size: number;
  lastModified: number;
  url?: string;
}

export interface MajorInfo {
  name: string;
  code: string;
}

export interface RootNodeData extends Record<string, unknown> {
  fileInfo: FileInfo | null;
  majorInfo: MajorInfo | null;
}

export interface CareerNodeData extends Record<string, unknown> {
  name: string;
  averageSalary: number;
  demandIn5Years: number;
  percentageMen: number;
  percentageWomen: number;
}

export interface SkillNodeData extends Record<string, unknown> {
  name: string;
  resources: string[];
  isCompleted: boolean;
}

export type CustomNodeData = RootNodeData | CareerNodeData | SkillNodeData;

export type CustomNode = Node<CustomNodeData>;

// Initial nodes data
export const initialNodes: CustomNode[] = [
  {
    id: "root",
    type: "rootNode",
    position: { x: 0, y: 0 },
    data: {
      fileInfo: null,
      majorInfo: null,
    },
  },
  {
    id: "career-1",
    type: "careerNode",
    position: { x: 0, y: 150 },
    data: {
      name: "Software Engineer",
      averageSalary: 120000,
      demandIn5Years: 25,
      percentageMen: 75,
      percentageWomen: 25,
    },
  },
  {
    id: "career-2",
    type: "careerNode",
    position: { x: 200, y: 150 },
    data: {
      name: "Data Scientist",
      averageSalary: 130000,
      demandIn5Years: 35,
      percentageMen: 65,
      percentageWomen: 35,
    },
  },
  {
    id: "skill-1",
    type: "skillNode",
    position: { x: 0, y: 300 },
    data: {
      name: "Python Programming",
      resources: ["https://www.python.org/doc/", "https://www.w3schools.com/python/"],
      isCompleted: false,
    },
  },
  {
    id: "skill-2",
    type: "skillNode",
    position: { x: 200, y: 300 },
    data: {
      name: "Machine Learning",
      resources: ["https://www.coursera.org/learn/machine-learning", "https://www.kaggle.com/learn/intro-to-machine-learning"],
      isCompleted: false,
    },
  },
];

// Initial edges data
export const initialEdges = [
  { id: "root-career-1", source: "root", target: "career-1" },
  { id: "root-career-2", source: "root", target: "career-2" },
  { id: "career-1-skill-1", source: "career-1", target: "skill-1" },
  { id: "career-2-skill-2", source: "career-2", target: "skill-2" },
];
