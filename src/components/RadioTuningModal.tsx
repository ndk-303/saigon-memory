import React, { useState } from 'react';
import { Radio, Volume2, Sparkles, CheckCircle2, Music } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface RadioTuningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSolved: () => void;
  isAlreadySolved?: boolean;
}

export const RadioTuningModal: React.FC<RadioTuningModalProps> = ({
  isOpen,
  onClose,
  onSolved,
  isAlreadySolved = false,
}) => {
  const [frequency, setFrequency] = useState<number>(isAlreadySolved ? 99.9 : 91.5);
  const [band, setBand] = useState<'FM' | 'AM'>('FM');
  const [isSolved, setIsSolved] = useState(isAlreadySolved);
  const TARGET_FREQ = 99.9;

  if (!isOpen) return null;

  const handleTune = (delta: number) => {
    if (isSolved) return;
    const newFreq = Math.round((frequency + delta) * 10) / 10;
    if (newFreq < 88.0 || newFreq > 108.0) return;

    setFrequency(newFreq);

    // Audio static feedback
    const diff = Math.abs(newFreq - TARGET_FREQ);
    if (diff < 0.1) {
      // Exactly 99.9
      setIsSolved(true);
      sound.playQuestComplete();
      confetti({
        particleCount: 70,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#34d399', '#f59e0b', '#ec4899', '#60a5fa'],
      });
      setTimeout(() => {
        onSolved();
      }, 1600);
    } else if (diff < 0.5) {
      sound.playBlip(520, 0.04);
    } else {
      sound.playDialogueType();
    }
  };

  const diff = Math.abs(frequency - TARGET_FREQ);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-[640px] bg-[#2c1c18] border-8 border-[#9f8e7a] p-6 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col">
        {/* Wooden Corner inlays */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#f59e0b]" />

        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 mb-4 border-b-4 border-[#524434]">
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-[#f59e0b]" />
            <div>
              <h2 className="font-ui-label text-lg sm:text-xl text-[#ffc67c] font-bold uppercase tracking-wider">
                ĐÀI RADIO PHÁT THANH SÀI GÒN
              </h2>
              <p className="text-xs text-[#d7c3ae] font-ui-label">
                Chung Cư 14 Tôn Thất Đạm (Thập niên 70)
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

        {/* Vintage Radio Chassis & Glow Scale */}
        <div className="bg-[#150e0c] border-4 border-[#524434] p-5 mb-4 rounded shadow-inner flex flex-col items-center">
          {/* Dial Scale Glass Window */}
          <div className="w-full bg-[#0a1914] border-2 border-[#334155] p-3 rounded mb-4 relative overflow-hidden">
            {/* Frequency scale markings */}
            <div className="flex justify-between text-[11px] text-[#4ade80] font-ui-label mb-1">
              <span>88</span>
              <span>92</span>
              <span>96</span>
              <span className="text-[#facc15] font-bold">99.9</span>
              <span>104</span>
              <span>108 MHz</span>
            </div>

            {/* Scale Line and Red Indicator Needle */}
            <div className="relative w-full h-4 bg-[#052e16] border border-[#166534] rounded">
              <div
                className="absolute top-0 bottom-0 w-1 bg-[#ef4444] shadow-[0_0_8px_#ef4444] transition-all duration-150"
                style={{
                  left: `${((frequency - 88) / (108 - 88)) * 100}%`,
                }}
              />
            </div>

            {/* Neon Frequency Digital Readout */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#166534] text-[#86efac] font-ui-label text-xs font-bold rounded">
                  FM STEREO
                </span>
                {diff < 0.2 && (
                  <span className="flex items-center gap-1 text-xs text-[#facc15] font-bold animate-pulse">
                    <Music className="w-3.5 h-3.5" />
                    ĐÃ BẮT ĐƯỢC SÓNG!
                  </span>
                )}
              </div>
              <span className="text-2xl sm:text-3xl font-mono text-[#4ade80] font-black tracking-widest text-shadow">
                {frequency.toFixed(1)} <span className="text-sm">MHz</span>
              </span>
            </div>
          </div>

          {/* Sound wave visualizer / Audio channel state */}
          <div className="w-full bg-[#1e100c] border border-[#524434] p-3 text-center mb-2">
            {diff < 0.1 ? (
              <p className="font-dialogue-text text-sm text-[#4ade80] italic leading-relaxed">
                ♫ "Sài Gòn đẹp lắm, Sài Gòn ơi, Sài Gòn ơi..." ♫
                <br />
                <span className="text-xs text-[#fde047]">
                  (Giọng hát ấm áp của ông Sáu cất lên trong trẻo trên làn sóng 99.9 MHz!)
                </span>
              </p>
            ) : diff < 0.8 ? (
              <p className="font-dialogue-text text-xs text-[#facc15] italic">
                [ Tín hiệu rè rè... Thoang thoảng tiếng đàn mandolin... ]
              </p>
            ) : (
              <p className="font-dialogue-text text-xs text-[#94a3b8] italic">
                [ Rè rè xoẹt xoẹt... Tiếng nhiễu sóng vô tuyến trắng... ]
              </p>
            )}
          </div>

          {/* Tuning Knob Controls */}
          <div className="flex items-center justify-center gap-4 mt-2">
            <button
              disabled={isSolved}
              onClick={() => handleTune(-0.5)}
              className="px-3 py-2 bg-[#372621] hover:bg-[#f59e0b] hover:text-[#1e100c] text-[#ffc67c] border-2 border-[#9f8e7a] font-ui-label text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              ◄ -0.5 MHz
            </button>
            <button
              disabled={isSolved}
              onClick={() => handleTune(-0.1)}
              className="px-3 py-2 bg-[#372621] hover:bg-[#f59e0b] hover:text-[#1e100c] text-[#ffc67c] border-2 border-[#9f8e7a] font-ui-label text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              ◄ -0.1
            </button>

            {/* Giant Rotary Knob Representation */}
            <div className="w-16 h-16 rounded-full bg-[#334155] border-4 border-[#0f172a] flex items-center justify-center shadow-lg relative">
              <div
                className="w-1.5 h-6 bg-[#f59e0b] rounded-full absolute top-1"
                style={{
                  transformOrigin: '50% 28px',
                  transform: `rotate(${((frequency - 88) / 20) * 270 - 135}deg)`,
                }}
              />
              <div className="w-6 h-6 rounded-full bg-[#1e293b]" />
            </div>

            <button
              disabled={isSolved}
              onClick={() => handleTune(0.1)}
              className="px-3 py-2 bg-[#372621] hover:bg-[#f59e0b] hover:text-[#1e100c] text-[#ffc67c] border-2 border-[#9f8e7a] font-ui-label text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              +0.1 ►
            </button>
            <button
              disabled={isSolved}
              onClick={() => handleTune(0.5)}
              className="px-3 py-2 bg-[#372621] hover:bg-[#f59e0b] hover:text-[#1e100c] text-[#ffc67c] border-2 border-[#9f8e7a] font-ui-label text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              +0.5 MHz ►
            </button>
          </div>
        </div>

        {/* Result notification */}
        <div className="text-center">
          {isSolved ? (
            <div className="inline-flex items-center gap-2 text-sm text-[#4ade80] font-ui-label font-bold bg-[#14532d] px-4 py-2 border border-[#22c55e] animate-pulse">
              <CheckCircle2 className="w-5 h-5" />
              ĐÃ DÒ ĐÚNG 99.9 MHz! KHAY BĂNG NHẢ RA CHÌA KHÓA "NHÀ"!
            </div>
          ) : (
            <p className="text-xs text-[#9f8e7a] font-ui-label">
              Mẹo: Tần số Đài Tiếng nói Nhân dân TP.HCM phát thanh là 99.9 MHz.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
