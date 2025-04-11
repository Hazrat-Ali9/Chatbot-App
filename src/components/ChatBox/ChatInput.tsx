"use client";
import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isDisabled: boolean;
}

const ChatInput = ({ onSubmit, isDisabled }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled) return;
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  // Auto-focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-slate-700/50 bg-slate-800/70"
    >
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400/50 text-white placeholder-slate-400"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isDisabled}
          className={`px-5 rounded-lg transition-colors flex items-center justify-center ${
            inputValue.trim()
              ? "bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer"
              : "bg-slate-600 text-slate-400 cursor-not-allowed"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
