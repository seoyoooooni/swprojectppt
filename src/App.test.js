import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./data/presentations', () => {
  const presentation = { ...require('./presentations/week-01/presentation.json'), id: 'week-01' };
  return { __esModule: true, default: [presentation], getPresentation: id => id === presentation.id ? presentation : undefined, getPresentationDesign: id => id === presentation.id ? require('./presentations/week-01/Design').default : undefined };
});

beforeEach(() => {
  window.location.hash = '/';
});

test('주차별 발표 목록을 표시한다', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /S\s*\/\s*W PROJECT/ })).toBeInTheDocument();
  expect(screen.getByText('프로젝트 주제')).toBeInTheDocument();
  expect(screen.queryByText('자료')).not.toBeInTheDocument();
  expect(screen.queryByText('8장')).not.toBeInTheDocument();
});

test('1주차 발표를 열고 키보드로 다음 장을 이동한다', () => {
  render(<App />);
  fireEvent.click(screen.getByText('프로젝트 주제'));
  expect(screen.getByText(/문화생활 기록 및/)).toBeInTheDocument();
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(screen.getByText('주제 선정 이유')).toBeInTheDocument();
});
