import React from "react";
import type { Message } from "../../types";
import { ThumbsUp, ThumbsDown, Copy, Share } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === "assistant";

  if (message.isLoading) {
    return (
      <div
        className={`px-6 py-4 ${isAssistant ? "bg-white" : ""} animate-pulse`}
      >
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 relative">
            {isAssistant ? (
              <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                <span className="text-white text-xs">AI</span>
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-xs">U</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-2">
              {isAssistant ? "AI thinking..." : "Sending message..."}
            </div>
            <div className="space-y-2">
              <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`px-6 py-4 ${isAssistant ? "bg-white" : ""} animate-slideIn`}
    >
      <div className="flex items-start space-x-4">
        <div className="w-6 h-6 mt-1">
          {isAssistant ? (
            <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-xs">AI</span>
            </div>
          ) : (
            <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 text-xs">U</span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-600">
            {isAssistant ? "Assistant" : "You"} •{" "}
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
          {/* <div className="mt-1">{message.content}</div> */}
          {message?.content && (
            <div className="mt-1">
              {message.content.split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          )}

          {isAssistant && (
            <div className="mt-4 flex items-center space-x-2">
              <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <ThumbsUp size={16} className="text-gray-500" />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <ThumbsDown size={16} className="text-gray-500" />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <Copy size={16} className="text-gray-500" />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <Share size={16} className="text-gray-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
