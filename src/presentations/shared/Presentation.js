import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Presentation({ presentation, Design }) {
  const { slides } = presentation;
  const navigate = useNavigate();
  const [index, setCurrent] = useState(0);
  const current = Math.min(index, slides.length - 1);
  const [direction, setDirection] = useState('next');

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

  const slide = slides[current];
  return <Design slide={slide} current={current} total={slides.length} direction={direction} onClose={() => navigate('/')} />;
}

export default Presentation;
