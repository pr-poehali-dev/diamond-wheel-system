
import React, { useEffect, useRef } from "react";

interface SpinnerProps {
  isSpinning: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isSpinning }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (isSpinning && svgRef.current) {
      svgRef.current.style.animation = "spin 2s linear infinite";
    } else if (svgRef.current) {
      svgRef.current.style.animation = "";
    }
  }, [isSpinning]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <svg
        ref={svgRef}
        className={`w-full h-full ${isSpinning ? "animate-spin" : ""}`}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Внешний круг */}
        <circle cx="100" cy="100" r="90" fill="#f0f0f0" stroke="#d1d1d1" strokeWidth="2" />
        
        {/* Сектора винта */}
        <path d="M100,100 L190,100 A90,90 0 0,0 145,28 z" fill="#9b87f5" />
        <path d="M100,100 L145,28 A90,90 0 0,0 55,28 z" fill="#d6bcfa" />
        <path d="M100,100 L55,28 A90,90 0 0,0 10,100 z" fill="#9b87f5" />
        <path d="M100,100 L10,100 A90,90 0 0,0 55,172 z" fill="#d6bcfa" />
        <path d="M100,100 L55,172 A90,90 0 0,0 145,172 z" fill="#9b87f5" />
        <path d="M100,100 L145,172 A90,90 0 0,0 190,100 z" fill="#d6bcfa" />
        
        {/* Алмаз в центре */}
        <path 
          d="M100,70 L115,100 L100,130 L85,100 Z" 
          fill="#33c3f0" 
          stroke="#0ea5e9" 
          strokeWidth="2" 
        />
        
        {/* Центральный круг */}
        <circle cx="100" cy="100" r="15" fill="#7e69ab" />
      </svg>
    </div>
  );
};

export default Spinner;
