import PresentationRow from './PresentationRow';
import '../styles/presentation-list.css';

function PresentationList({ presentations }) {
  return (
    <section className="presentation-list" aria-label="주차별 발표 목록">
      <div className="presentation-list__header" aria-hidden="true">
        <span>주차</span><span>발표 주제</span><span>발표일</span>
      </div>
      {presentations.map((presentation) => (
        <PresentationRow key={presentation.id} presentation={presentation} />
      ))}
    </section>
  );
}

export default PresentationList;
