import React, { useState, useRef, useEffect } from 'react';
import { Mic, Search as LucideSearch } from 'lucide-react';
import { TextField, InputAdornment, IconButton, Paper, Box } from '@mui/material';
import type { SuggestedQuestion } from '../../types';

interface SearchBarProps {
  onSearch: (query: string) => void;
  suggestedQuestions: SuggestedQuestion[];
  onSuggestionClick: (question: SuggestedQuestion) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  suggestedQuestions,
  onSuggestionClick,
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setIsFocused(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% {
              transform: translateX(-150%);
            }
            100% {
              transform: translateX(150%);
            }
          }

          .bling-hover:hover::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: linear-gradient(
              160deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(255, 102, 0, 0.1) 50%,
              rgba(0, 0, 0, 0) 100%
            );
            animation: shimmer 1.5s ease-in-out 1 forwards;
            z-index: 5;
            pointer-events: none;
          }

          .animate-fadeIn {
            animation: fadeIn 0.2s ease-in;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(4px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <Box width="100%" position="relative">
        <form onSubmit={handleSearch}>
          <Box
            position="relative"
            borderRadius="12px"
            overflow="hidden"
            border="2px solid rgba(0,0,0,0.1)"
            sx={{
              backgroundColor: 'rgba(0,0,0,0.05)',
            }}
            className="bling-hover"
          >
            <TextField
              fullWidth
              inputRef={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Search for technical issues..."
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: {
                  padding: '10px 48px 10px 16px',
                  fontSize: '0.95rem',
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => {
                      }}
                      aria-label="Voice search"
                      sx={{ mx: 0.5 }}
                    >
                      <Mic size={20} className="text-gray-500" />
                    </IconButton>
                    <IconButton
                      type="submit"
                      size="small"
                      aria-label="Search"
                      sx={{ mx: 0.5 }}
                    >
                      <LucideSearch size={20} className="text-gray-500" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                borderRadius: '12px',
                backgroundColor: 'transparent',
              }}
            />
          </Box>
        </form>

        {isFocused && (
          <Paper
            ref={suggestionsRef}
            elevation={3}
            sx={{
              position: 'absolute',
              width: '100%',
              mt: 1,
              borderRadius: 2,
              zIndex: 10,
              maxHeight: '24rem',
              overflowY: 'auto',
              border: '1px solid #e5e7eb',
              animation: 'fadeIn 0.2s ease-in',
            }}
          >
            {suggestedQuestions.map((question) => (
              <Box
                key={question.id}
                component="button"
                onClick={() => {
                  onSuggestionClick(question);
                  setIsFocused(false);
                }}
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'left',
                  py: 1.5,
                  px: 2,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f9fafb',
                  },
                }}
              >
                <LucideSearch
                  size={18}
                  style={{ marginRight: '0.75rem', color: '#9ca3af' }}
                />
                <span style={{ color: '#111827' }}>{question.text}</span>
              </Box>
            ))}
          </Paper>
        )}
      </Box>
    </>
  );
};

export default SearchBar;
