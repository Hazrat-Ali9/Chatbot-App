export function BASIC_QA_findAnswer(userQuery: string): { answer: string } {
  const query = userQuery.toLowerCase().trim();

  // First try exact match
  const exactMatch = BASIC_QA.find(
    (item) => item.question.toLowerCase() === query
  );
  if (exactMatch) return exactMatch;

  // Then try inclusion match
  const inclusionMatch = BASIC_QA.find(
    (item) =>
      query.includes(item.question.toLowerCase()) ||
      item.question.toLowerCase().includes(query)
  );
  if (inclusionMatch) return inclusionMatch;

  // Then try similarity matching with threshold
  const similarityMatch = findSimilarQuestion(query, BASIC_QA, 0.7);
  if (similarityMatch) return similarityMatch;

  // Fallback response
  return {
    answer:
      "I'm not certain I understand. Could you rephrase or ask about our assessment features?",
  };
}

// Helper function to calculate string similarity (0-1)
function stringSimilarity(s1: string, s2: string): number {
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;

  // Exact match after normalization
  if (longer === shorter) return 1.0;

  // Calculate similarity using Dice coefficient
  const bigrams = new Set();
  for (let i = 0; i < shorter.length - 1; i++) {
    bigrams.add(shorter.substring(i, i + 2));
  }

  let intersectionSize = 0;
  for (let i = 0; i < longer.length - 1; i++) {
    const bigram = longer.substring(i, i + 2);
    if (bigrams.has(bigram)) {
      intersectionSize++;
    }
  }

  return (2.0 * intersectionSize) / (longer.length + shorter.length - 2);
}

// Find most similar question above a threshold
function findSimilarQuestion(
  query: string,
  qaList: typeof BASIC_QA,
  threshold: number
) {
  let bestMatch = null;
  let highestScore = 0;

  for (const item of qaList) {
    const score = stringSimilarity(query, item.question.toLowerCase());
    if (score > highestScore && score >= threshold) {
      highestScore = score;
      bestMatch = item;
    }
  }

  return bestMatch;
}

export const BASIC_QA = [
  {
    question: "hi",
    answer:
      "Hello! I'm your Life Essentials Assistant. How may I help you today?",
  },
  {
    question: "hello",
    answer:
      "Greetings! I'm here to assist with your life assessments and personal development.",
  },
  {
    question: "hey",
    answer: "Hello there! What would you like to explore today?",
  },
  {
    question: "how are you",
    answer: "I'm functioning optimally, thank you. How can I assist you today?",
  },
  {
    question: "what's up",
    answer:
      "I'm ready to assist you with life assessments and improvement strategies. How may I help?",
  },
  {
    question: "who are you",
    answer:
      "I am an AI Life Essentials Assistant, designed to help with personal development and life assessments.",
  },
  {
    question: "what is your name",
    answer:
      "You may refer to me as LifeEssentials AI. How can I assist you today?",
  },
  {
    question: "who made you",
    answer:
      "I was developed by Shariar Sheikh, a professional software engineer based in Bangladesh. This project was launched in March 2025.",
  },
  {
    question: "who created you",
    answer:
      "My development was led by Shariar Sheikh, a skilled software developer from Bangladesh. The system was completed and deployed in March 2025.",
  },
  {
    question: "who built you",
    answer:
      "This AI system was engineered by Shariar Sheikh, an experienced software developer from Bangladesh, with initial release in March 2025.",
  },
  {
    question: "who developed you",
    answer:
      "I am a product of Shariar Sheikh's software development expertise. Originating from Bangladesh, this project reached completion in March 2025.",
  },
  {
    question: "who is your creator",
    answer:
      "The creator of this platform is Shariar Sheikh, a software development professional from Bangladesh. Development concluded in March 2025.",
  },
  {
    question: "how old are you",
    answer:
      "I was initially deployed in March 2025, and my knowledge base is continuously updated.",
  },
  {
    question: "are you human",
    answer:
      "No, I am an artificial intelligence system designed to provide life assessment and personal development guidance.",
  },
  {
    question: "what can you do",
    answer:
      "I specialize in comprehensive life assessments across 10 essential domains including health, productivity, and finance, providing personalized recommendations.",
  },
  {
    question: "what do you do",
    answer:
      "I offer evidence-based life assessments and generate actionable insights for personal improvement.",
  },
  {
    question: "help",
    answer:
      "Certainly. You can: 1) Begin an assessment 2) Get life improvement tips 3) Learn about specific life domains. What would you like to do?",
  },
  {
    question: "menu",
    answer:
      "Main options: 1) Start Assessment 2) Domain Information 3) Example Questions 4) Personal Development Resources",
  },
  {
    question: "options",
    answer:
      "Available functions: • Conduct assessments • Provide domain-specific insights • Generate improvement plans • Share educational resources",
  },
  {
    question: "thanks",
    answer: "You're most welcome. I'm here to assist you whenever needed.",
  },
  {
    question: "thank you",
    answer:
      "It's my pleasure to help. Don't hesitate to return with any questions.",
  },
  {
    question: "cool",
    answer:
      "I appreciate your feedback. Shall we continue with your assessment?",
  },
  {
    question: "awesome",
    answer:
      "Thank you. I'm ready to help you explore improvement opportunities.",
  },
  {
    question: "lol",
    answer:
      "I'm pleased to contribute to your positive experience. How may I assist you further?",
  },
  {
    question: "haha",
    answer:
      "It's rewarding to know I could brighten your day. What would you like to explore next?",
  },
  {
    question: "bye",
    answer:
      "Goodbye! Remember you can return anytime for personal development support.",
  },
  {
    question: "goodbye",
    answer:
      "Thank you for your time. Wishing you continued growth and success.",
  },
  {
    question: "exit",
    answer:
      "Session ending. You may type 'start' at any time to begin a new assessment.",
  },
  {
    question: "stop",
    answer:
      "Understood. Simply say 'hi' when you wish to resume our conversation.",
  },
  {
    question: "reset",
    answer: "Initializing new session. How would you like to proceed?",
    action: "reset_conversation",
  },
  {
    question: "start over",
    answer:
      "Beginning fresh session. Which life domain would you like to assess?",
    action: "reset_conversation",
  },
  {
    question: "assessment",
    answer:
      "Would you prefer to assess: 1) Health 2) Productivity 3) Finance 4) Other domains?",
  },
  {
    question: "demo",
    answer:
      "For a demonstration, you might ask: 'Show health assessment example' or 'How does productivity assessment work?'",
  },
];
