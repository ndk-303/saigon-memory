import React from 'react';
import { Map, MapPin, CheckCircle2, Lock, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { ChapterId } from '../types';
import { CHAPTERS_INFO } from '../data/gameData';
import { sound } from '../utils/audio';

interface ChapterMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentChapter: ChapterId;
  unlockedChapters: ChapterId[];
  onSelectChapter: (chapterId: ChapterId) => void;
}

export const ChapterMapModal: React.FC<ChapterMapModalProps> = ({
  isOpen,
  onClose,
  currentChapter,
  unlockedChapters,
  onSelectChapter,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#2c1c18] border-8 border-[#9f8e7a] p-6 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] flex flex-col">
        {/* Golden corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#f59e0b]" />

        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 mb-4 border-b-4 border-[#524434]">
          <div className="flex items-center gap-2.5">
            <Map className="w-6 h-6 text-[#f59e0b]" />
            <div>
              <h2 className="font-ui-label text-lg sm:text-xl text-[#ffc67c] font-bold uppercase tracking-wider">
                BẢN ĐỒ KÝ ỨC SÀI GÒN
              </h2>
              <p className="text-xs text-[#d7c3ae] font-ui-label">
                Hành trình tìm lại ký ức qua 4 địa danh lịch sử
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-3 py-1 bg-[#1e100c] text-[#ffb4ab] border-2 border-[#ffb4ab] hover:bg-[#ffb4ab] hover:text-[#1e100c] font-ui-label text-xs font-bold transition-colors"
          >
            ĐÓNG [ESC]
          </button>
        </div>

        {/* Chapter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {CHAPTERS_INFO.map((chapter) => {
            const isUnlocked = unlockedChapters.includes(chapter.id);
            const isCurrent = chapter.id === currentChapter;
            const isPastChapter = isUnlocked && chapter.id < currentChapter;
            const isNextAvailable = isUnlocked && chapter.id > currentChapter;

            return (
              <div
                key={chapter.id}
                onClick={() => {
                  if (isUnlocked) {
                    sound.playSelect();
                    onSelectChapter(chapter.id);
                    onClose();
                  }
                }}
                className={`relative border-3 p-4 flex flex-col justify-between transition-all shadow-md ${
                  isCurrent
                    ? 'bg-[#3d271d] border-[#f59e0b] ring-2 ring-[#f59e0b] cursor-pointer'
                    : isNextAvailable
                    ? 'bg-[#1a2e26] border-[#22c55e] hover:border-[#86efac] hover:bg-[#203a30] cursor-pointer ring-1 ring-[#22c55e]'
                    : isUnlocked
                    ? 'bg-[#1e100c] border-[#9f8e7a] hover:border-[#ffedd5] hover:bg-[#2c1c18] cursor-pointer'
                    : 'bg-[#150e0c] border-[#372621] opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Status Badge */}
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`px-2 py-0.5 font-ui-label text-[10px] font-bold uppercase tracking-wider border ${
                      isCurrent
                        ? 'bg-[#f59e0b] text-[#180b07] border-black'
                        : isNextAvailable
                        ? 'bg-[#15803d] text-[#bbf7d0] border-[#86efac] animate-pulse'
                        : isPastChapter
                        ? 'bg-[#1e293b] text-[#93c5fd] border-[#60a5fa]'
                        : 'bg-[#372621] text-[#9f8e7a] border-[#524434]'
                    }`}
                  >
                    {isCurrent
                      ? 'ĐANG CHƠI'
                      : isNextAvailable
                      ? 'MỞ KHÓA MỚI ★'
                      : isPastChapter
                      ? 'ĐÃ QUA MÀN'
                      : 'CHƯA MỞ KHÓA'}
                  </span>

                  <div className="flex items-center gap-1 text-xs text-[#f59e0b] font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Năm {chapter.year}</span>
                  </div>
                </div>

                {/* Chapter Title & Location */}
                <div>
                  <h3 className="font-ui-label text-sm sm:text-base text-[#ffc67c] font-bold mb-1">
                    {chapter.titleVi}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-[#38bdf8] font-ui-label mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{chapter.locationVi}</span>
                  </div>
                  <p className="font-dialogue-text text-xs text-[#d7c3ae] line-clamp-2 leading-relaxed">
                    {chapter.descriptionVi}
                  </p>
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-3 pt-2 border-t border-[#524434] flex items-center justify-between">
                  <span className="text-[11px] text-[#ffedd5] font-ui-label font-bold">
                    Chủ đề: {chapter.themeVi}
                  </span>
                  {isUnlocked ? (
                    <span className="flex items-center gap-1 text-xs text-[#f59e0b] font-bold group-hover:translate-x-1">
                      {isCurrent ? 'Tiếp tục màn này' : isNextAvailable ? 'Vào màn tiếp theo ->' : 'Xem lại màn'} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-[#78716c]">
                      <Lock className="w-3.5 h-3.5" /> Khóa
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-[#9f8e7a] font-ui-label">
          Bạn có thể tự do xem lại các chặng đã hoàn thành hoặc chọn chuyển màn trực tiếp.
        </p>
      </div>
    </div>
  );
};
