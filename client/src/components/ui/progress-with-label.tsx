import React from 'react';

interface ProgressWithLabelProps {
  label: string;
  value: number;
  max: number;
  colorClass?: string;
}

const ProgressWithLabel = ({ 
  label, 
  value, 
  max, 
  colorClass = 'bg-primary-500' 
}: ProgressWithLabelProps) => {
  const percentage = (value / max) * 100;
  
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs text-neutral-600">{label}</span>
        <span className="text-xs font-medium text-neutral-900">{value}/{max}</span>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-2">
        <div 
          className={`${colorClass} h-2 rounded-full`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressWithLabel;
