import React from 'react';

export const PixelDusterIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    {/* Wooden handle */}
    <rect x="22" y="22" width="6" height="6" fill="#8B4513" stroke="#3e2c28" strokeWidth="1" />
    <rect x="20" y="20" width="4" height="4" fill="#a0522d" />
    <rect x="18" y="18" width="4" height="4" fill="#cd853f" />
    {/* Feather plumes */}
    <polygon points="6,6 16,4 20,12 14,18 4,14" fill="#b8860b" stroke="#3e2c28" strokeWidth="1" />
    <polygon points="4,10 12,6 18,14 10,20 2,16" fill="#d2b48c" />
    <polygon points="8,8 14,8 16,14 10,16 6,12" fill="#daa520" />
    <rect x="16" y="16" width="4" height="4" fill="#8b0000" />
  </svg>
);

export const PixelCoinIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    {/* Outer bronze coin circle */}
    <circle cx="16" cy="16" r="13" fill="#b8860b" stroke="#372621" strokeWidth="2" />
    <circle cx="16" cy="16" r="10" fill="#daa520" stroke="#845400" strokeWidth="1" />
    {/* Center square hole (Đồng tiền cổ có lỗ vuông) */}
    <rect x="12" y="12" width="8" height="8" fill="#180b07" stroke="#372621" strokeWidth="1.5" />
    {/* 4 character notches */}
    <rect x="15" y="5" width="2" height="3" fill="#633e00" />
    <rect x="15" y="24" width="2" height="3" fill="#633e00" />
    <rect x="5" y="15" width="3" height="2" fill="#633e00" />
    <rect x="24" y="15" width="3" height="2" fill="#633e00" />
  </svg>
);

export const PixelSugarcaneJuiceIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    {/* Blue straw poking out */}
    <polyline points="20,4 22,2 26,2 24,10 20,14" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="square" />
    {/* Glass cup */}
    <polygon points="8,8 24,8 21,28 11,28" fill="#90c283" stroke="#2c1c18" strokeWidth="2" />
    <polygon points="9,10 23,10 20,27 12,27" fill="#a1d494" />
    {/* Cane juice liquid level & foam */}
    <rect x="10" y="10" width="12" height="4" fill="#d9f99d" />
    {/* Ice cubes */}
    <rect x="12" y="15" width="4" height="4" fill="#ffffff" opacity="0.6" stroke="#4ade80" strokeWidth="0.5" />
    <rect x="16" y="19" width="4" height="4" fill="#ffffff" opacity="0.6" stroke="#4ade80" strokeWidth="0.5" />
    <line x1="8" y1="8" x2="24" y2="8" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
  </svg>
);

export const PixelPliersIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    {/* Crossed plier handles in bright orange/red */}
    <line x1="8" y1="26" x2="16" y2="14" stroke="#f97316" strokeWidth="4" strokeLinecap="square" />
    <line x1="24" y1="26" x2="16" y2="14" stroke="#f97316" strokeWidth="4" strokeLinecap="square" />
    {/* Metal joint */}
    <rect x="14" y="12" width="4" height="4" fill="#64748b" stroke="#1e100c" strokeWidth="1" />
    {/* Metal jaws */}
    <polyline points="12,6 14,12 18,12 20,6" fill="#94a3b8" stroke="#1e100c" strokeWidth="1.5" />
    <line x1="14" y1="8" x2="18" y2="8" stroke="#cbd5e1" strokeWidth="2" />
  </svg>
);

export const PixelNotebookIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    {/* Notebook cover */}
    <rect x="6" y="5" width="20" height="22" fill="#d7c3ae" stroke="#372621" strokeWidth="2" />
    {/* Binding spine */}
    <rect x="4" y="5" width="4" height="22" fill="#524434" stroke="#1e100c" strokeWidth="1.5" />
    {/* Red bookmark ribbon */}
    <line x1="20" y1="5" x2="20" y2="9" stroke="#ef4444" strokeWidth="2" />
    {/* Text lines */}
    <line x1="10" y1="11" x2="22" y2="11" stroke="#524434" strokeWidth="1.5" />
    <line x1="10" y1="15" x2="22" y2="15" stroke="#524434" strokeWidth="1.5" />
    <line x1="10" y1="19" x2="18" y2="19" stroke="#524434" strokeWidth="1.5" />
  </svg>
);

