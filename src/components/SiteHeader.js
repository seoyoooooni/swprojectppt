import { Link } from 'react-router-dom';
import '../styles/site-header.css';

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-header__brand" to="/">
          S/W
        </Link>
        <span className="site-header__title"></span>
      </div>
    </header>
  );
}

export default SiteHeader;
