import React, { useState, useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import type { Message, IdocIssue, SuggestedQuestion, SearchResult } from "../../types";
import { Send, Paperclip } from "lucide-react";
import IdocIssueCard from "./IdocIssueCard";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

interface ChatContainerProps {
  selectedIdocIssue?: IdocIssue | null;
  searchQuery?: string;
  selectedQuestion?: SuggestedQuestion | null;
  idocIssues: IdocIssue[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  selectedIdocIssue,
  searchQuery,
  selectedQuestion,
  idocIssues,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showIdocIssues, setShowIdocIssues] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: uuidv4(),
          content: "Hello! I'm your AI assistant. How can I help you today?",
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchQuery) {
      handleUserMessage(searchQuery); 
    }
  }, [searchQuery]);

  useEffect(() => {
    if (selectedQuestion) {
      if (selectedQuestion.type === "idoc") {
        handleAssistantIdocResponse(selectedQuestion.text);
      } else {
        handleAssistantGeneralResponse(selectedQuestion.text);
      }
    }
  }, [selectedQuestion]);

  useEffect(() => {
    if (selectedIdocIssue) {
      handleIdocIssueSelection(selectedIdocIssue);
    }
  }, [selectedIdocIssue]);

  const handleUserMessage = async (content: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    const loadingMessage: Message = {
      id: uuidv4(),
      content: "",
      role: "assistant",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const response = await axios.post<SearchResult[]>(
        "/mockapi.json", // Replace with your real endpoint
        { query: content }
      );
      const results = response.data;

      setMessages((prev) => prev.filter((msg) => !msg.isLoading));

      const responseMessage: Message = {
        id: uuidv4(),
        content: results.length
          ? results[0].content
          : "Sorry, I couldn't find any relevant information.",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, responseMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => prev.filter((msg) => !msg.isLoading));

      const errorMessage: Message = {
        id: uuidv4(),
        content: "An error occurred. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleAssistantIdocResponse = (query: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      content: query,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    const loadingMessage: Message = {
      id: uuidv4(),
      content: "",
      role: "assistant",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, loadingMessage]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => !msg.isLoading));

      const responseMessage: Message = {
        id: uuidv4(),
        content:
          "What specific Idoc issue are you referring to? Here are some common issues:",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, responseMessage]);
      setShowIdocIssues(true);
    }, 1500);
  };

  const handleAssistantGeneralResponse = (query: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      content: query,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    const loadingMessage: Message = {
      id: uuidv4(),
      content: "",
      role: "assistant",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, loadingMessage]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => !msg.isLoading));

      const responseMessage: Message = {
        id: uuidv4(),
        content: `I'll help you find information about "${query}". Please provide more details or select an issue.`,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, responseMessage]);
    }, 1500);
  };

  const handleIdocIssueSelection = (issue: IdocIssue) => {
    setShowIdocIssues(false);

    const userSelectionMessage: Message = {
      id: uuidv4(),
      content: `I'm having an issue with: ${issue.title}`,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userSelectionMessage]);

    const loadingMessage: Message = {
      id: uuidv4(),
      content: "",
      role: "assistant",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, loadingMessage]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => !msg.isLoading));

      const solutionMessage: Message = {
        id: uuidv4(),
        content: `${issue.solution}\n\nIs there anything else I can help you with?`,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, solutionMessage]);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    handleUserMessage(input);

    if (showIdocIssues) {
      setShowIdocIssues(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showIdocIssues]);

  return (
    <div className="flex flex-col bg-gray-50 rounded-lg overflow-hidden h-full mb-0">
      <div className="flex-1 overflow-y-auto p-0">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}

          {showIdocIssues && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-0">
              {idocIssues.map((issue) => (
                <IdocIssueCard
                  key={issue.id}
                  issue={issue}
                  onClick={handleIdocIssueSelection}
                />
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex items-center rounded-lg border border-gray-300 bg-white overflow-hidden">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className={`p-2 ${
                input.trim() ? "text-primary" : "text-gray-400"
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;