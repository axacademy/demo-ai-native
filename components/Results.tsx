
import React, { useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ASSESSMENT_DATA } from '../constants';

interface ResultsProps {
  scores: { [key: string]: number };
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ scores, onReset }) => {
  const chartData = useMemo(() => {
    return ASSESSMENT_DATA.map(category => ({
      subject: category.shortTitle,
      '현재 수준': scores[category.id] || 0,
      '목표 수준': 4, // Target level for gap analysis
      fullMark: 5,
    }));
  }, [scores]);

  const averageScore = useMemo(() => {
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const numCategories = Object.keys(scores).length;
    return numCategories > 0 ? (totalScore / numCategories).toFixed(2) : '0.00';
  }, [scores]);

  const getMaturityLevel = (score: number): { level: string; color: string; description: string } => {
    if (score < 2) return { level: 'Level 1: 부재 (Absent)', color: 'text-red-600', description: 'AI 도입 필요성은 인식하지만 전략 및 실행이 부재한 상태입니다.' };
    if (score < 3) return { level: 'Level 2: 초기 (Initial)', color: 'text-orange-500', description: '산발적인 파일럿 프로젝트를 진행하며 AI 도입을 탐색하는 단계입니다.' };
    if (score < 4) return { level: 'Level 3: 정의 (Defined)', color: 'text-yellow-500', description: 'AI 전환을 위한 비전과 로드맵이 수립되고, 전사적 실행을 준비하는 단계입니다.' };
    if (score < 5) return { level: 'Level 4: 정렬 (Aligned)', color: 'text-green-500', description: '조직 전체가 AI 비전을 공유하고, 자원과 노력이 정렬된 상태입니다.' };
    return { level: 'Level 5: 최적화 (Optimized)', color: 'text-blue-600', description: 'AI가 경영 전략과 완전히 통합되어 지속적인 혁신을 창출하는 단계입니다.' };
  };

  const maturity = getMaturityLevel(parseFloat(averageScore));

  return (
    <div className="sticky top-8 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-3 mb-4">진단 결과</h2>
      
      <div className="text-center my-6">
        <p className="text-slate-600">전체 성숙도 평균</p>
        <p className="text-5xl font-bold text-blue-600 my-2">{averageScore}</p>
        <div className={`font-semibold ${maturity.color}`}>{maturity.level}</div>
        <p className="text-sm text-slate-500 mt-2 px-4">{maturity.description}</p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 5]} tickCount={6} />
            <Tooltip
                contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(2px)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                }}
            />
            <Legend />
            <Radar name="현재 수준" dataKey="현재 수준" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Radar name="목표 수준" dataKey="목표 수준" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Gap 분석</h3>
        <p className="text-sm text-slate-600">
            차트는 '현재 수준'과 '목표 수준(Level 4)' 간의 차이를 보여줍니다. 
            격차가 큰 영역을 우선적으로 개선하여 AI 네이티브 조직으로의 전환을 가속화하세요.
        </p>
      </div>

       <button
        onClick={onReset}
        className="w-full mt-8 bg-slate-700 text-white font-bold py-2 px-4 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
      >
        다시 시작하기
      </button>
    </div>
  );
};

export default Results;
