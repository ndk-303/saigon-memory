import React from 'react';
import { Award, Sparkles, Heart, RefreshCw, BookOpen, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface StoryEndingModalProps {
  isOpen: boolean;
  onRestart: () => void;
  onOpenMap: () => void;
}

export const StoryEndingModal: React.FC<StoryEndingModalProps> = ({ isOpen, onRestart, onOpenMap }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#2c1c18] border-8 border-[#f4a424] p-6 sm:p-8 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] flex flex-col text-center">
        {/* Corner Accents */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#ffc67c] border-2 border-black" />
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#ffc67c] border-2 border-black" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-[#ffc67c] border-2 border-black" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#ffc67c] border-2 border-black" />

        {/* Title */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Award className="w-8 h-8 text-[#f4a424] animate-bounce" />
          <h2 className="font-ui-label text-xl sm:text-2xl text-[#ffc67c] font-black uppercase tracking-widest text-shadow">
            HỒI ỨC SÀI GÒN: HOÀN TẤT
          </h2>
          <Sparkles className="w-8 h-8 text-[#f4a424] animate-pulse" />
        </div>
        <p className="text-xs text-[#a1d494] font-ui-label tracking-wider uppercase mb-4 font-bold">
          ★ Chúc Mừng! Bạn Đã Hoàn Thành Cả 4 Chương Ký Ức ★
        </p>

        {/* 4 Pillars of Saigon Memory */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          <div className="bg-[#180b07] border border-[#524434] p-2 rounded">
            <div className="text-[10px] text-[#f59e0b] font-ui-label font-bold">CHƯƠNG I</div>
            <div className="text-xs text-[#ffedd5] font-bold">Tình Bạn (1992)</div>
            <div className="text-[10px] text-[#4ade80]">✓ Hoàn thành</div>
          </div>
          <div className="bg-[#180b07] border border-[#524434] p-2 rounded">
            <div className="text-[10px] text-[#38bdf8] font-ui-label font-bold">CHƯƠNG II</div>
            <div className="text-xs text-[#ffedd5] font-bold">Tình Yêu (1968)</div>
            <div className="text-[10px] text-[#4ade80]">✓ Hoàn thành</div>
          </div>
          <div className="bg-[#180b07] border border-[#524434] p-2 rounded">
            <div className="text-[10px] text-[#eab308] font-ui-label font-bold">CHƯƠNG III</div>
            <div className="text-xs text-[#ffedd5] font-bold">Đam Mê (1975)</div>
            <div className="text-[10px] text-[#4ade80]">✓ Hoàn thành</div>
          </div>
          <div className="bg-[#180b07] border border-[#524434] p-2 rounded">
            <div className="text-[10px] text-[#ec4899] font-ui-label font-bold">CHƯƠNG IV</div>
            <div className="text-xs text-[#ffedd5] font-bold">Di Sản & Mái Ấm</div>
            <div className="text-[10px] text-[#4ade80]">✓ Hoàn thành</div>
          </div>
        </div>

        {/* Nostalgic Memory Image & Letter */}
        <div className="bg-[#180b07] border-4 border-[#524434] p-4 dither-bg mb-5 flex flex-col items-center">
          <div className="bg-[#372621] p-4 text-left border border-[#9f8e7a] shadow-inner">
            <p className="font-dialogue-text text-xs sm:text-sm text-[#f9dcd5] leading-relaxed italic">
              "Linh thân yêu của ông,
              <br />
              Khi con cầm được cuốn sổ này, nghĩa là con đã đi qua trọn vẹn những nơi chốn thân thương nhất của ông. Từ tiếng chuông chợ Bến Thành, lá thư tay bưu điện, tiếng đàn chung cư cho đến giàn hoa giấy trước hiên nhà...
              <br />
              Sài Gòn có thể đổi thay, nhưng tình người, ký ức và cội nguồn gia đình sẽ mãi là ngọn đèn soi sáng bước chân con."
            </p>
            <span className="block text-right font-ui-label text-xs text-[#ffc67c] mt-3 font-bold">
              — Ông Ngoại Sáu (Thương Gửi Cháu Gái) —
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              sound.playQuestComplete();
              confetti({
                particleCount: 100,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#f59e0b', '#ec4899', '#38bdf8', '#22c55e'],
              });
            }}
            className="px-5 py-2.5 bg-[#a1d494] text-[#0a3909] font-ui-label text-xs sm:text-sm font-bold border-2 border-[#23501e] hover:bg-[#bcf0ae] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Heart className="w-4 h-4 fill-current text-[#dc2626]" />
            BẮN PHÁO HOA KỶ NIỆM
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenMap();
            }}
            className="px-5 py-2.5 bg-[#372621] text-[#ffedd5] font-ui-label text-xs sm:text-sm font-bold border-2 border-[#9f8e7a] hover:bg-[#524434] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <BookOpen className="w-4 h-4 text-[#ffc67c]" />
            XEM LẠI BẢN ĐỒ
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
            className="px-5 py-2.5 bg-[#f4a424] text-[#180b07] font-ui-label text-xs sm:text-sm font-bold border-2 border-[#633e00] hover:bg-[#ffc67c] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <RefreshCw className="w-4 h-4" />
            CHƠI LẠI TỪ ĐẦU
          </button>
        </div>
      </div>
    </div>
  );
};
