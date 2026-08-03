import { useState, useCallback, useEffect, useRef } from "react";
import { ActivationState, Client, IMessage } from "@stomp/stompjs";

interface WebsocketProps {
  onChangeState?: (state: ActivationState) => void;
  onConnect?: () => void;
  onClose?: () => void;
}

export function useWebSocket({
  onChangeState = () => {},
  onConnect = () => {},
  onClose = () => {},
}: WebsocketProps) {
  const baseUrl = import.meta.env.VITE_WEBSOCKET_URL as string;
  const [connected, setConnected] = useState(false);
  const client = useRef<Client | null>(null);

  useEffect(() => {
    if (client.current) return;

    client.current = new Client({
      brokerURL: `${baseUrl}/ws`,
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      onChangeState,
      onConnect: () => {
        setConnected(true);
        onConnect?.();
      },
      onDisconnect: () => {
        setConnected(false);
        onClose?.();
      },
      onHeartbeatLost: () => {
        console.warn("WebSocket heartbeat lost. Attempting to reconnect...");
        setConnected(false);
        onClose?.();
      },
      onWebSocketClose: () => {
        setConnected(false);
        onClose?.();
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
    });
  }, [baseUrl]);

  useEffect(() => {
    const stompClient = client.current;

    if (stompClient && !stompClient.active) {
      stompClient.activate();
    }
  }, []);

  function publish<T>({
    destination,
    body,
    headers = {},
  }: {
    destination: string;
    body: T;
    headers?: any;
  }) {
    if (!connected) {
      console.error("WebSocket is not connected. Cannot send message.");
      return;
    }

    if (!client.current) return;

    client.current.publish({
      destination,
      headers,
      body: JSON.stringify(body),
    });
  }

  const subscribe = useCallback(
    (destination: string, callback: (message: IMessage) => void) => {
      if (!connected) {
        console.warn(
          "Attempting to subscribe before connection. Consider a retry logic.",
        );
        return;
      }
      if (!client.current) return;

      return client.current.subscribe(destination, callback);
    },
    [connected],
  );

  return { client, subscribe, publish, connected } as const;
}
