
import React, { useMemo, useRef, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

import { ASSESSMENT_DATA } from '../constants';
import type { Scores } from '../types';

interface ResultsPageProps {
  scores: Scores;
  onReset: () => void;
}

const DETAILED_ANALYSIS: { [key: string]: { analysis: string; recommendations: string[] } } = {
  vision_strategy: {
    analysis: "조직의 AI 비전과 사업 전략이 매우 높은 수준으로 정렬되어 있습니다. 경영진의 강력한 의지와 구성원들의 공감대 형성이 잘 이루어져 있어, AI 네이티브 전환을 위한 견고한 기반을 갖추고 있습니다.",
    recommendations: [
      "현재의 전략적 방향성을 분기별로 재검토하고 시장 변화에 민첩하게 대응하세요.",
      "AI 성공 사례를 전사적으로 공유하여, 비전 내재화를 더욱 가속화하세요.",
      "AI 윤리 및 책임 있는 AI 활용 원칙을 수립하여 장기적인 신뢰를 확보하세요."
    ]
  },
  org_structure: {
    analysis: "AI 전담팀을 중심으로 초기 성과가 나타나고 있으나, 전사적 확산과 제도적 뒷받침이 필요한 단계입니다. 직무 재설계나 성과 보상 체계와 같은 구조적 변화가 AI 전환 속도를 따라가지 못하고 있습니다.",
    recommendations: [
      "파일럿 팀의 성공 경험을 타 부서에 전파할 수 있는 CoE(Center of Excellence) 조직 구성을 검토하세요.",
      "AI 도입에 따른 직무 변화 로드맵을 구체화하고, 구성원 대상의 명확한 커뮤니케이션을 진행하세요.",
      "성과 평가(KPI)에 AI 활용도 및 기여도를 반영하는 인센티브 시스템을 도입하세요."
    ]
  },
  leadership_culture: {
    analysis: "실험과 학습을 장려하는 리더십과 심리적 안정감이 확보된 문화는 조직의 큰 자산입니다. 리더들이 AI 활용에 솔선수범하고 있으며, 실패를 용인하는 분위기가 혁신을 촉진하고 있습니다.",
    recommendations: [
      "리더들의 AI 코칭 역량을 강화하여, 팀원들의 성장을 지원하는 문화를 만드세요.",
      "부서 간 협업을 촉진하는 'AI 아이디어톤'이나 '혁신 챌린지'를 정기적으로 개최하세요.",
      "성공/실패 사례 공유를 정례화하여 조직의 집단 학습 속도를 높이세요."
    ]
  },
  tools_data: {
    analysis: "AI 도구 도입과 데이터 활용 측면에서 개선이 시급합니다. 데이터가 분산되어 있고 품질이 낮아 AI 모델의 성능을 저해할 수 있으며, 최신 AI 도구 활용에 대한 투자가 부족한 것으로 보입니다. 이는 AI 전환의 병목 현상을 야기할 수 있습니다.",
    recommendations: [
      "전사 데이터 거버넌스 정책을 수립하고, 데이터 통합 및 품질 관리(Data Cleansing)에 우선적으로 투자하세요.",
      "생성형 AI, AutoML 등 최신 AI 개발/활용 도구를 적극적으로 탐색하고 도입하여 생산성을 향상시키세요.",
      "구성원들이 쉽게 데이터를 검색하고 활용할 수 있는 '데이터 카탈로그'를 구축하세요."
    ]
  },
  innovation: {
    analysis: "AI 도입 효과를 측정하려는 노력은 있으나, 지속적인 개선과 혁신을 위한 체계가 아직 완전히 자리 잡지 않았습니다. KPI 모니터링은 이루어지고 있지만, 그 결과가 신속한 피드백과 프로세스 개선으로 이어지는 데에는 한계가 있습니다.",
    recommendations: [
      "AI 프로젝트의 성과(ROI)를 명확히 측정하고, 이를 기반으로 투자 우선순위를 동적으로 조정하세요.",
      "Agile, DevOps 등 빠른 실험과 반복을 지원하는 개발 및 운영 방법론을 도입하세요.",
      "전 직군 대상의 체계적인 AI 리터러시 교육 및 Reskilling 프로그램을 상시 운영하여 조직의 전반적인 역량을 강화하세요."
    ]
  }
};

const CircularProgress: React.FC<{ score: number }> = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const size = 180;
  const strokeWidth = 14;
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let animationFrameId: number;
    let startTimestamp: number | null = null;
    const duration = 1500; // 1.5 seconds animation

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentDisplay = progress * score;
      setDisplayScore(currentDisplay);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayScore(score); // Ensure it ends exactly at the target score
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [score]);

  const offset = circumference * (1 - (displayScore / 100));

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={center} cy={center} r={radius} stroke="#374151" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#1BC8C8"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - (score / 100))} // The final state for the background element
          strokeLinecap="round"
          style={{ 
            transform: 'rotate(-90deg)', 
            transformOrigin: 'center',
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 0.5s ease-out'
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-extrabold text-slate-100 tabular-nums">{displayScore.toFixed(2)}</span>
        <span className="text-slate-400 text-sm mt-1">/ 100점</span>
      </div>
    </div>
  );
};


