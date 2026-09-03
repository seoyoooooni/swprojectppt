const presentations = [
  {
    id: 'week-01',
    week: 'Week 01',
    title: '프로젝트 주제',
    date: '2026.09.09'
  },
  {
    id: 'week-02',
    week: 'Week 02',
    title: '',
    date: ''
  }
];

export function getPresentation(presentationId) {
  return presentations.find(({ id }) => id === presentationId);
}

export default presentations;
