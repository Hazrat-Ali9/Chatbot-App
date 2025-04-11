"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import ChatInput from "./ChatInput";
import MessageContainer, { Avatar } from "./MessageContainer";
import { SuggestionsBar } from "./SuggestionsBar";
import { Message } from "@/types/chat";

interface Props {
  onClose: () => void;
}

interface SuggestionItem {
  id: string;
  content: string;
}

// Add this inside your ChatBox component (before the return statement)
const defaultSuggestions: SuggestionItem[] = [
  { id: "1", content: "Start Assessment" },
  { id: "2", content: "What can you do?" },
  { id: "3", content: "Tell me about yourself" },
  { id: "4", content: "How does this work?" },
  { id: "5", content: "Show me some examples" },
  { id: "6", content: "What's new?" },
];

export default function ChatBox({ onClose }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatState, setChatState] = useState<{
    email?: string;
    selectedTopic?: string;
    answers?: Record<number, string>;
    currentStep?: string;
  }>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat
  useEffect(() => {
    startAssessment();
  }, []);

  const startAssessment = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const text = await response.text();
      const data = text
        ? JSON.parse(text)
        : { messages: [], currentStep: "welcome" };

      setTimeout(() => {
        setMessages(data.messages || []);
        setChatState({
          currentStep: data.currentStep || "welcome",
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to start assessment:", error);
      setTimeout(() => {
        setMessages([
          {
            content: `
            <div class="bot-message">
              <h3 class="font-bold text-lg mb-2">👋 Welcome to Your Assessment!</h3>
              <p>Let's get started! Please enter your email:</p>
            </div>
          `,
            isUser: false,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
        setChatState({ currentStep: "email" });
        setIsLoading(false);
      }, 1000);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (message: string) => {
    // Add user message immediately
    const userMessage: Message = {
      content: message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          ...chatState,
          currentStep: chatState.currentStep || "welcome",
        }),
      });

      const data = await response.json();

      // Add bot message after 2 seconds
      setTimeout(() => {
        setMessages((prev) => [...prev, ...data.messages]);
        setChatState({
          email: data.email || chatState.email,
          selectedTopic: data.selectedTopic || chatState.selectedTopic,
          answers: data.answers || chatState.answers,
          currentStep: data.currentStep,
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to send message:", error);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleSuggestionClick = (text: string) => {
    handleSendMessage(text);
  };

  const handleTopicSelect = (topic: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setChatState((prev) => ({
        ...prev,
        currentStep: "assessment",
      }));

      // Add a mock bot response
      setMessages((prev) => [
        ...prev,
        {
          content: `
          <div class="bot-message">
            <p>Great choice! Let's begin the ${topic} assessment.</p>
          </div>
          `,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setIsLoading(false);
      handleSuggestionClick(topic);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed bottom-0 right-0 w-full max-w-md h-[80vh] z-10"
    >
      <div className="relative h-full bg-slate-800/90 backdrop-blur-xl rounded-t-xl shadow-2xl border border-slate-700/50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar isUser={false} />
              <h2 className="text-white font-semibold">AI Chatbot</h2>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <MessageContainer
          isLoading={isLoading}
          data={messages}
          messagesEndRef={messagesEndRef}
          onTopicSelect={handleTopicSelect}
        />

        <SuggestionsBar
          isDisabled={isLoading}
          suggestions={defaultSuggestions}
          onSuggestionClick={handleSuggestionClick}
        />
        {/* Input Component */}
        <ChatInput isDisabled={isLoading} onSubmit={handleSendMessage} />
      </div>
    </motion.div>
  );
}
