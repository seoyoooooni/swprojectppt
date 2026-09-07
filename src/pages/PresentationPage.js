import { Navigate, useParams } from 'react-router-dom';
import { getPresentation, getPresentationDesign } from '../data/presentations';
import Presentation from '../presentations/shared/Presentation';

function PresentationPage() {
  const { presentationId } = useParams();
  const presentation = getPresentation(presentationId);
  const Design = getPresentationDesign(presentationId);

  if (!presentation || !presentation.slides?.length || !Design) {
    return <Navigate to="/not-found" replace />;
  }

  return <Presentation key={presentation.id} presentation={presentation} Design={Design} />;
}

export default PresentationPage;
