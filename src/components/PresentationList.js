import PresentationRow from './PresentationRow';
import '../styles/presentation-list.css';

function PresentationList({ presentations }) {
  return (
    <section className="presentation-list" aria-label="주차별 발표 목록">
      {presentations.map((presentation) => (
        <PresentationRow key={presentation.id} presentation={presentation} />
      ))}
    </section>
  );
}

export default PresentationList;
