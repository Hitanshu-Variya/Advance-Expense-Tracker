import React from 'react';
import { FeatureCardProps } from '../../Interfaces/Interfaces.ts';

const FeatureCard: React.FC<FeatureCardProps> = ({ imagePath, cardTitle, cardDescription }) => {
  return (
    <div className="flex flex-col items-center bg-slate-700 p-10 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 shadow-[0px_0px_31px_0px_#44337a]">
      <div className="bg-gray-800 p-4 rounded-full mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d={imagePath} />
        </svg>
      </div>
      <h3 className="font-bold mb-2">{cardTitle}</h3>
      <p className="text-gray-400 mb-4">
        {cardDescription}
      </p>
    </div>
  );
};

export default FeatureCard;
