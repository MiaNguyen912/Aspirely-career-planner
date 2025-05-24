import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

const MainLayout: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gradient-to-br from-black to-gray-900 min-h-screen">
      <div className="fixed inset-0 bg-blue-500/5 pointer-events-none"></div>
      <div className="fixed inset-0 bg-[url('https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
      
      <Header />
      <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <MainContent isExpanded={isExpanded} />
    </div>
  );
};

export default MainLayout;