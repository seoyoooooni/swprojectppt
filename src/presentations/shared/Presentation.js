import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SWIPE_THRESHOLD = 50;
const SWIPE_DIRECTION_RATIO = 1.2;

function Presentation({ presentation, Design }) {
  const { slides } = presentation;
  const navigate = useNavigate();
  const [index, setCurrent] = useState(0);
  const current = Math.min(index, slides.length - 1);
  const [direction, setDirection] = useState('next');
  const touchStart = useRef(null);

  const goTo = useCallback((index, nextDirection = 'next') => {
    setDirection(nextDirection);
    setCurrent(Math.max(0, Math.min(slides.length - 1, index)));
  }, [slides.length]);
  const next = useCallback(() => goTo(current + 1, 'next'), [current, goTo]);
  const previous = useCallback(() => goTo(current - 1, 'previous'), [current, goTo]);

  useEffect(() => {
    const onKeyDown = event => {
      if (['ArrowRight', 'ArrowDown', ' ', 'Enter', 'PageDown'].includes(event.key)) { event.preventDefault(); next(); }
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); previous(); }
      if (event.key === 'Home') goTo(0, 'previous');
      if (event.key === 'End') goTo(slides.length - 1, 'next');
      if (event.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goTo, navigate, next, previous, slides.length]);

  const onTouchStart = useCallback(event => {
    if (event.touches.length !== 1) {
      touchStart.current = null;
      return;
    }

    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const onTouchEnd = useCallback(event => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || event.changedTouches.length !== 1) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY) * SWIPE_DIRECTION_RATIO) return;
    if (deltaX < 0) next();
    else previous();
  }, [next, previous]);

  const slide = slides[current];
  return <Design
    slide={slide}
    current={current}
    total={slides.length}
    direction={direction}
    onClose={() => navigate('/')}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
    onTouchCancel={() => { touchStart.current = null; }}
  />;
}

export default Presentation;