export const PixelKeyIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    {/* Antique brass key head */}
    <circle cx="10" cy="12" r="6" fill="#f59e0b" stroke="#372621" strokeWidth="2" />
    <circle cx="10" cy="12" r="2.5" fill="#180b07" />
    {/* Key shaft */}
    <line x1="16" y1="12" x2="26" y2="22" stroke="#d97706" strokeWidth="3" strokeLinecap="square" />
    {/* Key teeth */}
    <line x1="23" y1="20" x2="26" y2="17" stroke="#b45309" strokeWidth="2.5" strokeLinecap="square" />
    <line x1="25" y1="22" x2="28" y2="19" stroke="#b45309" strokeWidth="2.5" strokeLinecap="square" />
  </svg>
);

export const PixelPhotoIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    <rect x="5" y="5" width="22" height="22" fill="#f8fafc" stroke="#372621" strokeWidth="2" />
    <rect x="7" y="7" width="18" height="14" fill="#334155" />
    <circle cx="12" cy="12" r="2" fill="#cbd5e1" />
    <polygon points="7,21 13,15 17,18 21,13 25,21" fill="#64748b" />
  </svg>
);

// Character Avatar Illustrations
export const GuardAvatar: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <div className={`relative overflow-hidden bg-[#2c1c18] border-2 border-[#9f8e7a] ${className}`}>
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" style={{ imageRendering: 'pixelated' }}>
      {/* Background warm glow */}
      <rect width="40" height="40" fill="#2b1c17" />
      {/* Security guard uniform blue */}
      <rect x="6" y="28" width="28" height="14" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
      {/* Collar & Tie/Badge */}
      <polygon points="17,28 20,33 23,28" fill="#1e3a8a" />
      <rect x="25" y="30" width="4" height="2" fill="#fbbf24" />
      {/* Head & Face (Elderly Uncle Guard) */}
      <rect x="12" y="12" width="16" height="16" fill="#fcd34d" />
      {/* Grey Hair */}
      <rect x="10" y="10" width="20" height="4" fill="#9ca3af" />
      <rect x="10" y="12" width="3" height="6" fill="#9ca3af" />
      <rect x="27" y="12" width="3" height="6" fill="#9ca3af" />
      {/* Security Cap */}
      <rect x="10" y="6" width="20" height="6" fill="#1e3a8a" stroke="#172554" strokeWidth="1" />
      <rect x="8" y="10" width="24" height="2" fill="#0f172a" />
      <circle cx="20" cy="9" r="1.5" fill="#f59e0b" />
      {/* Eyes & Smile */}
      <rect x="15" y="17" width="2" height="2" fill="#372621" />
      <rect x="23" y="17" width="2" height="2" fill="#372621" />
      <line x1="17" y1="23" x2="23" y2="23" stroke="#b45309" strokeWidth="1.5" />
      {/* Wrinkle lines */}
      <line x1="14" y1="16" x2="16" y2="15" stroke="#d97706" strokeWidth="1" />
      <line x1="26" y1="16" x2="24" y2="15" stroke="#d97706" strokeWidth="1" />
    </svg>
  </div>
);

