import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

function NotFoundPage() {
  return (
    <PageLayout>
      <section className="not-found-page">
        <p>페이지를 찾을 수 없습니다.</p>
        <Link to="/">발표 목록으로 돌아가기</Link>
      </section>
    </PageLayout>
  );
}

export default NotFoundPage;
