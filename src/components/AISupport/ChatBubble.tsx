import type { Message } from "../../types";
import ReactMarkdown from "react-markdown";

type ChatBubbleProps = {
  message: Message;
};

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content).then(() => {});
  };
  if (message.isLoading) {
    return (
      <div className={`px-6 py-4 animate-pulse`}>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 relative">
            {!isUser ? (
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
              {!isUser ? "AI thinking..." : "Sending message..."}
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
      className={`${
        isUser
          ? "animate-slideInRight justify-end"
          : "animate-slideInLeft justify-start"
      } 
      flex`}
    >
      <div
        className={`px-6 py-4 flex items-start  ${
          isUser ? "flex-row-reverse space-x-reverse bg-white " : ""
        } space-x-4`}
      >
        <div className="w-6 h-6 mt-1">
          <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-xs">
              {isUser ? message.role[0].toUpperCase() : "AI"}
            </span>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-600">
            {message.role} • {new Date(message.timestamp).toLocaleTimeString()}
          </div>

          <div className="mt-1 prose prose-sm max-w-full text-gray-800">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
          {!isUser && (
            <div className="mt-4 flex items-center space-x-2">
              <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-thumbs-up text-gray-500"
                >
                  <path d="M7 10v12"></path>
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                </svg>
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-thumbs-down text-gray-500"
                >
                  <path d="M17 14V2"></path>
                  <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"></path>
                </svg>
              </button>
              <button
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                onClick={handleCopy}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-copy text-gray-500"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
