import React, { useState } from 'react';
import { Lock, CheckCircle2, Lightbulb, Sparkles } from 'lucide-react';
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
  const [digits, setDigits] = useState<number[]>([2, 8, 3, 4]);
  const [isSolved, setIsSolved] = useState(isAlreadySolved);
  const [showHint, setShowHint] = useState(false);
  const [shakeError, setShakeError] = useState(false);

  const TARGET_CODE = [1, 9, 6, 8];

  if (!isOpen) return null;

  const handleDigitChange = (index: number, delta: number) => {
    if (isSolved) return;
    sound.playBlip(320 + index * 40, 0.03);
    const newDigits = [...digits];
    newDigits[index] = (newDigits[index] + delta + 10) % 10;
    setDigits(newDigits);
  };

  const handleUnlockAttempt = () => {
    if (isSolved) {
      onSolved();
      return;
    }

    const isMatch = digits.every((d, i) => d === TARGET_CODE[i]);

    if (isMatch) {
      setIsSolved(true);
      sound.playPuzzleSolved();
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#fde047', '#38bdf8', '#dc2626', '#4ade80'],
      });
      setTimeout(() => {
        onSolved();
      }, 1400);
    } else {
      sound.playWrong();
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none animate-fadeIn">
      {/* Outer Wooden/Retro Frame with Pixel Shadow & Inlays */}
      <div
        className={`relative w-full max-w-[640px] bg-[#2c1c18] border-8 border-[#9f8e7a] p-5 sm:p-6 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col ${
          shakeError ? 'animate-shake' : ''
        }`}
      >
        {/* 4 Golden Corner Inlays */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#f59e0b]" />

        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 mb-4 border-b-4 border-[#524434]">
          <div className="flex items-center gap-2.5">
            <Lock className="w-6 h-6 text-[#f59e0b]" />
            <div>
              <h2 className="font-ui-label text-lg sm:text-xl text-[#ffc67c] font-bold uppercase tracking-wider">
                HÒM THƯ SỐ 72 (1968)
              </h2>
              <p className="text-xs text-[#d7c3ae] font-ui-label">
                Bưu Điện Trung Tâm Sài Gòn • Khóa Cơ Học 4 Số
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-3 py-1 bg-[#1e100c] text-[#ffb4ab] border-2 border-[#ffb4ab] hover:bg-[#ffb4ab] hover:text-[#1e100c] font-ui-label text-xs font-bold transition-colors cursor-pointer"
          >
            ĐÓNG [ESC]
          </button>
        </div>

        {/* Vintage Chassis & Dial Lock Mechanism */}
        <div className="bg-[#150e0c] border-4 border-[#524434] p-5 mb-4 rounded shadow-inner flex flex-col items-center">
          {/* Signboard plate */}
          <div className="bg-[#2c1c18] border-2 border-[#f59e0b] px-5 py-1 rounded mb-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#f59e0b]" />
            <span className="font-ui-label text-xs sm:text-sm text-[#ffc67c] font-bold tracking-widest uppercase">
              VÒNG XOAY MÃ SỐ KỶ NIỆM
            </span>
          </div>

          {/* 4 Mechanical Cylinder Tumblers */}
          <div className="grid grid-cols-4 gap-3 sm:gap-5 items-center justify-items-center w-full max-w-[420px]">
            {digits.map((digit, index) => {
              const prevDigit = (digit - 1 + 10) % 10;
              const nextDigit = (digit + 1) % 10;

              return (
                <div key={index} className="flex flex-col items-center gap-2 w-full">
                  {/* Arrow UP Button */}
                  <button
                    disabled={isSolved}
                    onClick={() => handleDigitChange(index, -1)}
                    className="w-12 h-9 sm:w-14 sm:h-10 bg-[#2c1c18] hover:bg-[#f59e0b] hover:text-[#1e100c] text-[#fde047] border-2 border-[#f59e0b] flex items-center justify-center font-ui-label font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-50"
                    title="Tăng số"
                  >
                    ▲
                  </button>

                  {/* Mechanical Tumbler Cylinder Window */}
                  <div className="w-14 sm:w-16 h-28 sm:h-32 bg-[#0a0706] border-2 border-[#524434] rounded flex flex-col justify-between items-center p-1 shadow-inner relative overflow-hidden">
                    {/* Top ghost number */}
                    <div className="w-full h-6 flex items-center justify-center opacity-40 border-b border-[#524434]/40">
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#d7c3ae] scale-y-90">
                        {prevDigit}
                      </span>
                    </div>

                    {/* Center Active Number */}
                    <div
                      className={`w-full h-12 sm:h-14 rounded flex items-center justify-center shadow-md transition-colors ${
                        isSolved
                          ? 'bg-[#14532d] border-2 border-[#86efac]'
                          : 'bg-gradient-to-b from-[#3a2215] to-[#1f1008] border border-[#f59e0b]/50'
                      }`}
                    >
                      <span
                        className={`font-mono text-3xl sm:text-4xl font-black ${
                          isSolved ? 'text-[#86efac]' : 'text-[#ffc67c]'
                        } drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}
                      >
                        {digit}
                      </span>
                    </div>

                    {/* Bottom ghost number */}
                    <div className="w-full h-6 flex items-center justify-center opacity-40 border-t border-[#524434]/40">
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#d7c3ae] scale-y-90">
                        {nextDigit}
                      </span>
                    </div>

                    {/* Left & Right Mechanical Bevel Pins */}
                    <div className="absolute left-0.5 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#f59e0b]/40 rounded-r" />
                    <div className="absolute right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#f59e0b]/40 rounded-l" />
                  </div>

                  {/* Arrow DOWN Button */}
                  <button
                    disabled={isSolved}
                    onClick={() => handleDigitChange(index, 1)}
                    className="w-12 h-9 sm:w-14 sm:h-10 bg-[#2c1c18] hover:bg-[#f59e0b] hover:text-[#1e100c] text-[#fde047] border-2 border-[#f59e0b] flex items-center justify-center font-ui-label font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-50"
                    title="Giảm số"
                  >
                    ▼
                  </button>
                </div>
              );
            })}
          </div>

          {/* Action Button */}
          <button
            onClick={handleUnlockAttempt}
            disabled={isSolved}
            className={`mt-6 px-10 py-3 rounded font-ui-label text-base sm:text-lg font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
              isSolved
                ? 'bg-[#22c55e] text-white border-4 border-[#86efac] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-default'
                : 'bg-[#f59e0b] hover:bg-[#fbbf24] text-[#1e100c] border-4 border-[#ffc67c] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer'
            }`}
          >
            {isSolved ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span>ĐÃ MỞ KHÓA THÀNH CÔNG!</span>
              </>
            ) : (
              <span>MỞ KHÓA</span>
            )}
          </button>
        </div>

        {/* Footer & Hint Section */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="font-dialogue-text text-xs sm:text-sm text-[#d7c3ae]">
              Xoay 4 con số để giải mã hòm thư và lấy bức thư tình lịch sử.
            </p>
            <button
              onClick={() => {
                sound.playClick();
                setShowHint((prev) => !prev)}
              }
              className="text-xs font-dialogue-text text-[#fde047] hover:text-white flex items-center gap-1.5 cursor-pointer underline whitespace-nowrap ml-2"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}</span>
            </button>
          </div>

          {showHint && (
            <div className="p-3 bg-[#1e100c] border border-[#f59e0b] rounded text-xs text-[#fde047] font-dialogue-text animate-fadeIn shadow-md">
              💡 <strong>Gợi ý:</strong> Dùng <em>Kính Lúp</em> soi vào <em>Sổ Tay Ký Ức</em> của ông trong túi đồ để tìm năm kỷ niệm (I-IX-VI-VIII)... (1968).
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
