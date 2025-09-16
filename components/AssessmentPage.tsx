import React, { useState, useEffect, useCallback } from 'react';
import { ASSESSMENT_DATA } from '../constants';
import type { Scores } from '../types';
import Stepper from './Stepper';
import Question from './Question';

interface AssessmentPageProps {
  onSubmit: (scores: Scores) => void;
}

const AssessmentPage: React.FC<AssessmentPageProps> = ({ onSubmit }) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const [scores, setScores] = useState<Scores>(() => {
    try {
        const savedScores = localStorage.getItem('assessmentScores');
        if (savedScores) return JSON.parse(savedScores);
    } catch (e) {
        console.error("Failed to parse scores from localStorage", e);
    }
    const initialScores: Scores = {};
    ASSESSMENT_DATA.forEach(category => {
      category.questions.forEach(question => {
        initialScores[question.id] = 0;
      });
    });
    return initialScores;
  });

  useEffect(() => {
    try {
        localStorage.setItem('assessmentScores', JSON.stringify(scores));
    } catch (e) {
        console.error("Failed to save scores to localStorage", e);
    }
  }, [scores]);

  const handleScoreChange = useCallback((questionId: string, score: number) => {
    setScores(prevScores => ({
      ...prevScores,
      [questionId]: score,
    }));
  }, []);

  const handleNext = () => {
    if (currentCategoryIndex < ASSESSMENT_DATA.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
  };
  
  const handleSubmit = () => {
      localStorage.removeItem('assessmentScores');
      onSubmit(scores);
  }

  const currentCategory = ASSESSMENT_DATA[currentCategoryIndex];
  const isLastStep = currentCategoryIndex === ASSESSMENT_DATA.length - 1;

  const unansweredQuestions = currentCategory.questions.filter(q => scores[q.id] === 0).length;
  const answeredQuestions = currentCategory.questions.length - unansweredQuestions;
  const progressPercentage = (answeredQuestions / currentCategory.questions.length) * 100;

  const isStepComplete = unansweredQuestions === 0;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-100">AI 네이티브 조직 역량 진단</h1>
        <p className="text-slate-300 mt-2">현재 조직의 AI 네이티브 조직 전환 역량을 진단하고 성장 전략을 수립하세요.</p>
      </header>
      
      <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-8">
        <Stepper
          steps={ASSESSMENT_DATA.map(c => c.shortTitle)}
          currentStep={currentCategoryIndex}
        />

        <div className="mt-12 pt-8">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-semibold text-[#1BC8C8]">{currentCategory.title}</h2>
                    <p className="text-sm font-medium text-slate-400">{answeredQuestions} / {currentCategory.questions.length}</p>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-[#1BC8C8] h-2 rounded-full transition-all duration-300 ease-out" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </div>

          <p className="text-slate-400 mb-8">각 항목에 대해 조직의 현재 수준과 가장 가깝다고 생각하는 단계를 선택해주세요.</p>

          <div className="space-y-8">
            {currentCategory.questions.map((question, index) => (
              <Question 
                key={question.id}
                question={question}
                score={scores[question.id]}
                onScoreChange={handleScoreChange}
                questionNumber={index + 1}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-700 flex justify-between items-center">
            <button
                onClick={handlePrev}
                disabled={currentCategoryIndex === 0}
                className="bg-slate-700 text-slate-200 font-bold py-2 px-6 rounded-lg border border-slate-600 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                이전
            </button>
            <div className={`text-sm ${isStepComplete ? 'text-green-400 font-semibold' : 'text-slate-400'}`}>
              {isStepComplete ? '모두 답변 완료!' : `${unansweredQuestions}개 항목 남음`}
            </div>
            {isLastStep ? (
                <button
                    onClick={handleSubmit}
                    disabled={!isStepComplete}
                    className="bg-[#FFD23F] text-black font-bold py-2 px-6 rounded-lg shadow-md hover:brightness-110 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed transition-all"
                >
                    결과 보기
                </button>
            ) : (
                <button
                    onClick={handleNext}
                    disabled={!isStepComplete}
                    className="bg-[#1BC8C8] text-white font-bold py-2 px-6 rounded-lg shadow-md hover:brightness-110 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all"
                >
                    다음
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;