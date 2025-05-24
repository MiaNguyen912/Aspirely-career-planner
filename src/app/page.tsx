"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [major, setMajor] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-white/20 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-colors text-white">
                <Upload size={20} />
                {selectedFile ? selectedFile.name : "Choose file"}
              </label>
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
              required>
              <option value="" disabled>
                Select your major
              </option>
              <option value="computer-science">Computer Science</option>
              <option value="engineering">Engineering</option>
              <option value="business">Business</option>
              <option value="arts">Arts</option>
              <option value="science">Science</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600/80 hover:bg-blue-700/90 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
