import React from 'react';
import type { Question as QuestionType } from '../types';
import { RATING_LABELS } from '../constants';

interface QuestionProps {
  question: QuestionType;
  score: number;
  onScoreChange: (questionId: string, score: number) => void;
  questionNumber: number;
}

const Question: React.FC<QuestionProps> = ({ question, score, onScoreChange, questionNumber }) => {
  return (
    <div className="border-t border-slate-700/50 pt-6">
      <p className="font-semibold text-slate-100 mb-4">{`${questionNumber}. ${question.text}`}</p>
      <fieldset className="mt-2">
        <legend className="sr-only">Choose a rating for: {question.text}</legend>
        <div className="grid grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <div key={value}>
              <input
                type="radio"
                id={`${question.id}-${value}`}
                name={question.id}
                value={value}
                checked={score === value}
                onChange={() => onScoreChange(question.id, value)}
                className="sr-only"
              />
              <label
                htmlFor={`${question.id}-${value}`}
                className={`flex flex-col items-center justify-center p-3 text-center rounded-md border cursor-pointer transition-all duration-200
                  ${score === value
                    ? 'bg-[#1BC8C8] border-[#1BC8C8] text-white shadow-lg'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600'
                  }`}
              >
                <span className="text-xl font-bold">{value}</span>
                <span className="text-xs mt-1">{RATING_LABELS[value]}</span>
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default Question;