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

test('모바일에서 좌우 스와이프로 슬라이드를 이동하고 세로 스크롤은 무시한다', () => {
  const presentation = { slides: [
    { type: 'cover', title: '첫 슬라이드', description: '첫 내용' },
    { type: 'bullets', title: '둘째 슬라이드', items: ['둘째 내용'] },
  ] };
  render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Presentation presentation={presentation} Design={Design} /></MemoryRouter>);

  const viewer = screen.getByRole('main');
  fireEvent.touchStart(viewer, { touches: [{ clientX: 240, clientY: 120 }] });
  fireEvent.touchEnd(viewer, { changedTouches: [{ clientX: 120, clientY: 130 }] });
  expect(screen.getByText('둘째 내용')).toBeInTheDocument();

  fireEvent.touchStart(viewer, { touches: [{ clientX: 120, clientY: 120 }] });
  fireEvent.touchEnd(viewer, { changedTouches: [{ clientX: 230, clientY: 125 }] });
  expect(screen.getByText('첫 내용')).toBeInTheDocument();

  fireEvent.touchStart(viewer, { touches: [{ clientX: 200, clientY: 100 }] });
  fireEvent.touchEnd(viewer, { changedTouches: [{ clientX: 180, clientY: 220 }] });
  expect(screen.getByText('첫 내용')).toBeInTheDocument();
});
