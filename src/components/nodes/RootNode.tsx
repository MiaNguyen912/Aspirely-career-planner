import React from "react";
import { FileText } from "lucide-react";
import { Handle, Position } from "@xyflow/react";
import { RootNodeData } from "@/data/nodeData";
import { handleStyle } from "@/styles/flowStyles";


export const RootNode: React.FC<{ data: RootNodeData }> = ({ data }) => {
  const { fileInfo, majorInfo } = data;
  
  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-400 p-4 rounded-lg shadow-lg text-white w-[400px]">
      <Handle type="source" position={Position.Right} id="root-source" style={handleStyle} />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0 text-white bg-white/20 p-2 rounded-lg">
            <FileText size={20} />
          </div>
          <div className="min-w-0 flex-1 text-sm">
            <div className="truncate font-medium">{fileInfo?.name || "No resume uploaded"}</div>
            {fileInfo && <p className="text-white/80 text-xs mt-1">{(fileInfo.size / 1024).toFixed(1)} KB</p>}
          </div>
        </div>

        {fileInfo?.url && (
          <object 
            data={fileInfo.url}
            type="application/pdf"
            className="w-full h-[300px] rounded-lg border border-white/20 bg-white/10"
          >
            <p className="text-white/60 text-sm p-4">Unable to display PDF preview</p>
          </object>
        )}

        {majorInfo && (
          <div className="border-t border-white/20 pt-3">
            <p className="text-lg font-semibold truncate">{majorInfo.name}</p>
            <p className="text-white/80 text-xs mt-1">{majorInfo.code}</p>
          </div>
        )}
      </div>
    </div>
  );
};
