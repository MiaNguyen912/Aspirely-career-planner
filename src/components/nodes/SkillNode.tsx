import React from "react";
import { BookOpen } from "lucide-react";
import { Handle, Position } from "@xyflow/react";
import { SkillNodeData } from "@/data/nodeData";
import { handleStyle } from "@/styles/flowStyles";

export const SkillNode: React.FC<{ data: SkillNodeData }> = ({ data }) => {
  return (
    <>
      <Handle type="target" position={Position.Left} id="skill-target" style={handleStyle} />
      
      <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-md p-4 rounded-lg border border-amber-400/30 min-w-[250px] shadow-lg shadow-amber-500/10">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-amber-400 bg-amber-400/10 p-2 rounded-lg">
            <BookOpen size={20} />
          </div>
          <span className="text-white font-medium">{data.name}</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg">
            <div className={`w-3 h-3 rounded-full ${data.isCompleted ? "bg-green-400" : "bg-yellow-400"}`} />
            <span className="text-white/80 text-sm">{data.isCompleted ? "Completed" : "In Progress"}</span>
          </div>
          {data.resources.length > 0 && (
            <div className="space-y-1 bg-white/5 p-2 rounded-lg">
              <p className="text-white/60 text-xs">Resources:</p>
              <ul className="space-y-1">
                {data.resources.map((resource, index) => (
                  <li key={index}>
                    <a href={resource} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 text-xs block truncate">
                      {resource}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
