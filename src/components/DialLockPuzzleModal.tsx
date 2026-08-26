import React, { useState } from 'react';
import { Sparkles, KeyRound, Search, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface DialLockPuzzleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSolved: () => void;
  isAlreadySolved?: boolean;
}

export const DialLockPuzzleModal: React.FC<DialLockPuzzleModalProps> = ({
  isOpen,
  onClose,
  onSolved,
  isAlreadySolved = false,
}) => {
  const [digits, setDigits] = useState<number[]>([1, 9, 0, 0]);
  const [showMagnifierHint, setShowMagnifierHint] = useState(false);
  const [isSolved, setIsSolved] = useState(isAlreadySolved);
  const TARGET_CODE = [1, 9, 6, 8];

  if (!isOpen) return null;

  const handleDigitChange = (index: number, delta: number) => {
    if (isSolved) return;
    sound.playClick();
    const newDigits = [...digits];
    newDigits[index] = (newDigits[index] + delta + 10) % 10;
    setDigits(newDigits);

    // Check if matching code 1968
    if (newDigits.every((d, i) => d === TARGET_CODE[i])) {
      setIsSolved(true);
      sound.playPuzzleSolved();
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#f59e0b', '#dc2626', '#fef08a'],
      });
      setTimeout(() => {
        onSolved();
      }, 1400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-[620px] bg-[#2c1c18] border-8 border-[#d4af37] p-6 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col">
        {/* Golden corner studs */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#f59e0b]" />

        {/* Header */}
        <div className="flex justify-between items-center pb-3 mb-4 border-b-4 border-[#524434]">
          <div className="flex items-center gap-2">
            <KeyRound className="w-6 h-6 text-[#f59e0b]" />
            <div>
              <h2 className="font-ui-label text-lg sm:text-xl text-[#ffc67c] font-bold uppercase tracking-wider">
                Ổ KHÓA SỐ HÒM THƯ 72
              </h2>
              <p className="text-xs text-[#d7c3ae] font-ui-label">
                Bưu Điện Trung Tâm Sài Gòn (1968)
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

        {/* Magnifier Clue Toggle Bar */}
        <div className="mb-5 bg-[#180b07] border-2 border-[#524434] p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Search className="w-5 h-5 text-[#38bdf8]" />
            <span className="text-xs text-[#f9dcd5] font-dialogue-text">
              {showMagnifierHint
                ? '🔍 Dưới kính lúp: Hình trái tim lồng 4 số La Mã: I - IX - VI - VIII (Năm 1968)!'
                : 'Sử dụng Kính Lúp Quang Học để soi nét vẽ hoa văn chìm trong sổ tay.'}
            </span>
          </div>
          <button
            onClick={() => {
              sound.playSelect();
              setShowMagnifierHint((prev) => !prev);
            }}
            className="px-3 py-1 bg-[#38bdf8] text-[#0c2d48] font-ui-label text-xs font-bold border border-white hover:bg-[#7dd3fc] transition-colors shrink-0 shadow-sm"
          >
            {showMagnifierHint ? 'Ẩn Gợi Ý' : 'Soi Kính Lúp'}
          </button>
        </div>

        {/* 4 Dials Brass Vault Display */}
        <div className="bg-[#1a100c] border-4 border-[#854d0e] p-6 mb-4 flex items-center justify-center gap-4 sm:gap-6 shadow-inner">
          {digits.map((digit, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              {/* Up Button */}
              <button
                disabled={isSolved}
                onClick={() => handleDigitChange(idx, 1)}
                className="w-12 h-8 bg-[#372621] hover:bg-[#f59e0b] hover:text-[#1e100c] text-[#ffc67c] border-2 border-[#9f8e7a] font-ui-label font-bold text-sm flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer shadow"
              >
                ▲
              </button>

              {/* Dial Wheel */}
              <div
                className={`w-14 h-20 sm:w-16 sm:h-24 bg-gradient-to-b from-[#180b07] via-[#3d271d] to-[#180b07] border-4 flex items-center justify-center shadow-lg transition-all ${
                  isSolved
                    ? 'border-[#22c55e] text-[#4ade80]'
                    : 'border-[#d4af37] text-[#ffedd5]'
                }`}
              >
                <span className="font-ui-label text-3xl sm:text-4xl font-black tracking-tighter">
                  {digit}
                </span>
              </div>

              {/* Down Button */}
              <button
                disabled={isSolved}
                onClick={() => handleDigitChange(idx, -1)}
                className="w-12 h-8 bg-[#372621] hover:bg-[#f59e0b] hover:text-[#1e100c] text-[#ffc67c] border-2 border-[#9f8e7a] font-ui-label font-bold text-sm flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer shadow"
              >
                ▼
              </button>
            </div>
          ))}
        </div>

        {/* Status / Success Message */}
        <div className="text-center">
          {isSolved ? (
            <div className="inline-flex items-center gap-2 text-sm text-[#4ade80] font-ui-label font-bold bg-[#14532d] px-4 py-2 border border-[#22c55e] animate-pulse">
              <CheckCircle2 className="w-5 h-5" />
              MẬT MÃ CHÍNH XÁC (1968)! HÒM THƯ 72 ĐÃ MỞ!
            </div>
          ) : (
            <p className="text-xs text-[#9f8e7a] font-ui-label">
              Xoay 4 vòng số đồng thau để khớp với mật mã năm kỷ niệm của ông bà.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
