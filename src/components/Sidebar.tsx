import React from "react";
import { User, HelpCircle, Mail, ChevronLeft, ChevronRight, FileText } from "lucide-react";

type SidebarProps = {
  isExpanded: boolean;
  toggleSidebar: () => void;
  uploadedFile: {
    name: string;
    type: string;
    size: number;
    lastModified: number;
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
  return (
    <aside className={`fixed top-16 left-0 bottom-0 bg-black/40 backdrop-blur-md border-r border-white/10 z-20 transition-all duration-300 ease-in-out ${isExpanded ? "w-[20%]" : "w-16"}`}>
      <div className="flex flex-col h-full py-6">
        {uploadedFile && (
          <div className="px-4 mb-6">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <FileText size={20} className="text-blue-400" />
                <span className="text-white font-medium">Uploaded Resume</span>
              </div>
              <div className="text-white/80 text-sm">
                <p className="truncate">{uploadedFile.name}</p>
                <p className="text-white/60 text-xs mt-1">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex-1 space-y-1 px-2">
          <NavItem icon={<User size={20} />} label="Profile" isExpanded={isExpanded} />
          <NavItem icon={<HelpCircle size={20} />} label="Help" isExpanded={isExpanded} />
          <NavItem icon={<Mail size={20} />} label="Contact" isExpanded={isExpanded} />
        </div>
      </div>

      <button onClick={toggleSidebar} className="absolute top-1/2 -translate-y-1/2 -right-3 p-2 bg-blue-600/30 rounded-full hover:bg-blue-600/50 transition-colors text-white">
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </aside>
  );
};

export default Sidebar;
