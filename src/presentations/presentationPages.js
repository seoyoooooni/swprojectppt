import Week01Presentation from './week-01/Week01Presentation';
import Week02Presentation from './week-02/Week02Presentation';

const presentationPages = {
  'week-01': Week01Presentation,
  'week-02': Week02Presentation
};

export function getPresentationContent(presentationId) {
  return presentationPages[presentationId];
}
