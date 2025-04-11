import { Message, Question, QuestionOption } from "@/types/chat";
import DOMPurify from "isomorphic-dompurify";

// Helper functions
export const createBotMessage = (content: string): Message => ({
  content: DOMPurify.sanitize(content),
  isUser: false,
  timestamp: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
});

export const formatQuestion = (
  question: Question,
  questionNumber: number,
  totalQuestions: number,
  topic: string
): string => {
  return DOMPurify.sanitize(`
    <div class="bot-message">
      <p class="text-sm text-indigo-300 mb-1">${topic} Assessment</p>
      <p class="font-semibold">Question ${questionNumber}/${totalQuestions}:</p>
      <p class="my-2">${question.text}</p>
      <ul class="list-disc pl-5 space-y-1">
        ${[...question.options]
          .map(
            (opt: QuestionOption) =>
              `<li><strong>${opt.level}:</strong> ${opt.text}</li>`
          )
          .join("")}
      </ul>
      <p class="mt-2 text-sm text-gray-400">Reply with A, B, C, or D</p>
      <p class="mt-1 text-xs text-gray-500">Type 'exit' to cancel</p>
    </div>
  `);
};

export const calculateScore = (
  answers: Record<number, string>,
  questions: Question[]
): number => {
  if (!answers || Object.keys(answers).length === 0) return 0;

  return Object.entries(answers).reduce(
    (total: number, [index, answerLevel]) => {
      const question = questions[Number(index)];
      if (!question) return total;

      const selectedOption = question.options.find(
        (opt: QuestionOption) =>
          opt.level === (answerLevel.toUpperCase() as "A" | "B" | "C" | "D")
      );
      return total + (selectedOption?.score || 0);
    },
    0
  );
};

const generateAnswerSummary = (
  answers: Record<number, string>,
  questions: Question[]
): string => {
  return questions
    .map((q, i) => {
      const userAnswer = answers[i];
      const correctOption = q.options.reduce((max, opt) =>
        opt.score > max.score ? opt : max
      );
      const userOption = q.options.find(
        (opt) =>
          opt.level === (userAnswer?.toUpperCase() as "A" | "B" | "C" | "D")
      );

      return `
    <div class="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
      <p class="font-medium text-gray-800 mb-2">Q${i + 1}: ${q.text}</p>
      <div class="grid grid-cols-2 gap-2 text-sm">
        <div class="bg-blue-50 p-2 rounded">
          <p class="text-blue-800 font-medium">Your Answer</p>
          <p>${userOption?.level || "N/A"}: ${
        userOption?.text || "Not answered"
      }</p>
          <p class="text-xs mt-1">Score: ${userOption?.score || 0}/${
        correctOption.score
      }</p>
        </div>
        <div class="bg-green-50 p-2 rounded">
          <p class="text-green-800 font-medium">Best Answer</p>
          <p class="text-gray-800">${correctOption.level}: ${
        correctOption.text
      }</p>
        </div>
      </div>
    </div>
    `;
    })
    .join("");
};

// Message templates
export const WELCOME_MESSAGE = createBotMessage(
  DOMPurify.sanitize(`
  <div class="bot-message">
    <h3 class="font-bold text-lg mb-2">👋 Welcome to Life Essentials Assessment!</h3>
    <p class="mb-2">Here's how this works:</p>
    <ol class="list-decimal pl-5 mb-4">
      <li>Explore our 10 essential life topics</li>
      <li>When ready, type <strong>"Start Assessment Or Start"</strong> to begin</li>
      <li>You'll then provide your email</li>
      <li>Answer 6 questions per topic (choose A/B/C/D)</li>
      <li>Receive your personalized assessment report</li>
    </ol>
    <p>Let's begin! Choose a topic you're interested in</p>
  </div>
`)
);

export const BASIC_QA_MESSAGE = (text: string) =>
  createBotMessage(
    DOMPurify.sanitize(`
  <div class="bot-message">
    <p>${text}</p>
  </div>
`)
  );

export const NEED_EMAIL_MESSAGE = createBotMessage(
  DOMPurify.sanitize(`
  <div class="bot-message">
    <p>Please enter a valid email address to continue:</p>
  </div>
`)
);

