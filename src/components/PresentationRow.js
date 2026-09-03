import { Link } from 'react-router-dom';

function PresentationRow({ presentation }) {
  return (
    <Link className="presentation-row" to={`/presentations/${presentation.id}`}>
      <span className="presentation-row__status" />
      <span className="presentation-row__content">
        <span className="presentation-row__week">{presentation.week}</span>
        <span className="presentation-row__title">{presentation.title}</span>
      </span>
      <span className="presentation-row__date">{presentation.date}</span>
    </Link>
  );
}

export default PresentationRow;
