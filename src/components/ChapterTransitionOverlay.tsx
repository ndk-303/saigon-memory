import React from 'react';
import { Award, ArrowRight, MapPin, Sparkles, BookOpen, CheckCircle, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChapterId, ChapterInfo, InventoryItem } from '../types';
import { CHAPTERS_INFO } from '../data/gameData';
import { sound } from '../utils/audio';

interface ChapterTransitionOverlayProps {
  isOpen: boolean;
  completedChapter: ChapterId;
  rewardItem?: InventoryItem;
  onProceedToNextChapter: (nextChapter: ChapterId) => void;
  onOpenMap: () => void;
}

export const ChapterTransitionOverlay: React.FC<ChapterTransitionOverlayProps> = ({
  isOpen,
  completedChapter,
  rewardItem,
  onProceedToNextChapter,
  onOpenMap,
}) => {
  if (!isOpen) return null;

  const currentChapterInfo = CHAPTERS_INFO.find((c) => c.id === completedChapter) || CHAPTERS_INFO[0];
  const nextChapterId = (completedChapter < 4 ? completedChapter + 1 : 4) as ChapterId;
  const nextChapterInfo = CHAPTERS_INFO.find((c) => c.id === nextChapterId);
  const isFinalChapter = completedChapter === 4;

  const handleProceed = () => {
    sound.playQuestComplete();
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#ffc67c', '#f59e0b', '#38bdf8', '#22c55e'],
    });
    onProceedToNextChapter(nextChapterId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none animate-fadeIn">
      {/* Ornate Retro Frame */}
      <div className="relative w-full max-w-2xl bg-[#2c1c18] border-8 border-[#f59e0b] p-6 sm:p-8 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] flex flex-col text-center">
        {/* 4 Golden Corner Accents */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#fcd34d] border-2 border-black" />
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#fcd34d] border-2 border-black" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-[#fcd34d] border-2 border-black" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#fcd34d] border-2 border-black" />

        {/* Top Victory Ribbon */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-7 h-7 text-[#f59e0b] animate-spin" />
          <h2 className="font-ui-label text-xl sm:text-2xl text-[#ffc67c] font-black uppercase tracking-widest text-shadow">
            HOÀN THÀNH {currentChapterInfo.titleVi.toUpperCase()}
          </h2>
          <Sparkles className="w-7 h-7 text-[#f59e0b] animate-spin" />
        </div>

        {/* Subtitle / Theme Badge */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="px-3 py-0.5 bg-[#854d0e] text-[#fef08a] font-ui-label text-xs font-bold uppercase tracking-wider border border-[#fef08a] shadow-sm">
            CHỦ ĐỀ: {currentChapterInfo.themeVi}
          </span>
          <span className="px-3 py-0.5 bg-[#14532d] text-[#86efac] font-ui-label text-xs font-bold uppercase tracking-wider border border-[#86efac] shadow-sm">
            TIẾN ĐỘ: {completedChapter}/4 CHƯƠNG
          </span>
        </div>

        {/* Body Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-left">
          {/* Card 1: Unlocked Memory Relic */}
          <div className="bg-[#180b07] border-3 border-[#9f8e7a] p-4 flex flex-col justify-between shadow-inner">
            <div>
              <div className="flex items-center gap-2 text-xs font-ui-label text-[#f59e0b] font-bold uppercase tracking-wider mb-2">
                <Award className="w-4 h-4" />
                KỶ VẬT ĐÃ THU THẬP
              </div>
              <h3 className="font-ui-label text-sm sm:text-base text-[#ffedd5] font-bold mb-1">
                {currentChapterInfo.rewardItemNameVi}
              </h3>
              <p className="font-dialogue-text text-xs text-[#d7c3ae] leading-relaxed">
                {currentChapterInfo.descriptionVi}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#524434] flex items-center gap-1.5 text-[11px] text-[#4ade80] font-ui-label font-bold">
              <CheckCircle className="w-3.5 h-3.5" />
              Đã lưu vào Sổ Tay Ký Ức
            </div>
          </div>

          {/* Card 2: Next Journey Clue */}
          <div className="bg-[#1e100c] border-3 border-[#f59e0b] p-4 flex flex-col justify-between shadow-inner">
            <div>
              <div className="flex items-center gap-2 text-xs font-ui-label text-[#38bdf8] font-bold uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4" />
                {isFinalChapter ? 'DI SẢN TRỌN VẸN' : 'MANH MỐI TIẾP THEO'}
              </div>
              {nextChapterInfo && !isFinalChapter ? (
                <>
                  <h3 className="font-ui-label text-sm sm:text-base text-[#38bdf8] font-bold mb-1">
                    {nextChapterInfo.subtitleVi}
                  </h3>
                  <p className="font-dialogue-text text-xs text-[#f9dcd5] leading-relaxed italic">
                    "{currentChapterInfo.nextClueVi}"
                  </p>
                </>
              ) : (
                <p className="font-dialogue-text text-xs text-[#f9dcd5] leading-relaxed italic">
                  "Hành trình qua 4 địa danh Sài Gòn đã khép lại trọn vẹn, mở ra những giá trị bất biến của tình thân và tình người."
                </p>
              )}
            </div>
            <div className="mt-3 pt-2 border-t border-[#524434] flex items-center gap-1.5 text-[11px] text-[#fcd34d] font-ui-label font-bold">
              <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" />
              {isFinalChapter ? 'Quận 3, Sài Gòn' : nextChapterInfo?.locationVi}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Primary Next Chapter Button */}
          <button
            id="btn-next-chapter"
            onClick={handleProceed}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#f59e0b] to-[#ea580c] hover:from-[#fcd34d] hover:to-[#f97316] text-[#180b07] font-ui-label text-sm sm:text-base font-black uppercase tracking-wider border-2 border-[#180b07] shadow-[4px_4px_0px_black] hover:shadow-[6px_6px_0px_black] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              {isFinalChapter
                ? 'XEM KẾT THÚC CỐT TRUYỆN (ENDING) ★'
                : `BƯỚC SANG CHƯƠNG ${nextChapterId}: ${nextChapterInfo?.themeVi} ->`}
            </span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>

          {/* Secondary Saigon Map Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenMap();
            }}
            className="w-full sm:w-auto px-4 py-3.5 bg-[#372621] hover:bg-[#524434] text-[#ffedd5] font-ui-label text-xs sm:text-sm font-bold border-2 border-[#9f8e7a] shadow-[4px_4px_0px_black] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#ffc67c]" />
            BẢN ĐỒ HÀNH TRÌNH
          </button>
        </div>
      </div>
    </div>
  );
};
