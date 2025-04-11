import React, { FC, RefObject, useCallback, useEffect } from "react";
import botPng from "@/assets/robot.png";
import userPng from "@/assets/user.png";
import Image from "next/image";
import { Message } from "@/types/chat";
import { generateAssessmentPDF } from "@/utils/pdfGenerator";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  data: Message[];
  messagesEndRef: RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  onTopicSelect?: (topic: string) => void; // Add this prop
}

const MessageContainer: FC<Props> = ({
  data,
  messagesEndRef,
  isLoading,
  onTopicSelect,
}) => {
  // Add PDF download handler
  const handleDownload = useCallback(() => {
    const element = document.getElementById("assessment-results");
    if (!element) {
      console.error("Assessment results element not found");
      return;
    }

    // Create a temporary button to handle the download
    const downloadBtn = document.createElement("button");
    downloadBtn.onclick = () => {
      setTimeout(() => {
        generateAssessmentPDF(
          "assessment-results",
          `Health-Report-${new Date().toISOString().slice(0, 10)}`
        );
      }, 300);
    };
    downloadBtn.click();
  }, []);

  // Handle clicks on dynamically created elements
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Handle PDF download clicks
      if (target.closest("[data-download-pdf]")) {
        e.preventDefault();
        handleDownload();
      }

      // Handle topic selection clicks
      const topicElement = target.closest("[data-topic]");
      if (topicElement && onTopicSelect) {
        e.preventDefault();
        const topic = topicElement.getAttribute("data-topic");
        if (topic) {
          onTopicSelect(topic);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [handleDownload, onTopicSelect]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 chatbox-container">
      <AnimatePresence initial={false}>
        {data.map((message, index) => (
          <motion.div
            key={message.timestamp + index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              duration: 0.3,
            }}
          >
            {message.isUser ? (
              <UserMessage
                content={message.content}
                timestamp={message.timestamp}
              />
            ) : (
              <BotMessage
                content={message.content}
                timestamp={message.timestamp}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      {isLoading && (
        <div className="flex items-end gap-2">
          <Avatar isUser={false} />
          <div className="flex flex-col">
            <div className="max-w-[80%] ml-2 px-4 py-2 rounded-lg bg-slate-700/60 text-white rounded-tl-none">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef as RefObject<HTMLDivElement>} />
    </div>
  );
};

export default MessageContainer;

const UserMessage = ({
  content,
  timestamp,
}: {
  content: string;
  timestamp: string;
}) => {
  return (
    <div className="flex items-end gap-2 justify-end">
      <div className="flex flex-col items-end">
        <div
          className={`max-w-[80%] mr-2 px-4 py-2 rounded-lg bg-indigo-500 text-white rounded-tr-none`}
        >
          {content}
        </div>
        <p className="text-xs text-gray-400 mt-1 mr-2">{timestamp}</p>
      </div>
      <Avatar isUser />
    </div>
  );
};

interface BotMessageProps {
  content: string;
  timestamp: string;
}

const BotMessage = ({ content, timestamp }: BotMessageProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-end gap-2">
        <Avatar isUser={false} />
        <div className="flex flex-col">
          <div
            className="max-w-[80%] ml-2 px-4 py-2 rounded-lg bg-slate-700/60 text-white rounded-tl-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <p className="text-xs text-gray-400 mt-1 ml-2">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export const Avatar = ({ isUser }: { isUser: boolean }) => {
  return (
    <div className="flex-shrink-0 w-10 h-10 rounded-md bg-slate-700/30 flex items-center justify-center overflow-hidden">
      <div className="w-6 h-6 relative">
        <Image
          src={isUser ? userPng.src : botPng.src}
          fill
          alt={isUser ? "user" : "bot"}
          className="object-contain"
        />
      </div>
    </div>
  );
};

// import React, { FC, RefObject, useCallback, useEffect } from "react";
// import botPng from "@/assets/robot.png";
// import userPng from "@/assets/user.png";
// import Image from "next/image";
// import { Message } from "@/types/chat";
// import { generateAssessmentPDF } from "@/utils/pdfGenerator";
// import { motion, AnimatePresence } from "framer-motion";

// interface Props {
//   data: Message[];
//   messagesEndRef: RefObject<HTMLDivElement | null>;
//   onSuggestionClick?: (text: string) => void;
//   isLoading: boolean;
// }

// const MessageContainer: FC<Props> = ({ data, messagesEndRef, isLoading }) => {
//   const handleDownload = useCallback(() => {
//     const element = document.getElementById("assessment-results");
//     if (!element) return;

//     setTimeout(() => {
//       generateAssessmentPDF(
//         "assessment-results",
//         `Health-Report-${new Date().toISOString().slice(0, 10)}`
//       );
//     }, 300);
//   }, []);

//   useEffect(() => {
//     const handleClick = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       if (target.closest("[data-download-pdf]")) {
//         handleDownload();
//       }
//     };

//     document.addEventListener("click", handleClick);
//     return () => document.removeEventListener("click", handleClick);
//   }, [handleDownload]);

//   return (
//     <div className="flex-1 overflow-y-auto p-4 space-y-6 chatbox-container">
//       <AnimatePresence initial={false}>
//         {data.map((message, index) => (
//           <motion.div
//             key={message.timestamp + index}
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{
//               type: "spring",
//               stiffness: 500,
//               damping: 30,
//               duration: 0.3,
//             }}
//           >
//             {message.isUser ? (
//               <UserMessage
//                 content={message.content}
//                 timestamp={message.timestamp}
//               />
//             ) : (
//               <BotMessage
//                 content={message.content}
//                 timestamp={message.timestamp}
//               />
//             )}
//           </motion.div>
//         ))}
//       </AnimatePresence>

//       {isLoading && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="flex items-end gap-2"
//         >
//           <Avatar isUser={false} />
//           <div className="flex flex-col">
//             <div className="max-w-[80%] ml-2 px-4 py-2 rounded-lg bg-slate-700/60 text-white rounded-tl-none">
//               <div className="flex space-x-2">
//                 <motion.div
//                   className="w-2 h-2 rounded-full bg-gray-400"
//                   animate={{ y: [0, -8, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 0.6,
//                     delay: 0,
//                   }}
//                 />
//                 <motion.div
//                   className="w-2 h-2 rounded-full bg-gray-400"
//                   animate={{ y: [0, -8, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 0.6,
//                     delay: 0.2,
//                   }}
//                 />
//                 <motion.div
//                   className="w-2 h-2 rounded-full bg-gray-400"
//                   animate={{ y: [0, -8, 0] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 0.6,
//                     delay: 0.4,
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}
//       <div ref={messagesEndRef as RefObject<HTMLDivElement>} />
//     </div>
//   );
// };
// export default MessageContainer;

// const UserMessage = ({
//   content,
//   timestamp,
// }: {
//   content: string;
//   timestamp: string;
// }) => {
//   return (
//     <motion.div
//       className="flex items-end gap-2 justify-end"
//       whileHover={{ scale: 1.01 }}
//     >
//       <div className="flex flex-col items-end">
//         <motion.div
//           className="max-w-[80%] mr-2 px-4 py-2 rounded-lg bg-indigo-500 text-white rounded-tr-none"
//           initial={{ scaleX: 0.5, scaleY: 0 }}
//           animate={{ scaleX: 1, scaleY: 1 }}
//           transition={{ type: "spring", stiffness: 500, damping: 30 }}
//         >
//           {content}
//         </motion.div>
//         <motion.p
//           className="text-xs text-gray-400 mt-1 mr-2"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           {timestamp}
//         </motion.p>
//       </div>
//       <Avatar isUser />
//     </motion.div>
//   );
// };

// const BotMessage = ({
//   content,
//   timestamp,
// }: {
//   content: string;
//   timestamp: string;
// }) => {
//   return (
//     <motion.div className="flex flex-col" whileHover={{ scale: 1.01 }}>
//       <div className="flex items-end gap-2">
//         <Avatar isUser={false} />
//         <div className="flex flex-col">
//           <motion.div
//             className="max-w-[80%] ml-2 px-4 py-2 rounded-lg bg-slate-700/60 text-white rounded-tl-none prose"
//             dangerouslySetInnerHTML={{ __html: content }}
//             initial={{ scaleX: 0.5, scaleY: 0 }}
//             animate={{ scaleX: 1, scaleY: 1 }}
//             transition={{ type: "spring", stiffness: 500, damping: 30 }}
//           />
//           <motion.p
//             className="text-xs text-gray-400 mt-1 ml-2"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             {timestamp}
//           </motion.p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export const Avatar = ({ isUser }: { isUser: boolean }) => {
//   return (
//     <motion.div
//       className="flex-shrink-0 w-10 h-10 rounded-md bg-slate-700/30 flex items-center justify-center overflow-hidden"
//       whileHover={{ scale: 1.1 }}
//     >
//       <div className="w-6 h-6 relative">
//         <Image
//           src={isUser ? userPng.src : botPng.src}
//           fill
//           alt={isUser ? "user" : "bot"}
//           className="object-contain"
//         />
//       </div>
//     </motion.div>
//   );
// };
