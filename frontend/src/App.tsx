import { Layout } from './component/Layout/Layout';
import { AddChannel } from './pages/AddChannel';

export const App = () => {
  return (
    <Layout headerTitle="사용자1에 대한 경로 설정" footerTitle="제작 완료" footerActive>
      <AddChannel />
    </Layout>
  );
};
