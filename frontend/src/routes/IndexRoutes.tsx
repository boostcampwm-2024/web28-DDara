import { Route, Routes } from 'react-router-dom';
import { Main } from '@/pages/Main';
import { AddChannel } from '@/pages/AddChannel';
import { DrawRoute } from '@/pages/DrawRoute';
import { HostView } from '@/pages/HostView';
import { GuestView } from '@/pages/GuestView';
import { Layout } from '@/component/layout/Layout';
import { UserProvider } from '@/context/UserContext';
import { CurrentUserProvider } from '@/context/CurrentUserContext';
import { ChannelInfoPage } from '@/pages/ChannelInfoPage'; // ChannelInfoPage 컴포넌트 임포트
import { ChannelProvider } from '@/context/ChannelContext';
import { RequireAuth } from '@/routes/RequireAuth.tsx';
import { AlertUndefinedURL } from '@/routes/AlertUndefinedURL.tsx';
import { AddGuestPage } from '@/pages/AddGuestPage';

export const IndexRoutes = () => (
  <UserProvider>
    <CurrentUserProvider>
      <ChannelProvider>
        <Routes>
          <Route path="*" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="add-channel">
              <Route
                path="add-channel"
                element={
                  <RequireAuth>
                    <AddChannel />
                  </RequireAuth>
                }
              />
              <Route
                path="add-channel/:user/draw"
                element={
                  <RequireAuth>
                    <DrawRoute />
                  </RequireAuth>
                }
              />
              <Route
                path="channelInfo/:channelId"
                element={
                  <RequireAuth>
                    <ChannelInfoPage />
                  </RequireAuth>
                }
              />
              <Route
                path="guest-add-channel/:channelId"
                element={
                  <RequireAuth>
                    <AddGuestPage />
                  </RequireAuth>
                }
              />
              <Route path="channel/:channelId">
                <Route
                  path="host"
                  element={
                    <RequireAuth>
                      <HostView />
                    </RequireAuth>
                  }
                />
                <Route path="guest/:guestId" element={<GuestView />} />
              </Route>
            </Route>

            {/* 정의되지 않은 경로 라우팅 */}
            <Route path="*" element={<AlertUndefinedURL />} />
          </Route>
        </Routes>
      </ChannelProvider>
    </CurrentUserProvider>
  </UserProvider>
);
