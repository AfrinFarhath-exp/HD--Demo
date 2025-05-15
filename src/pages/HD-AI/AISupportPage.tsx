import React, { useState } from 'react';
import SearchBar from '../../components/AISupport/SearchBar';
import ChatContainer from '../../components/AISupport/ChatContainer';
import type{ SuggestedQuestion, IdocIssue } from '../../types';
import { suggestedQuestions, idocIssues } from '../../data/mockData';

const AISupportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedQuestion, setSelectedQuestion] = useState<SuggestedQuestion | null>(null);
  const [selectedIdocIssue, setSelectedIdocIssue] = useState<IdocIssue | null>(null);
  const [showChat, setShowChat] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedQuestion(null);
    setSelectedIdocIssue(null);
    setShowChat(true);  
  };

  const handleSuggestionClick = (question: SuggestedQuestion) => {
    setSelectedQuestion(question);
    setSearchQuery('');
    setSelectedIdocIssue(null);
    setShowChat(true);
  };

  const handleBackToSearch = () => {
    setShowChat(false);
    setSearchQuery('');
    setSelectedQuestion(null);
    setSelectedIdocIssue(null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className={`w-full max-w-3xl mx-auto transition-all duration-300 ${showChat ? 'scale-95 opacity-0 hidden' : 'scale-100 opacity-100'}`}>
          <h1 className="text-4xl font-bold text-center mb-3">AI Support</h1>
          <p className="text-gray-600 text-center mb-8">Get instant answers to your technical questions</p>
          <SearchBar 
            onSearch={handleSearch} 
            suggestedQuestions={suggestedQuestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </div>
        
        <div className={`w-full transition-all duration-300 ${showChat ? 'scale-100 opacity-100' : 'scale-95 opacity-0 hidden'}`}>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBackToSearch}
              className="text-primary hover:text-primary/80 font-medium flex items-center"
            >
              ← Back to Search
            </button>
          </div>
          <ChatContainer 
            searchQuery={searchQuery} 
            selectedQuestion={selectedQuestion}
            selectedIdocIssue={selectedIdocIssue}
            idocIssues={idocIssues}
          />
        </div>
      </div>
    </div>
  );
};

export default AISupportPage;