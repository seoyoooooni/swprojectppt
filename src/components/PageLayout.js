import SiteHeader from './SiteHeader';

function PageLayout({ children }) {
  return (
    <div className="page-layout">
      <SiteHeader />
      <main>{children}</main>
    </div>
  );
}

export default PageLayout;
