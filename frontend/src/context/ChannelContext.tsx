import { getChannelResEntity } from '@/api/dto/channel.dto';
import { createContext, ReactNode, useMemo, useState } from 'react';

interface IChannelContext {
  channelInfo: getChannelResEntity;
  setChannelInfo: React.Dispatch<React.SetStateAction<getChannelResEntity>>;
  resetChannelInfo: () => void;
}
interface IChannelProps {
  children: ReactNode; // ReactNode 타입 추가
}

const defaultToolContext: IChannelContext = {
  channelInfo: {
    id: '',
    name: '',
    host_id: '',
    guests: [],
  },
  setChannelInfo: () => {},
  resetChannelInfo: () => {},
};

export const ChannelContext = createContext<IChannelContext>(defaultToolContext);

export const ChannelProvider = (props: IChannelProps) => {
  const [channelInfo, setChannelInfo] = useState(defaultToolContext.channelInfo);

  const resetChannelInfo = () => {
    setChannelInfo(defaultToolContext.channelInfo);
  };

  const contextValue = useMemo(
    () => ({ channelInfo, setChannelInfo, resetChannelInfo }),
    [channelInfo, setChannelInfo],
  );

  return <ChannelContext.Provider value={contextValue}>{props.children}</ChannelContext.Provider>;
};
