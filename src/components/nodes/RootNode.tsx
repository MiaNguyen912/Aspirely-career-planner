import React from "react";
import { FileText } from "lucide-react";
import { Handle, Position } from "@xyflow/react";
import { RootNodeData } from "@/data/nodeData";
import { handleStyle } from "@/styles/flowStyles";


export const RootNode: React.FC<{ data: RootNodeData }> = ({ data }) => {
  const { fileInfo, majorInfo } = data;
  const pdfUrl = fileInfo?.url;

  return (
    <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md p-4 rounded-lg border border-blue-400/30 min-w-[300px] max-w-[400px] shadow-lg shadow-blue-500/10">
      <Handle type="source" position={Position.Right} id="root-source" style={handleStyle} />
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 text-blue-400 bg-blue-400/10 p-2 rounded-lg">
            <FileText size={20} />
          </div>
          <div className="min-w-0 flex-1">
            {fileInfo ? (
              <div className="text-white/80 text-sm">
                <p className="truncate">{fileInfo.name}</p>
                <p className="text-white/60 text-xs mt-1">{(fileInfo.size / 1024).toFixed(1)} KB</p>
                {pdfUrl && (
                  <div className="mt-3 w-full h-[300px] rounded-lg overflow-hidden border border-blue-400/30 bg-white/5">
                    <iframe src={pdfUrl} className="w-full h-full" title="Resume PDF" />
                  </div>
                )}
              </div>
            ) : (
              <p className="text-white/60 text-sm">No resume uploaded</p>
            )}
          </div>
        </div>

        {majorInfo && (
          <div className="border-t border-blue-400/30 pt-3">
            <p className="text-white/80 font-medium">{majorInfo.name}</p>
            <p className="text-white/60 text-xs mt-1">{majorInfo.code}</p>
          </div>
        )}
      </div>
    </div>
  );
};
