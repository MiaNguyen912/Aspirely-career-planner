import React from 'react';

type MainContentProps = {
  isExpanded: boolean;
};

const MainContent: React.FC<MainContentProps> = ({ isExpanded }) => {
  return (
    <main 
      className={`pt-16 min-h-screen transition-all duration-300 ease-in-out ${
        isExpanded ? 'ml-[20%]' : 'ml-16'
      }`}
    >
      <div className="p-8 h-full flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10 max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Main Content Area</h2>
          <p className="text-white/70">
            This area represents the main content section of your application. 
            It takes up the remaining viewport width based on sidebar state.
          </p>
        </div>
      </div>
    </main>
  );
};

export default MainContent;