export const getTopicSelectionMessage = (topics: string[]) =>
  createBotMessage(
    DOMPurify.sanitize(`
  <div class="bot-message">
    <p class="text-indigo-300">Life Essentials Assessment</p>
    <p>Thank you! Please select a topic:</p>
    <div class="grid grid-cols-2 gap-2 mt-3">
      ${topics
        .map(
          (t) => `
        <div class="p-3 bg-indigo-50 rounded-lg border border-indigo-100 cursor-pointer hover:bg-indigo-100 transition-colors duration-200" data-topic="${t}">
          <p class="font-medium text-indigo-800">${t}</p>
        </div>`
        )
        .join("")}
    </div>
    <p class="mt-3 text-sm text-gray-500">Click on a topic or type its name</p>
  </div>
`)
  );

export const INVALID_TOPIC_MESSAGE = (topics: string[]) =>
  createBotMessage(
    DOMPurify.sanitize(`
  <div class="bot-message">
    <p class="text-indigo-300">Life Essentials Assessment</p>
    <p>Please select one of these topics:</p>
    <div class="grid grid-cols-2 gap-2 mt-3">
      ${topics
        .map(
          (t) => `
        <div class="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
          <p class="font-medium text-indigo-800">${t}</p>
        </div>`
        )
        .join("")}
    </div>
  </div>
`)
  );

export const EXIT_MESSAGE = createBotMessage(
  DOMPurify.sanitize(`
  <div class="bot-message">
    <p>Assessment canceled. Type 'start' to begin again.</p>
    <p class="mt-2">Or ask me anything like:</p>
    <ul class="list-disc pl-5 mt-1">
      <li>What can you do?</li>
      <li>Tell me about yourself</li>
      <li>What topics do you cover?</li>
    </ul>
  </div>
`)
);

export const getInvalidAnswerMessage = (
  question: Question,
  questionNumber: number,
  totalQuestions: number,
  topic: string
) =>
  createBotMessage(
    DOMPurify.sanitize(`
  <div class="bot-message text-red-300">
    <p>Please respond with only A, B, C, or D</p>
    <p class="mt-2">Or type 'exit' to cancel assessment</p>
    ${formatQuestion(question, questionNumber, totalQuestions, topic)}
  </div>
`)
  );

