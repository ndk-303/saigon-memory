import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Droplets, RefreshCw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface SugarcaneJuiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSolved: () => void;
  isAlreadySolved?: boolean;
}

export const SugarcaneJuiceModal: React.FC<SugarcaneJuiceModalProps> = ({
  isOpen,
  onClose,
  onSolved,
  isAlreadySolved = false,
}) => {
  const [crankAngle, setCrankAngle] = useState(0);
  const [juiceProgress, setJuiceProgress] = useState(isAlreadySolved ? 100 : 0);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(isAlreadySolved);
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);

  const wheelRef = useRef<HTMLDivElement | null>(null);
  const prevAngleRef = useRef<number | null>(null);

  useEffect(() => {
    if (isAlreadySolved) {
      setJuiceProgress(100);
      setIsCompleted(true);
    }
  }, [isAlreadySolved]);

  if (!isOpen) return null;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isCompleted) return;
    setIsDragging(true);
    prevAngleRef.current = null;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isCompleted || !wheelRef.current) return;

    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const currentAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

    if (prevAngleRef.current !== null) {
      let delta = currentAngle - prevAngleRef.current;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      // Only clockwise rotation yields juice
      if (delta > 0) {
        setCrankAngle((prev) => (prev + delta) % 360);
        sound.playCrankTick();

        if (Math.random() < 0.3) {
          sound.playJuiceSquirt();
          // Add foam bubble
          setBubbles((b) => [
            ...b.slice(-15),
            {
              id: Date.now() + Math.random(),
              x: 20 + Math.random() * 60,
              y: 80 - Math.min(60, (juiceProgress / 100) * 60) + Math.random() * 8,
              size: 4 + Math.random() * 6,
            },
          ]);
        }

        setJuiceProgress((prev) => {
          const next = Math.min(100, prev + delta * 0.15);
          if (next >= 100 && prev < 100) {
            setIsCompleted(true);
            sound.playPuzzleSolved();
            confetti({
              particleCount: 80,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#a1d494', '#facc15', '#38bdf8', '#fbbf24'],
            });
            setTimeout(() => {
              onSolved();
            }, 1200);
          }
          return next;
        });
      }
    }

    prevAngleRef.current = currentAngle;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    prevAngleRef.current = null;
  };

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
            <Droplets className="w-6 h-6 text-[#a1d494] animate-bounce" />
            <h2 className="font-ui-label text-base sm:text-lg text-[#ffc67c] font-bold uppercase tracking-wider">
              XE NƯỚC MÍA CHỢ BẾN THÀNH
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-[#9f8e7a] hover:text-[#ffb4ab] p-1 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Instructions */}
        <p className="text-xs text-[#d7c3ae] font-dialogue-text mb-4">
          ★ Dùng chuột hoặc ngón tay <span className="text-[#facc15] font-bold">KÉO XOAY BÁNH ĐÀ</span> theo chiều kim đồng hồ để nghiền mía và làm đầy ly nước mía tắc mát lạnh!
        </p>

        {/* Main Interactive Stage */}
        <div className="relative w-full h-72 sm:h-80 bg-[#160a07] border-4 border-[#3e2c28] p-4 flex items-center justify-around overflow-hidden shadow-inner mb-4">
          {/* Left: Mechanical Flywheel & Rollers */}
          <div className="flex flex-col items-center">
            {/* Flywheel Container */}
            <div
              ref={wheelRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#372621] border-4 border-[#854d0e] shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
            >
              {/* Flywheel Spokes & Rim */}
              <div
                className="w-full h-full rounded-full border-4 border-dashed border-[#f59e0b] relative flex items-center justify-center transition-transform duration-75"
                style={{ transform: `rotate(${crankAngle}deg)` }}
              >
                {/* 4 Iron Spokes */}
                <div className="absolute w-full h-1.5 bg-[#524434]" />
                <div className="absolute w-1.5 h-full bg-[#524434]" />
                <div className="absolute w-full h-1.5 bg-[#524434] rotate-45" />
                <div className="absolute w-full h-1.5 bg-[#524434] -rotate-45" />

                {/* Center Hub */}
                <div className="w-8 h-8 rounded-full bg-[#78350f] border-2 border-[#fef08a] shadow-md z-10" />

                {/* Crank Handle knob */}
                <div
                  className="absolute top-2 w-7 h-7 rounded-full bg-[#ef4444] border-2 border-white shadow-lg flex items-center justify-center font-bold text-[10px] text-white animate-pulse"
                >
                  ↻
                </div>
              </div>
            </div>

            <span className="text-[11px] text-[#ffc67c] font-ui-label mt-2 font-bold flex items-center gap-1">
              <RefreshCw className={`w-3 h-3 ${isDragging ? 'animate-spin' : ''}`} />
              Bánh Đà
            </span>
          </div>

          {/* Center: Sugarcane Stalk & Grinding Rollers */}
          <div className="flex flex-col items-center justify-center gap-2">
            {/* Sugarcane stalk entering */}
            <div className="w-6 h-28 bg-[#84cc16] border-2 border-[#3f6212] rounded-t relative overflow-hidden shadow">
              <div className="absolute top-6 w-full h-1 bg-[#4d7c0f]" />
              <div className="absolute top-14 w-full h-1 bg-[#4d7c0f]" />
              <div className="absolute top-22 w-full h-1 bg-[#4d7c0f]" />
              {/* Cane level going down */}
              <div
                className="w-full bg-[#180b07] transition-all"
                style={{ height: `${Math.min(100, juiceProgress)}%` }}
              />
            </div>

            {/* Twin Grinding Gears */}
            <div className="flex gap-1">
              <div
                className="w-8 h-8 rounded-full border-2 border-[#94a3b8] bg-[#475569] flex items-center justify-center text-[8px] text-white"
                style={{ transform: `rotate(${crankAngle * 2}deg)` }}
              >
                ⚙
              </div>
              <div
                className="w-8 h-8 rounded-full border-2 border-[#94a3b8] bg-[#475569] flex items-center justify-center text-[8px] text-white"
                style={{ transform: `rotate(${-crankAngle * 2}deg)` }}
              >
                ⚙
              </div>
            </div>

            {/* Juice Flowing Stream */}
            <div
              className={`w-2 h-10 bg-[#bef264] rounded-full transition-opacity ${
                isDragging ? 'opacity-100 animate-pulse' : 'opacity-20'
              }`}
            />
          </div>

          {/* Right: Glass Cup Filling Up */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-40 sm:w-28 sm:h-44 bg-[#0f172a]/80 border-4 border-[#94a3b8] rounded-b-xl overflow-hidden shadow-2xl flex flex-col justify-end p-1">
              {/* Faceted glass vertical lines */}
              <div className="absolute inset-0 flex justify-between px-2 pointer-events-none opacity-30">
                <div className="w-0.5 h-full bg-white" />
                <div className="w-0.5 h-full bg-white" />
                <div className="w-0.5 h-full bg-white" />
              </div>

              {/* Sugarcane juice liquid with foam */}
              <div
                className="w-full bg-gradient-to-t from-[#84cc16] via-[#a3e635] to-[#d9f99d] transition-all duration-100 relative rounded-b-lg"
                style={{ height: `${Math.min(100, juiceProgress)}%` }}
              >
                {/* Frothy top layer */}
                <div className="w-full h-3 bg-[#fef08a]/90 rounded-full border-b border-[#a3e635] animate-pulse" />

                {/* Ice cubes floating */}
                {juiceProgress > 30 && (
                  <div className="absolute top-2 left-3 w-4 h-4 bg-white/70 border border-[#86efac] rounded rotate-12" />
                )}
                {juiceProgress > 60 && (
                  <div className="absolute top-4 right-3 w-5 h-5 bg-white/70 border border-[#86efac] rounded -rotate-12" />
                )}

                {/* Calamansi / Tắc slice */}
                {juiceProgress > 80 && (
                  <div className="absolute top-1 left-7 w-6 h-6 rounded-full bg-[#eab308] border-2 border-[#ca8a04] flex items-center justify-center text-[7px] font-bold text-[#713f12]">
                    TẮC
                  </div>
                )}

                {/* Bubbles */}
                {bubbles.map((b) => (
                  <div
                    key={b.id}
                    className="absolute bg-white/80 rounded-full animate-ping pointer-events-none"
                    style={{
                      left: `${b.x}%`,
                      bottom: `${b.y}%`,
                      width: `${b.size}px`,
                      height: `${b.size}px`,
                    }}
                  />
                ))}
              </div>

              {/* Blue Retro Straw */}
              <div className="absolute top-0 right-4 w-2 h-28 bg-[#38bdf8] border border-[#0284c7] -rotate-12 pointer-events-none" />
            </div>

            <div className="mt-2 text-xs font-bold text-[#a1d494]">
              {Math.round(juiceProgress)}% Đầy Ly
            </div>
          </div>
        </div>

        {/* Progress Bar & Status */}
        <div className="w-full bg-[#180b07] border-2 border-[#524434] h-6 p-0.5 mb-3 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#eab308] to-[#22c55e] transition-all duration-150"
            style={{ width: `${juiceProgress}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-white uppercase drop-shadow">
            {isCompleted ? '✓ Ly Nước Mía Đã Hoàn Thành!' : `Đang Ép Mía: ${Math.round(juiceProgress)}%`}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              sound.playClick();
              setJuiceProgress(0);
              setIsCompleted(false);
            }}
            className="px-4 py-2 bg-[#372621] text-[#ffedd5] font-ui-label text-xs font-bold border-2 border-[#9f8e7a] hover:bg-[#524434] transition-colors cursor-pointer"
          >
            ÉP LẠI LY MỚI
          </button>

          {isCompleted && (
            <button
              onClick={() => {
                sound.playQuestComplete();
                onSolved();
              }}
              className="px-6 py-2 bg-[#22c55e] text-[#052e16] font-ui-label text-xs sm:text-sm font-bold border-2 border-[#14532d] hover:bg-[#4ade80] transition-colors flex items-center gap-1.5 shadow-lg animate-bounce cursor-pointer"
            >
              <Award className="w-4 h-4" />
              MANG BIẾU BÁC BẢO VỆ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
