import React, { useState, useRef, useEffect } from 'react';
import { X, Music, Volume2, Sparkles, CheckCircle2, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface GuitarTuningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSolved: () => void;
  isAlreadySolved?: boolean;
}

export const GuitarTuningModal: React.FC<GuitarTuningModalProps> = ({
  isOpen,
  onClose,
  onSolved,
  isAlreadySolved = false,
}) => {
  // Target: High E string = 329.6 Hz (E4)
  const TARGET_FREQ = 329.6;
  const [currentFreq, setCurrentFreq] = useState(isAlreadySolved ? TARGET_FREQ : 240.0);
  const [isCompleted, setIsCompleted] = useState(isAlreadySolved);
  const [isPlucking, setIsPlucking] = useState(false);
  const [pegAngle, setPegAngle] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isAlreadySolved) {
      setCurrentFreq(TARGET_FREQ);
      setIsCompleted(true);
    }
  }, [isAlreadySolved]);

  // Real-time Sine Wave Oscilloscope
  useEffect(() => {
    if (!isOpen) return;

    let time = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      // Sine Wave
      const diff = Math.abs(currentFreq - TARGET_FREQ);
      const isMatched = diff < 2.0;

      ctx.lineWidth = isMatched ? 3 : 2;
      ctx.strokeStyle = isMatched ? '#22c55e' : diff < 15 ? '#f59e0b' : '#ef4444';
      ctx.beginPath();

      const waveFreq = (currentFreq / 40) * 0.05;
      const amplitude = isPlucking ? 35 : 18;

      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * waveFreq + time) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      time += 0.12;
      animFrameRef.current = requestAnimationFrame(renderWave);
    };

    renderWave();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isOpen, currentFreq, isPlucking]);

  if (!isOpen) return null;

  const handleTuneChange = (val: number) => {
    if (isCompleted) return;
    setCurrentFreq(val);
    setPegAngle((val - 200) * 2.5);
    sound.playGuitarTuning(val);

    const diff = Math.abs(val - TARGET_FREQ);
    if (diff < 1.5) {
      setIsCompleted(true);
      sound.playPuzzleSolved();
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#38bdf8', '#fbbf24'],
      });
      setTimeout(() => {
        onSolved();
      }, 1200);
    }
  };

  const handlePluck = () => {
    setIsPlucking(true);
    sound.playGuitarPluck(currentFreq);
    setTimeout(() => setIsPlucking(false), 500);
  };

  const diff = Math.abs(currentFreq - TARGET_FREQ);
  const isMatched = diff < 2.0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#241511] border-8 border-[#524434] p-5 sm:p-6 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col text-center">
        {/* Corner Ornaments */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-[#f4a424]" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-[#f4a424]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#f4a424]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#f4a424]" />

        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 mb-3 border-b-4 border-[#3e2c28]">
          <div className="flex items-center gap-2">
            <Music className="w-6 h-6 text-[#38bdf8] animate-pulse" />
            <h2 className="font-ui-label text-base sm:text-lg text-[#ffc67c] font-bold uppercase tracking-wider">
              LÊN DÂY ĐÀN GUITAR ACOUSTIC (DÂY MI - E4)
            </h2>
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

        {/* Instructions */}
        <p className="text-xs text-[#d7c3ae] font-dialogue-text mb-3">
          ★ Xoay núm khóa đàn để căng dây số 1 tới đúng tần số <span className="text-[#38bdf8] font-bold">329.6 Hz (Nốt E4)</span> cho Hoàng!
        </p>

        {/* Oscilloscope Canvas Stage */}
        <div className="relative w-full h-36 bg-[#0f172a] border-4 border-[#334155] rounded-lg overflow-hidden shadow-inner mb-4 flex items-center justify-center">
          <canvas ref={canvasRef} width={480} height={140} className="w-full h-full" />

          {/* Target Frequency HUD */}
          <div className="absolute top-2 left-3 bg-black/70 px-2 py-1 border border-[#334155] text-[10px] text-[#94a3b8] font-mono">
            MỤC TIÊU: <span className="text-[#38bdf8] font-bold">329.6 Hz (E4)</span>
          </div>

          <div className="absolute top-2 right-3 bg-black/70 px-2 py-1 border border-[#334155] text-[10px] font-mono">
            HIỆN TẠI: <span className={`font-bold ${isMatched ? 'text-[#22c55e]' : diff < 15 ? 'text-[#f59e0b]' : 'text-[#ef4444]'}`}>
              {currentFreq.toFixed(1)} Hz
            </span>
          </div>

          {isMatched && (
            <div className="absolute bottom-2 bg-[#14532d]/90 text-[#4ade80] text-xs font-bold px-3 py-1 border border-[#22c55e] rounded animate-bounce">
              ✓ KHỚP CHUẨN CAO ĐỘ NỐT MI (E4)!
            </div>
          )}
        </div>

        {/* Tactile Tuning Controls Stage */}
        <div className="bg-[#180b07] border-4 border-[#3e2c28] p-4 mb-4 flex flex-col items-center gap-4">
          <div className="flex items-center justify-around w-full">
            {/* Guitar Headstock & Tuning Peg */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 bg-[#78350f] border-4 border-[#451a03] rounded-lg flex items-center justify-center shadow-lg">
                {/* Brass peg rotating */}
                <div
                  className="w-14 h-6 bg-[#f59e0b] border-2 border-[#78350f] rounded-full shadow-md transition-transform duration-75 flex items-center justify-center"
                  style={{ transform: `rotate(${pegAngle}deg)` }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#451a03]" />
                </div>
              </div>
              <span className="text-[10px] text-[#ffc67c] font-ui-label mt-1">Khóa Lên Dây Đàn</span>
            </div>

            {/* Pluck Guitar String Action Button */}
            <button
              onClick={handlePluck}
              className={`px-6 py-4 bg-[#d97706] hover:bg-[#f59e0b] text-black font-ui-label font-bold text-sm border-2 border-black shadow-lg flex items-center gap-2 transition-transform cursor-pointer ${
                isPlucking ? 'scale-95 bg-[#fef08a]' : 'hover:scale-105'
              }`}
            >
              <Volume2 className="w-5 h-5 animate-pulse" />
              GẢY THỬ DÂY ĐÀN
            </button>
          </div>

          {/* Tension Slider */}
          <div className="w-full px-2">
            <div className="flex justify-between text-[11px] text-[#9f8e7a] font-mono mb-1">
              <span>Trùng Dây (220 Hz)</span>
              <span className="text-[#38bdf8] font-bold">Nốt E4 (329.6 Hz)</span>
              <span>Căng Quá (420 Hz)</span>
            </div>
            <input
              type="range"
              min="220"
              max="420"
              step="0.5"
              disabled={isCompleted}
              value={currentFreq}
              onChange={(e) => handleTuneChange(parseFloat(e.target.value))}
              className="w-full accent-[#38bdf8] h-3 bg-[#334155] rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              sound.playClick();
              setCurrentFreq(240);
              setIsCompleted(false);
            }}
            className="px-4 py-2 bg-[#372621] text-[#ffedd5] font-ui-label text-xs font-bold border-2 border-[#9f8e7a] hover:bg-[#524434] transition-colors cursor-pointer"
          >
            ĐẶT LẠI
          </button>

          {isCompleted && (
            <button
              onClick={() => {
                sound.playQuestComplete();
                onSolved();
              }}
              className="px-6 py-2 bg-[#22c55e] text-[#052e16] font-ui-label text-xs sm:text-sm font-bold border-2 border-[#14532d] hover:bg-[#4ade80] transition-colors flex items-center gap-1.5 shadow-lg animate-bounce cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              GIAO ĐÀN CHO HOÀNG
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
