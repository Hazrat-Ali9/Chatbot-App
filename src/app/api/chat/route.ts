import { NextResponse } from "next/server";
import { ChatRequest, Message } from "@/types/chat";
import { QUESTIONS, TOPICS } from "@/data/assessment";
import { DEFAULT_RESPONSES } from "@/data/defaultResponses";
import {
  createBotMessage,
  formatQuestion,
  calculateScore,
  WELCOME_MESSAGE,
  NEED_EMAIL_MESSAGE,
  getTopicSelectionMessage,
  INVALID_TOPIC_MESSAGE,
  EXIT_MESSAGE,
  getInvalidAnswerMessage,
  getAssessmentResults,
  BASIC_QA_MESSAGE,
} from "@/utils/chatHelpers";
import { BASIC_QA_findAnswer } from "@/data/othersUserInput";

interface SuccessResponseParams {
  messages: Message[];
  currentStep: string;
  email?: string;
  selectedTopic?: string;
  answers?: Record<number, string>;
  score?: number;
}

const createResponse = (
  { messages, currentStep, ...data }: SuccessResponseParams,
  status = 200
) => {
  return NextResponse.json(
    {
      success: status === 200,
      messages,
      currentStep,
      ...data,
    },
    { status, headers: { "Content-Type": "application/json" } }
  );
};

const handleError = (message: string, status = 400) => {
  return createResponse(
    {
      messages: [
        createBotMessage(
          `<div class="bot-message text-red-500"><p>Error: ${message}</p></div>`
        ),
      ],
      currentStep: "error",
    },
    status
  );
};

const validateRequest = async (req: Request) => {
  try {
    const requestBody = await req.text();
    if (!requestBody) throw new Error("Request body is empty");

    const parsedBody = JSON.parse(requestBody) as ChatRequest;
    if (!parsedBody) throw new Error("Invalid request format");

    return parsedBody;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Invalid request format"
    );
  }
};

export async function POST(req: Request) {
  try {
    const {
      message,
      email,
      selectedTopic,
      answers = {},
      currentStep = "welcome",
    } = await validateRequest(req);

    // Handle default responses
    if (message && DEFAULT_RESPONSES[message]) {
      return createResponse({
        messages: [createBotMessage(DEFAULT_RESPONSES[message])],
        currentStep,
        email,
        selectedTopic,
        answers,
      });
    }

    // Handle special commands
    if (
      message?.toLowerCase() === "start" ||
      message?.toLocaleLowerCase() === "start assessment"
    ) {
      return createResponse({
        messages: [NEED_EMAIL_MESSAGE],
        currentStep: "email",
      });
    }

    // Assessment flow
    switch (currentStep) {
      case "welcome":
        if (!message)
          return createResponse({
            messages: [WELCOME_MESSAGE],
            currentStep: "welcome",
          });
        // Custom message
        return createResponse({
          messages: [BASIC_QA_MESSAGE(BASIC_QA_findAnswer(message).answer)],
          currentStep: "welcome",
        });

      case "email":
        if (!message) return handleError("Message is required");

        const normalizedEmail = message.toLowerCase();
        if (!/\S+@\S+\.\S+/.test(normalizedEmail)) {
          return createResponse({
            messages: [NEED_EMAIL_MESSAGE],
            currentStep: "email",
          });
        }

        return createResponse({
          // @ts-expect-error solve
          messages: [getTopicSelectionMessage(TOPICS)],
          currentStep: "topic",
          email: normalizedEmail,
        });

      case "topic": {
        if (!message) return handleError("Message is required");

        const matchedTopic = TOPICS.find(
          (t) => t.toLowerCase() === message.toLowerCase()
        );
        if (!matchedTopic) {
          return createResponse({
            // @ts-expect-error solve
            messages: [INVALID_TOPIC_MESSAGE(TOPICS)],
            currentStep: "topic",
            email,
          });
        }

        const questions = QUESTIONS[matchedTopic];
        if (!questions?.length) {
          return handleError("No questions found for this topic", 500);
        }

        return createResponse({
          messages: [
            createBotMessage(
              formatQuestion(questions[0], 1, questions.length, matchedTopic)
            ),
          ],
          currentStep: "questions",
          selectedTopic: matchedTopic,
          email,
        });
      }

      case "questions": {
        if (!message) return handleError("Message is required");
        if (!selectedTopic) return handleError("Topic is required");

        // Handle exit command
        if (message.toLowerCase() === "exit") {
          return createResponse({
            messages: [EXIT_MESSAGE],
            currentStep: "welcome",
          });
        }

        const questions = QUESTIONS[selectedTopic];
        if (!questions?.length) {
          return handleError("No questions found for this topic", 500);
        }

        const currentQuestionIndex = Object.keys(answers).length;
        if (currentQuestionIndex >= questions.length) {
          return handleError("Question index out of bounds", 500);
        }

        const upperMessage = message.toUpperCase();
        if (!["A", "B", "C", "D"].includes(upperMessage)) {
          return createResponse({
            messages: [
              getInvalidAnswerMessage(
                questions[currentQuestionIndex],
                currentQuestionIndex + 1,
                questions.length,
                selectedTopic
              ),
            ],
            currentStep: "questions",
            selectedTopic,
            answers,
            email,
          });
        }

        // Store answer and proceed
        const newAnswers = { ...answers, [currentQuestionIndex]: upperMessage };

        if (currentQuestionIndex < questions.length - 1) {
          return createResponse({
            messages: [
              createBotMessage(
                formatQuestion(
                  questions[currentQuestionIndex + 1],
                  currentQuestionIndex + 2,
                  questions.length,
                  selectedTopic
                )
              ),
            ],
            currentStep: "questions",
            selectedTopic,
            answers: newAnswers,
            email,
          });
        }

        // Calculate final results
        const score = calculateScore(newAnswers, questions);
        const maxScore = questions.reduce((sum, q) => {
          return sum + Math.max(...q.options.map((opt) => opt.score));
        }, 0);
        const percentage = Math.round((score / maxScore) * 100);

        return createResponse({
          messages: [
            getAssessmentResults(
              score,
              maxScore,
              percentage,
              selectedTopic,
              newAnswers,
              questions,
              email
            ),
          ],
          currentStep: "results",
          score,
          email,
          selectedTopic,
          answers: newAnswers,
        });
      }

      default:
        return createResponse({
          messages: [
            BASIC_QA_MESSAGE(BASIC_QA_findAnswer(message as string).answer),
          ],
          currentStep: "welcome",
        });
    }
  } catch (error) {
    console.error("API Error:", error);
    return handleError(
      error instanceof Error ? error.message : "Internal server error",
      500
    );
  }
}