export const AuntieAvatar: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <div className={`relative overflow-hidden bg-[#2c1c18] border-2 border-[#9f8e7a] ${className}`}>
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" style={{ imageRendering: 'pixelated' }}>
      <rect width="40" height="40" fill="#2b1c17" />
      {/* Vietnamese conical hat (Nón lá) */}
      <polygon points="20,4 36,16 4,16" fill="#fde68a" stroke="#b45309" strokeWidth="1" />
      <line x1="20" y1="4" x2="10" y2="16" stroke="#d97706" strokeWidth="0.8" />
      <line x1="20" y1="4" x2="30" y2="16" stroke="#d97706" strokeWidth="0.8" />
      {/* Face & warm friendly expression */}
      <rect x="13" y="16" width="14" height="13" fill="#fde047" />
      <rect x="11" y="16" width="3" height="8" fill="#180b07" />
      <rect x="26" y="16" width="3" height="8" fill="#180b07" />
      {/* Eyes & rosy cheeks */}
      <line x1="16" y1="20" x2="18" y2="20" stroke="#180b07" strokeWidth="1.5" />
      <line x1="22" y1="20" x2="24" y2="20" stroke="#180b07" strokeWidth="1.5" />
      <rect x="14" y="22" width="2" height="2" fill="#f87171" />
      <rect x="24" y="22" width="2" height="2" fill="#f87171" />
      {/* Smile */}
      <path d="M17 24 Q20 27 23 24" stroke="#854d0e" strokeWidth="1.5" fill="none" />
      {/* Floral Áo bà ba */}
      <rect x="8" y="29" width="24" height="12" fill="#15803d" />
      <circle cx="14" cy="34" r="1.5" fill="#fef08a" />
      <circle cx="26" cy="33" r="1.5" fill="#fef08a" />
    </svg>
  </div>
);

export const MaiAvatar: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <div className={`relative overflow-hidden bg-[#2c1c18] border-2 border-[#9f8e7a] ${className}`}>
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" style={{ imageRendering: 'pixelated' }}>
      <rect width="40" height="40" fill="#2b1c17" />
      {/* Long dark hair */}
      <rect x="10" y="8" width="20" height="22" fill="#180b07" rx="2" />
      {/* Face */}
      <rect x="13" y="13" width="14" height="14" fill="#fed7aa" />
      {/* Eyes with sparkle */}
      <rect x="16" y="17" width="2" height="3" fill="#1e100c" />
      <rect x="22" y="17" width="2" height="3" fill="#1e100c" />
      <rect x="16" y="17" width="1" height="1" fill="#ffffff" />
      <rect x="22" y="17" width="1" height="1" fill="#ffffff" />
      {/* Gentle smile */}
      <path d="M17 23 Q20 25 23 23" stroke="#b45309" strokeWidth="1.2" fill="none" />
      {/* White Áo Dài collar */}
      <polygon points="14,27 20,31 26,27 28,40 12,40" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="20" y1="27" x2="20" y2="40" stroke="#e2e8f0" strokeWidth="1" />
    </svg>
  </div>
);

export const GrandpaAvatar: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <div className={`relative overflow-hidden bg-[#2c1c18] border-2 border-[#9f8e7a] ${className}`}>
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" style={{ imageRendering: 'pixelated' }}>
      <rect width="40" height="40" fill="#2b1c17" />
      {/* Sepia tone tint */}
      <rect x="10" y="8" width="20" height="6" fill="#e2e8f0" />
      <rect x="12" y="12" width="16" height="15" fill="#fde68a" />
      {/* Glasses */}
      <rect x="14" y="16" width="4" height="3" fill="none" stroke="#78350f" strokeWidth="1.5" />
      <rect x="22" y="16" width="4" height="3" fill="none" stroke="#78350f" strokeWidth="1.5" />
      <line x1="18" y1="17" x2="22" y2="17" stroke="#78350f" strokeWidth="1.5" />
      {/* White mustache */}
      <rect x="16" y="22" width="8" height="2" fill="#f1f5f9" />
      {/* Vintage shirt */}
      <rect x="8" y="27" width="24" height="13" fill="#78350f" />
    </svg>
  </div>
);

export const PixelTweezerIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    <line x1="8" y1="8" x2="22" y2="24" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="square" />
    <line x1="12" y1="6" x2="24" y2="22" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="square" />
    <circle cx="23" cy="23" r="2" fill="#64748b" />
    <rect x="7" y="7" width="2" height="2" fill="#475569" />
  </svg>
);

