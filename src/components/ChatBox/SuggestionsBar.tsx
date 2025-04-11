"use client";

import React, { useState } from "react";
import { motion, PanInfo } from "framer-motion";

interface SuggestionItem {
  id: string;
  content: string;
}

interface SuggestionsProps {
  suggestions: SuggestionItem[];
  onSuggestionClick: (content: string) => void;
  isDisabled: boolean;
}

export const SuggestionsBar = ({
  suggestions,
  onSuggestionClick,
  isDisabled,
}: SuggestionsProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    // Only register as non-drag if movement is very small
    if (Math.abs(info.offset.x) < 5) {
      setIsDragging(false);
    }
    setTimeout(() => setIsDragging(false), 100);
  };

  const handleClick = (text: string) => {
    if (isDisabled) return;
    if (!isDragging) {
      onSuggestionClick(text);
    }
  };

  return (
    <div className="w-full px-4 py-2 bg-slate-800/50 border-t border-slate-700/50 overflow-hidden">
      <motion.div
        className="flex gap-2 pb-2"
        drag="x"
        dragConstraints={{ right: 0, left: -(suggestions.length * 150 - 100) }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
      >
        {suggestions.map((suggestion) => (
          <motion.button
            key={suggestion.id}
            onClick={() => handleClick(suggestion.content)}
            className={`
              ${isDisabled ? "cursor-not-allowed opacity-60" : "opacity-100"}
              flex-shrink-0 px-3 py-2 text-sm rounded-lg bg-slate-700/60 hover:bg-slate-600/80 transition-colors text-white whitespace-nowrap cursor-grab select-none`}
            whileTap={{ scale: 0.98 }}
          >
            {suggestion.content}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};
