"use client";

import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";

interface Major {
  id: string;
  name: string;
  type: string;
  division: string;
  specializations: string[];
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [major, setMajor] = useState("");
  const [majors, setMajors] = useState<Major[]>([]);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await fetch("/api/majors");
        const data = await response.json();
        if (data.status === 200) {
          setMajors(data.data);
        } else {
          setError("Failed to load majors");
        }
      } catch (error) {
        setError("Error loading majors");
        console.error("Error fetching majors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMajors();
  }, []);

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
      setSelectedFile(file);
      setError("");
    } else {
      setError("Please upload a valid file (PDF or DOC)");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please upload your resume before submitting");
      return;
    }

    if (!major) {
      setError("Please select your major");
      return;
    }

    // Store file information in localStorage
    const fileInfo = {
      name: selectedFile.name,
      type: selectedFile.type,
      size: selectedFile.size,
      lastModified: selectedFile.lastModified,
    };
    localStorage.setItem("uploadedResume", JSON.stringify(fileInfo));

    // Store major information in localStorage
    const selectedMajor = majors.find((m) => m.id === major);
    const majorInfo = {
      name: selectedMajor?.name || "",
      code: major,
    };
    localStorage.setItem("selectedMajor", JSON.stringify(majorInfo));

    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-blue-500/5 pointer-events-none" />
      <div className="fixed inset-0 bg-[url('https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg')] bg-cover bg-center opacity-5 mix-blend-overlay" />

      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/10 w-full max-w-md relative">
        <div className="mb-8 flex justify-center">
          <Logo size={48} className="scale-125" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-white mb-2">
              Upload Resume
            </label>
            <div className="relative">
              <input type="file" id="resume" accept=".pdf,.doc,.docx" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="hidden" />
              <label
                htmlFor="resume"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex items-center justify-center gap-2 w-full px-4 py-3 border border-white/20 rounded-lg cursor-pointer transition-colors text-white ${
                  isDragging ? "bg-white/20 border-blue-500" : "bg-white/5 hover:bg-white/10"
                }`}>
                <Upload size={20} />
                {selectedFile ? selectedFile.name : "Choose file or drag and drop"}
              </label>
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="major" className="block text-sm font-medium text-white mb-2">
              What's your major?
            </label>
            <select
              id="major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              required
              disabled={isLoading}>
              <option value="" disabled>
                {isLoading ? "Loading majors..." : "Select your major"}
              </option>
              {majors.map((major) => (
                <option key={major.id} value={major.id}>
                  {major.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600/80 hover:bg-blue-700/90 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}>
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
