import { useMemo } from "react";

const StarField = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-dark via-background to-space-dark" />
      
      {/* Nebula glow */}
      <div 
        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
        style={{ background: 'radial-gradient(circle, hsl(280 80% 55%), transparent)' }}
      />
      <div 
        className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-8 blur-[100px]"
        style={{ background: 'radial-gradient(circle, hsl(185 100% 55%), transparent)' }}
      />

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.size > 2 ? 'hsl(185 100% 80%)' : 'hsl(0 0% 95%)',
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
