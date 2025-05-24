import React, { useState } from "react";
import { Upload, X } from "lucide-react";

interface FileUploadAreaProps {
  onFileUpload: (file: File) => void;
  onCancel: () => void;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ onFileUpload, onCancel }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      onFileUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="mt-3">
      <div className="flex justify-end mb-2">
        <button onClick={onCancel} className="text-white/60 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 transition-colors ${isDragging ? "border-blue-400 bg-blue-400/10" : "border-white/20 hover:border-white/40"}`}>
        <label className="flex flex-col items-center gap-2 cursor-pointer">
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileSelect} className="hidden" />
          <Upload size={24} className="text-blue-400" />
          <div className="text-center">
            <p className="text-sm text-white/80">Drag and drop your resume here</p>
            <p className="text-xs text-white/60 mt-1">or click to browse</p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default FileUploadArea;