export const PixelStampIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    <rect x="5" y="5" width="22" height="22" fill="#dc2626" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 2" />
    <rect x="8" y="8" width="16" height="16" fill="#fef2f2" />
    <circle cx="16" cy="16" r="5" fill="#f87171" />
    <rect x="14" y="11" width="4" height="2" fill="#991b1b" />
    <rect x="15" y="19" width="2" height="2" fill="#991b1b" />
  </svg>
);

export const PixelMagnifierIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    <circle cx="13" cy="13" r="8" fill="#38bdf8" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="2.5" />
    <circle cx="13" cy="13" r="5" fill="#e0f2fe" fillOpacity="0.6" />
    <line x1="19" y1="19" x2="27" y2="27" stroke="#b45309" strokeWidth="3.5" strokeLinecap="square" />
    <line x1="20" y1="20" x2="26" y2="26" stroke="#f59e0b" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

export const PixelLetterIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    <rect x="4" y="7" width="24" height="18" fill="#fef3c7" stroke="#78350f" strokeWidth="1.5" />
    <polyline points="4,7 16,17 28,7" stroke="#b45309" strokeWidth="1.5" />
    <circle cx="16" cy="16" r="2.5" fill="#dc2626" />
    <line x1="8" y1="20" x2="13" y2="20" stroke="#b45309" strokeWidth="1" />
  </svg>
);

export const PixelReceiptIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    <polygon points="6,4 26,4 26,28 22,26 18,28 14,26 10,28 6,26" fill="#fef9c3" stroke="#854d0e" strokeWidth="1" />
    <line x1="9" y1="8" x2="23" y2="8" stroke="#a16207" strokeWidth="1.5" />
    <line x1="9" y1="12" x2="19" y2="12" stroke="#a16207" strokeWidth="1" />
    <line x1="9" y1="16" x2="21" y2="16" stroke="#a16207" strokeWidth="1" />
    <line x1="9" y1="20" x2="16" y2="20" stroke="#ca8a04" strokeWidth="1" />
  </svg>
);

export const PixelScissorsIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    <circle cx="9" cy="23" r="4" fill="none" stroke="#d97706" strokeWidth="2" />
    <circle cx="23" cy="23" r="4" fill="none" stroke="#d97706" strokeWidth="2" />
    <line x1="12" y1="20" x2="24" y2="6" stroke="#94a3b8" strokeWidth="2" strokeLinecap="square" />
    <line x1="20" y1="20" x2="8" y2="6" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="square" />
    <circle cx="16" cy="14" r="1.5" fill="#f59e0b" />
  </svg>
);

export const PixelThreadIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    <rect x="8" y="7" width="16" height="18" fill="#facc15" stroke="#78350f" strokeWidth="1.5" />
    <line x1="8" y1="11" x2="24" y2="11" stroke="#eab308" strokeWidth="1.5" />
    <line x1="8" y1="15" x2="24" y2="15" stroke="#eab308" strokeWidth="1.5" />
    <line x1="8" y1="19" x2="24" y2="19" stroke="#eab308" strokeWidth="1.5" />
    <line x1="11" y1="7" x2="11" y2="4" stroke="#d97706" strokeWidth="2" />
    <line x1="21" y1="7" x2="21" y2="4" stroke="#d97706" strokeWidth="2" />
    <line x1="11" y1="25" x2="11" y2="28" stroke="#d97706" strokeWidth="2" />
    <line x1="21" y1="25" x2="21" y2="28" stroke="#d97706" strokeWidth="2" />
  </svg>
);

export const PixelRadioKnobIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    <circle cx="16" cy="16" r="12" fill="#334155" stroke="#0f172a" strokeWidth="2" />
    <circle cx="16" cy="16" r="9" fill="#475569" stroke="#64748b" strokeWidth="1" />
    <rect x="15" y="6" width="2" height="6" fill="#f1f5f9" />
    <circle cx="16" cy="16" r="3" fill="#0f172a" />
  </svg>
);

