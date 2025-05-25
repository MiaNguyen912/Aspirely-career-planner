"use client";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import MainContent from "../../components/MainContent";
import { useState, useEffect } from "react";

interface FileInfo {
  name: string;
  type: string;
  size: number;
  lastModified: number;
  url?: string;
}

export default function Platform() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<FileInfo | null>(null);

  useEffect(() => {
    const storedFile = localStorage.getItem("uploadedResume");
    if (storedFile) {
      setUploadedFile(JSON.parse(storedFile));
    }
  }, []);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-black to-gray-900 min-h-screen">
        <div className="fixed inset-0 bg-blue-500/5 pointer-events-none"></div>
        <div className="fixed inset-0 bg-[url('https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>

        <Header />
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} uploadedFile={uploadedFile} />
        <MainContent isExpanded={isExpanded} />
      </div>
    </>
  );
}
