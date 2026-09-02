import { Navigate, useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { getPresentation } from '../data/presentations';
import { getPresentationContent } from '../presentations/presentationPages';
import '../styles/presentation-page.css';

function PresentationPage() {
  const { presentationId } = useParams();
  const presentation = getPresentation(presentationId);
  const PresentationContent = getPresentationContent(presentationId);

  if (!presentation || !PresentationContent) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <PageLayout>
      <div className="presentation-page">
        <PresentationContent />
      </div>
    </PageLayout>
  );
}

export default PresentationPage;
