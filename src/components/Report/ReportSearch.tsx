import React, { useEffect, useState, useRef } from "react";
import { MessageCircle, Send, Maximize2, X } from "lucide-react";

// Type Definitions
interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
  showDisplay?: boolean;
  tableData?: AzureSearchResult[];  
}

interface ThinkingIndicatorProps {
  isThinking?: boolean;
}

interface ChatBubbleProps {
  message: Message;
}

interface ReportSearchProps {
  query?: string;
  
  minSearchScore?: number; 
}

interface AzureSearchResult {
  id?: string;
  fileName?: string;
  startDate: string;
  endDate: string;
  country: string;
  content?: string;
  searchScore?: number; 
  metrics?: Array<{name: string, value: string}>;
}

interface AzureSearchResponse {
  results: AzureSearchResult[];
  error?: string;
}

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

const ResultsTable: React.FC<{ data: AzureSearchResult }> = ({ data }) => {

  const generalInfo = [
    { metric: "Date", value: data.startDate, change: "" },
    { metric: "Country", value: data.country, change: "" }
  ];
  
  const metricsData = data.metrics || [];
  
  const hasMetrics = metricsData.length > 0;
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm mt-3 w-full">
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                General Info
              </th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {generalInfo.map((row, index) => (
              <tr key={`general-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.metric}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        
        {!hasMetrics && data.content && (
          <div className="p-4 text-sm text-gray-600 whitespace-pre-wrap">{data.content}</div>
        )}
      </div>
    </div>
  );
};

const TableModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-11/12 h-3/4 max-w-6xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h3 className="font-medium text-lg">{data.fileName || "Report Details"}</h3>
            <p className="text-sm text-gray-500">
              {data.startDate} 
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} /> 
          </button>
        </div>
        <div className="p-6 overflow-auto h-5/6">
          <ResultsTable data={data} />
          
          {data.content && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <pre className="font-sans text text-gray-600 whitespace-pre-wrap">{data.content}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<AzureSearchResult | null>(null);

  const openModal = (data: AzureSearchResult) => {
    setSelectedData(data);
    setModalOpen(true);
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

      <div className={`relative max-w-xs md:max-w-md lg:max-w-5xl ${message.isUser ? "order-1" : "order-2"}`}>
        <div
          className={`px-4 py-3 rounded-xl ${
            message.isUser
              ? "bg-primary text-white rounded-br-none shadow-md"
              : "bg-gray-100 text-gray-800 rounded-bl-none shadow-sm"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          {message.showDisplay && message.tableData && message.tableData.length > 0 && (
            <div className="mt-2">
              {/* Loop through each result and display them */}
              {message.tableData.map((data, index) => (
                <div key={index} className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">
                      {data.country} Report Summary {message.tableData && message.tableData.length > 1 ? `(${index + 1}/${message.tableData.length})` : ''}
                    </h4>
                    <button
                      onClick={() => openModal(data)}
                      className="p-1 rounded hover:bg-gray-200 transition-colors text-gray-600"
                      aria-label="View full report"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                  <ResultsTable data={data} />
                </div>
              ))}
              
              {selectedData && (
                <TableModal 
                  isOpen={modalOpen} 
                  onClose={() => setModalOpen(false)} 
                  data={selectedData} 
                />
              )}
            </div>
          )}
          <span className={`text-xs block mt-2 ${message.isUser ? "text-blue-100" : "text-gray-500"}`}>
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

const azureSearchService = {

  apiEndpoint: "https://hd-dddrdnc2amfvdrcw.eastasia-01.azurewebsites.net/ai_agent_query",
  
  async searchReports(query: string, session_id : number, minSearchScore: number = 0.8): Promise<AzureSearchResponse> {
    try {
      const requestBody = {
        "query": query,
        "session_id": session_id
      };
      
      console.log("Sending search request:", requestBody);
      
      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Raw API response:", data);
      
      const processedResults = this.processSearchResults(data, minSearchScore);
      console.log("Processed results:", processedResults);
      
      return { results: processedResults };
    } catch (error) {
      console.error("Azure Search API error:", error);
      return { 
        results: [], 
        error: "I'm having trouble connecting to the search service. Please try again later." 
      };
    }
  },

  processSearchResults(data: any, minSearchScore: number = 0.80): AzureSearchResult[] {

    if (!data) {
      console.error("No data received from API");
      return [];
    }
    
    let items = [];
    
    if (data.value && Array.isArray(data.value)) {
      items = data.value;
    } else if (Array.isArray(data)) {
      items = data;
    } else if (typeof data === 'object') {
      if (data.results && Array.isArray(data.results)) {
        items = data.results;
      } else {
        items = [data];
      }
    }
    
    if (items.length === 0) {
      console.warn("No items found in response data");
      return [];
    }

    const filteredItems = items.filter(item => {
      const score = item['@search.score'] || item.searchScore || 0;
      console.log(`Item score: ${score}`);
      return score >= minSearchScore;
    });

    console.log(`Filtered ${items.length} results to ${filteredItems.length} with score >= ${minSearchScore}`);

    return filteredItems.map((item) => {
      const baseResult = {
        id: item.id || item.document_id || `result-${Math.random().toString(36).substr(2, 9)}`,
        fileName: item.filename || item.fileName || item.document_name || "Report",
        startDate: item.start_date || item.startDate || "N/A",
        endDate: item.end_date || item.endDate || "N/A",
        country: item.country || "Global",
        content: item.content || item.description || "",
        searchScore: item['@search.score'] || item.searchScore || 0,
        metrics: [] 
      };
      
      if (baseResult.content) {
        try {

          const contentStr = baseResult.content.toString();
          
          let metricsArray = [];
          
          const metricRegexes = [
            /\*\*(.*?):\*\*\s*([\d,$,.]+)/g,  // **Metric:** Value
            /-(.*?):\s*([\d,$,.]+)/g,          // - Metric: Value
            /(.*?):\s*([\d,$,.]+)/g            // Metric: Value
          ];
          
          for (const regex of metricRegexes) {
            let match;
            while ((match = regex.exec(contentStr)) !== null) {
              const metricName = match[1].trim();
              const metricValue = match[2].trim();
              
              if (!metricsArray.some(m => m.name === metricName)) {
                metricsArray.push({ name: metricName, value: metricValue });
              }
            }
            
            if (metricsArray.length > 0) break;
          }
          
          baseResult.metrics = metricsArray;
        } catch (err) {
          console.error("Error parsing content metrics:", err);
        }
      }
      
      return baseResult;
    });
  }
};

// Main Chat Component
const ReportSearch: React.FC<ReportSearchProps> = ({ query}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const hasHandledInitialQuery = useRef<boolean>(false);

  const searchAzureAndGenerateResponse = async (query: string): Promise<Message> => {
    try {
      const searchResponse = await azureSearchService.searchReports(query, 2, 0.8);

      if (searchResponse.error) {
        return {
          text: searchResponse.error,
          isUser: false,
          timestamp: new Date(),
        };
      }
      
      if (searchResponse.results.length === 0) {
        return {
          text: `I couldn't find any results for "${query}". Please try a different search term.`,
          isUser: false,
          timestamp: new Date(),
        };
      }
      
      let responseText = `Here's what I found for "${query}"\n\n`;
      
      const countryList = [...new Set(searchResponse.results.map(result => result.country))].join(", ");
      
      responseText += `Relevant ${
        searchResponse.results.length === 1 ? "report" : "reports"
      } from ${countryList}.`;
      
      return {
        text: responseText,
        isUser: false,
        timestamp: new Date(),
        showDisplay: true,
        tableData: searchResponse.results
      };
    } catch (error) {
      console.error("Error processing search:", error);
      return {
        text: "I'm having trouble with your search request. Please try again later.",
        isUser: false,
        timestamp: new Date(),
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
      
      searchAzureAndGenerateResponse(query)
        .then((botResponse) => {
          setMessages((prev) => [...prev, botResponse]);
        })
        .catch((error) => {
          console.error("Error handling search:", error);
          setMessages((prev) => [
            ...prev,
            {
              text: "I encountered an error while processing your request. Please try again.",
              isUser: false,
              timestamp: new Date(),
            },
          ]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (!query && messages.length === 0) {
      setMessages([
        {
          text: "Hello! How can I help you today? You can search for reports by name or description.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  }, [query]);

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

    try {
      const botResponse = await searchAzureAndGenerateResponse(inputMessage);
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error handling message:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "I encountered an error while processing your request. Please try again.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
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

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 pb-20" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
        <ThinkingIndicator isThinking={loading} />
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed input at bottom */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-4 bg-white shadow-lg">
        <div className="flex items-center gap-2 max-w-6xl mx-auto">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for reports..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 shadow-sm"
          />
          <button
            onClick={handleSendMessage}
            className="p-3 bg-primary text-white rounded-full hover:bg-primary focus:outline-none focus:ring-2 focus:bg-primary shadow-md"
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