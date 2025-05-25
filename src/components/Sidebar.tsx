import React, { useState, useEffect } from "react";
import { User, HelpCircle, Mail, ChevronLeft, ChevronRight, FileText, Upload, File, FileUp, BookOpenText } from "lucide-react";
import FileUploadArea from "./FileUploadArea";

interface Major {
  id: string;
  name: string;
  type: string;
  division: string;
  specializations: string[];
}

type SidebarProps = {
  isExpanded: boolean;
  toggleSidebar: () => void;
  uploadedFile: {
    name: string;
    type: string;
    size: number;
    lastModified: number;
    url?: string;
  } | null;
};

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  isExpanded: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, isExpanded }) => {
  return (
    <div className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-white/80 hover:text-white group">
      <div className="text-blue-400">{icon}</div>
      <span className={`transition-opacity duration-200 ${isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>{label}</span>
      {!isExpanded && (
        <div className="absolute left-16 bg-gray-900/90 backdrop-blur-md text-white py-2 px-3 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-sm whitespace-nowrap">
          {label}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleSidebar, uploadedFile }) => {
  const [showUploadArea, setShowUploadArea] = useState(false);
  const [major, setMajor] = useState("");
  const [majors, setMajors] = useState<Major[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    // Load major from localStorage
    const storedMajor = localStorage.getItem("selectedMajor");
    if (storedMajor) {
      try {
        const parsedMajor = JSON.parse(storedMajor);
        setMajor(parsedMajor.code);
      } catch (error) {
        console.error("Error parsing stored major:", error);
      }
    }
  }, []);

  // Listen for changes to selectedMajor in localStorage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "selectedMajor" && e.newValue) {
        try {
          const parsedMajor = JSON.parse(e.newValue);
          setMajor(parsedMajor.code);
        } catch (error) {
          console.error("Error parsing stored major:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleFileUpload = (file: File) => {
    // The FileUploadArea component now handles storing the complete file info
    // Just trigger the page reload to reflect the changes
    window.location.reload();
  };

  const handleMajorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMajorId = e.target.value;
    setMajor(selectedMajorId);

    // Store major info in localStorage
    const selectedMajor = majors.find((m) => m.id === selectedMajorId);
    const majorInfo = {
      name: selectedMajor?.name || "",
      code: selectedMajorId,
    };
    localStorage.setItem("selectedMajor", JSON.stringify(majorInfo));

    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event("majorChanged"));
  };

  return (
    <aside className={`fixed top-16 left-0 bottom-0 bg-black/40 backdrop-blur-md border-r border-white/10 z-20 transition-all duration-300 ease-in-out ${isExpanded ? "w-[20%]" : "w-16"}`}>
      <div className="flex flex-col h-full py-6">
        <div className={`px-4 mb-6 ${!isExpanded && "px-2"}`}>
          {isExpanded ? (
            <>
              <div className="bg-white/5 rounded-lg p-3 border border-white/10 relative group mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <FileText size={20} className="text-blue-400" />
                  <span className="text-white font-medium">Resume</span>
                </div>
                {uploadedFile ? (
                  <>
                    <div className="text-white/80 text-sm">
                      <p className="truncate">{uploadedFile.name}</p>
                      <p className="text-white/60 text-xs mt-1">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                    {!showUploadArea ? (
                      <button onClick={() => setShowUploadArea(true)} className="mt-3 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        <Upload size={16} />
                        <span>Upload New Resume</span>
                      </button>
                    ) : (
                      <FileUploadArea onFileUpload={handleFileUpload} onCancel={() => setShowUploadArea(false)} />
                    )}
                  </>
                ) : (
                  <>
                    {!showUploadArea ? (
                      <button onClick={() => setShowUploadArea(true)} className="mt-2 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        <Upload size={16} />
                        <span>Upload Resume</span>
                      </button>
                    ) : (
                      <FileUploadArea onFileUpload={handleFileUpload} onCancel={() => setShowUploadArea(false)} />
                    )}
                  </>
                )}
              </div>

              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpenText size={20} className="text-blue-400" />
                  <span className="text-white font-medium">Major</span>
                </div>
                <select
                  value={major}
                  onChange={handleMajorChange}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
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
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              </div>
            </>
          ) : (
            <div className="relative group">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <FileText size={20} className="text-blue-400" />
                  {uploadedFile && (
                    <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5 flex items-center justify-center">
                      <File size={12} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
              {showUploadArea ? (
                <div className="absolute w-[200px] left-16 bg-gray-900/90 backdrop-blur-md text-white py-2 px-3 rounded-md z-50">
                  <FileUploadArea onFileUpload={handleFileUpload} onCancel={() => setShowUploadArea(false)} />
                </div>
              ) : (
                <>
                  {uploadedFile && (
                    <div className="absolute left-16 bg-gray-900/90 backdrop-blur-md text-white py-2 px-3 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-sm whitespace-nowrap z-50">
                      <p className="font-medium mb-1">Resume</p>
                      <p className="text-white/80 truncate max-w-[200px]">{uploadedFile.name}</p>
                      <p className="text-white/60 text-xs mt-1">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                      <button onClick={() => setShowUploadArea(true)} className="mt-2 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        <Upload size={14} />
                        <span>Upload New</span>
                      </button>
                    </div>
                  )}
                  {!uploadedFile && (
                    <div className="absolute left-16 bg-gray-900/90 backdrop-blur-md text-white py-2 px-3 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-sm whitespace-nowrap z-50">
                      <p className="font-medium mb-1">Resume</p>
                      <button onClick={() => setShowUploadArea(true)} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        <Upload size={14} />
                        <span>Upload Resume</span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex-1 space-y-1 px-2">
          <NavItem icon={<User size={20} />} label="Profile" isExpanded={isExpanded} />
          <NavItem icon={<HelpCircle size={20} />} label="Help" isExpanded={isExpanded} />
          <NavItem icon={<Mail size={20} />} label="Contact" isExpanded={isExpanded} />
          <NavItem icon={<FileUp size={20} />} label="Parse Resume" isExpanded={isExpanded} />
        </div>
      </div>

      <button onClick={toggleSidebar} className="absolute top-1/2 -translate-y-1/2 -right-3 p-2 bg-blue-600/30 rounded-full hover:bg-blue-600/50 transition-colors text-white">
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </aside>
  );
};

export default Sidebar;
