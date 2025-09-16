
import React, { useRef, useEffect } from 'react';

interface LandingPageProps {
  onViewSample: () => void;
  onViewAssessmentSample: () => void;
}

const AIBrainAnimation: React.FC = () => (
    <div className="relative w-full h-96 flex items-center justify-center scale-125" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
            <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="7" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            
            <g style={{ transformOrigin: 'center' }}>
                {/* Concentric Circles */}
                <circle cx="250" cy="250" r="180" fill="none" stroke="#1BC8C8" strokeOpacity="0.1" strokeWidth="1.5" style={{ animation: 'rotate 60s linear infinite reverse' }} />
                <circle cx="250" cy="250" r="140" fill="none" stroke="#1BC8C8" strokeOpacity="0.2" strokeWidth="1.5" style={{ animation: 'rotate 50s linear infinite' }} />
                <circle cx="250" cy="250" r="100" fill="none" stroke="#1BC8C8" strokeOpacity="0.3" strokeWidth="1.5" style={{ animation: 'rotate 40s linear infinite reverse' }} />
                <circle cx="250" cy="250" r="60" fill="none" stroke="#1BC8C8" strokeOpacity="0.4" strokeWidth="1.5" style={{ animation: 'rotate 30s linear infinite' }} />
            </g>

            {/* Central Core */}
            <circle cx="250" cy="250" r="25" fill="#1BC8C8" filter="url(#glow)">
                <animate attributeName="r" values="25;28;25" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.8;1" dur="4s" repeatCount="indefinite" />
            </circle>

            <style>
                {`
                    @keyframes rotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>
        </svg>
    </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onViewSample, onViewAssessmentSample }) => {
  const animatedSectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedSectionRefs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      animatedSectionRefs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const benefitItems = {
    evaluation: [
      '비전·전략 정합성',
      '조직 구조·인력 운영',
      '리더십·문화',
      'AI 도구·데이터 활용',
      '지속적 개선·혁신 체계',
    ],
    analysis: [
      '종합 역량 점수',
      '각 분야별 역량 점수',
      '세부 역량 현황',
    ],
    recommendation: [
      '조직의 강점',
      '개선 필요 영역',
      '실행 권장 사항',
    ]
  };

  const whoIsItForItems = [
    {
      title: "CEO / 임원",
      description: "전사 AI 전략 방향성과 투자 우선순위 결정을 위해",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    },
    {
      title: "팀 리더 / 중간 관리자",
      description: "팀의 AI 역량 수준을 파악하고 실질적인 도입 계획 수립을 위해",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    },
    {
      title: "HR / 조직문화 담당자",
      description: "AI 시대에 필요한 인재상과 조직구조 재설계를 위해",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    },
    {
      title: "AI TF / 혁신 부서",
      description: "전사 AI 도입 확산의 장애물을 파악하고 해결하기 위해",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    }
  ];

  return (
    <div className="bg-[#0F1C2E] text-slate-200 overflow-x-hidden">
      {/* Hero Section */}
      <section ref={animatedSectionRefs[0]} className="animated-section is-visible">
        <div className="container mx-auto px-4 py-16 md:py-24 min-h-screen flex items-center">
          <div className="grid md:grid-cols-2 gap-16 items-center w-full">
            <div className="text-center md:text-left">
              <p className="text-xl sm:text-2xl font-bold text-[#1BC8C8]">
                "AI 네이티브로의 전환, 어디서부터 시작해야 할까요?"
              </p>
              <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight">
                AI네이티브<br />조직전환 진단
              </h1>
              <p className="mt-6 text-slate-300 max-w-lg mx-auto md:mx-0 text-lg">
                조직의 현재를 진단하고, AI네이티브 조직전환을 위한 전략로드맵 설계
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 flex-wrap">
                <button
                  onClick={onViewAssessmentSample}
                  className="w-full sm:w-auto bg-[#FFD23F] text-black font-bold py-3 px-8 rounded-md shadow-lg hover:brightness-110 transition-all duration-300"
                >
                  진단 샘플보기
                </button>
                <button
                  onClick={onViewSample}
                  className="w-full sm:w-auto bg-transparent text-slate-200 font-semibold py-3 px-8 rounded-md border border-slate-700 hover:bg-slate-800/50 transition-all duration-300"
                >
                  샘플 결과보기
                </button>
              </div>
              <div className="mt-8 text-center md:text-left text-lg">
                <a href="https://digitaltransformation.co.kr/ax-contact/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200 font-bold no-underline transition-colors">AI네이티브 조직전환 문의하기</a>
              </div>
            </div>
            
            <div className="hidden md:flex items-center justify-center">
              <AIBrainAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* 왜 진단이 필요한가요? Section */}
      <section ref={animatedSectionRefs[1]} className="py-20 sm:py-24 bg-slate-950/50 animated-section">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                왜 진단이 필요한가요?
              </h2>
              <p className="mt-6 text-lg text-slate-300 max-w-xl">
                성공적인 AI네이티브조직 전환은 단순히 기술을 도입하는 것을 넘어, 조직의 비전, 문화, 프로세스, 인재 역량 등 핵심 역량을 근본적으로 재정의하는 것에서부터 시작됩니다. 
                본 진단은 조직의 현재 상태를 객관적으로 파악하고, 목표를 향한 명확한 로드맵을 수립하기 위한 첫걸음입니다.
              </p>
            </div>
            <div className="flex justify-center items-center row-start-1 md:row-auto">
              <svg className="w-48 h-48 text-[#1BC8C8] opacity-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Who is it for Section */}
      <section ref={animatedSectionRefs[2]} className="py-20 sm:py-24 bg-[#0F1C2E] animated-section">
          <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  이런 분들에게 진단을 추천합니다
                  </h2>
                  <p className="mt-4 text-lg text-slate-400">
                  조직의 AI 전환 여정에서 명확한 방향과 실행 계획이 필요한 모든 리더와 구성원
                  </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {whoIsItForItems.map(item => (
                    <div key={item.title} className="bg-slate-900 p-8 rounded-xl border border-slate-800 text-center flex flex-col items-center transform transition-transform duration-300 hover:-translate-y-2">
                      <div className="bg-slate-800 p-4 rounded-full">
                        <svg className="h-8 w-8 text-[#1BC8C8]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          {item.icon}
                        </svg>
                      </div>
                      <h3 className="mt-6 text-lg font-bold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-400 flex-grow">{item.description}</p>
                    </div>
                  ))}
              </div>
          </div>
      </section>
      
      {/* 무엇을 얻을 수 있나요? Section */}
      <section ref={animatedSectionRefs[3]} className="py-20 sm:py-24 bg-slate-950/50 animated-section">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                무엇을 얻을 수 있나요?
                </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {/* Card 1: 체계적인 평가 */}
                <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 flex flex-col">
                    <div className="flex-shrink-0">
                        <svg className="h-10 w-10 text-[#1BC8C8]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 className="mt-4 text-xl font-bold text-white">체계적인 평가</h3>
                        <p className="mt-2 text-slate-400">5가지 핵심 역량을 중심으로 객관적인 점수를 통해 진단합니다.</p>
                    </div>
                    <ul className="mt-6 space-y-3 text-slate-300 flex-grow">
                        {benefitItems.evaluation.map(item => (
                            <li key={item} className="flex items-start">
                                <svg className="flex-shrink-0 h-5 w-5 text-emerald-400 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                 {/* Card 2: 데이터 기반 분석 */}
                <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 flex flex-col">
                    <div className="flex-shrink-0">
                       <svg className="h-10 w-10 text-[#1BC8C8]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        <h3 className="mt-4 text-xl font-bold text-white">데이터 기반 분석</h3>
                        <p className="mt-2 text-slate-400">강점·약점·격차를 심층적으로 파악</p>
                    </div>
                     <ul className="mt-6 space-y-3 text-slate-300 flex-grow">
                        {benefitItems.analysis.map(item => (
                            <li key={item} className="flex items-start">
                                <svg className="flex-shrink-0 h-5 w-5 text-emerald-400 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                 {/* Card 3: 전략적 권장 사항 */}
                <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 flex flex-col">
                    <div className="flex-shrink-0">
                        <svg className="h-10 w-10 text-[#1BC8C8]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <h3 className="mt-4 text-xl font-bold text-white">전략적 권장 사항</h3>
                        <p className="mt-2 text-slate-400">단기/중기/장기 실행 과제 제시</p>
                    </div>
                     <ul className="mt-6 space-y-3 text-slate-300 flex-grow">
                        {benefitItems.recommendation.map(item => (
                            <li key={item} className="flex items-start">
                                <svg className="flex-shrink-0 h-5 w-5 text-emerald-400 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={animatedSectionRefs[4]} className="py-20 sm:py-24 bg-slate-950/50 animated-section">
          <div className="container mx-auto px-4 text-center max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  지금, AI 네이티브 조직 전환 역량을 진단하세요.
              </h2>
              <p className="mt-6 text-lg text-slate-300">
                  현재 조직의 AI 네이티브 조직 전환 추진 역량을 파악하고 실행 가능한 전략 로드맵을 마련하세요.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
                    <button
                      onClick={onViewAssessmentSample}
                      className="w-full sm:w-auto bg-[#FFD23F] text-black font-bold py-3 px-8 rounded-md shadow-lg hover:brightness-110 transition-all duration-300"
                    >
                      진단 샘플보기
                    </button>
                    <button
                      onClick={onViewSample}
                      className="w-full sm:w-auto bg-transparent text-slate-200 font-semibold py-3 px-8 rounded-md border border-slate-700 hover:bg-slate-800/50 transition-all duration-300"
                    >
                      샘플 결과보기
                    </button>
              </div>
              <div className="mt-8 text-center text-lg">
                 <a href="https://digitaltransformation.co.kr/ax-contact/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200 font-bold no-underline transition-colors">AI네이티브 조직전환 문의하기</a>
              </div>
          </div>
      </section>
      
      <footer className="bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
              <p className="text-slate-400 text-sm">
                  &copy; {new Date().getFullYear()} AI Native Organization Transformation Diagnosis. All Rights Reserved.
              </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;