import React, { useEffect, useState } from 'react';
import { Sparkles, Cloud, ShieldCheck } from 'lucide-react';

interface BootSceneProps {
  statusText: string;
  progress: number;
}

export const BootScene: React.FC<BootSceneProps> = ({ statusText, progress }) => {
  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#120705] flex flex-col items-center justify-center text-[#ffc67c]">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e0a05] via-[#140603] to-[#0a0302] pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />

      {/* Center Pixel Loading Box */}
      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Cassette / Vintage Clock Icon */}
        <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-[#d97706] rounded-full animate-ping opacity-30" />
          <div className="w-16 h-16 rounded-full bg-[#2c140c] border-2 border-[#f59e0b] flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)]">
            <span className="text-3xl animate-bounce">🕰️</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="font-viet-display text-2xl sm:text-3xl font-extrabold text-[#fef08a] tracking-wider mb-1 drop-shadow">
          HỒI ỨC SÀI GÒN
        </h2>
        <p className="font-ui-label text-xs text-[#d97706] tracking-widest uppercase mb-6">
          Saigon Memory Adventure
        </p>

        {/* Retro Progress Bar */}
        <div className="w-full bg-[#1e0e08] border-2 border-[#78350f] p-1 rounded mb-3">
          <div
            className="h-3 bg-gradient-to-r from-[#d97706] to-[#fde047] rounded-sm transition-all duration-300 shadow-[0_0_8px_#f59e0b]"
            style={{ width: `${Math.min(100, Math.max(5, progress))}%` }}
          />
        </div>

        {/* Status text */}
        <div className="flex items-center gap-2 text-xs font-ui-label text-[#fcd34d]">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span>{statusText}</span>
        </div>

        {/* Firebase Security Badge */}
        <div className="mt-8 flex items-center gap-1.5 px-3 py-1 bg-[#1a0c07]/80 border border-[#451a03] rounded text-[11px] text-[#a88267]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
          <span>Firebase Anonymous Auth & Firestore</span>
        </div>
      </div>
    </div>
  );
};
