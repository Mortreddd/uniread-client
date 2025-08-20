import { useAuth } from "@/contexts/AuthContext";
import { useState, useCallback, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client, Message, over, Subscription } from "stompjs";

export function useWebSocket(accessToken: string | null) {
  const [client, setClient] = useState<Client | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const baseUrl = import.meta.env.VITE_API_URL as string;
  const { isLoggedIn } = useAuth();

  const connect = useCallback(() => {
    if (!accessToken || !isLoggedIn()) return;

    const socket = new SockJS(
      `${baseUrl}/ws/messages?access_token=${accessToken}`
    );
    const stompClient = over(socket);

    stompClient.heartbeat.outgoing = 10000;
    stompClient.heartbeat.incoming = 10000;

    stompClient.connect(
      {},
      () => {
        console.log("STOMP connected");
        setClient(stompClient);
      },
      (error) => {
        console.error("Connection error:", error);
        setTimeout(connect, 5000);
      }
    );

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect(() => {
          console.log("Stomp connection disconnected");
        });
      }
    };
  }, [accessToken, baseUrl]);

  useEffect(() => {
    const cleanup = connect();
    return cleanup;
  }, [connect]);

  const subscribe = useCallback(
    (destination: string, callback: (message: Message) => void) => {
      if (!client?.connected) return;

      const subscription = client.subscribe(destination, callback);
      setSubscriptions((prev) => [...prev, subscription]);
      return subscription;
    },
    [client]
  );

  useEffect(() => {
    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
  }, [subscriptions]);

  return { client, subscribe };
}
