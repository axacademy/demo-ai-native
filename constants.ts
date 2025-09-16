import type { Category } from './types';

export const RATING_LABELS: { [key: number]: string } = {
  1: '전혀 그렇지 않다',
  2: '그렇지 않다',
  3: '보통이다',
  4: '그렇다',
  5: '매우 그렇다',
};

export const ASSESSMENT_DATA: Category[] = [
  {
    id: 'vision_strategy',
    title: '비전·전략 정합성',
    shortTitle: '비전·전략',
    questions: [
      { id: 'q_vision_1', text: '우리 조직은 AI 도입의 목적과 기대 효과를 문서로 명확히 정의했는가?' },
      { id: 'q_vision_2', text: 'AI 전략이 사업 전략 및 비전과 직접적으로 연계되어 있는가?' },
      { id: 'q_vision_3', text: '경영진이 AI 문화 전환의 필요성을 지속적으로 강조하고 있는가?' },
      { id: 'q_vision_4', text: '구성원 다수가 조직의 AI 네이티브 조직 전환 목표를 이해·공감하고 있는가?' },
      { id: 'q_vision_5', text: 'AI 투자 우선순위가 명확히 정해져 있으며, 자원이 전략적으로 배분되는가?' },
    ],
  },
  {
    id: 'org_structure',
    title: '조직 구조·인력 운영',
    shortTitle: '조직·인력',
    questions: [
      { id: 'q_org_1', text: '조직 내 AI 파일럿 전담팀(정예팀)이 운영되고 있는가?' },
      { id: 'q_org_2', text: '파일럿 팀의 성과와 교훈이 다른 부서로 공유·확산되는가?' },
      { id: 'q_org_3', text: 'AI 네이티브 조직 전환 관련 심리적 불안(일자리·역할 불명확성)을 해소하는 프로그램이 있는가?' },
      { id: 'q_org_4', text: '기존 업무 프로세스 중 AI 자동화 가능한 영역이 체계적으로 식별·정리되었는가?' },
      { id: 'q_org_5', text: 'AI 도입 이후 직무·역할 정의가 재설계되었는가?' },
      { id: 'q_org_6', text: '인재 선발·평가·보상 기준에 AI 활용 역량이 반영되는가?' },
      { id: 'q_org_7', text: '재교육·Reskilling 프로그램이 체계적 커리큘럼으로 제공되는가?' },
    ],
  },
  {
    id: 'leadership_culture',
    title: '리더십·문화',
    shortTitle: '리더십·문화',
    questions: [
      { id: 'q_culture_1', text: '리더십은 명령·통제형에서 학습·실험형으로 변화하고 있는가?' },
      { id: 'q_culture_2', text: '리더가 직접 AI 도구를 활용하여 성과를 체험하고 공유하는가?' },
      { id: 'q_culture_3', text: '실패와 오류를 학습 기회로 인정하는 문화가 있는가?' },
      { id: 'q_culture_4', text: '팀원들이 자유롭게 아이디어·실험을 제안할 수 있는 분위기인가?' },
      { id: 'q_culture_5', text: '조직 내 심리적 안전감이 확보되어 있는가? (비난·처벌 두려움 없이 시도 가능)' },
      { id: 'q_culture_6', text: '의사결정·업무 진행 상황이 투명하게 공유되는가?' },
      { id: 'q_culture_7', text: 'AI 활용 성공 사례뿐 아니라 실패 사례도 공유되는가?' },
    ],
  },
  {
    id: 'tools_data',
    title: 'AI 도구·데이터 활용',
    shortTitle: '도구·데이터',
    questions: [
      { id: 'q_tools_1', text: '조직은 AI를 보조 도구가 아닌 핵심 실행 엔진으로 활용하는가?' },
      { id: 'q_tools_2', text: '개발 코드의 70~80% 이상이 AI를 통해 작성되는가?' },
      { id: 'q_tools_3', text: 'CEO·임원·PM 등 전 직군이 AI 활용에 적극 참여하는가?' },
      { id: 'q_tools_4', text: 'AI 활용률을 높이기 위한 최신 도구·모델 구독/투자를 하고 있는가?' },
      { id: 'q_tools_5', text: '데이터가 통합·정제·관리되어 AI 학습·활용에 적합한 상태인가?' },
      { id: 'q_tools_6', text: '데이터 보안·프라이버시·윤리 정책이 체계적으로 마련되어 있는가?' },
      { id: 'q_tools_7', text: 'AI 활용 경험이 문서화·공유되어 조직의 학습 속도가 빨라지고 있는가?' },
      { id: 'q_tools_8', text: '조직은 외부 파트너·생태계(오픈소스, 클라우드, 스타트업)와 협력하는가?' },
    ],
  },
  {
    id: 'innovation',
    title: '지속적 개선·혁신 체계',
    shortTitle: '개선·혁신',
    questions: [
      { id: 'q_innov_1', text: '조직은 AI 도입 효과를 측정할 KPI 체계(효율·비용·품질 등)를 보유하고 있는가?' },
      { id: 'q_innov_2', text: 'KPI 성과가 정기적으로 모니터링·리뷰되고 있는가?' },
      { id: 'q_innov_3', text: 'AI 모델과 툴은 정기적으로 점검·업데이트되는가?' },
      { id: 'q_innov_4', text: '변화·혁신 아이디어를 누구나 제안할 수 있는 제도가 있는가?' },
      { id: 'q_innov_5', text: '실패를 허용·장려하는 실험 문화가 정착되어 있는가?' },
      { id: 'q_innov_6', text: '변화관리 프레임워크(예: ADKAR)가 적용되어 있는가?' },
      { id: 'q_innov_7', text: 'AI 교육·Reskilling 프로그램이 지속적이고 정례적으로 운영되는가?' },
      { id: 'q_innov_8', text: '조직은 장기적 학습과 혁신 내재화를 위한 예산·자원을 보장하는가?' },
    ],
  },
];