const ResultsPage: React.FC<{ scores: Scores; onReset: () => void }> = ({ scores, onReset }) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const categoryScores = useMemo(() => {
    return ASSESSMENT_DATA.map(category => {
      const questionIds = category.questions.map(q => q.id);
      const totalScore = questionIds.reduce((sum, qId) => sum + (scores[qId] || 0), 0);
      const average = questionIds.length > 0 ? totalScore / questionIds.length : 0;
      return {
        id: category.id,
        title: category.title,
        shortTitle: category.shortTitle,
        score: parseFloat((average * 20).toFixed(2)),
      };
    });
  }, [scores]);

  const overallScore = useMemo(() => {
      const totalQuestions = ASSESSMENT_DATA.reduce((acc, cat) => acc + cat.questions.length, 0);
      const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
      const average = totalQuestions > 0 ? totalScore / totalQuestions : 0;
      return parseFloat((average * 20).toFixed(2));
  }, [scores]);


  const handleDownloadPdf = async () => {
    const element = reportRef.current;
    if (!element || isDownloadingPdf) return;

    setIsDownloadingPdf(true);
    try {
      // Temporarily remove shadow for cleaner PDF capture and change bg for PDF
      element.classList.add('shadow-none', 'bg-white');
      
      const canvas = await html2canvas(element, { 
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        onclone: (document) => {
          document.querySelectorAll('*').forEach(node => {
            if (node instanceof HTMLElement) {
              // Keep chart colors as is
              if (node.closest('.recharts-wrapper')) {
                return;
              }
              const style = window.getComputedStyle(node);
              const color = style.color; // e.g., "rgb(203, 213, 225)"
              if (color.startsWith('rgb')) {
                const rgb = color.match(/\d+/g)?.map(Number);
                if (rgb) {
                  // A simple luminance check to see if it's a light color
                  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]);
                  if (luminance > 150) { // Threshold for "light" color on dark bg
                    node.style.color = '#0F1C2E'; // primary color
                  }
                }
              }
            }
          });
        }
      });
      
       // Restore classList
      element.classList.remove('shadow-none', 'bg-white');
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      let imgHeightInPdf = pdfWidth / ratio;
      let heightLeft = imgHeightInPdf;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeightInPdf);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        position = - (imgHeightInPdf - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeightInPdf);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }
      
      pdf.save('AI-Native-Maturity-Assessment-Report.pdf');
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      if (element.classList.contains('shadow-none')) {
        element.classList.remove('shadow-none', 'bg-white');
      }
      setIsDownloadingPdf(false);
    }
  };
  
  const radarChartData = useMemo(() => categoryScores.map(c => ({
      subject: c.shortTitle,
      '역량 점수': c.score,
      fullMark: 100,
  })), [categoryScores]);

  const barChartData = useMemo(() => {
    return [...categoryScores]
        .sort((a, b) => a.score - b.score)
        .map(category => ({
            text: category.shortTitle,
            score: category.score,
        }));
  }, [categoryScores]);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-white flex items-center justify-center gap-4 flex-wrap">
              <span>AI 네이티브 조직 전환 진단 결과</span>
              <span className="text-base font-medium bg-amber-400/20 text-amber-300 px-4 py-1.5 rounded-full">샘플 리포트</span>
            </h1>
            <p className="text-lg text-slate-300 mt-3">이것은 샘플 데이터에 기반한 리포트입니다. 조직의 현재를 진단하고, AI 네이티브 조직 전환을 위한 전략적 로드맵을 확인하세요!</p>
        </header>
        <div ref={reportRef} className="bg-[#0F1C2E] p-6 md:p-10 rounded-xl border border-slate-800 shadow-lg transition-colors">
          {/* Top Section: Score and Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 flex flex-col items-center">
              <h2 className="text-lg font-semibold text-slate-400 mb-4">종합 역량 점수</h2>
              <CircularProgress score={overallScore} />
            </div>
            <div className="md:col-span-2">
              <h2 className="text-lg font-bold text-slate-100 mb-2">종합분석 요약</h2>
              <p className="text-slate-300 leading-relaxed">
                진단 결과를 바탕으로 조직의 AI 네이티브 전환 성숙도를 종합적으로 분석했습니다. 
                아래 차트는 5가지 핵심 역량에 대한 현재 수준을 보여주며, 강점과 개선 필요 영역을 직관적으로 파악할 수 있도록 돕습니다. 
                이 보고서를 통해 데이터 기반의 전략적 의사결정을 내리고, 성공적인 AI 조직으로 나아가기 위한 구체적인 실행 계획을 수립하세요.
              </p>
            </div>
          </div>
          
          <hr className="my-10 border-slate-800" />

          {/* Data Visualization Section */}
          <div>
              <h2 className="text-2xl font-bold text-slate-100 mb-6 border-b border-slate-800 pb-4">조직진단 상세분석</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
                {categoryScores.map(cat => (
                  <div key={cat.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                    <h3 className="text-sm font-semibold text-slate-300">{cat.shortTitle}</h3>
                    <p className="text-3xl font-bold text-slate-100 mt-2 tabular-nums">{cat.score.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                      <h3 className="text-lg font-bold text-slate-100 mb-4 text-center">종합 역량 밸런스</h3>
                      <div style={{ width: '100%', height: 350 }}>
                          <ResponsiveContainer>
                              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                                  <PolarGrid stroke="#374151" />
                                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1' }} />
                                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                                  <Radar name="역량 점수" dataKey="역량 점수" stroke="#1BC8C8" fill="#1BC8C8" fillOpacity={0.6} />
                                  <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 28, 46, 0.9)', border: '1px solid #334155', backdropFilter: 'blur(2px)' }} />
                              </RadarChart>
                          </ResponsiveContainer>
                      </div>
                  </div>
                  <div>
                      <h3 className="text-lg font-bold text-slate-100 mb-4 text-center">개선 중점 역량</h3>
                      <div style={{ width: '100%', height: 350 }}>
                          <ResponsiveContainer>
                              <BarChart data={barChartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                  <XAxis type="number" domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tick={{ fill: '#94a3b8' }} />
                                  <YAxis type="category" dataKey="text" width={80} tick={{ fill: '#cbd5e1' }} />
                                  <Tooltip formatter={(value) => typeof value === 'number' ? value.toFixed(2) : value} contentStyle={{ backgroundColor: 'rgba(15, 28, 46, 0.9)', border: '1px solid #334155', backdropFilter: 'blur(2px)' }} />
                                  <Bar dataKey="score" fill="#1BC8C8" />
                              </BarChart>
                          </ResponsiveContainer>
                      </div>
                  </div>
              </div>
          </div>
          
          <hr className="my-10 border-slate-800" />

          {/* Detailed Analysis Section */}
          <div>
            <h2 className="text-2xl font-bold text-slate-100 mb-6 border-b border-slate-800 pb-4">영역별 상세 분석 및 권장 사항</h2>
            <div className="space-y-8">
              {categoryScores.map((cat) => (
                <div key={cat.id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                    <h3 className="text-xl font-bold text-[#1BC8C8]">{cat.title}</h3>
                    <div className="text-lg font-semibold text-slate-200 mt-2 sm:mt-0">
                      <span className="text-slate-400">점수: </span>{cat.score.toFixed(2)} / 100
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-md font-semibold text-slate-300 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                        진단 분석
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {DETAILED_ANALYSIS[cat.id]?.analysis}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-md font-semibold text-slate-300 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-400" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 14.95a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414l-.707.707zM4 10a1 1 0 01-1 1H2a1 1 0 110-2h1a1 1 0 011 1zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M12 14a1 1 0 01-1 1H9a1 1 0 110-2h2a1 1 0 011 1z" /></svg>
                        실행 권장 사항
                      </h4>
                      <ul className="space-y-2 mt-2 text-sm">
                        {DETAILED_ANALYSIS[cat.id]?.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="flex-shrink-0 h-4 w-4 text-emerald-400 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            <span className="text-slate-400">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
                onClick={handleDownloadPdf}
                disabled={isDownloadingPdf}
                className="w-full sm:w-auto bg-[#FFD23F] text-black font-bold py-3 px-8 rounded-lg shadow-md hover:brightness-110 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
            >
                {isDownloadingPdf ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>생성 중...</span>
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span>PDF로 저장</span>
                    </>
                )}
            </button>
            <button
              onClick={onReset}
              className="w-full sm:w-auto bg-slate-700 text-slate-200 font-bold py-3 px-8 rounded-lg border border-slate-600 hover:bg-slate-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>홈으로 돌아가기</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;