import React from 'react';
import { Award, Sparkles, Heart, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface StoryEndingModalProps {
  isOpen: boolean;
  onRestart: () => void;
}

export const StoryEndingModal: React.FC<StoryEndingModalProps> = ({ isOpen, onRestart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none">
      <div className="relative w-full max-w-xl bg-[#2c1c18] border-8 border-[#f4a424] p-6 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col text-center">
        {/* Corner Accents */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#ffc67c] border border-black" />
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#ffc67c] border border-black" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-[#ffc67c] border border-black" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#ffc67c] border border-black" />

        {/* Title */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Award className="w-8 h-8 text-[#f4a424] animate-bounce" />
          <h2 className="font-ui-label text-xl sm:text-2xl text-[#ffc67c] font-black uppercase tracking-widest">
            KÝ ỨC TRỌN VẸN
          </h2>
          <Sparkles className="w-8 h-8 text-[#f4a424] animate-pulse" />
        </div>
        <p className="text-xs text-[#a1d494] font-ui-label tracking-wider uppercase mb-4">
          Hoàn Thành Chương I: Ký Ức Chợ Bến Thành (1992)
        </p>

        {/* Nostalgic Memory Image & Letter */}
        <div className="bg-[#180b07] border-4 border-[#524434] p-4 dither-bg mb-4 flex flex-col items-center">
          <div className="w-48 h-36 border-2 border-[#ffc67c] overflow-hidden mb-3 shadow-lg">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEIuHbTIdeiWs_woEHeG9FgB9bXsW1USdIfeNiBSlz8VCVK98HaUlmvwm52L7t9Mr4RLNEaUaBzzu4cdDwTbrVxMxoaviebvw_9wnh5Xj2I5Jp-etjW5pZd_sLUr8i82LBCg3NG-3-vi342kBfnfm2dh4ZrP1TcXlVjM27GYt18UbFQx_fZSX5dl3zVExWybiFRJkUp8wS5mgE--N7y9Ox3lUWTbpmujpQrdh3MFOQQPZ_fjAJm2ACBg"
              alt="Kỷ vật ông nội"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="bg-[#372621] p-3 text-left border border-[#9f8e7a]">
            <p className="font-dialogue-text text-xs sm:text-sm text-[#f9dcd5] leading-relaxed italic">
              "Gửi cháu gái nhỏ của ông,
              <br />
              Sài Gòn có thể thay đổi từng ngày, những con phố cũ rồi sẽ khoác lên mình áo mới, nhưng tình người và những ký ức dưới bóng tháp Bến Thành sẽ luôn ở lại mãi trong tim ta..."
            </p>
            <span className="block text-right font-ui-label text-xs text-[#ffc67c] mt-2 font-bold">
              — Ông Nội (Tháng 8, 1992) —
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              sound.playQuestComplete();
              confetti({
                particleCount: 80,
                spread: 90,
                origin: { y: 0.5 },
              });
            }}
            className="px-5 py-2.5 bg-[#a1d494] text-[#0a3909] font-ui-label text-xs sm:text-sm font-bold border-2 border-[#23501e] hover:bg-[#bcf0ae] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Heart className="w-4 h-4 fill-current" />
            LƯU GIỮ KỶ NIỆM
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
            className="px-5 py-2.5 bg-[#f4a424] text-[#180b07] font-ui-label text-xs sm:text-sm font-bold border-2 border-[#633e00] hover:bg-[#ffc67c] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <RefreshCw className="w-4 h-4" />
            CHƠI LẠI
          </button>
        </div>
      </div>
    </div>
  );
};