export const PixelMosaicTileIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    <rect x="4" y="4" width="24" height="24" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
    <rect x="7" y="7" width="8" height="8" fill="#38bdf8" />
    <rect x="17" y="7" width="8" height="8" fill="#fbbf24" />
    <rect x="7" y="17" width="8" height="8" fill="#f97316" />
    <rect x="17" y="17" width="8" height="8" fill="#34d399" />
  </svg>
);

export const PixelRecipeIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    <rect x="5" y="4" width="22" height="24" fill="#b45309" stroke="#451a03" strokeWidth="2" />
    <rect x="7" y="6" width="18" height="20" fill="#fef3c7" />
    <circle cx="16" cy="13" r="3.5" fill="#f97316" stroke="#c2410c" strokeWidth="1" />
    <line x1="10" y1="20" x2="22" y2="20" stroke="#78350f" strokeWidth="1.5" />
    <line x1="10" y1="23" x2="18" y2="23" stroke="#78350f" strokeWidth="1" />
  </svg>
);

export const PeterAvatar: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <div className={`relative overflow-hidden bg-[#2c1c18] border-2 border-[#9f8e7a] ${className}`}>
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" style={{ imageRendering: 'pixelated' }}>
      <rect width="40" height="40" fill="#2b1c17" />
      <rect x="10" y="8" width="20" height="8" fill="#854d0e" />
      <rect x="12" y="14" width="16" height="13" fill="#fed7aa" />
      <rect x="15" y="18" width="2" height="2" fill="#0284c7" />
      <rect x="23" y="18" width="2" height="2" fill="#0284c7" />
      <path d="M17 23 Q20 25 23 23" stroke="#c2410c" strokeWidth="1" fill="none" />
      <rect x="8" y="27" width="24" height="13" fill="#dc2626" />
      <rect x="6" y="27" width="4" height="10" fill="#475569" />
    </svg>
  </div>
);

export const PostmanAvatar: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <div className={`relative overflow-hidden bg-[#2c1c18] border-2 border-[#9f8e7a] ${className}`}>
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" style={{ imageRendering: 'pixelated' }}>
      <rect width="40" height="40" fill="#2b1c17" />
      <rect x="10" y="6" width="20" height="6" fill="#0369a1" />
      <rect x="8" y="10" width="24" height="2" fill="#075985" />
      <rect x="12" y="12" width="16" height="15" fill="#fcd34d" />
      <rect x="15" y="17" width="2" height="2" fill="#1e100c" />
      <rect x="23" y="17" width="2" height="2" fill="#1e100c" />
      <line x1="17" y1="23" x2="23" y2="23" stroke="#b45309" strokeWidth="1.5" />
      <rect x="8" y="27" width="24" height="13" fill="#0284c7" />
      <circle cx="20" cy="30" r="1.5" fill="#f59e0b" />
    </svg>
  </div>
);

export const TailorAvatar: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <div className={`relative overflow-hidden bg-[#2c1c18] border-2 border-[#9f8e7a] ${className}`}>
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" style={{ imageRendering: 'pixelated' }}>
      <rect width="40" height="40" fill="#2b1c17" />
      <rect x="10" y="8" width="20" height="18" fill="#1e100c" />
      <rect x="13" y="13" width="14" height="13" fill="#fed7aa" />
      <line x1="15" y1="18" x2="18" y2="18" stroke="#78350f" strokeWidth="1.5" />
      <line x1="22" y1="18" x2="25" y2="18" stroke="#78350f" strokeWidth="1.5" />
      <path d="M17 23 Q20 25 23 23" stroke="#b45309" strokeWidth="1.2" fill="none" />
      <rect x="8" y="26" width="24" height="14" fill="#9333ea" />
      <line x1="12" y1="28" x2="28" y2="28" stroke="#facc15" strokeWidth="1.5" />
    </svg>
  </div>
);

