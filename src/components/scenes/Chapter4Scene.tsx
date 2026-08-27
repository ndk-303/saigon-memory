import React, { useState, useEffect } from 'react';
import { DoorOpen, Flame, Sparkles, Box, UtensilsCrossed, Search, KeyRound } from 'lucide-react';
import { PointOfInterest } from '../../types';
import { sound } from '../../utils/audio';

interface Chapter4SceneProps {
  onSelectPOI: (poi: PointOfInterest) => void;
  hasHomeKey: boolean;
  isHuTieuCooked: boolean;
  isChestOpened: boolean;
  hasMosaicTile: boolean;
}

export const Chapter4Scene: React.FC<Chapter4SceneProps> = ({
  onSelectPOI,
  hasHomeKey,
  isHuTieuCooked,
  isChestOpened,
  hasMosaicTile,
}) => {
  const [hoveredPoiId, setHoveredPoiId] = useState<string | null>(null);
  const [steamTick, setSteamTick] = useState(0);

  // Steam and flame flicker interval
  useEffect(() => {
    const interval = setInterval(() => {
      setSteamTick((prev) => (prev + 1) % 100);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handlePoiClick = (action: string, id: string, title: string) => {
    sound.playClick();
    onSelectPOI({
      id,
      chapter: 4,
      title,
      cursorType: action === 'inspect_gate' ? 'door' : 'gear',
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      description: '',
      targetAction: action,
    });
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#140b08] flex items-center justify-center">
      {/* Background Architectural Artwork: District 3 Ancient House, Bougainvillea & Kitchen */}
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full object-cover pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Evening sky in alleyway */}
          <linearGradient id="ch4Sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4c1d95" />
            <stop offset="40%" stopColor="#831843" />
            <stop offset="75%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Ancient Wooden House Wall Gradient */}
          <linearGradient id="ch4WoodWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#542e18" />
            <stop offset="50%" stopColor="#3c1f10" />
            <stop offset="100%" stopColor="#25120a" />
          </linearGradient>

          {/* Roof Tiles Yin-Yang Texture */}
          <pattern id="ch4RoofTile" width="24" height="14" patternUnits="userSpaceOnUse">
            <rect width="24" height="14" fill="#991b1b" />
            <path d="M0,0 Q12,12 24,0" fill="#7f1d1d" stroke="#450a0a" strokeWidth="1" />
            <line x1="12" y1="0" x2="12" y2="14" stroke="#450a0a" strokeWidth="1" />
          </pattern>

          {/* Mother of Pearl Inlay Shimmer Gradient */}
          <linearGradient id="ch4MotherOfPearl" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="25%" stopColor="#fed7aa" />
            <stop offset="50%" stopColor="#fbcfe8" />
            <stop offset="75%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          {/* Bougainvillea Flower Pink-Purple Pattern */}
          <radialGradient id="ch4FlowerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="70%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#9d174d" />
          </radialGradient>
        </defs>

        {/* 1. Sky & Ancient House Rooftop with Mossy Terracotta Tiles */}
        <rect x="0" y="0" width="1000" height="300" fill="url(#ch4Sky)" />

        {/* Distant Alleyway Trees & Courtyard Roofs */}
        <polygon points="0,150 180,80 320,150 0,150" fill="url(#ch4RoofTile)" />
        <polygon points="300,160 520,70 740,160 300,160" fill="url(#ch4RoofTile)" />
        <polygon points="720,150 880,90 1000,150 720,150" fill="url(#ch4RoofTile)" />

        {/* Ceramic roof ridge dragon/curled eaves (Mái ngói cong cổ kính) */}
        <path d="M0,150 Q180,75 320,150" fill="none" stroke="#f59e0b" strokeWidth="3" />
        <path d="M300,160 Q520,65 740,160" fill="none" stroke="#f59e0b" strokeWidth="4" />
        <path d="M720,150 Q880,85 1000,150" fill="none" stroke="#f59e0b" strokeWidth="3" />

        {/* 2. Main Wall Structure of the Ancient Wooden House (Gian Nhà Rường Gỗ Mun) */}
        <rect x="0" y="140" width="1000" height="460" fill="url(#ch4WoodWall)" />

        {/* Heavy Polished Wooden Pillars (Cột Gỗ Lim Mun) */}
        <rect x="260" y="140" width="28" height="460" fill="#1e100c" stroke="#120805" strokeWidth="2" />
        <rect x="620" y="140" width="28" height="460" fill="#1e100c" stroke="#120805" strokeWidth="2" />
        <rect x="960" y="140" width="24" height="460" fill="#1e100c" stroke="#120805" strokeWidth="2" />
        {/* Pillar stone bases (Chân tảng đá xanh) */}
        <rect x="254" y="470" width="40" height="25" fill="#475569" stroke="#1e293b" strokeWidth="2" rx="3" />
        <rect x="614" y="470" width="40" height="25" fill="#475569" stroke="#1e293b" strokeWidth="2" rx="3" />

        {/* 3. Courtyard Paved Stone Floor */}
        <polygon points="0,480 1000,480 1000,600 0,600" fill="#261b16" />
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1={i * 80} y1="480" x2={i * 80 - 40} y2="600" stroke="#180e0a" strokeWidth="2" />
        ))}
        <line x1="0" y1="535" x2="1000" y2="535" stroke="#180e0a" strokeWidth="2" />

        {/* 4. Left Courtyard: Massive Bougainvillea Flower Trellis (Giàn Hoa Giấy Quận 3) */}
        {/* Vines and branches */}
        <path d="M0,0 Q60,80 120,120 T240,160 T260,280" fill="none" stroke="#362112" strokeWidth="8" />
        <path d="M20,0 Q100,50 180,80 T260,180" fill="none" stroke="#452a17" strokeWidth="6" />
        {/* Dense Pink/Purple Bougainvillea Flower Clusters (Hoa Giấy) */}
        {Array.from({ length: 45 }).map((_, i) => {
          const fx = (i % 9) * 28 + ((i * 13) % 20);
          const fy = Math.floor(i / 9) * 35 + ((i * 17) % 25) + 30;
          return (
            <g key={i} transform={`translate(${fx}, ${fy})`}>
              <circle cx="0" cy="0" r="10" fill="url(#ch4FlowerGlow)" opacity="0.9" />
              <circle cx="6" cy="4" r="8" fill="url(#ch4FlowerGlow)" opacity="0.85" />
              <circle cx="-5" cy="5" r="7" fill="url(#ch4FlowerGlow)" opacity="0.85" />
              <circle cx="0" cy="2" r="2" fill="#fef08a" />
            </g>
          );
        })}

        {/* Fallen Bougainvillea Petals on the stone floor */}
        {Array.from({ length: 18 }).map((_, i) => (
          <ellipse
            key={i}
            cx={30 + (i * 45) % 300}
            cy={500 + (i * 19) % 80}
            rx="4"
            ry="2.5"
            fill="#ec4899"
            transform={`rotate(${i * 25}, ${30 + (i * 45) % 300}, ${500 + (i * 19) % 80})`}
            opacity="0.85"
          />
        ))}

        {/* 5. Center: Grandpa's Ancestral Living Room & Tea Space */}
        {/* Antique Red Wood Calligraphy Scroll "PHÚC - LỘC - THỌ" on the center wall */}
        <g transform="translate(410, 160)">
          <rect x="0" y="0" width="70" height="110" fill="#991b1b" stroke="#78350f" strokeWidth="2" />
          <rect x="6" y="6" width="58" height="98" fill="#7f1d1d" stroke="#f59e0b" strokeWidth="1" />
          {/* Gold Hanzi Calligraphy Character "PHÚC" */}
          <circle cx="35" cy="55" r="22" fill="#f59e0b" fillOpacity="0.2" />
          <text x="35" y="65" fill="#fef08a" fontSize="26" fontWeight="bold" textAnchor="middle" fontFamily="serif">
            福
          </text>
        </g>

        {/* Grandfather's Framed Photo on the wall */}
        <g transform="translate(500, 170)">
          <rect x="0" y="0" width="60" height="75" fill="#fef3c7" stroke="#451a03" strokeWidth="3" />
          <rect x="5" y="5" width="50" height="65" fill="#3f2d25" />
          <circle cx="30" cy="32" r="14" fill="#fde68a" />
          <rect x="18" y="46" width="24" height="20" fill="#1c1917" />
          {/* Mustache and glasses */}
          <circle cx="25" cy="30" r="3" fill="none" stroke="#78350f" strokeWidth="1" />
          <circle cx="35" cy="30" r="3" fill="none" stroke="#78350f" strokeWidth="1" />
          <rect x="26" y="36" width="8" height="2" fill="#ffffff" />
        </g>

        {/* Red Silk Hanging Lanterns (Đèn lồng Hội An thắp sáng hiên) */}
        <g transform="translate(300, 140)">
          <line x1="0" y1="0" x2="0" y2="25" stroke="#78350f" strokeWidth="2" />
          <ellipse cx="0" cy="45" rx="16" ry="22" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
          <line x1="-12" y1="45" x2="12" y2="45" stroke="#facc15" strokeWidth="1" />
          <rect x="-4" y="65" width="8" height="16" fill="#f59e0b" />
        </g>
        <g transform="translate(600, 140)">
          <line x1="0" y1="0" x2="0" y2="25" stroke="#78350f" strokeWidth="2" />
          <ellipse cx="0" cy="45" rx="16" ry="22" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
          <line x1="-12" y1="45" x2="12" y2="45" stroke="#facc15" strokeWidth="1" />
          <rect x="-4" y="65" width="8" height="16" fill="#f59e0b" />
        </g>

        {/* 6. Right Kitchen Area: Traditional Brick Hearth & Hanging Herbs */}
        {/* Hanging dried red chilies, garlic braids, and shallots */}
        <g transform="translate(680, 180)">
          <line x1="0" y1="0" x2="120" y2="10" stroke="#78350f" strokeWidth="2" />
          {/* Garlic braid */}
          {Array.from({ length: 6 }).map((_, i) => (
            <circle key={i} cx={15 + (i % 2) * 5} cy={10 + i * 8} r="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.8" />
          ))}
          {/* Red Dried Chilies */}
          {Array.from({ length: 7 }).map((_, i) => (
            <polygon key={i} points={`${50 + (i % 3) * 6},${10 + i * 9} ${56 + (i % 3) * 6},${10 + i * 9} ${53 + (i % 3) * 6},${22 + i * 9}`} fill="#dc2626" />
          ))}
          {/* Bamboo basket / Rổ tre */}
          <ellipse cx="100" cy="30" rx="16" ry="8" fill="#ca8a04" stroke="#78350f" strokeWidth="1" />
        </g>

        {/* Smoke from the broth pot floating up */}
        <path
          d={`M740,320 Q${730 + (steamTick % 20)},240 750,180 T${740 + (steamTick % 15)},110`}
          fill="none"
          stroke="#f8fafc"
          strokeWidth="6"
          opacity="0.3"
          strokeLinecap="round"
        />
        <path
          d={`M760,320 Q${770 - (steamTick % 20)},250 755,190 T765,120`}
          fill="none"
          stroke="#f8fafc"
          strokeWidth="4"
          opacity="0.25"
          strokeLinecap="round"
        />
      </svg>

      {/* ========================================================================= */}
      {/* INTERACTIVE HOTSPOTS & RICH OBJECT MODELS */}
      {/* ========================================================================= */}

      {/* 1. CỔNG NHÀ CỔ HẺM HOA GIẤY (Left Gate: x: 6% - 24%) */}
      <div
        onClick={() => handlePoiClick('inspect_gate', 'ch4_gate', 'Cổng Nhà Cổ Hẻm Hoa Giấy')}
        onMouseEnter={() => setHoveredPoiId('gate')}
        onMouseLeave={() => setHoveredPoiId(null)}
        className="absolute left-[6%] bottom-[12%] w-[150px] sm:w-[190px] h-[260px] sm:h-[310px] z-20 cursor-pointer group/gate transition-transform hover:scale-105"
        title="Kiểm tra Cổng Sắt Nhà Cổ Hẻm Hoa Giấy"
      >
        <div className="relative w-full h-full">
          <svg viewBox="0 0 140 220" className="w-full h-full" fill="none" style={{ imageRendering: 'pixelated' }}>
            {/* Stone Pillar Gate Frame */}
            <rect x="0" y="20" width="22" height="200" fill="#475569" stroke="#1e293b" strokeWidth="2" />
            <rect x="118" y="20" width="22" height="200" fill="#475569" stroke="#1e293b" strokeWidth="2" />
            <polygon points="0,20 11,2 22,20" fill="#991b1b" />
            <polygon points="118,20 129,2 140,20" fill="#991b1b" />

            {/* Wrought Iron Gate Leaves with Lotus Motifs */}
            <rect x="22" y="40" width="46" height="175" fill="#18181b" stroke="#27272a" strokeWidth="2" />
            <rect x="72" y="40" width="46" height="175" fill="#18181b" stroke="#27272a" strokeWidth="2" />

            {/* Lotus flower wrought iron spirals */}
            <circle cx="45" cy="80" r="14" fill="none" stroke="#ca8a04" strokeWidth="2" />
            <circle cx="95" cy="80" r="14" fill="none" stroke="#ca8a04" strokeWidth="2" />
            <path d="M45,66 Q45,80 35,80 Q45,80 45,94 Q45,80 55,80 Q45,80 45,66" fill="#eab308" />
            <path d="M95,66 Q95,80 85,80 Q95,80 95,94 Q95,80 105,80 Q95,80 95,66" fill="#eab308" />

            {/* Antique Brass Padlock on the Center Gate Bar */}
            <g transform="translate(60, 120)">
              {/* Shackle */}
              <path d="M5,12 A7,7 0 0,1 19,12 L19,18 L5,18 Z" fill="none" stroke="#cbd5e1" strokeWidth="3" />
              {/* Lock body */}
              <rect x="2" y="16" width="20" height="20" rx="3" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
              <circle cx="12" cy="24" r="2.5" fill="#180b07" />
              <line x1="12" y1="26" x2="12" y2="30" stroke="#180b07" strokeWidth="1.5" />
            </g>

            {/* Bougainvillea Flowers draping over the gate */}
            <circle cx="30" cy="35" r="8" fill="url(#ch4FlowerGlow)" />
            <circle cx="70" cy="25" r="9" fill="url(#ch4FlowerGlow)" />
            <circle cx="110" cy="32" r="8" fill="url(#ch4FlowerGlow)" />
          </svg>

          {/* Interactive Tag */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 bg-[#1e100c]/90 border-2 border-[#f59e0b] text-[#fde047] font-ui-label text-xs font-bold shadow-lg rounded-md whitespace-nowrap animate-bounce">
            <DoorOpen className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Cổng Hẻm ({hasHomeKey ? 'Đã Mở' : 'Khóa Chìa'})</span>
          </div>

          <div className="absolute inset-0 rounded-lg border-2 border-dashed border-[#f59e0b]/0 group-hover/gate:border-[#f59e0b]/80 transition-all pointer-events-none" />
        </div>
      </div>

      {/* 2. TỦ CHÈ KHẢM XÀ CỪ (Center Living Room: x: 34% - 54%) */}
      <div
        onClick={() => handlePoiClick('inspect_tea_cabinet', 'ch4_tea_cabinet', 'Tủ Chè Khảm Xà Cừ')}
        onMouseEnter={() => setHoveredPoiId('cabinet')}
        onMouseLeave={() => setHoveredPoiId(null)}
        className="absolute left-[35%] bottom-[14%] w-[180px] sm:w-[220px] h-[210px] sm:h-[245px] z-20 cursor-pointer group/cabinet transition-transform hover:scale-105"
        title="Kiểm tra Tủ Chè Cẩn Xà Cừ của Ông Ngoại"
      >
        <div className="relative w-full h-full">
          <svg viewBox="0 0 160 170" className="w-full h-full" fill="none" style={{ imageRendering: 'pixelated' }}>
            {/* Mahogany Wood Cabinet Base & Carved Apron */}
            <rect x="10" y="30" width="140" height="120" rx="4" fill="#3b1d0e" stroke="#1c0c05" strokeWidth="3" />
            {/* Cabinet Feet */}
            <rect x="15" y="148" width="16" height="16" fill="#291206" stroke="#1c0c05" strokeWidth="2" />
            <rect x="129" y="148" width="16" height="16" fill="#291206" stroke="#1c0c05" strokeWidth="2" />

            {/* 3 Glass Doors with Wooden Frames */}
            <rect x="18" y="40" width="38" height="95" fill="#180b07" stroke="#854d0e" strokeWidth="2" />
            <rect x="61" y="40" width="38" height="95" fill="#180b07" stroke="#854d0e" strokeWidth="2" />
            <rect x="104" y="40" width="38" height="95" fill="#180b07" stroke="#854d0e" strokeWidth="2" />

            {/* Mother of pearl (Xà cừ) Inlay Flowers on the woodwork */}
            <path d="M22,142 Q37,135 52,142" fill="none" stroke="url(#ch4MotherOfPearl)" strokeWidth="3" />
            <circle cx="37" cy="138" r="3" fill="url(#ch4MotherOfPearl)" />
            <path d="M108,142 Q123,135 138,142" fill="none" stroke="url(#ch4MotherOfPearl)" strokeWidth="3" />
            <circle cx="123" cy="138" r="3" fill="url(#ch4MotherOfPearl)" />

            {/* Antique Lái Thiêu Blue-and-White Tea Set inside middle shelf */}
            <g transform="translate(68, 85)">
              {/* Teapot */}
              <ellipse cx="12" cy="18" rx="8" ry="7" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.5" />
              <circle cx="12" cy="10" r="2" fill="#0284c7" />
              <path d="M4,18 Q-2,15 0,10" fill="none" stroke="#0284c7" strokeWidth="1.5" />
              {/* 3 small tea cups */}
              <rect x="24" y="16" width="6" height="5" fill="#f8fafc" stroke="#0284c7" strokeWidth="1" rx="1" />
              <rect x="32" y="16" width="6" height="5" fill="#f8fafc" stroke="#0284c7" strokeWidth="1" rx="1" />
            </g>

            {/* Mosaic Tile glinting on the top right shelf if not collected */}
            {!hasMosaicTile && (
              <g transform="translate(112, 60)">
                <rect x="0" y="0" width="22" height="22" fill="#0284c7" stroke="#facc15" strokeWidth="1.5" className="animate-pulse" />
                <circle cx="11" cy="11" r="5" fill="#f59e0b" />
                <Sparkles className="w-3 h-3 text-[#fde047] absolute -top-2 -right-2" />
              </g>
            )}

            {/* Brass Ring Handles */}
            <circle cx="52" cy="85" r="3.5" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="65" cy="85" r="3.5" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="108" cy="85" r="3.5" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          </svg>

          {/* Interactive Tag */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-1 bg-[#180b07]/90 border-2 border-[#f59e0b] text-[#fde047] font-ui-label text-xs font-bold shadow-md rounded whitespace-nowrap">
            <Search className="w-3 h-3 text-[#f59e0b]" />
            <span>Tủ Chè Khảm Xà Cừ ({hasMosaicTile ? 'Đã tìm' : 'Mảnh Ghép'})</span>
          </div>

          <div className="absolute inset-0 rounded-lg border-2 border-dashed border-[#f59e0b]/0 group-hover/cabinet:border-[#f59e0b] transition-all pointer-events-none" />
        </div>
      </div>

      {/* 3. BẾP NẤU HỦ TIẾU GIA TRUYỀN (Kitchen Hearth: x: 58% - 78%) */}
      <div
        onClick={() => handlePoiClick('inspect_kitchen', 'ch4_kitchen', 'Bếp Nấu Hủ Tiếu Gia Truyền')}
        onMouseEnter={() => setHoveredPoiId('kitchen')}
        onMouseLeave={() => setHoveredPoiId(null)}
        className="absolute left-[58%] bottom-[12%] w-[170px] sm:w-[210px] h-[220px] sm:h-[260px] z-20 cursor-pointer group/kitchen transition-transform hover:scale-105"
        title="Nấu Nồi Hủ Tiếu Nam Vang Gia Truyền"
      >
        <div className="relative w-full h-full">
          <svg viewBox="0 0 160 190" className="w-full h-full" fill="none" style={{ imageRendering: 'pixelated' }}>
            {/* Red Brick Charcoal Stove (Bếp lò than hoa đỏ rực) */}
            <rect x="25" y="95" width="110" height="75" rx="8" fill="#991b1b" stroke="#450a0a" strokeWidth="2.5" />
            {/* Brick mortar lines */}
            <line x1="25" y1="120" x2="135" y2="120" stroke="#7f1d1d" strokeWidth="2" />
            <line x1="25" y1="145" x2="135" y2="145" stroke="#7f1d1d" strokeWidth="2" />
            <line x1="60" y1="95" x2="60" y2="120" stroke="#7f1d1d" strokeWidth="2" />
            <line x1="100" y1="95" x2="100" y2="120" stroke="#7f1d1d" strokeWidth="2" />
            <line x1="80" y1="120" x2="80" y2="145" stroke="#7f1d1d" strokeWidth="2" />

            {/* Fire Hearth Opening with Glowing Coals */}
            <ellipse cx="80" cy="145" rx="25" ry="16" fill="#180b07" stroke="#450a0a" strokeWidth="2" />
            <circle cx="75" cy="148" r="8" fill="#f97316" className="animate-pulse" />
            <circle cx="86" cy="145" r="7" fill="#ef4444" className="animate-pulse" />
            <circle cx="80" cy="142" r="5" fill="#fde047" />

            {/* Large Cast Aluminum Soup Pot (Nồi Hủ Tiếu Nhôm Hai Quai) */}
            <g transform="translate(30, 30)">
              {/* Two handles */}
              <path d="M5,45 Q-8,45 -8,32 Q-8,20 5,20" fill="none" stroke="#64748b" strokeWidth="4" />
              <path d="M95,45 Q108,45 108,32 Q108,20 95,20" fill="none" stroke="#64748b" strokeWidth="4" />

              {/* Pot Body */}
              <ellipse cx="50" cy="65" rx="46" ry="18" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
              <rect x="4" y="20" width="92" height="45" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
              <ellipse cx="50" cy="20" rx="46" ry="16" fill="#f8fafc" stroke="#334155" strokeWidth="2" />

              {/* Golden simmering broth layer inside */}
              <ellipse cx="50" cy="22" rx="42" ry="13" fill={isHuTieuCooked ? '#eab308' : '#ca8a04'} />
              {/* Green scallions & dried squid floating */}
              <circle cx="40" cy="22" r="3" fill="#22c55e" />
              <circle cx="62" cy="24" r="3" fill="#22c55e" />
              <circle cx="50" cy="20" r="4" fill="#fed7aa" />
              <circle cx="56" cy="18" r="2.5" fill="#f97316" />

              {/* Wooden ladles and spice bowls beside */}
              <line x1="85" y1="2" x2="65" y2="40" stroke="#78350f" strokeWidth="3.5" />
              <circle cx="63" cy="42" r="6" fill="#a16207" />
            </g>
          </svg>

          {/* Interactive Tag */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 bg-[#1e100c]/90 border-2 border-[#f59e0b] text-[#fde047] font-ui-label text-xs font-bold shadow-lg rounded-md whitespace-nowrap animate-bounce">
            <Flame className={`w-3.5 h-3.5 ${isHuTieuCooked ? 'text-[#22c55e]' : 'text-[#ef4444]'}`} />
            <span>Nồi Hủ Tiếu ({isHuTieuCooked ? 'Hoàn Thành' : 'Nấu Gia Vị'})</span>
          </div>

          <div className="absolute inset-0 rounded-lg border-2 border-dashed border-[#f59e0b]/0 group-hover/kitchen:border-[#f59e0b]/80 transition-all pointer-events-none" />
        </div>
      </div>

      {/* 4. RƯƠNG GIA BẢO MOSAIC 3x3 (Far Right Sập Gụ: x: 78% - 96%) */}
      <div
        onClick={() => handlePoiClick('inspect_chest', 'ch4_chest', 'Rương Gia Bảo Mosaic 3x3')}
        onMouseEnter={() => setHoveredPoiId('chest')}
        onMouseLeave={() => setHoveredPoiId(null)}
        className="absolute right-[4%] bottom-[14%] w-[160px] sm:w-[195px] h-[160px] sm:h-[190px] z-20 cursor-pointer group/chest transition-transform hover:scale-105"
        title="Giải mã Rương Gia Bảo Mosaic 3x3"
      >
        <div className="relative w-full h-full">
          <svg viewBox="0 0 150 140" className="w-full h-full" fill="none" style={{ imageRendering: 'pixelated' }}>
            {/* Polished Mahogany Daybed Platter (Mặt Sập Gụ) */}
            <polygon points="0,95 150,95 140,135 10,135" fill="#451a03" stroke="#1c0c05" strokeWidth="2" />

            {/* Lim Wood Treasure Chest Body */}
            <rect x="20" y="45" width="110" height="65" rx="6" fill="#78350f" stroke="#261005" strokeWidth="2.5" />
            <rect x="24" y="49" width="102" height="57" fill="#854d0e" />

            {/* Brass Corner Brackets & Straps (Nẹp đồng khảm góc) */}
            <rect x="20" y="45" width="12" height="12" fill="#d97706" stroke="#451a03" strokeWidth="1" />
            <rect x="118" y="45" width="12" height="12" fill="#d97706" stroke="#451a03" strokeWidth="1" />
            <rect x="20" y="98" width="12" height="12" fill="#d97706" stroke="#451a03" strokeWidth="1" />
            <rect x="118" y="98" width="12" height="12" fill="#d97706" stroke="#451a03" strokeWidth="1" />

            {/* Chest Lid 3x3 Mosaic Tile Puzzle Preview */}
            <rect x="42" y="22" width="66" height="32" rx="4" fill="#180b07" stroke="#f59e0b" strokeWidth="2" />
            {/* 3x3 Grid pattern */}
            {Array.from({ length: 6 }).map((_, i) => {
              const gx = 44 + (i % 3) * 21;
              const gy = 24 + Math.floor(i / 3) * 14;
              return (
                <rect
                  key={i}
                  x={gx}
                  y={gy}
                  width="18"
                  height="12"
                  fill={isChestOpened ? '#22c55e' : (i % 2 === 0 ? '#0284c7' : '#f59e0b')}
                  stroke="#180b07"
                  strokeWidth="1"
                />
              );
            })}

            {/* Antique Butterfly Latch Lock */}
            <g transform="translate(68, 54)">
              <circle cx="7" cy="8" r="8" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
              <circle cx="7" cy="8" r="2" fill="#180b07" />
              {isChestOpened && <Sparkles className="w-4 h-4 text-[#fef08a] animate-spin" />}
            </g>
          </svg>

          {/* Interactive Tag */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 bg-[#1e100c]/90 border-2 border-[#f59e0b] text-[#fde047] font-ui-label text-xs font-bold shadow-lg rounded-md whitespace-nowrap">
            <Box className={`w-3.5 h-3.5 ${isChestOpened ? 'text-[#22c55e]' : 'text-[#f59e0b]'}`} />
            <span>Rương Gia Bảo {isChestOpened ? '• Đã Mở' : '(Mosaic 3x3)'}</span>
          </div>

          <div className="absolute inset-0 rounded-lg border-2 border-dashed border-[#f59e0b]/0 group-hover/chest:border-[#f59e0b] transition-all pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
