import dagre from 'dagre';
import { Edge } from '@xyflow/react';
import { CustomNode } from '@/data/nodeData';

const NODE_WIDTH = 300;
const NODE_HEIGHT = 200;

export function getLayoutedElements(nodes: CustomNode[], edges: Edge[], direction = 'LR') {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction, nodesep: 100, ranksep: 200 });

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
    const nodesInSameColumn = nodes.filter(n => 
      Math.abs(dagreGraph.node(n.id).x - nodeWithPosition.x) < 1
    ).sort((a, b) => {
      if (a.type === 'skillNode' && b.type === 'skillNode') {
        const aData = a.data as any, bData = b.data as any;
        return aData.careerId === bData.careerId 
          ? 0 
          : aData.careerId.localeCompare(bData.careerId);
      }
      return 0;
    });

    let yPosition = nodeWithPosition.y;
    if (nodesInSameColumn.length > 1) {
      const spacing = node.type === 'careerNode' ? NODE_HEIGHT + 150 : NODE_HEIGHT + 50;
      const totalHeight = (nodesInSameColumn.length - 1) * spacing;
      const centerY = (Math.min(...nodesInSameColumn.map(n => dagreGraph.node(n.id).y)) + 
                      Math.max(...nodesInSameColumn.map(n => dagreGraph.node(n.id).y))) / 2;
      yPosition = centerY - (totalHeight / 2) + (nodesInSameColumn.indexOf(node) * spacing);
    }

    return {
      ...node,
      position: {
        x: nodeWithPosition.x - NODE_WIDTH / 2,
        y: yPosition - NODE_HEIGHT / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
} 