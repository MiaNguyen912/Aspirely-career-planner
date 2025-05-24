import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { RootNodeData } from "@/data/nodeData";

export const RootNode: React.FC<{ data: RootNodeData }> = ({ data }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (data.fileInfo) {
      const storedFile = localStorage.getItem("uploadedResumeFile");
      if (storedFile) {
        const byteCharacters = atob(storedFile);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      }
    }
  }, [data.fileInfo]);

  return (
    <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md p-4 rounded-lg border border-blue-400/30 min-w-[300px] shadow-lg shadow-blue-500/10">
      <div className="flex items-center gap-2 mb-2">
        <div className="text-blue-400 bg-blue-400/10 p-2 rounded-lg">
          <FileText size={20} />
        </div>
        <span className="text-white font-medium">Resume & Major</span>
      </div>
      {data.fileInfo ? (
        <div className="text-white/80 text-sm">
          <p className="truncate mb-2">{data.fileInfo.name}</p>
          <p className="text-white/60 text-xs mb-3">{(data.fileInfo.size / 1024).toFixed(1)} KB</p>
          {pdfUrl && (
            <div className="w-full h-[300px] rounded-lg overflow-hidden border border-blue-400/30 bg-white/5">
              <iframe src={pdfUrl} className="w-full h-full" title="Resume PDF" />
            </div>
          )}
        </div>
      ) : (
        <p className="text-white/60 text-sm mb-3">No resume uploaded</p>
      )}
      {data.majorInfo && (
        <div className="mt-3 pt-3 border-t border-blue-400/30">
          <p className="text-white/80 font-medium">{data.majorInfo.name}</p>
          <p className="text-white/60 text-xs">{data.majorInfo.code}</p>
        </div>
      )}
    </div>
  );
};
