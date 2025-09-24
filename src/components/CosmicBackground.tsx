import React from 'react';
import { Star } from 'lucide-react';

interface CosmicBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ children, className = "" }) => (
  <div className={`min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-cyan-900 relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-purple-900 to-violet-800 opacity-90"></div>
    <div className="absolute inset-0" style={{background: "radial-gradient(circle, transparent 0%, rgba(147, 51, 234, 0.3) 50%, rgba(22, 78, 99, 0.5) 100%)"}}></div>
    
    <div className="absolute inset-0">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            filter: `brightness(${0.8 + Math.random() * 0.4})`
          }}
        >
          <div className="w-1 h-1 bg-white rounded-full" style={{ boxShadow: '0 0 6px rgba(255,255,255,0.8)' }} />
        </div>
      ))}
      
      {[...Array(8)].map((_, i) => (
        <div
          key={`bright-${i}`}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          <Star className="w-3 h-3 text-white" fill="currentColor" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' }} />
        </div>
      ))}
    </div>
    
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-cyan-400/15 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-violet-400/20 rounded-full filter blur-2xl"></div>
    </div>
    
    {children}
  </div>
);

export default CosmicBackground;