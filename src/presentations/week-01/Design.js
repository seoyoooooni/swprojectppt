import Slide from './Slide';
import './style.css';

function PresentationControls({ current, total }) {
  return (
    <footer className="week01-footer">
      <div className="week01-progress"><span style={{ width: `${((current + 1) / total) * 100}%` }} /></div>
    </footer>
  );
}

function Design({ slide, current, total, direction, onClose }) {
  return (
    <main className="week01-presentation" aria-live="polite">
      <header className="week01-header">
        <span className="week01-page-number">{String(current + 1).padStart(2, '0')}</span>
        <button className="week01-close" onClick={onClose}><span>×</span></button>
      </header>
      <section key={current} className={`week01-slide week01-slide--${slide.type} week01-enter--${direction}`}>
        <Slide slide={slide} />
      </section>
      <PresentationControls current={current} total={total} />
    </main>
  );
}

export default Design;
