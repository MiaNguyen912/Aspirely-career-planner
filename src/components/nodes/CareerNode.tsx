import React from "react";
import { Briefcase } from "lucide-react";
import { CareerNodeData } from "@/data/nodeData";

export const CareerNode: React.FC<{ data: CareerNodeData }> = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-md p-4 rounded-lg border border-emerald-400/30 min-w-[250px] shadow-lg shadow-emerald-500/10">
      <div className="flex items-center gap-2 mb-3">
        <div className="text-emerald-400 bg-emerald-400/10 p-2 rounded-lg">
          <Briefcase size={20} />
        </div>
        <span className="text-white font-medium">{data.name}</span>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-white/80 bg-white/5 p-2 rounded-lg">
          <span>Average Salary</span>
          <span className="text-emerald-400">${data.averageSalary.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-white/80 bg-white/5 p-2 rounded-lg">
          <span>Demand in 5 Years</span>
          <span className="text-emerald-400">+{data.demandIn5Years}%</span>
        </div>
        <div className="flex justify-between text-white/80 bg-white/5 p-2 rounded-lg">
          <span>Gender Distribution</span>
          <div className="flex gap-2">
            <span className="text-blue-400">{data.percentageMen}% M</span>
            <span className="text-pink-400">{data.percentageWomen}% F</span>
          </div>
        </div>
      </div>
    </div>
  );
};
