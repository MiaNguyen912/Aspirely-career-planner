import React from "react";
import { Briefcase } from "lucide-react";
import { Handle, Position } from "@xyflow/react";
import { CareerNodeData } from "@/data/nodeData";
import { handleStyle } from "@/styles/flowStyles";

export const CareerNode: React.FC<{ data: CareerNodeData }> = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-lg shadow-lg text-white min-w-[200px]">
      <Handle type="target" position={Position.Left} id="career-target" style={handleStyle} />
      <Handle type="source" position={Position.Right} id="career-source" style={handleStyle} />
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{data.name}</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-white/10 p-2 rounded">
            <p className="text-white/70">Salary</p>
            <p className="font-medium">${data.averageSalary.toLocaleString()}</p>
          </div>
          <div className="bg-white/10 p-2 rounded">
            <p className="text-white/70">Demand</p>
            <p className="font-medium">+{data.demandIn5Years}%</p>
          </div>
          <div className="bg-white/10 p-2 rounded">
            <p className="text-white/70">Men</p>
            <p className="font-medium">{data.percentageMen}%</p>
          </div>
          <div className="bg-white/10 p-2 rounded">
            <p className="text-white/70">Women</p>
            <p className="font-medium">{data.percentageWomen}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
