
import React from 'react';
// Fix: Removed 'Level' from import as it is not exported from '../types'. It is defined locally below.
import type { Category } from '../types';

// Fix: Defined the 'Level' type locally as it is not a shared type and only used within this component.
interface Level {
  level: number;
  title: string;
  description: string;
}

interface AssessmentCategoryProps {
  // Fix: Augmented the 'category' prop to include the optional 'levels' property to resolve the type error.
  category: Category & { levels?: Level[] };
  selectedLevel: number;
  onLevelChange: (categoryId: string, level: number) => void;
}

const AssessmentCategory: React.FC<AssessmentCategoryProps> = ({ category, selectedLevel, onLevelChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-slate-800">{category.title}</h2>
        <div className="mt-4 space-y-3">
          {category.levels?.map((level: Level) => (
            <div key={level.level} className="flex items-start">
              <input
                type="radio"
                id={`${category.id}-${level.level}`}
                name={category.id}
                value={level.level}
                checked={selectedLevel === level.level}
                onChange={() => onLevelChange(category.id, level.level)}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor={`${category.id}-${level.level}`} className="ml-3 block text-sm text-slate-600">
                <span className="font-bold text-slate-700">{level.title}:</span> {level.description}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentCategory;
