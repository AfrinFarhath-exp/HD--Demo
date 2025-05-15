import { useEffect, useState } from "react";
import ChatBubble from "../../components/AISupport/ChatBubble";
import type { Message } from "../../types";

export default function AISupportPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "asd",
          content: "Hello! I'm your AI assistant. How can I help you todayllo! I'm your AI assistant. How can I help you todayllo! I'm your AI assistant. How can I help you todayllo! I'm your AI assistant. How can I help you todayllo! I'm your AI assistant. How can I help you todayllo! I'm your AI assistant. How can I help you todayllo! I'm your AI assistant. How can I help you todayllo! I'm your AI assistant. How can I help you todayllo! I'm your AI assistant. How can I help you todayllo! I'm your AI assistant. How can I help you todayllo! I'm your AI assistant. How can I help you todayllo! I'm your AI assistant. How can I help you today?",
          role: "assistant",
          timestamp: new Date(),
        },
        {
          id: "assd",
          content: "asdasdy?",
          role: "user",
          timestamp: new Date(),
        },
        {
          id: "asd",
          content: "Hello! I'm your AI assistant. How can I help you today?",
          role: "assistant",
          timestamp: new Date(),
        },
        {
          id: "assd",
          content: "asdasdy?",
          role: "user",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  return (
    <>
      {messages.map((message) => (
        <ChatBubble key={message.id} message={message} />
      ))}
    </>
  );
}
