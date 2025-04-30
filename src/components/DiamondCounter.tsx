
import React from "react";

interface DiamondCounterProps {
  count: number;
}

const DiamondCounter: React.FC<DiamondCounterProps> = ({ count }) => {
  return (
    <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md border border-purple-200">
      <div className="mr-2 text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 2s1.5 2 2 3.5A12.5 12.5 0 0 1 19 12c0 2.5-.5 4-1 6.5-.5 2.5-2 3.5-2 3.5" />
          <path d="M8 2s-1.5 2-2 3.5A12.5 12.5 0 0 0 5 12c0 2.5.5 4 1 6.5.5 2.5 2 3.5 2 3.5" />
          <path d="M12 2v20" />
          <path d="m2 12 20 0" />
          <path d="M12 2 2 12l10 10 10-10Z" />
        </svg>
      </div>
      <span className="font-bold text-lg text-purple-800">{count}</span>
      <span className="ml-1 text-gray-600">алмазов</span>
    </div>
  );
};

export default DiamondCounter;
