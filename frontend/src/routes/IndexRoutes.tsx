import { Route, Routes } from 'react-router-dom';
import { Main } from '@/pages/Main';
import { Register } from '@/pages/Register';
import { AddChannel } from '@/pages/AddChannel';
import { UserRoute } from '@/pages/UserRoute';
import { DrawRoute } from '@/pages/DrawRoute';
import { HostView } from '@/pages/HostView';
import { GuestView } from '@/pages/GuestView';
import { Layout } from '@/component/layout/Layout';
import { UserProvider } from '@/context/UserContext';

export const IndexRoutes = () => (
  <UserProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 메인 페이지를 위한 인덱스 라우트 */}
        <Route index element={<Main />} />

        {/* 공개 라우트 */}
        <Route path="register" element={<Register />} />

        {/* 채널 추가를 위한 중첩 라우트 */}
        <Route path="add-channel">
          <Route index element={<AddChannel />} />
          <Route path=":user">
            <Route index element={<UserRoute />} />
            <Route path="draw" element={<DrawRoute />} />
          </Route>
        </Route>

        {/* 채널별 뷰를 위한 중첩 라우트 */}
        <Route path="channel/:channelId">
          <Route path="host" element={<HostView />} />
          <Route path="guest/:guestId" element={<GuestView />} />
        </Route>

        {/* TODO : 정의되지 않은 경로에 대한 폴백 라우트 (선택사항) */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  </UserProvider>
);
