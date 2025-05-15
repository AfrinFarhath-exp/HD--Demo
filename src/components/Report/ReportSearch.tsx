import React, { useEffect, useState } from "react";
import { MessageCircle, User, Send } from "lucide-react";



// Custom Display component that will be shown when user types "hi"
const Display = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-2">
      <h3 className="text-lg font-bold text-blue-600 mb-2">Performance Dashboard</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border text-sm">Metric</th>
              <th className="px-4 py-2 border text-sm">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 border text-sm font-medium">Total People</td>
              <td className="px-4 py-2 border text-sm">5,050</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 border text-sm font-medium">POC</td>
              <td className="px-4 py-2 border text-sm">$15.90</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 border text-sm font-medium">CoOL</td>
              <td className="px-4 py-2 border text-sm">1.5%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 border text-sm font-medium">Total Visits</td>
              <td className="px-4 py-2 border text-sm">5,300</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 border text-sm font-medium">Visits with Gift</td>
              <td className="px-4 py-2 border text-sm">30</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 border text-sm font-medium">Visits with No Gifts</td>
              <td className="px-4 py-2 border text-sm">5</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 border text-sm font-medium">New Visitors</td>
              <td className="px-4 py-2 border text-sm">1</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 border text-sm font-medium">Repeat Visitors</td>
              <td className="px-4 py-2 border text-sm">240</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Chat Bubble Component
const ChatBubble = ({ message }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex items-start mb-4 ${message.isUser ? "justify-end" : "justify-start"}`}>
      {/* Avatar for bot messages */}
      {!message.isUser && (
        <div className="flex-shrink-0 mr-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <MessageCircle size={16} />
          </div>
        </div>
      )}
      
      {/* Message content */}
      <div className={`relative max-w-xs md:max-w-md lg:max-w-lg ${message.isUser ? "order-1" : "order-2"}`}>
        <div
          className={`px-4 py-2 rounded-lg ${
            message.isUser
              ? "bg-primary text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          }`}
        >
          <p className="text-sm">{message.text}</p>
          
          {/* Dashboard display if needed */}
          {message.showDisplay && <Display />}
          
          <span className={`text-xs block mt-1 ${message.isUser ? "text-blue-100" : "text-gray-500"}`}>
            {formatTime(message.timestamp)}
          </span>
        </div>
       
      </div>
    </div>
  );
};

const ReportSearch = ({ query }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    // Initialize with the user's question
    setMessages([
      {
        text: query,
        isUser: true,
        timestamp: new Date()
      }
    ]);

    // Simulated response logic
    setTimeout(() => {
      if (query.toLowerCase() === "hi") {
        setMessages(prev => [
          ...prev,
          {
            text: "Hello! Here are the latest performance metrics:",
            isUser: false,
            timestamp: new Date(),
            showDisplay: true
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            text: `I don't have information about "${query}". Try typing "hi" to see the performance dashboard.`,
            isUser: false,
            timestamp: new Date()
          }
        ]);
      }
      setLoading(false);
    }, 500); // Small delay to simulate processing
    
  }, [query]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    
    // Simulate bot response
    setLoading(true);
    setTimeout(() => {
      if (inputMessage.toLowerCase() === "hi") {
        setMessages(prev => [
          ...prev,
          {
            text: "Hello! Here are the latest performance metrics:",
            isUser: false,
            timestamp: new Date(),
            showDisplay: true
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            text: `I don't have information about "${inputMessage}". Try typing "hi" to see the performance dashboard.`,
            isUser: false,
            timestamp: new Date()
          }
        ]);
      }
      setLoading(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg shadow-md">
      {/* Chat header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center">
       
         
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {loading && messages.length === 1 && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-pulse text-blue-500">Processing your request...</div>
          </div>
        )}

        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
      </div>
      
      {/* Chat input */}
      <div className="border-t border-gray-200 px-4 py-3 bg-white rounded-b-lg">
        <div className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportSearch;