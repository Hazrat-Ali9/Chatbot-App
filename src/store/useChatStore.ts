// store/useChatStore.ts
import { create } from "zustand";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
  payload?: {
    type: "email" | "category" | "questionCount" | "question";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
  };
}

interface ChatState {
  email: string | null;
  category: string | null;
  questionCount: number | null;
  currentQuestion: number;
  score: number;
  messages: Message[];
  reportVisible: boolean;
  addMessage: (message: Message) => void;
  setEmail: (email: string) => void;
  setCategory: (category: string) => void;
  setQuestionCount: (count: number) => void;
  incrementScore: (points: number) => void;
  showReport: () => void;
  reset: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  email: null,
  category: null,
  questionCount: null,
  currentQuestion: 0,
  score: 0,
  messages: [],
  reportVisible: false,

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setEmail: (email) => set({ email }),
  setCategory: (category) => set({ category }),
  setQuestionCount: (count) => set({ questionCount: count }),
  incrementScore: (points) => set((state) => ({ score: state.score + points })),
  showReport: () => set({ reportVisible: true }),
  reset: () =>
    set({
      email: null,
      category: null,
      questionCount: null,
      currentQuestion: 0,
      score: 0,
      messages: [],
      reportVisible: false,
    }),
}));
