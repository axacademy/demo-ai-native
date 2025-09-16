
import React, { useState, useCallback } from 'react';
import { ASSESSMENT_DATA } from '../constants';
import type { Scores } from '../types';
import Question from './Question';

interface AssessmentSamplePageProps {
  onReset: () => void;
  onViewSampleResults: () => void;
}

const AssessmentSamplePage: React.FC<AssessmentSamplePageProps> = ({ onReset, onViewSampleResults }) => {
  const sampleCategory = ASSESSMENT_DATA[0];

  const [scores, setScores] = useState<Scores>(() => {
    const initialScores: Scores = {};
    sampleCategory.questions.forEach(question => {
      initialScores[question.id] = 0;
    });
    return initialScores;
  });

  const handleScoreChange = useCallback((questionId: string, score: number) => {
    setScores(prevScores => ({
      ...prevScores,
      [questionId]: score,
    }));
  }, []);

  const unansweredQuestions = sampleCategory.questions.filter(q => scores[q.id] === 0).length;
  const answeredQuestions = sampleCategory.questions.length - unansweredQuestions;
  const progressPercentage = (answeredQuestions / sampleCategory.questions.length) * 100;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-100">AI 네이티브 조직 역량 진단 (샘플)</h1>
        <p className="text-slate-300 mt-2">첫 번째 항목인 '{sampleCategory.title}'에 대한 설문을 체험해보세요.</p>
      </header>
      
      <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-8">
        <div className="mt-8">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-semibold text-[#1BC8C8]">{sampleCategory.title}</h2>
                    <p className="text-sm font-medium text-slate-400">{answeredQuestions} / {sampleCategory.questions.length}</p>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-[#1BC8C8] h-2 rounded-full transition-all duration-300 ease-out" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </div>

          <p className="text-slate-400 mb-8">각 항목에 대해 조직의 현재 수준과 가장 가깝다고 생각하는 단계를 선택해주세요.</p>

          <div className="space-y-8">
            {sampleCategory.questions.map((question, index) => (
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

        <div className="mt-12 pt-6 border-t border-slate-700 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
                onClick={onReset}
                className="w-full sm:w-auto bg-slate-700 text-slate-200 font-bold py-2 px-6 rounded-lg border border-slate-600 hover:bg-slate-600 transition-colors"
            >
                처음으로 돌아가기
            </button>
            <button
                onClick={onViewSampleResults}
                className="w-full sm:w-auto bg-[#FFD23F] text-black font-bold py-2 px-6 rounded-lg shadow-md hover:brightness-110 transition-all"
            >
                샘플 결과보기
            </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentSamplePage;
