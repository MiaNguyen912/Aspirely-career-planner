import { Node, Edge } from "@xyflow/react";

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
  careerId: string; // ID of the career this skill is associated with
  resources: string[]; // Resources specific to this career
  isCompleted: boolean;
}

export type CustomNodeData = RootNodeData | CareerNodeData | SkillNodeData;

export type CustomNode = Node<CustomNodeData>;

// Initial nodes data
export const initialNodes: CustomNode[] = [
  {
    id: "root",
    type: "rootNode",
    position: { x: 50, y: 300 },
    data: {
      fileInfo: null,
      majorInfo: null,
    },
  },
  {
    id: "career-1",
    type: "careerNode",
    position: { x: 300, y: 200 },
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
    position: { x: 300, y: 400 },
    data: {
      name: "Data Scientist",
      averageSalary: 130000,
      demandIn5Years: 35,
      percentageMen: 65,
      percentageWomen: 35,
    },
  },
  {
    id: "skill-python-se",
    type: "skillNode",
    position: { x: 550, y: 150 },
    data: {
      name: "Python Programming",
      careerId: "career-1",
      resources: ["https://www.python.org/doc/", "https://www.w3schools.com/python/", "https://realpython.com/"],
      isCompleted: false,
    },
  },
  {
    id: "skill-python-ds",
    type: "skillNode",

    position: { x: 550, y: 350 },
    data: {
      name: "Python Programming",
      careerId: "career-2",
      resources: ["https://www.python.org/doc/", "https://www.kaggle.com/learn/python", "https://www.datacamp.com/courses/intro-to-python-for-data-science"],
      isCompleted: false,
    },
  },
  {
    id: "skill-ml-se",
    type: "skillNode",
    position: { x: 550, y: 250 },
    data: {
      name: "Machine Learning",
      careerId: "career-1",
      resources: ["https://www.coursera.org/learn/machine-learning", "https://www.fast.ai/"],
      isCompleted: false,
    },
  },
  {
    id: "skill-ml-ds",
    type: "skillNode",
    position: { x: 550, y: 450 },
    data: {
      name: "Machine Learning",
      careerId: "career-2",
      resources: ["https://www.coursera.org/learn/machine-learning", "https://www.kaggle.com/learn/intro-to-machine-learning", "https://www.deeplearning.ai/"],
      isCompleted: false,
    },
  },
  {
    id: "skill-web",
    type: "skillNode",
    position: { x: 800, y: 200 },
    data: {
      name: "Web Development",
      careerId: "career-1",
      resources: ["https://developer.mozilla.org/", "https://www.w3schools.com/", "https://www.freecodecamp.org/"],
      isCompleted: false,
    },
  },
  {
    id: "skill-data",
    type: "skillNode",
    position: { x: 800, y: 400 },
    data: {
      name: "Data Analysis",
      careerId: "career-2",
      resources: ["https://www.kaggle.com/learn/data-analysis", "https://www.datacamp.com/courses/data-analysis-with-python", "https://www.coursera.org/learn/data-analysis-with-python"],
      isCompleted: false,
    },
  },
];

// Initial edges data
export const initialEdges: Edge[] = [
  // Root to Career connections
  {
    id: "root-career-1",
    source: "root",
    target: "career-1",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 2 },
  },
  {
    id: "root-career-2",
    source: "root",
    target: "career-2",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 2 },
  },
  // Software Engineer skills
  {
    id: "career-1-skill-python-se",
    source: "career-1",
    target: "skill-python-se",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#f59e0b", strokeWidth: 2 },
  },
  {
    id: "career-1-skill-ml-se",
    source: "career-1",
    target: "skill-ml-se",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#f59e0b", strokeWidth: 2 },
  },
  {
    id: "career-1-skill-web",
    source: "career-1",
    target: "skill-web",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#f59e0b", strokeWidth: 2 },
  },
  // Data Scientist skills
  {
    id: "career-2-skill-python-ds",
    source: "career-2",
    target: "skill-python-ds",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#f59e0b", strokeWidth: 2 },
  },
  {
    id: "career-2-skill-ml-ds",
    source: "career-2",
    target: "skill-ml-ds",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#f59e0b", strokeWidth: 2 },
  },
  {
    id: "career-2-skill-data",
    source: "career-2",
    target: "skill-data",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#f59e0b", strokeWidth: 2 },
  },
];
