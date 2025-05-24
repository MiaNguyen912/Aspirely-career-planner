import dagre from 'dagre';
import { Edge } from '@xyflow/react';
import { CustomNode } from '@/data/nodeData';

const NODE_WIDTH = 250;
const NODE_HEIGHT = 100;

export function getLayoutedElements(nodes: CustomNode[], edges: Edge[], direction = 'LR') {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  // Add nodes to dagre
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  // Add edges to dagre
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate layout
  dagre.layout(dagreGraph);

  // Get new positions
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    return {
      ...node,
      position: {
        x: isHorizontal ? nodeWithPosition.x - NODE_WIDTH / 2 : nodeWithPosition.x,
        y: isHorizontal ? nodeWithPosition.y : nodeWithPosition.y - NODE_HEIGHT / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
} 