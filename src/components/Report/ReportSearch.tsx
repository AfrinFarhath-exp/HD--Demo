import React, { useEffect, useState, useRef } from "react";
import { Send, Maximize2, X } from "lucide-react";
import { azureSearchService } from "./azureSearchService";
import { theme } from "../../theme";
import { v4 as uuidv4 } from "uuid";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
  showDisplay?: boolean;
}

interface ThinkingIndicatorProps {
  isThinking?: boolean;
}

interface ChatBubbleProps {
  message: Message;
}

interface ReportSearchProps {
  query?: string;
  messages?: Message[];
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
  hasInitialized?: boolean;
}

interface BotMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: Message | null;
}

const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({
  isThinking = false,
}) => {
  if (!isThinking) return null;

  return (
    <div className="flex items-center justify-start p-3 mb-4">
      <div className="flex-shrink-0 mr-3">
        <div className="w-8 h-8 ml-12 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </div>
      </div>

      <div className="relative max-w-xs md:max-w-md lg:max-w-lg bg-gray-100 text-gray-800 px-4 py-3 rounded-xl rounded-bl-none shadow-sm">
        <div className="flex space-x-1">
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const ResponseModal: React.FC<BotMessageModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !message) return null;

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 mr-2 rounded-full bg-primary flex items-center justify-center text-white">
              AI
            </div>
            Nitrous AI
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          <div
            className="bg-white border rounded-lg p-4 whitespace-pre-wrap text-gray-800"
            style={{ fontFamily: `${theme.typography.fontFamily}` }}
          >
            {message.text}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const [botMessageModalOpen, setBotMessageModalOpen] = useState(false);

  const openBotMessageModal = () => {
    if (!message.isUser) {
      setBotMessageModalOpen(true);
    }
  };

  return (
    <div
      className={`flex items-start mb-4 ${
        message.isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!message.isUser && (
        <div className="flex-shrink-0 mr-3 ml-12">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
            <p className="text-xs">AI</p>
          </div>
        </div>
      )}

      <div className="relative max-w-xs md:max-w-md lg:max-w-xl mr-40">
        <span
          className={`text-xs gap-2 flex text-gray-500 mb-1
          `}
        >
          {!message.isUser && <p> Nitrous AI • </p>}
          <span className="flex ">
            {message.isUser && <p> You •  </p>}
            {formatTime(message.timestamp)}
          </span>
        </span>

        <div
          className={`px-4 py-3 rounded-xl ${
            message.isUser
              ? "bg-primary text-white rounded-br-none shadow-md "
              : "bg-gray-100 text-gray-800 rounded-bl-none shadow-sm hover:bg-gray-200 cursor-pointer"
          }`}
          onClick={!message.isUser ? openBotMessageModal : undefined}
        >
          <div className="flex justify-between items-start">
            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            {!message.isUser && message.text.length > 200 && (
              <Maximize2
                size={16}
                className="ml-2 text-gray-500 flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  openBotMessageModal();
                }}
              />
            )}
          </div>
        </div>
      </div>

      <ResponseModal
        isOpen={botMessageModalOpen}
        onClose={() => setBotMessageModalOpen(false)}
        message={message}
      />
    </div>
  );
};

// Main Chat Component
const ReportSearch: React.FC<ReportSearchProps> = ({
  query,
  messages: externalMessages = [],
  setMessages: setExternalMessages,
  hasInitialized = false,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [internalMessages, setInternalMessages] = useState<Message[]>([]);
  const messages = setExternalMessages ? externalMessages : internalMessages;
  const setMessages = setExternalMessages || setInternalMessages;

  const [inputMessage, setInputMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const processedQueries = useRef<Set<string>>(new Set());

  const searchAzureAndGenerateResponse = async (
    queryText: string
  ): Promise<Message> => {
    try {
      const session_id = uuidv4();
      const searchResponse = await azureSearchService.searchReports(
        queryText,
        session_id
      );

      if (searchResponse.error) {
        return {
          text: searchResponse.error,
          isUser: false,
          timestamp: new Date(),
        };
      }

      if (searchResponse.final_output !== undefined) {
        console.log(searchResponse.final_output);
        return {
          text: searchResponse.final_output || "No response content available",
          isUser: false,
          timestamp: new Date(),
        };
      }

      if (searchResponse.results.length === 0) {
        return {
          text: `I couldn't find any results for "${queryText}". Please try a different search term.`,
          isUser: false,
          timestamp: new Date(),
        };
      }

      const firstResult = searchResponse.results[0];
      if (firstResult.fileName === "API Response" && firstResult.content) {
        return {
          text: firstResult.content,
          isUser: false,
          timestamp: new Date(),
        };
      }

      let responseText = `Here are the results for "${queryText}"`;

      const countryList = [
        ...new Set(searchResponse.results.map((result) => result.country)),
      ].join(", ");
      if (countryList) {
        responseText += ` from ${countryList}. Click on a report to view details.`;
      } else {
        responseText += `. Click on a report to view details.`;
      }

      return {
        text: responseText,
        isUser: false,
        timestamp: new Date(),
        showDisplay: true,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error processing search:", error);
      setError(error.message || "An unknown error occurred");
      return {
        text: `I'm having trouble with your search request: ${error.message}. Please try again later.`,
        isUser: false,
        timestamp: new Date(),
      };
    }
  };

  useEffect(() => {
    setError(null);

    if (query && !processedQueries.current.has(query)) {
      processedQueries.current.add(query);

      const userMessage: Message = {
        text: query,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setLoading(true);

      searchAzureAndGenerateResponse(query)
        .then((botResponse) => {
          setMessages((prev) => [...prev, botResponse]);
        })
        .catch((error) => {
          console.error("Error handling search:", error);
          setMessages((prev) => [
            ...prev,
            {
              text: `I encountered an error while processing your request: ${error.message}. Please try again.`,
              isUser: false,
              timestamp: new Date(),
            },
          ]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (!query && messages.length === 0 && !hasInitialized) {
      setMessages([
        {
          text: "Hello! How can I help you today? You can search for reports by name or description.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  }, [query, messages.length, hasInitialized, setMessages]);

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);

    return () => clearTimeout(scrollTimeout);
  }, [messages]);

  const handleSendMessage = async (): Promise<void> => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);
    setError(null);

    try {
      const botResponse = await searchAzureAndGenerateResponse(inputMessage);
      setMessages((prev) => [...prev, botResponse]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error handling message:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: `I encountered an error while processing your request: ${error.message}. Please try again.`,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      setError(error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 rounded-lg shadow-md overflow-hidden h-full">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div
        className="flex-1 p-4 overflow-y-auto bg-gray-50 pb-20"
        ref={chatContainerRef}
      >
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
        <ThinkingIndicator isThinking={loading} />
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed input at bottom */}
      <div className="fixed bottom-0 bg-gray-50 w-5/6 pb-7 pt-4 ">
        <div className="flex items-center gap-2  pl-12">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for reports..."
            className="flex-1 px-3 py-3 border border-gray-300 rounded-2xl max-w-5xl focus:outline-none focus:ring-2 focus:ring-gray-200 w-10"
          />
          <button
            onClick={handleSendMessage}
            className="p-3 bg-primary text-white rounded-full hover:bg-primary focus:outline-none focus:ring-2 focus:bg-primary"
            disabled={loading}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportSearch;
