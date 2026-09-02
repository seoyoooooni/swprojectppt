const presentations = [
  {
    id: 'week-02',
    week: 'WEEK 02',
    title: '',
    date: ''
  },
  {
    id: 'week-01',
    week: 'WEEK 01',
    title: '프로젝트 주제',
    date: '2026.09.09'
  }
];

export function getPresentation(presentationId) {
  return presentations.find(({ id }) => id === presentationId);
}

export default presentations;
