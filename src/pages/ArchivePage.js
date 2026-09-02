import PageLayout from '../components/PageLayout';
import PresentationList from '../components/PresentationList';
import presentations from '../data/presentations';

function ArchivePage() {
  return (
    <PageLayout>
      <div className="archive-page">
        <PresentationList presentations={presentations} />
      </div>
    </PageLayout>
  );
}

export default ArchivePage;
