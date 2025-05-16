import React, { useEffect, useState, useRef } from "react";
import { MessageCircle, Send, Maximize2, X } from "lucide-react";
import ReusableReportTable from "./ReusableReportTable";

// Type Definitions
interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
  showDisplay?: boolean;
  reportComponent?: React.ReactNode;
}

interface ThinkingIndicatorProps {
  isThinking?: boolean;
}

interface ChatBubbleProps {
  message: Message;
  reportComponent?: React.ReactNode;
}

interface ReportSearchProps {
  query?: string;
}

// Thinking Indicator Component
const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({ isThinking = false }) => {
  if (!isThinking) return null;

  return (
    <div className="flex items-center justify-start p-3 mb-4">
      <div className="flex-shrink-0 mr-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
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
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
};

// Chat Bubble Component
const ChatBubble: React.FC<ChatBubbleProps> = ({ message, reportComponent }) => {
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={`flex items-start mb-4 ${message.isUser ? "justify-end" : "justify-start"}`}>
      {!message.isUser && (
        <div className="flex-shrink-0 mr-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
            <MessageCircle size={20} />
          </div>
        </div>
      )}

      <div className={`relative max-w-xs md:max-w-md lg:max-w-lg ${message.isUser ? "order-1" : "order-2"}`}>
        <div
          className={`px-4 py-3 rounded-xl ${
            message.isUser
              ? "bg-primary text-white rounded-br-none shadow-md"
              : "bg-gray-100 text-gray-800 rounded-bl-none shadow-sm"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          {message.showDisplay && reportComponent}
          <span className={`text-xs block mt-2 ${message.isUser ? "text-blue-100" : "text-gray-500"}`}>
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

// Modal Component for Report
const ReportModal = ({ isOpen, onClose, reportName, startDate, endDate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-11/12 h-5/6 max-w-6xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-medium text-lg">{reportName}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-4 h-full overflow-auto">
          <ReusableReportTable
            reportName={reportName}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>
    </div>
  );
};

// Main Chat Component
const ReportSearch: React.FC<ReportSearchProps> = ({ query }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const hasHandledInitialQuery = useRef<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState({
    name: "",
    startDate: "",
    endDate: ""
  });

  const openReportInModal = (reportName: string, startDate: string, endDate: string) => {
    setCurrentReport({ name: reportName, startDate, endDate });
    setModalOpen(true);
  };

  const generateBotResponse = (message: string): { botResponse: Message; reportComponent: React.ReactNode | null } => {
    if (message.trim().toLowerCase().includes("sac")) {
      return {
        botResponse: {
          text: "Here is the report you requested:",
          isUser: false,
          timestamp: new Date(),
          showDisplay: true,
        },
        reportComponent: (
          <div className="bg-white w-full mt-4 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-2 bg-gray-50 border-b">
              <h3 className="font-medium">SAC Report</h3>
              <button
                onClick={() => openReportInModal("SAC Report", "2025-05-13", "2025-05-14")}
                className="p-1 rounded hover:bg-gray-200 transition-colors"
                aria-label="View in larger modal"
              >
                <Maximize2 size={18} />
              </button>
            </div>
            <div className="w-full" style={{ height: "300px" }}>
              <ReusableReportTable
                reportName="SAC Report"
                startDate="2025-05-13"
                endDate="2025-05-14" 
              />
            </div>
          </div>
        ),
      };
    } else {
      return {
        botResponse: {
          text: `I don't have information about "${message}". Enter a valid report name`,
          isUser: false,
          timestamp: new Date(),
        },
        reportComponent: null,
      };
    }
  };

  useEffect(() => {
    if (query && !hasHandledInitialQuery.current) {
      hasHandledInitialQuery.current = true;

      const userMessage: Message = {
        text: query,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages([userMessage]);

      setLoading(true);
      setTimeout(() => {
        const { botResponse, reportComponent } = generateBotResponse(query);
        setMessages((prev) => {
          return [...prev, { ...botResponse, reportComponent }];
        });
        setLoading(false);
      }, 1500);
    } else if (!query) {
      setMessages([
        {
          text: "Hello! How can I help you today?",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  }, [query]);

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50); // Wait a bit to allow DOM to render

    return () => clearTimeout(scrollTimeout);
  }, [messages]);

  const handleSendMessage = (): void => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);

    setTimeout(() => {
      const { botResponse, reportComponent } = generateBotResponse(inputMessage);
      setMessages((prev) => [...prev, { ...botResponse, reportComponent }]);
      setLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 rounded-lg shadow-md overflow-hidden h-full">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} reportComponent={message.reportComponent} />
        ))}
        <ThinkingIndicator isThinking={loading} />
        <div ref={messagesEndRef} />
      </div>

      {/* Modal */}
      <ReportModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        reportName={currentReport.name}
        startDate={currentReport.startDate}
        endDate={currentReport.endDate}
      />

      {/* Fixed input at bottom */}
      <div className="fixed bottom-0 left-1/3 transform -translate-x-1/4 px-10 py-4 shadow-lg w-full max-w-8xl">
        <div className="flex items-center gap-6 max-w-6xl mx-auto">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search more reports..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 shadow-sm"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 p-3 bg-primary text-white rounded-full hover:bg-primary focus:outline-none focus:ring-2 focus:bg-primary shadow-md"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportSearch;