import React, { useState, useRef, useEffect } from 'react';
import { Radio, Volume2, Sparkles, CheckCircle2, Music, Lightbulb, RotateCcw } from 'lucide-react';
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
  const [frequency, setFrequency] = useState<number>(isAlreadySolved ? 99.9 : 89.2);
  const [isSolved, setIsSolved] = useState(isAlreadySolved);
  const [showHint, setShowHint] = useState(false);
  const [isDraggingKnob, setIsDraggingKnob] = useState(false);
  const knobRef = useRef<HTMLDivElement | null>(null);
  const lastMouseX = useRef<number>(0);

  const TARGET_FREQ = 99.9;
  const MIN_FREQ = 88.0;
  const MAX_FREQ = 108.0;

  useEffect(() => {
    if (isAlreadySolved) {
      setFrequency(TARGET_FREQ);
      setIsSolved(true);
    }
  }, [isAlreadySolved]);

  if (!isOpen) return null;

  const handleTune = (newFreqVal: number) => {
    if (isSolved) return;
    const clamped = Math.max(MIN_FREQ, Math.min(MAX_FREQ, Math.round(newFreqVal * 10) / 10));
    setFrequency(clamped);

    const diff = Math.abs(clamped - TARGET_FREQ);
    if (diff < 0.1) {
      setIsSolved(true);
      sound.playQuestComplete();
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#4ade80', '#f59e0b', '#38bdf8', '#f43f5e'],
      });
      setTimeout(() => {
        onSolved();
      }, 1600);
    } else if (diff < 0.4) {
      sound.playBlip(540, 0.04);
    } else if (diff < 1.2) {
      sound.playBlip(360, 0.03);
    } else {
      sound.playDialogueType();
    }
  };

  const handleDelta = (delta: number) => {
    handleTune(frequency + delta);
  };

  // Drag-to-rotate interaction for the large vintage tuning knob
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isSolved) return;
    setIsDraggingKnob(true);
    lastMouseX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingKnob || isSolved) return;
    const deltaX = e.clientX - lastMouseX.current;
    if (Math.abs(deltaX) > 2) {
      const step = (deltaX / 10) * 0.1;
      handleTune(frequency + step);
      lastMouseX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    setIsDraggingKnob(false);
  };

  const diff = Math.abs(frequency - TARGET_FREQ);
  const needlePercent = ((frequency - MIN_FREQ) / (MAX_FREQ - MIN_FREQ)) * 100;
  const signalStrengthPercent = Math.max(8, Math.min(100, (1 - Math.min(diff, 6) / 6) * 100));
  const knobRotation = ((frequency - MIN_FREQ) / (MAX_FREQ - MIN_FREQ)) * 360 * 2.5;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md select-none animate-fadeIn"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Main Vintage Modal Frame */}
      <div className="relative w-full max-w-[760px] bg-[#22130c] border-8 border-[#9f8e7a] p-4 sm:p-6 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col">
        {/* Corner Inlays */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#f59e0b]" />

        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 mb-3 border-b-4 border-[#4a3224]">
          <div className="flex items-center gap-2.5">
            <Radio className="w-6 h-6 text-[#f59e0b] animate-pulse" />
            <div>
              <h2 className="font-ui-label text-base sm:text-xl text-[#ffc67c] font-bold uppercase tracking-wider">
                ĐÀI RADIO CỔ NATIONAL (1985)
              </h2>
              <p className="text-xs text-[#d7c3ae] font-ui-label">
                Chung Cư 14 Tôn Thất Đạm • Sóng FM Sài Gòn
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

        {/* FULL BESPOKE SVG & RETRO CHASSIS FOR THE WOODEN RADIO */}
        <div className="relative w-full bg-gradient-to-b from-[#3b2012] via-[#2a160d] to-[#1a0c06] border-4 border-[#613d1e] rounded-lg p-4 sm:p-6 shadow-inner flex flex-col gap-4">
          
          {/* Telescopic Antenna & Wave Sparks */}
          <div className="absolute -top-6 left-12 flex items-end">
            <div className="w-2.5 h-10 bg-gradient-to-r from-[#cbd5e1] via-[#94a3b8] to-[#64748b] rounded-t-sm border border-[#334155] relative shadow-md">
              <div className="w-4 h-4 rounded-full bg-[#dc2626] border-2 border-[#fef08a] absolute -top-3.5 -left-[3px] shadow-[0_0_8px_#ef4444]" />
              {diff < 0.2 && (
                <div className="absolute -top-8 -left-6 flex gap-1 animate-ping">
                  <Sparkles className="w-6 h-6 text-[#fde047]" />
                </div>
              )}
            </div>
          </div>

          {/* Top Speaker Grille & Status Display Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* Vintage Woven Cloth Speaker Grill (SVG Pattern) */}
            <div className="md:col-span-5 h-28 sm:h-32 bg-[#1e120b] border-2 border-[#54361c] rounded p-2 flex flex-col justify-between relative overflow-hidden shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)]">
              <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="radioClothPattern" width="8" height="8" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="8" y2="8" stroke="#d4af37" strokeWidth="1" />
                    <line x1="8" y1="0" x2="0" y2="8" stroke="#78350f" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#radioClothPattern)" />
              </svg>

              {/* Speaker Membrane Vibration Indicator */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#3b2313] bg-[#120a06] flex items-center justify-center transition-all ${
                    diff < 0.1
                      ? 'scale-105 border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                      : diff < 0.5
                      ? 'scale-100 border-[#f59e0b]'
                      : 'scale-95'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#2a170d] border border-[#f59e0b]/30 flex items-center justify-center">
                    <Volume2
                      className={`w-4 h-4 ${
                        diff < 0.1 ? 'text-[#4ade80] animate-bounce' : 'text-[#9f8e7a]'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Brass Brand Badge */}
              <div className="relative z-10 self-center bg-gradient-to-r from-[#b45309] via-[#f59e0b] to-[#b45309] text-[#1e100c] px-2 py-0.5 rounded text-[10px] font-ui-label font-black tracking-widest uppercase border border-[#fef08a] shadow-sm">
                NATIONAL • MODEL 1985
              </div>
            </div>

            {/* Signal VU Meter & Tuning Status */}
            <div className="md:col-span-7 h-28 sm:h-32 bg-[#120a06] border-2 border-[#54361c] rounded p-2.5 sm:p-3 flex flex-col justify-between shadow-inner">
              <div className="flex justify-between items-center border-b border-[#3b2313] pb-1.5">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-2.5 h-2.5 rounded-full border ${
                      diff < 0.1
                        ? 'bg-[#22c55e] border-[#86efac] shadow-[0_0_8px_#22c55e] animate-pulse'
                        : diff < 0.4
                        ? 'bg-[#f59e0b] border-[#fde047]'
                        : 'bg-[#7f1d1d] border-[#ef4444]'
                    }`}
                  />
                  <span className="font-ui-label text-[11px] text-[#ffc67c] font-bold">
                    {diff < 0.1 ? 'STEREO TUNED' : diff < 0.4 ? 'WEAK SIGNAL' : 'SEARCHING...'}
                  </span>
                </div>
                <span className="font-mono text-xs text-[#86efac] font-bold">
                  BĂNG TẦN FM 88-108 MHz
                </span>
              </div>

              {/* Analog VU Meter / Signal Needle SVG */}
              <div className="flex items-center gap-2 my-1">
                <span className="text-[10px] font-ui-label text-[#d7c3ae] w-12">TÍN HIỆU:</span>
                <div className="flex-1 h-4 bg-[#0a0705] border border-[#3b2313] rounded-sm overflow-hidden relative">
                  {/* Gauge colored gradient zones */}
                  <div className="absolute inset-0 flex">
                    <div className="w-1/3 h-full bg-red-950/60" />
                    <div className="w-1/3 h-full bg-amber-950/60" />
                    <div className="w-1/3 h-full bg-emerald-950/60" />
                  </div>
                  {/* Active bar */}
                  <div
                    className={`h-full transition-all duration-150 ${
                      diff < 0.1 ? 'bg-[#22c55e]' : diff < 0.4 ? 'bg-[#f59e0b]' : 'bg-[#dc2626]'
                    }`}
                    style={{ width: `${signalStrengthPercent}%` }}
                  />
                  {/* Calibration ticks */}
                  <div className="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-40">
                    <div className="w-px h-full bg-white" />
                    <div className="w-px h-full bg-white" />
                    <div className="w-px h-full bg-white" />
                    <div className="w-px h-full bg-white" />
                    <div className="w-px h-full bg-white" />
                  </div>
                </div>
                <span className="font-mono text-xs text-[#ffc67c] font-bold w-10 text-right">
                  {Math.round(signalStrengthPercent)}%
                </span>
              </div>

              {/* Audio broadcast feedback snippet */}
              <div className="bg-[#1c100b] px-2 py-1 rounded border border-[#3b2313] flex items-center gap-1.5 overflow-hidden">
                <Music className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
                <p className="font-dialogue-text text-[11px] text-[#fde047] truncate">
                  {diff < 0.1
                    ? '♫ "Sài Gòn đẹp lắm, Sài Gòn ơi..." (Đài Tiếng Nói Nhân Dân 99.9 MHz)'
                    : diff < 0.5
                    ? '...tiếng đàn mandolin ấm áp hòa lẫn âm thanh rè rè...'
                    : '[ Rè rè... Xoẹt xoẹt... Tiếng nhiễu sóng vô tuyến... ]'}
                </p>
              </div>
            </div>
          </div>

          {/* MAIN ILLUMINATED TUNING GLASS SCALE (Kính Thước Dò Sóng) */}
          <div className="w-full bg-[#0a1612] border-4 border-[#2c1d14] rounded-lg p-3 sm:p-4 shadow-[inset_0_4px_20px_rgba(0,0,0,0.9)] relative overflow-hidden">
            {/* Amber glowing glass background reflection */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                diff < 0.1
                  ? 'bg-gradient-to-b from-[#22c55e]/15 via-[#16a34a]/10 to-transparent opacity-100'
                  : 'bg-gradient-to-b from-[#f59e0b]/10 via-[#d97706]/5 to-transparent opacity-70'
              }`}
            />

            {/* Frequency scale markings header */}
            <div className="flex justify-between items-center text-[11px] sm:text-xs font-mono font-bold text-[#86efac] mb-1 px-1 relative z-10">
              <span className="text-[#38bdf8]">FM</span>
              <span>88</span>
              <span>92</span>
              <span>96</span>
              <span className="text-[#fde047] font-black scale-110 underline decoration-[#f59e0b] decoration-2">
                ★ 99.9
              </span>
              <span>104</span>
              <span>108</span>
              <span className="text-[#38bdf8]">MHz</span>
            </div>

            {/* Glass Scale Ruler with Tick Marks (SVG) */}
            <div className="relative w-full h-10 bg-[#051c14] border-2 border-[#166534] rounded shadow-inner my-1.5 overflow-hidden">
              {/* Detailed Ruler Ticks */}
              <svg className="w-full h-full absolute inset-0 pointer-events-none" preserveAspectRatio="none">
                {Array.from({ length: 41 }).map((_, i) => {
                  const xPct = (i / 40) * 100;
                  const isMajor = i % 4 === 0;
                  return (
                    <line
                      key={i}
                      x1={`${xPct}%`}
                      y1={isMajor ? '0%' : '35%'}
                      x2={`${xPct}%`}
                      y2={isMajor ? '100%' : '65%'}
                      stroke={isMajor ? '#4ade80' : '#15803d'}
                      strokeWidth={isMajor ? '1.5' : '1'}
                    />
                  );
                })}
              </svg>

              {/* Special Target Marker at 99.9 MHz */}
              <div
                className="absolute top-0 bottom-0 w-3 bg-[#f59e0b]/30 border-x border-[#fde047]/60 pointer-events-none"
                style={{
                  left: `${((TARGET_FREQ - MIN_FREQ) / (MAX_FREQ - MIN_FREQ)) * 100}%`,
                  transform: 'translateX(-50%)',
                }}
              />

              {/* RED MECHANICAL NEEDLE (Kim chỉ sóng cơ học di chuyển mượt mà) */}
              <div
                className="absolute top-0 bottom-0 w-1.5 bg-[#ef4444] shadow-[0_0_10px_#ef4444] transition-all duration-100 flex flex-col justify-between items-center pointer-events-none z-20"
                style={{
                  left: `${needlePercent}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <div className="w-2.5 h-1.5 bg-[#fca5a5] rounded-t" />
                <div className="w-0.5 h-full bg-[#b91c1c]" />
                <div className="w-2.5 h-1.5 bg-[#fca5a5] rounded-b" />
              </div>
            </div>

            {/* Digital Readout & City Station Marker */}
            <div className="flex justify-between items-center mt-2 px-1 relative z-10">
              <span className="font-ui-label text-[10px] sm:text-xs text-[#d7c3ae]">
                ĐÀI TIẾNG NÓI NHÂN DÂN SÀI GÒN - TP.HCM
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-2xl sm:text-3xl font-black text-[#4ade80] drop-shadow-[0_0_8px_rgba(74,222,128,0.7)]">
                  {frequency.toFixed(1)}
                </span>
                <span className="font-ui-label text-xs text-[#86efac] font-bold">MHz</span>
              </div>
            </div>
          </div>

          {/* ROTARY CONTROLS & STEPPING BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t-2 border-[#4a3224]">
            
            {/* Fine-Tuning Step Buttons (Nút bước sóng) */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center">
              <button
                disabled={isSolved}
                onClick={() => handleDelta(-0.5)}
                className="px-2.5 py-2 bg-[#2c1c18] hover:bg-[#f59e0b] hover:text-[#1e100c] text-[#ffc67c] border-2 border-[#9f8e7a] font-ui-label text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-40"
                title="Giảm 0.5 MHz"
              >
                ◄ -0.5
              </button>
              <button
                disabled={isSolved}
                onClick={() => handleDelta(-0.1)}
                className="px-3 py-2 bg-[#2c1c18] hover:bg-[#f59e0b] hover:text-[#1e100c] text-[#ffc67c] border-2 border-[#9f8e7a] font-ui-label text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-40"
                title="Giảm 0.1 MHz"
              >
                ◄ -0.1
              </button>
            </div>

            {/* LARGE INTERACTIVE ROTARY DIAL KNOB (Núm vặn xoay đài cơ học lớn) */}
            <div className="flex flex-col items-center">
              <div
                ref={knobRef}
                onMouseDown={handleMouseDown}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#475569] via-[#1e293b] to-[#0f172a] border-4 border-[#020617] flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.8)] relative cursor-grab active:cursor-grabbing transition-transform ${
                  isDraggingKnob ? 'scale-105' : 'hover:scale-102'
                }`}
                title="Kéo chuột hoặc nhấn nút để xoay núm dò đài"
              >
                {/* Outer Bevel Knurling Ribs */}
                <div className="absolute inset-1 rounded-full border-2 border-dashed border-[#94a3b8]/40 pointer-events-none" />

                {/* Rotating Marker Notch */}
                <div
                  className="absolute inset-0 flex justify-center items-start pointer-events-none"
                  style={{
                    transform: `rotate(${knobRotation}deg)`,
                  }}
                >
                  <div className="w-2 h-4 bg-[#f59e0b] rounded-full mt-1.5 shadow-[0_0_6px_#f59e0b]" />
                </div>

                {/* Center Core Cap */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-b from-[#1e293b] to-[#090d16] border-2 border-[#64748b] flex items-center justify-center shadow-inner pointer-events-none">
                  <RotateCcw className="w-4 h-4 text-[#94a3b8] opacity-60" />
                </div>
              </div>
              <span className="font-ui-label text-[10px] text-[#ffc67c] mt-1.5 font-bold uppercase tracking-wider">
                NÚM XOAY TẦN SỐ (TUNING)
              </span>
            </div>

            {/* Forward Fine-Tuning Step Buttons */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center">
              <button
                disabled={isSolved}
                onClick={() => handleDelta(0.1)}
                className="px-3 py-2 bg-[#2c1c18] hover:bg-[#f59e0b] hover:text-[#1e100c] text-[#ffc67c] border-2 border-[#9f8e7a] font-ui-label text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-40"
                title="Tăng 0.1 MHz"
              >
                +0.1 ►
              </button>
              <button
                disabled={isSolved}
                onClick={() => handleDelta(0.5)}
                className="px-2.5 py-2 bg-[#2c1c18] hover:bg-[#f59e0b] hover:text-[#1e100c] text-[#ffc67c] border-2 border-[#9f8e7a] font-ui-label text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-40"
                title="Tăng 0.5 MHz"
              >
                +0.5 ►
              </button>
            </div>
          </div>

          {/* Solved Banner State */}
          {isSolved && (
            <div className="w-full bg-[#14532d] border-2 border-[#86efac] p-2.5 rounded flex items-center justify-center gap-2 shadow-lg animate-bounce">
              <CheckCircle2 className="w-5 h-5 text-[#86efac]" />
              <span className="font-ui-label text-xs sm:text-sm text-white font-bold uppercase tracking-wider">
                ĐÃ BẮT TRÚNG LÀN SÓNG 99.9 MHz CỦA ĐÀI PHÁT THANH SÀI GÒN!
              </span>
            </div>
          )}
        </div>

        {/* Footer & Hint */}
        <div className="flex flex-col gap-1.5 mt-3">
          <div className="flex justify-between items-center">
            <p className="font-dialogue-text text-xs text-[#d7c3ae]">
              Dò kim sóng về đúng tần số phát thanh quen thuộc của người Sài Gòn.
            </p>
            <button
              onClick={() => {
                sound.playClick();
                setShowHint((prev) => !prev);
              }}
              className="text-xs font-dialogue-text text-[#fde047] hover:text-white flex items-center gap-1 cursor-pointer underline whitespace-nowrap ml-2"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}</span>
            </button>
          </div>

          {showHint && (
            <div className="p-2.5 bg-[#1e100c] border border-[#f59e0b] rounded text-xs text-[#fde047] font-dialogue-text animate-fadeIn shadow-md">
              💡 <strong>Gợi ý:</strong> Kênh phát thanh quen thuộc nhất của Đài Tiếng Nói Nhân Dân TP.HCM (VOH) từ xưa đến nay phát trên sóng <strong>99.9 MHz</strong>!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
