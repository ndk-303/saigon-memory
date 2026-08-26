import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SceneTransitionCurtainProps {
  isTransitioning: boolean;
  chapterTitle?: string;
  locationName?: string;
  year?: number;
}

export const SceneTransitionCurtain: React.FC<SceneTransitionCurtainProps> = ({
  isTransitioning,
  chapterTitle,
  locationName,
  year,
}) => {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-50 bg-[#180b07] flex flex-col items-center justify-center pointer-events-none select-none"
        >
          <motion.div
            initial={{ scale: 0.9, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="text-center p-6 border-4 border-[#f59e0b] bg-[#2c1c18] shadow-[12px_12px_0px_black] max-w-md mx-4"
          >
            <div className="text-xs text-[#f59e0b] font-ui-label font-bold uppercase tracking-widest mb-1">
              ĐANG CHUYỂN MÀN CHƠI...
            </div>
            <h2 className="font-ui-label text-xl sm:text-2xl text-[#ffc67c] font-black uppercase tracking-wider mb-2">
              {chapterTitle || 'SÀI GÒN KÝ ỨC'}
            </h2>
            <div className="flex items-center justify-center gap-2 text-xs text-[#d7c3ae] font-ui-label">
              <span>{locationName}</span>
              {year && <span>• Năm {year}</span>}
            </div>

            {/* Vintage Pixel Loading Dots */}
            <div className="mt-4 flex justify-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#f59e0b] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2.5 h-2.5 bg-[#f59e0b] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2.5 h-2.5 bg-[#f59e0b] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
