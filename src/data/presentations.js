const files = require.context('../presentations', true, /^\.\/week-\d+\/presentation\.json$/);
const designs = require.context('../presentations', true, /^\.\/week-\d+\/Design\.js$/);

const presentations = files.keys().map(path => ({
  ...files(path),
  id: path.split('/')[1],
})).sort((a, b) => Number(a.id.slice(5)) - Number(b.id.slice(5)));

export function getPresentation(presentationId) {
  return presentations.find(({ id }) => id === presentationId);
}

export function getPresentationDesign(presentationId) {
  const path = `./${presentationId}/Design.js`;
  return designs.keys().includes(path) ? designs(path).default : undefined;
}

export default presentations;
