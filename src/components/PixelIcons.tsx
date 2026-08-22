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