export const HoangAvatar: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <div className={`relative overflow-hidden bg-[#2c1c18] border-2 border-[#9f8e7a] ${className}`}>
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" style={{ imageRendering: 'pixelated' }}>
      <rect width="40" height="40" fill="#2b1c17" />
      <rect x="10" y="7" width="20" height="8" fill="#334155" />
      <rect x="12" y="13" width="16" height="14" fill="#fed7aa" />
      <rect x="15" y="18" width="2" height="2" fill="#0f172a" />
      <rect x="23" y="18" width="2" height="2" fill="#0f172a" />
      <path d="M17 23 Q20 25 23 23" stroke="#b45309" strokeWidth="1" fill="none" />
      <rect x="8" y="27" width="24" height="13" fill="#ea580c" />
    </svg>
  </div>
);

export const PixelGuitarStringIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    {/* Brass ball end */}
    <circle cx="6" cy="26" r="3" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
    {/* Coiled string */}
    <path d="M7 25 Q16 10 26 6" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="26" cy="6" r="1.5" fill="#f8fafc" />
    {/* Shimmer sparkle */}
    <rect x="14" y="14" width="2" height="2" fill="#ffffff" />
  </svg>
);

export const PixelSoupPotIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    {/* Steam lines */}
    <path d="M12 4 Q10 7 12 10" stroke="#f1f5f9" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <path d="M16 3 Q18 6 16 9" stroke="#f1f5f9" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <path d="M20 4 Q18 7 20 10" stroke="#f1f5f9" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    {/* Pot body */}
    <rect x="6" y="11" width="20" height="15" rx="2" fill="#f59e0b" stroke="#451a03" strokeWidth="2" />
    {/* Pot rim */}
    <rect x="4" y="9" width="24" height="3" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
    {/* Side handles */}
    <rect x="2" y="12" width="3" height="4" fill="#78350f" />
    <rect x="27" y="12" width="3" height="4" fill="#78350f" />
    {/* Rich broth & spice toppings */}
    <ellipse cx="16" cy="11" rx="8" ry="2" fill="#ea580c" />
    <circle cx="13" cy="11" r="1" fill="#22c55e" />
    <circle cx="18" cy="11" r="1" fill="#ef4444" />
  </svg>
);

export const PixelPolishedCoinIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    {/* Gleaming silver coin */}
    <circle cx="16" cy="16" r="13" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
    <circle cx="16" cy="16" r="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
    {/* Marianne silhouette */}
    <path d="M14 10 Q18 10 18 14 Q18 18 13 22 L20 22" stroke="#64748b" strokeWidth="1.5" fill="none" />
    {/* Stars & Gleams */}
    <polygon points="22,6 23,8 25,9 23,10 22,12 21,10 19,9 21,8" fill="#fbbf24" />
    <polygon points="8,20 9,21 10,22 9,23 8,24 7,23 6,22 7,21" fill="#38bdf8" />
  </svg>
);

export const PixelDecodedNotebookIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" style={{ imageRendering: 'pixelated' }}>
    {/* Open Notebook */}
    <rect x="4" y="6" width="24" height="20" fill="#fef3c7" stroke="#78350f" strokeWidth="2" />
    <line x1="16" y1="6" x2="16" y2="26" stroke="#b45309" strokeWidth="2" />
    {/* Magnifier over the notebook */}
    <circle cx="21" cy="15" r="6" fill="#38bdf8" opacity="0.5" stroke="#0284c7" strokeWidth="2" />
    <line x1="25" y1="19" x2="29" y2="23" stroke="#0284c7" strokeWidth="3" strokeLinecap="square" />
    {/* Numbers glowing */}
    <rect x="18" y="13" width="2" height="4" fill="#dc2626" />
    <rect x="21" y="13" width="2" height="4" fill="#dc2626" />
  </svg>
);



