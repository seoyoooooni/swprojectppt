const presentations = [
  {
    id: 'week-01',
    week: '01',
    title: '프로젝트 주제',
    summary: '주제 선정 배경과 핵심 기능, 개발 계획',
    date: '260909'
  }
];

export function getPresentation(presentationId) {
  return presentations.find(({ id }) => id === presentationId);
}

export default presentations;
