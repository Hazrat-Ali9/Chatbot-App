export interface Message {
  content: string; // Can be plain text or HTML
  isUser: boolean;
  timestamp: string;
}

export interface ChatRequest {
  message?: string;
  email?: string;
  selectedTopic?: string;
  answers?: Record<number, string>; // { questionIndex: answer }
  currentStep?: "welcome" | "email" | "topic" | "questions" | "results";
}

export interface QuestionOption {
  level: "A" | "B" | "C" | "D";
  text: string;
  score: number;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}
