import { Layers } from 'lucide-react';

type LogoProps = {
  size?: number;
  className?: string;
};

const Logo = ({ size = 24, className = '' }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Layers size={size} className="text-blue-400" />
      <span className="font-bold text-white text-xl">Glassi</span>
    </div>
  );
};

export default Logo;