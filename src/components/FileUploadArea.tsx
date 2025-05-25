"use client";

import React, { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";

interface FileUploadAreaProps {
  onFileUpload: (file: File) => void;
  onCancel: () => void;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ onFileUpload, onCancel }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      setError(null);

      const file = e.dataTransfer.files[0];
      if (!file) {
        setError("Please select a file");
        return;
      }

      if (file.type !== "application/pdf") {
        setError("Please upload a PDF file");
        return;
      }

      // Convert file to base64 and store in localStorage
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          // Log to debug
          console.log("File read complete, storing data URL");
          const fileInfo = {
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            url: event.target.result.toString()
          };
          localStorage.setItem("uploadedResume", JSON.stringify(fileInfo));
          onFileUpload(file);
        }
      };
      reader.readAsDataURL(file);
    },
    [onFileUpload]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      const file = e.target.files?.[0];
      if (!file) {
        setError("Please select a file");
        return;
      }

      if (file.type !== "application/pdf") {
        setError("Please upload a PDF file");
        return;
      }

      // Convert file to base64 and store in localStorage
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          // Log to debug
          console.log("File read complete, storing data URL");
          const fileInfo = {
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            url: event.target.result.toString()
          };
          localStorage.setItem("uploadedResume", JSON.stringify(fileInfo));
          onFileUpload(file);
        }
      };
      reader.readAsDataURL(file);
    },
    [onFileUpload]
  );

  return (
    <div className="relative">
      <button onClick={onCancel} className="absolute -top-2 -right-2 p-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
        <X size={16} className="text-white/60" />
      </button>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${isDragging ? "border-blue-400 bg-blue-400/10" : "border-white/20 hover:border-white/40"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <input type="file" accept=".pdf" onChange={handleFileInput} className="hidden" id="file-upload" />
        <label htmlFor="file-upload" className="flex flex-col items-center gap-2 cursor-pointer">
          <Upload size={24} className="text-blue-400" />
          <div className="text-white/80">
            <p className="font-medium">Drop your resume here</p>
            <p className="text-sm text-white/60">or click to browse</p>
          </div>
        </label>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default FileUploadArea;
