// "use client";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import dynamic from "next/dynamic";
// import ChatBox from "@/components/ChatBox";

// const BackgroundParticles = dynamic(
//   () => import("@/components/BackgroundParticles"),
//   {
//     ssr: false,
//     loading: () => <div className="fixed inset-0 bg-slate-900" />,
//   }
// );

// export default function Home() {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Background with proper layering */}
//       <div className="fixed inset-0">
//         <div className="absolute inset-0 bg-slate-900" />
//         {isMounted && <BackgroundParticles />}
//       </div>

//       {/* Content with reduced backdrop blur for better visibility */}
//       <div className="relative z-10 min-h-screen flex items-center justify-center">
//         <div className="text-center max-w-2xl px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="inline-block relative"
//           >
//             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/30 to-transparent rounded-full blur-2xl" />
//             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 relative">
//               <span className="bg-[linear-gradient(120deg,#7dd3fc,#c084fc)] bg-clip-text text-transparent">
//                 Life Essentials
//               </span>
//               <span className="mx-3 bg-[linear-gradient(120deg,#7dd3fc,#c084fc)] bg-clip-text text-transparent">
//                 |
//               </span>
//               <span className="bg-[linear-gradient(120deg,#c084fc,#7dd3fc)] bg-clip-text text-transparent">
//                 Bot
//               </span>
//             </h1>
//           </motion.div>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="text-lg text-slate-200 mb-12 max-w-xl mx-auto"
//           >
//             Discover your strengths through our neural-powered assessment
//             engine. Get personalized career insights in minutes.
//           </motion.p>

//           <motion.div
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.6 }}
//           >
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsChatOpen(true)}
//               className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-purple-500/30 relative overflow-hidden"
//             >
//               <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
//               <span className="relative z-10">Start Assessment</span>
//               <div className="absolute inset-0 animate-pulse bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%]" />
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>

//       <AnimatePresence>
//         {isChatOpen && <ChatBox onClose={() => setIsChatOpen(false)} />}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import ChatBox from "@/components/ChatBox";

const BackgroundParticles = dynamic(
  () => import("@/components/BackgroundParticles"),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-slate-900" />,
  }
);

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with proper layering */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-slate-900" />
        {isMounted && <BackgroundParticles />}
      </div>

      {/* Content with reduced backdrop blur for better visibility */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/30 to-transparent rounded-full blur-2xl" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 relative">
              <span className="bg-[linear-gradient(120deg,#7dd3fc,#c084fc)] bg-clip-text text-transparent">
                Life Essentials
              </span>
              <span className="mx-3 bg-[linear-gradient(120deg,#7dd3fc,#c084fc)] bg-clip-text text-transparent">
                |
              </span>
              <span className="bg-[linear-gradient(120deg,#c084fc,#7dd3fc)] bg-clip-text text-transparent">
                Guide
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-slate-200 mb-8 max-w-xl mx-auto leading-relaxed"
          >
            Your personal companion for growth in health, relationships, and
            career. Get{" "}
            <span className="font-semibold text-blue-300">
              personalized insights
            </span>{" "}
            in just 5 minutes.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg text-slate-300 mb-12 max-w-xl mx-auto"
          >
            Our friendly AI will help you discover your strengths and areas for
            improvement across{" "}
            <span className="text-purple-300">10 key life dimensions</span>.
          </motion.p>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsChatOpen(true)}
              className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-purple-500/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                Start Free Assessment
              </span>
              <div className="absolute inset-0 animate-pulse bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%]" />
            </motion.button>

            <p className="text-slate-400 text-sm">
              No signup required • Takes just 5 minutes
            </p>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isChatOpen && <ChatBox onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
