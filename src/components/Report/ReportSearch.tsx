import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import SearchResult from "./SearchResult";

interface Message {
  query: string;
  id: number;
}

export default function ReportSearch() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [idCounter, setIdCounter] = useState(0); // for unique keys

  const handleSearch = () => {
    if (query.trim() !== "") {
      const newMessage = { query, id: idCounter };
      setMessages((prev) => [...prev, newMessage]);
      setIdCounter(idCounter + 1);
      setQuery(""); // Clear input after sending
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Chat-like message list */}
      <div className="space-y-6 mb-6">
        {messages.map((msg) => (
          <div key={msg.id}>
            <div className="bg-gray-100 p-3 rounded-md w-fit max-w-full">
              <span className="font-medium">You:</span> {msg.query}
            </div>
            <div className="mt-2 ml-4">
              <SearchResult query={msg.query} />
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="flex justify-center">
        <div className="relative w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me Anything..."
            className="w-full pr-10 pl-4 py-2 border rounded-lg shadow-sm focus:outline-none"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            onClick={handleSearch}
          >
            <SendIcon className="h-5 w-5 text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
}
