import { Route, Routes } from 'react-router-dom';
import { Main } from '@/pages/Main';
import { Register } from '@/pages/Register';
import { AddChannel } from '@/pages/AddChannel';
import { UserRoute } from '@/pages/UserRoute';
import { DrawRoute } from '@/pages/DrawRoute';
import { HostView } from '@/pages/HostView';
import { GuestView } from '@/pages/GuestView';

const ChannelRoutes = () => (
  <Routes>
    <Route path="host" element={<HostView />} />
    <Route path="guest/:guestId" element={<GuestView />} />
  </Routes>
);

export const App = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/register" element={<Register />} />
    <Route path="/add-channel" element={<AddChannel />} />
    <Route path="/add-channel/:user" element={<UserRoute />} />
    <Route path="/add-channel/:user/draw" element={<DrawRoute />} />
    <Route path="/channel/:channelId/*" element={<ChannelRoutes />} />
  </Routes>
);