export const getAssessmentResults = (
  score: number,
  maxScore: number,
  percentage: number,
  topic: string,
  answers: Record<number, string>,
  questions: Question[],
  email?: string
) => {
  const colors = {
    primary: "#6366F1",
    secondary: "#8B5CF6",
    lightBg: "#F5F7FF",
    border: "#C7D2FE",
    textDark: "#1F2937",
    textLight: "#6B7280",
    white: "#FFFFFF",
    gradeA: "#ECFDF5",
    gradeAText: "#065F46",
  };

  const grade =
    percentage >= 90
      ? "A"
      : percentage >= 80
      ? "B"
      : percentage >= 70
      ? "C"
      : percentage >= 60
      ? "D"
      : "F";

  const gradeStyles = {
    A: `background-color: ${colors.gradeA}; color: ${colors.gradeAText};`,
    B: `background-color: #F0FDFA; color: #0D9488;`,
    C: `background-color: #FEFCE8; color: #92400E;`,
    D: `background-color: #FFF7ED; color: #9A3412;`,
    F: `background-color: #FEF2F2; color: #991B1B;`,
  }[grade];

  return createBotMessage(
    DOMPurify.sanitize(`
    <div id="assessment-results" style="
      background-color: ${colors.lightBg};
      padding: 1.5rem;
      border-radius: 0.75rem;
      border: 1px solid ${colors.border};
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    ">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="
          width: 4rem;
          height: 4rem;
          background-color: ${colors.white};
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.75rem;
          border: 1px solid ${colors.border};
        ">
          <span style="font-size: 1.5rem; color: ${colors.primary}">📊</span>
        </div>
        <h3 style="
          font-size: 1.5rem;
          font-weight: 700;
          color: ${colors.textDark};
          margin-bottom: 0.25rem;
        ">Life Essentials Report</h3>
        <p style="
          color: ${colors.primary};
          font-weight: 500;
        ">${topic} • ${new Date().toLocaleDateString()}</p>
      </div>

      <!-- Score Card -->
      <div style="
        background-color: ${colors.white};
        padding: 1.25rem;
        border-radius: 0.75rem;
        border: 1px solid ${colors.border};
        margin-bottom: 1.5rem;
      ">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <div>
            <p style="font-size: 0.875rem; color: ${
              colors.primary
            }">Your Score</p>
            <p style="font-size: 1.875rem; font-weight: 700; color: ${
              colors.textDark
            }; margin-top: 0.25rem;">
              ${score}<span style="font-size: 1.125rem; color: ${
      colors.textLight
    }">/${maxScore}</span>
            </p>
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-end;">
            <span style="font-size: 0.875rem; color: ${
              colors.primary
            }">Grade</span>
            <span style="
              padding: 0.25rem 0.75rem;
              border-radius: 9999px;
              font-size: 0.875rem;
              font-weight: 700;
              margin-top: 0.25rem;
              ${gradeStyles}
            ">${grade}</span>
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div style="margin-bottom: 0.75rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.875rem; color: ${
            colors.primary
          }; margin-bottom: 0.25rem;">
            <span>Completion</span>
            <span>${percentage}%</span>
          </div>
          <div style="
            width: 100%;
            background-color: #E0E7FF;
            border-radius: 9999px;
            height: 0.5rem;
          ">
            <div style="
              background-color: ${colors.primary};
              height: 0.5rem;
              border-radius: 9999px;
              width: ${percentage}%;
            "></div>
          </div>
        </div>
      </div>

      <!-- User Info -->
      <div style="
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.75rem;
        margin-bottom: 1.5rem;
      ">
        <div style="
          background-color: ${colors.white};
          padding: 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid ${colors.border};
        ">
          <p style="font-size: 0.75rem; color: ${
            colors.primary
          }">Date Generated</p>
          <p style="font-weight: 500; color: ${
            colors.textDark
          }">${new Date().toLocaleDateString()}</p>
        </div>
        ${
          email
            ? `
        <div style="
          background-color: ${colors.white};
          padding: 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid ${colors.border};
        ">
          <p style="font-size: 0.75rem; color: ${colors.primary}">Registered Email</p>
          <p style="font-weight: 500; color: ${colors.textDark}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${email}</p>
        </div>
        `
            : ""
        }
      </div>

      <!-- Answers Summary -->
      <div style="margin-bottom: 1.5rem;">
        <h4 style="
          font-size: 1.125rem;
          font-weight: 600;
          color: ${colors.textDark};
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid ${colors.border};
        ">Your Answers</h4>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${generateAnswerSummary(answers, questions)}
        </div>
      </div>

      <!-- Recommendations -->
      <div style="margin-bottom: 1.5rem;">
        <h4 style="
          font-size: 1.125rem;
          font-weight: 600;
          color: ${colors.textDark};
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid ${colors.border};
        ">Recommendations</h4>
        <div style="
          background-color: ${colors.white};
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid ${colors.border};
        ">
          <p style="color: ${colors.textDark}; margin-bottom: 0.5rem;">
            Based on your ${topic.toLowerCase()} assessment, here are some suggestions:
          </p>
          <ul class="list-disc pl-5 space-y-1" style="color: ${
            colors.textDark
          }">
            <li>Review areas where you scored below level B</li>
            <li>Set specific goals for improvement</li>
            <li>Consider retaking this assessment in 2-4 weeks</li>
            <li>Explore related topics for comprehensive improvement</li>
          </ul>
        </div>
      </div>

      <!-- Download Button -->
      <div data-ignore-pdf style="text-align: center; margin-top: 1.5rem;">
        <button data-download-pdf style="
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          background: ${colors.primary};
          color: white;
          border-radius: 0.5rem;
          border: none;
          font-size: 0.875rem;
          cursor: pointer;
        ">
          <svg style="width: 1rem; height: 1rem; margin-right: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          Download PDF Report
        </button>
      </div>

      <!-- Footer -->
      <div style="
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid ${colors.border};
        text-align: center;
        font-size: 0.75rem;
        color: ${colors.primary};
        opacity: 0.6;
      ">
        <p>Generated by Life Essentials Bot • ${new Date().toLocaleString()}</p>
      </div>
    </div>
  `)
  );
};
