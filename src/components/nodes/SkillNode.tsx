import React from "react";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { SkillNodeData } from "@/data/nodeData";
import { Handle, Position } from "@xyflow/react";
import { handleStyle } from "@/styles/flowStyles";

export const SkillNode: React.FC<{ data: SkillNodeData }> = ({ data }) => {
  return (
    <>
      <Handle type="target" position={Position.Left} id="skill-target" style={handleStyle} />
      <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-4 rounded-lg shadow-lg text-white min-w-[250px]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="text-white bg-white/20 p-2 rounded-lg">
              <BookOpen size={20} />
            </div>
            <span className="text-lg font-semibold">{data.name}</span>
          </div>
          {data.isCompleted && (
            <div className="text-white bg-white/20 p-1.5 rounded-lg">
              <CheckCircle2 size={16} />
            </div>
          )}
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 bg-white/10 p-2 rounded">
            <div className={`w-3 h-3 rounded-full ${data.isCompleted ? "bg-white" : "bg-white/70"}`} />
            <span className="text-sm font-medium">{data.isCompleted ? "Completed" : "In Progress"}</span>
          </div>
          {data.resources.length > 0 && (
            <div className="space-y-1 bg-white/10 p-2 rounded">
              <p className="text-white/90 text-xs font-medium">Resources for {data.careerId.replace("career-", "Career ")}:</p>
              <ul className="space-y-1">
                {data.resources.map((resource, index) => (
                  <li key={index}>
                    <a href={resource} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 text-xs block truncate">
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
