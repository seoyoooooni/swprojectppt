import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Presentation from './Presentation';
import Design from '../week-01/Design';

test('새 주차의 데이터 순서와 줄바꿈을 표시하고 첫 장과 마지막 장에서 이동을 제한한다', () => {
  const presentation = { slides: [
    { type: 'cover', title: '새 발표\n제목', description: '발표 설명' },
    { type: 'bullets', title: '직접 수정한 제목', items: ['수정한 내용'] },
  ] };
  render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Presentation presentation={presentation} Design={Design} /></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('새 발표 제목');
  fireEvent.keyDown(window, { key: 'ArrowLeft' });
  expect(screen.getByText('발표 설명')).toBeInTheDocument();
  fireEvent.keyDown(window, { key: 'End' });
  expect(screen.getByText('수정한 내용')).toBeInTheDocument();
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(screen.getByText('직접 수정한 제목')).toBeInTheDocument();
  fireEvent.keyDown(window, { key: 'Home' });
  expect(screen.getByText('발표 설명')).toBeInTheDocument();
});
