import Image from "next/image";

type LogoProps = {
  size?: number;
  className?: string;
};

const Logo = ({ size = 90, className = "" }: LogoProps) => {
  return (
    <div className={className} style={{ width: size, height: size, position: 'relative' }}>
      <Image
        src="/star_logo.png"
        alt="Aspirely Logo"
        fill
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  );
};

export default Logo;
