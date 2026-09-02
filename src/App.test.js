import { render, screen } from '@testing-library/react';
import App from './App';

test('주차별 발표 목록을 표시한다', () => {
  render(<App />);
  expect(screen.getByText('S/W')).toBeInTheDocument();
  expect(screen.getByText('프로젝트 주제')).toBeInTheDocument();
});
