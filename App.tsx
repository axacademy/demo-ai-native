
import React, { useState, useMemo, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import ResultsPage from './components/ResultsPage';
import AssessmentSamplePage from './components/AssessmentSamplePage';
import { ASSESSMENT_DATA } from './constants';
import type { Scores } from './types';

type View = 'landing' | 'results' | 'assessmentSample';

const sampleScores: Scores = {
  // 비전·전략 정합성
  'q_vision_1': 4, 'q_vision_2': 5, 'q_vision_3': 4, 'q_vision_4': 3, 'q_vision_5': 4,
  // 조직 구조·인력 운영
  'q_org_1': 3, 'q_org_2': 2, 'q_org_3': 3, 'q_org_4': 4, 'q_org_5': 2, 'q_org_6': 3, 'q_org_7': 4,
  // 리더십·문화
  'q_culture_1': 5, 'q_culture_2': 4, 'q_culture_3': 4, 'q_culture_4': 5, 'q_culture_5': 3, 'q_culture_6': 4, 'q_culture_7': 3,
  // AI 도구·데이터 활용
  'q_tools_1': 2, 'q_tools_2': 1, 'q_tools_3': 3, 'q_tools_4': 4, 'q_tools_5': 3, 'q_tools_6': 4, 'q_tools_7': 3, 'q_tools_8': 2,
  // 지속적 개선·혁신 체계
  'q_innov_1': 4, 'q_innov_2': 3, 'q_innov_3': 3, 'q_innov_4': 4, 'q_innov_5': 3, 'q_innov_6': 2, 'q_innov_7': 4, 'q_innov_8': 3,
};


const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');

  const initialScores = useMemo(() => {
    const scores: Scores = {};
    ASSESSMENT_DATA.forEach(category => {
      category.questions.forEach(question => {
        scores[question.id] = 0; // Default to 0 (unanswered)
      });
    });
    return scores;
  }, []);

  const [scores, setScores] = useState<Scores>(initialScores);
  
  const handleReset = useCallback(() => {
    setScores(initialScores);
    setView('landing');
  }, [initialScores]);

  const handleViewSample = useCallback(() => {
    setScores(sampleScores);
    setView('results');
  }, []);

  const handleViewAssessmentSample = useCallback(() => {
    setView('assessmentSample');
  }, []);


  const renderView = () => {
    switch (view) {
      case 'results':
        return <ResultsPage scores={scores} onReset={handleReset} />;
      case 'assessmentSample':
        return <AssessmentSamplePage onReset={handleReset} onViewSampleResults={handleViewSample} />;
      case 'landing':
      default:
        return <LandingPage onViewSample={handleViewSample} onViewAssessmentSample={handleViewAssessmentSample} />;
    }
  };

  return (
    <div className="bg-[#0F1C2E] min-h-screen text-slate-200">
      <main className="fade-in" key={view}>{renderView()}</main>
    </div>
  );
};

export default App;