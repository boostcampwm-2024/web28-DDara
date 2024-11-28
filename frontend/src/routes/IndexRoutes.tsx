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
import { AddGuestPage } from '@/pages/AddGuestPage';

export const IndexRoutes = () => (
  <UserProvider>
    <CurrentUserProvider>
      <ChannelProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="add-channel">
              <Route
                index
                element={
                  <RequireAuth>
                    <AddChannel />
                  </RequireAuth>
                }
              />
              <Route path=":user">
                <Route
                  path="draw"
                  element={
                    <RequireAuth>
                      <DrawRoute />
                    </RequireAuth>
                  }
                />
              </Route>
            </Route>

            {/* channelInfo 페이지 경로 설정 */}
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
        </Routes>
      </ChannelProvider>
    </CurrentUserProvider>
  </UserProvider>
);
