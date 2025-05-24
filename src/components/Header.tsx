import React from 'react';
import Logo from './Logo';
import Button from './ui/Button';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-black/30 backdrop-blur-md border-b border-white/10 z-30 px-4 flex items-center justify-between">
      <Logo />
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm">
          Log In
        </Button>
        <Button variant="primary" size="sm">
          Sign Up
        </Button>
      </div>
    </header>
  );
};

export default Header;