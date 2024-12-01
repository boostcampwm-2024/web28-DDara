import { useState, useEffect } from 'react';

export const useSocket = (url: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    setWs(socket);

    socket.onopen = () => {
      console.log('Socket connected');
    };

    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      console.log(data);
    };

    socket.onclose = () => {
      console.log('Socket closed');
    };

    socket.onerror = err => {
      console.error('Socket error:', err);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return ws;
};
