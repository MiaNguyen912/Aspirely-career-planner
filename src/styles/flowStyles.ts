import { MarkerType } from "@xyflow/react";

export const handleStyle = {
  width: '8px',
  height: '8px',
  background: '#3b82f6',
  border: '2px solid #2563eb'
};

export const defaultEdgeOptions = {
  type: 'bezier',
  animated: true,
  style: { stroke: '#3b82f6', strokeWidth: 2, opacity: 0.5 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' },
}; 