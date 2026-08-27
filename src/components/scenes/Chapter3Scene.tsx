import React, { useState, useEffect } from 'react';
import { Sparkles, Music, Coffee, Wind, Scissors, Radio as RadioIcon, User, Search } from 'lucide-react';
import { PointOfInterest } from '../../types';
import { sound } from '../../utils/audio';

interface Chapter3SceneProps {
  onSelectPOI: (poi: PointOfInterest) => void;
  isRadioTuned: boolean;
  hasGuitarString?: boolean;
  isGuitarTuned?: boolean;
  hasScissors?: boolean;
}

export const Chapter3Scene: React.FC<Chapter3SceneProps> = ({
  onSelectPOI,
  isRadioTuned,
  isGuitarTuned = false,
  hasScissors = false,
}) => {
  const [hoveredPoiId, setHoveredPoiId] = useState<string | null>(null);
  const [coffeeDrop, setCoffeeDrop] = useState(0);

  // Periodic coffee drip and musical note animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCoffeeDrop((prev) => (prev + 1) % 100);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const handlePoiClick = (action: string, id: string, title: string) => {
    sound.playClick();
    onSelectPOI({
      id,
      chapter: 3,
      title,
      cursorType: action.startsWith('talk') ? 'talk' : action.startsWith('inspect_wool') ? 'search' : 'gear',
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      description: '',
      targetAction: action,
    });
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#1c120c] flex items-center justify-center">
      {/* Dynamic Background: Golden Hour 1985 Ton That Dam Apartment Balcony & Cafe */}
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full object-cover pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Sunset sky gradient */}
          <linearGradient id="ch3SunsetSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>

          {/* Indochine Ve Wall Vintage Texture */}
          <linearGradient id="ch3WallGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#eab308" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ca8a04" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a16207" stopOpacity="0.95" />
          </linearGradient>

          {/* Encaustic tile pattern */}
          <pattern id="ch3FloorTile" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#78350f" />
            <rect x="2" y="2" width="36" height="36" fill="#92400e" stroke="#451a03" strokeWidth="1" />
            <circle cx="20" cy="20" r="12" fill="#0f766e" />
            <circle cx="20" cy="20" r="8" fill="#fde047" />
            <polygon points="20,10 24,20 20,30 16,20" fill="#b91c1c" />
            <polygon points="10,20 20,24 30,20 20,16" fill="#b91c1c" />
          </pattern>

          {/* Wood bar texture */}
          <linearGradient id="ch3WoodBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#854d0e" />
            <stop offset="50%" stopColor="#713f12" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          {/* Sunbeam filter */}
          <linearGradient id="ch3Sunbeam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* 1. Sky & Distant Saigon 1985 Rooftops */}
        <rect x="0" y="0" width="1000" height="360" fill="url(#ch3SunsetSky)" />

        {/* Distant Tamarind trees & vintage roof outlines */}
        <path d="M0,320 Q80,260 160,310 T320,290 T480,320 L500,400 L0,400 Z" fill="#3f6212" opacity="0.6" />
        <path d="M80,330 Q180,240 280,300 T500,280 L500,380 L80,380 Z" fill="#4d7c0f" opacity="0.75" />
        {/* Distant French Colonial Roofs & Church Spire */}
        <polygon points="220,300 240,240 260,300" fill="#991b1b" opacity="0.8" />
        <rect x="235" y="220" width="10" height="25" fill="#7f1d1d" opacity="0.9" />
        <polygon points="230,220 240,190 250,220" fill="#7f1d1d" opacity="0.9" />
        <rect x="340" y="270" width="60" height="50" fill="#78350f" opacity="0.7" />
        <polygon points="330,270 370,235 410,270" fill="#b91c1c" opacity="0.8" />

        {/* Sun in the evening glow */}
        <circle cx="280" cy="180" r="50" fill="#fef08a" opacity="0.5" />
        <circle cx="280" cy="180" r="30" fill="#fffbeb" opacity="0.8" />

        {/* 2. French Colonial Architectural Corridor & Arched Balcony */}
        {/* Wall & Ceiling of the Apartment Building */}
        <rect x="0" y="0" width="1000" height="110" fill="#451a03" />
        <rect x="0" y="100" width="1000" height="20" fill="#78350f" />

        {/* Classical French Arches (3 Arches looking out) */}
        {/* Arch 1 (Left Balcony where Tailor works) */}
        <path d="M0,120 L0,440 L280,440 L280,260 Q140,140 0,260 Z" fill="url(#ch3WallGrad)" />
        {/* Arch 2 (Center Balcony where Hoang sits) */}
        <path d="M300,120 L300,440 L650,440 L650,260 Q475,130 300,260 Z" fill="url(#ch3WallGrad)" />
        {/* Wall Right (Cafe Bar Area) */}
        <rect x="670" y="100" width="330" height="350" fill="url(#ch3WallGrad)" />

        {/* Weathered Moss & Stains on yellow wall */}
        <path d="M20,120 Q60,180 30,240 Q10,300 40,360 L0,360 L0,120 Z" fill="#713f12" opacity="0.4" />
        <path d="M680,110 Q710,180 690,250 T730,360 L670,360 L670,110 Z" fill="#713f12" opacity="0.4" />
        <path d="M400,120 Q420,160 410,200 L390,200 Z" fill="#365314" opacity="0.5" />

        {/* Wooden Window with Green Louver Shutters (Cửa lá sách xanh rêu) */}
        <g transform="translate(690, 140)">
          <rect x="0" y="0" width="100" height="160" fill="#14532d" stroke="#052e16" strokeWidth="4" />
          <rect x="6" y="6" width="40" height="148" fill="#166534" stroke="#052e16" strokeWidth="2" />
          <rect x="54" y="6" width="40" height="148" fill="#166534" stroke="#052e16" strokeWidth="2" />
          {/* Louver slats */}
          {Array.from({ length: 12 }).map((_, i) => (
            <React.Fragment key={i}>
              <line x1="8" y1={18 + i * 11} x2="44" y2={18 + i * 11} stroke="#052e16" strokeWidth="2" />
              <line x1="56" y1={18 + i * 11} x2="92" y2={18 + i * 11} stroke="#052e16" strokeWidth="2" />
            </React.Fragment>
          ))}
          {/* Brass handle */}
          <circle cx="48" cy="80" r="3" fill="#f59e0b" />
          <circle cx="52" cy="80" r="3" fill="#f59e0b" />
        </g>

        {/* Vintage Poster / Trịnh Công Sơn Music Sheet on wall */}
        <g transform="translate(810, 145) rotate(2)">
          <rect x="0" y="0" width="75" height="105" fill="#fef3c7" stroke="#78350f" strokeWidth="2" />
          <rect x="6" y="6" width="63" height="40" fill="#854d0e" />
          <text x="37" y="30" fill="#fef08a" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            HẠ TRẮNG
          </text>
          <text x="37" y="62" fill="#451a03" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="serif">
            TRỊNH CÔNG SƠN
          </text>
          <line x1="12" y1="75" x2="63" y2="75" stroke="#78350f" strokeWidth="1" />
          <line x1="12" y1="82" x2="63" y2="82" stroke="#78350f" strokeWidth="1" />
          <line x1="12" y1="89" x2="50" y2="89" stroke="#78350f" strokeWidth="1" />
        </g>

        {/* 3. Wrought Iron Balcony Railing (Lan can sắt rèn nghệ thuật) */}
        <g transform="translate(0, 340)">
          <rect x="0" y="0" width="670" height="12" fill="#18181b" />
          <rect x="0" y="80" width="670" height="10" fill="#18181b" />
          {/* Decorative Balcony Grille Spokes & Spirals */}
          {Array.from({ length: 22 }).map((_, i) => (
            <g key={i} transform={`translate(${i * 30 + 15}, 0)`}>
              <line x1="0" y1="12" x2="0" y2="80" stroke="#27272a" strokeWidth="3" />
              <circle cx="0" cy="46" r="8" fill="none" stroke="#27272a" strokeWidth="2" />
              <path d="M-6,30 Q0,46 6,30" fill="none" stroke="#3f3f46" strokeWidth="1.5" />
              <path d="M-6,62 Q0,46 6,62" fill="none" stroke="#3f3f46" strokeWidth="1.5" />
            </g>
          ))}
        </g>

        {/* Hanging Clothesline (Dây phơi áo dài trắng & hoa văn 1985) */}
        <path d="M120,160 Q280,210 440,170" fill="none" stroke="#78350f" strokeWidth="1.5" />
        {/* White silk scarf / Áo dài on line */}
        <g transform="translate(180, 180) rotate(5)">
          <polygon points="0,0 35,0 45,70 10,75 -5,60" fill="#ffffff" opacity="0.9" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="10" y1="10" x2="25" y2="70" stroke="#e2e8f0" strokeWidth="1" />
        </g>
        <g transform="translate(250, 192) rotate(-3)">
          <polygon points="0,0 28,0 32,55 0,55" fill="#f43f5e" opacity="0.85" />
          <circle cx="14" cy="20" r="3" fill="#fde047" />
          <circle cx="14" cy="40" r="3" fill="#fde047" />
        </g>

        {/* 4. Encaustic Tile Floor (Sàn gạch bông cổ điển) */}
        <polygon points="0,420 1000,420 1000,600 0,600" fill="url(#ch3FloorTile)" />
        {/* Floor dark shadow overlay for depth */}
        <polygon points="0,420 1000,420 1000,600 0,600" fill="#000000" opacity="0.25" />

        {/* 5. Cafe Bar Counter on the Right */}
        <g transform="translate(680, 360)">
          {/* Wood Bar Counter Top */}
          <polygon points="0,30 20,-10 320,-10 320,30" fill="#a16207" stroke="#451a03" strokeWidth="2" />
          <rect x="0" y="30" width="320" height="180" fill="url(#ch3WoodBar)" stroke="#271306" strokeWidth="2" />
          {/* Vertical wood panel grooves */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1={i * 40} y1="30" x2={i * 40} y2="210" stroke="#291407" strokeWidth="3" />
          ))}

          {/* Drip Coffee Phin (Phin cà phê nhôm Sài Gòn) */}
          <g transform="translate(60, -65)">
            {/* Glass Cup */}
            <polygon points="10,35 34,35 30,70 14,70" fill="#f8fafc" fillOpacity="0.4" stroke="#ffffff" strokeWidth="1.5" />
            {/* Condensed milk layer */}
            <rect x="14" y="60" width="16" height="8" fill="#fef08a" opacity="0.9" />
            {/* Dark coffee drip liquid */}
            <rect x="13" y="45" width="18" height="15" fill="#261208" opacity="0.95" />
            {/* Drip drop animation */}
            <circle cx="22" cy={36 + (coffeeDrop % 20)} r="1.5" fill="#3b1d0e" />
            {/* Metal Phin Pot */}
            <rect x="6" y="30" width="32" height="4" fill="#94a3b8" stroke="#334155" strokeWidth="1" />
            <rect x="10" y="10" width="24" height="20" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
            <polygon points="8,10 36,10 32,4 12,4" fill="#94a3b8" stroke="#334155" strokeWidth="1" />
            <circle cx="22" cy="2" r="2.5" fill="#64748b" />
          </g>

          {/* Vinyl record player / Đĩa than */}
          <g transform="translate(130, -35)">
            <rect x="0" y="0" width="55" height="25" fill="#3f3f46" stroke="#18181b" strokeWidth="1.5" />
            <circle cx="25" cy="12" r="10" fill="#09090b" stroke="#27272a" strokeWidth="1" />
            <circle cx="25" cy="12" r="3" fill="#dc2626" />
            <line x1="45" y1="5" x2="30" y2="12" stroke="#e4e4e7" strokeWidth="1.5" />
          </g>
        </g>

        {/* 6. Sunbeams streaming across the corridor */}
        <polygon points="200,0 350,0 600,600 350,600" fill="url(#ch3Sunbeam)" />
        <polygon points="400,0 520,0 780,600 580,600" fill="url(#ch3Sunbeam)" opacity="0.7" />

        {/* Ceiling fan spinning in the corridor ceiling */}
        <g transform="translate(480, 100)">
          <line x1="0" y1="-30" x2="0" y2="0" stroke="#18181b" strokeWidth="3" />
          <circle cx="0" cy="0" r="8" fill="#27272a" />
          {/* Fan blades with subtle rotation illusion */}
          <ellipse cx="-45" cy="-8" rx="45" ry="6" fill="#3f3f46" opacity="0.8" />
          <ellipse cx="45" cy="8" rx="45" ry="6" fill="#3f3f46" opacity="0.8" />
          <ellipse cx="10" cy="40" rx="6" ry="40" fill="#3f3f46" opacity="0.8" />
        </g>
      </svg>

      {/* ========================================================================= */}
      {/* INTERACTIVE CHARACTER & OBJECT HOTSPOTS (HTML / SVG OVERLAYS) */}
      {/* ========================================================================= */}

      {/* 1. CÔ NĂM THỢ MAY (Left Area: x: 12% - 28%) */}
      <div
        onClick={() => handlePoiClick('talk_tailor', 'ch3_tailor', 'Cô Năm Thợ May')}
        onMouseEnter={() => setHoveredPoiId('tailor')}
        onMouseLeave={() => setHoveredPoiId(null)}
        className="absolute left-[12%] bottom-[12%] w-[180px] sm:w-[220px] h-[250px] sm:h-[290px] z-20 cursor-pointer group/tailor transition-transform hover:scale-105"
        title="Trò chuyện với Cô Năm Thợ May"
      >
        <div className="relative w-full h-full">
          {/* Visual: Antique Singer Sewing Machine & Tailor Lady */}
          <svg viewBox="0 0 160 200" className="w-full h-full" fill="none" style={{ imageRendering: 'pixelated' }}>
            {/* Wooden sewing table */}
            <rect x="20" y="110" width="120" height="14" fill="#78350f" stroke="#451a03" strokeWidth="2" />
            {/* Cast iron treadle legs (Chân bàn máy may con bướm) */}
            <line x1="30" y1="124" x2="25" y2="190" stroke="#18181b" strokeWidth="3" />
            <line x1="130" y1="124" x2="135" y2="190" stroke="#18181b" strokeWidth="3" />
            <line x1="20" y1="190" x2="140" y2="190" stroke="#18181b" strokeWidth="3" />
            {/* Foot treadle pedal */}
            <rect x="60" y="180" width="40" height="8" fill="#27272a" stroke="#09090b" strokeWidth="1" />
            <circle cx="120" cy="155" r="16" fill="none" stroke="#27272a" strokeWidth="2" />

            {/* Black Singer Sewing Machine Body with Gold Decals */}
            <path d="M40,110 L40,85 Q40,65 70,65 L110,65 L110,110 Z" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
            <circle cx="110" cy="85" r="10" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
            <rect x="42" y="88" width="4" height="22" fill="#cbd5e1" />
            <polygon points="38,105 46,105 42,112" fill="#94a3b8" />
            {/* Gold butterfly decal */}
            <circle cx="75" cy="80" r="3" fill="#facc15" />

            {/* Tailor Lady (Cô Năm) sitting */}
            {/* Blue floral Áo Bà Ba */}
            <rect x="50" y="35" width="45" height="55" fill="#0284c7" rx="6" />
            <circle cx="65" cy="55" r="3" fill="#fef08a" />
            <circle cx="80" cy="65" r="3" fill="#fef08a" />
            {/* Yellow measuring tape around neck */}
            <path d="M60,35 Q72,60 85,35" fill="none" stroke="#facc15" strokeWidth="3" strokeDasharray="3 1" />
            {/* Head & Hair bun (Búi tóc truyền thống) */}
            <circle cx="72" cy="22" r="14" fill="#fde047" />
            <circle cx="72" cy="14" r="15" fill="#180b07" />
            <circle cx="72" cy="6" r="7" fill="#180b07" stroke="#b45309" strokeWidth="1" />
            {/* Friendly face expression */}
            <rect x="68" y="20" width="2" height="2" fill="#180b07" />
            <rect x="76" y="20" width="2" height="2" fill="#180b07" />
            <path d="M70,26 Q73,29 76,26" fill="none" stroke="#b45309" strokeWidth="1.2" />
            {/* Hands guiding cloth */}
            <rect x="42" y="102" width="12" height="6" fill="#fde047" rx="2" />
            <rect x="58" y="104" width="12" height="6" fill="#fde047" rx="2" />
            {/* Purple silk cloth on table */}
            <path d="M25,110 Q50,105 70,110 L85,115 L25,115 Z" fill="#9333ea" />
          </svg>

          {/* Interactive Ping & Speech Bubble */}
          <div className="absolute top-0 right-4 flex items-center gap-1.5 px-3 py-1 bg-[#1e100c]/90 border-2 border-[#f59e0b] text-[#fde047] font-ui-label text-xs font-bold shadow-lg rounded-md animate-bounce">
            <User className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Cô Năm Thợ May</span>
          </div>

          <div className="absolute inset-0 rounded-lg border-2 border-dashed border-[#f59e0b]/0 group-hover/tailor:border-[#f59e0b]/80 transition-all pointer-events-none" />
        </div>
      </div>

      {/* 2. GIỎ LEN BAN CÔNG & KÉO ĐỒNG (Balcony Center-Left: x: 32% - 44%) */}
      <div
        onClick={() => handlePoiClick('inspect_wool_basket', 'ch3_wool', 'Giỏ Len Ban Công')}
        onMouseEnter={() => setHoveredPoiId('wool')}
        onMouseLeave={() => setHoveredPoiId(null)}
        className="absolute left-[33%] bottom-[15%] w-[110px] sm:w-[130px] h-[110px] sm:h-[130px] z-20 cursor-pointer group/wool transition-transform hover:scale-110"
        title="Kiểm tra Giỏ len phơi nắng nơi ban công"
      >
        <div className="relative w-full h-full">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" style={{ imageRendering: 'pixelated' }}>
            {/* Woven rattan basket (Giỏ mây tròn) */}
            <ellipse cx="50" cy="65" rx="38" ry="24" fill="#a16207" stroke="#451a03" strokeWidth="2" />
            <ellipse cx="50" cy="55" rx="34" ry="18" fill="#ca8a04" stroke="#78350f" strokeWidth="2" />
            {/* Rattan cross hatch */}
            <path d="M20,60 Q50,75 80,60" fill="none" stroke="#713f12" strokeWidth="2" />
            <path d="M25,70 Q50,82 75,70" fill="none" stroke="#713f12" strokeWidth="2" />

            {/* Pastel Wool Yarn Balls */}
            <circle cx="35" cy="48" r="14" fill="#f43f5e" stroke="#9f1239" strokeWidth="1.5" />
            <circle cx="62" cy="46" r="15" fill="#0ea5e9" stroke="#0369a1" strokeWidth="1.5" />
            <circle cx="48" cy="38" r="13" fill="#eab308" stroke="#854d0e" strokeWidth="1.5" />

            {/* Yarn textures */}
            <path d="M25,48 Q35,40 45,48" fill="none" stroke="#ffe4e6" strokeWidth="1.5" />
            <path d="M52,46 Q62,38 72,46" fill="none" stroke="#e0f2fe" strokeWidth="1.5" />

            {/* Scissors glinting inside basket if not taken yet */}
            {!hasScissors && (
              <g transform="translate(42, 22) rotate(-25)">
                <circle cx="8" cy="20" r="5" fill="none" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="20" cy="20" r="5" fill="none" stroke="#f59e0b" strokeWidth="2" />
                <line x1="10" y1="17" x2="22" y2="4" stroke="#cbd5e1" strokeWidth="2.5" />
                <line x1="18" y1="17" x2="6" y2="4" stroke="#cbd5e1" strokeWidth="2.5" />
                <circle cx="14" cy="11" r="1.5" fill="#f59e0b" />
              </g>
            )}
          </svg>

          {/* Interactive Tag */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-0.5 bg-[#180b07]/90 border border-[#f59e0b] text-[#fef08a] font-ui-label text-[10px] font-bold shadow-md rounded whitespace-nowrap">
            <Search className="w-3 h-3 text-[#f59e0b]" />
            <span>Giỏ Len & Kéo ({hasScissors ? 'Đã lấy kéo' : 'Lấp lánh'})</span>
          </div>

          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#f59e0b]/0 group-hover/wool:border-[#f59e0b] transition-all pointer-events-none" />
        </div>
      </div>

      {/* 3. HOÀNG NHẠC SĨ (Center-Right: x: 50% - 68%) */}
      <div
        onClick={() => handlePoiClick('talk_hoang', 'ch3_hoang', 'Hoàng Nhạc Sĩ')}
        onMouseEnter={() => setHoveredPoiId('hoang')}
        onMouseLeave={() => setHoveredPoiId(null)}
        className="absolute left-[50%] bottom-[10%] w-[190px] sm:w-[240px] h-[270px] sm:h-[310px] z-20 cursor-pointer group/hoang transition-transform hover:scale-105"
        title="Trò chuyện với Hoàng Nhạc Sĩ"
      >
        <div className="relative w-full h-full">
          <svg viewBox="0 0 170 210" className="w-full h-full" fill="none" style={{ imageRendering: 'pixelated' }}>
            {/* Vintage Wicker Cane Chair (Ghế bành mây) */}
            <ellipse cx="85" cy="165" rx="55" ry="25" fill="#78350f" stroke="#451a03" strokeWidth="2" />
            <path d="M35,160 Q30,80 85,75 Q140,80 135,160" fill="none" stroke="#a16207" strokeWidth="6" />
            <line x1="45" y1="165" x2="35" y2="205" stroke="#451a03" strokeWidth="4" />
            <line x1="125" y1="165" x2="135" y2="205" stroke="#451a03" strokeWidth="4" />

            {/* Musician sitting (Chàng nhạc sĩ trẻ thập niên 80) */}
            {/* Jeans */}
            <polygon points="50,150 120,150 115,195 90,195 85,165 60,195 45,195" fill="#1e3a8a" stroke="#172554" strokeWidth="1.5" />
            {/* White/Cream open-collar shirt */}
            <rect x="60" y="70" width="50" height="60" fill="#fef3c7" rx="6" />
            <polygon points="70,70 85,90 100,70" fill="#fed7aa" />

            {/* Head & Curly 80s hair */}
            <circle cx="85" cy="50" r="15" fill="#fed7aa" />
            <path d="M68,48 Q70,25 85,25 Q102,25 102,48 Q85,32 68,48 Z" fill="#261208" />
            <circle cx="70" cy="38" r="6" fill="#261208" />
            <circle cx="100" cy="38" r="6" fill="#261208" />
            {/* Face details */}
            <rect x="79" y="48" width="2" height="2" fill="#180b07" />
            <rect x="89" y="48" width="2" height="2" fill="#180b07" />
            <path d="M81,56 Q85,59 89,56" fill="none" stroke="#b45309" strokeWidth="1.2" />

            {/* Acoustic Guitar (Cây đàn guitar thùng gỗ mộc) */}
            <g transform="translate(65, 80) rotate(-22)">
              {/* Body */}
              <ellipse cx="30" cy="65" rx="26" ry="32" fill="#d97706" stroke="#78350f" strokeWidth="2" />
              <ellipse cx="30" cy="35" rx="20" ry="22" fill="#d97706" stroke="#78350f" strokeWidth="2" />
              {/* Sound hole */}
              <circle cx="30" cy="48" r="9" fill="#180b07" stroke="#fef08a" strokeWidth="1.5" />
              {/* Neck & Headstock */}
              <rect x="26" y="-35" width="8" height="70" fill="#78350f" stroke="#451a03" strokeWidth="1" />
              <polygon points="24,-35 36,-35 34,-50 26,-50" fill="#b45309" />
              {/* Tuning pegs */}
              <circle cx="23" cy="-45" r="2" fill="#cbd5e1" />
              <circle cx="23" cy="-40" r="2" fill="#cbd5e1" />
              <circle cx="37" cy="-45" r="2" fill="#cbd5e1" />
              <circle cx="37" cy="-40" r="2" fill="#cbd5e1" />
              {/* Strings */}
              <line x1="28" y1="-45" x2="28" y2="75" stroke="#f8fafc" strokeWidth={isGuitarTuned ? '1.5' : '0.8'} opacity="0.9" />
              <line x1="32" y1="-45" x2="32" y2="75" stroke="#f8fafc" strokeWidth="1" opacity="0.9" />
            </g>

            {/* Hands holding guitar */}
            <circle cx="68" cy="115" r="7" fill="#fed7aa" />
            <circle cx="108" cy="100" r="7" fill="#fed7aa" />
          </svg>

          {/* Interactive Tag */}
          <div className="absolute top-2 left-4 flex items-center gap-1.5 px-3 py-1 bg-[#1e100c]/90 border-2 border-[#f59e0b] text-[#fde047] font-ui-label text-xs font-bold shadow-lg rounded-md animate-bounce">
            <Music className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Hoàng Nhạc Sĩ ({isGuitarTuned ? 'Đàn đã chỉnh' : 'Cần Dây Mi'})</span>
          </div>

          <div className="absolute inset-0 rounded-lg border-2 border-dashed border-[#f59e0b]/0 group-hover/hoang:border-[#f59e0b]/80 transition-all pointer-events-none" />
        </div>
      </div>

      {/* 4. ĐÀI RADIO CỔ NATIONAL (Right Bar Area: x: 74% - 94%) */}
      <div
        onClick={() => handlePoiClick('inspect_radio', 'ch3_radio', 'Đài Radio Cổ National')}
        onMouseEnter={() => setHoveredPoiId('radio')}
        onMouseLeave={() => setHoveredPoiId(null)}
        className="absolute right-[6%] bottom-[24%] w-[130px] sm:w-[170px] h-[120px] sm:h-[150px] z-20 cursor-pointer group/radio transition-transform hover:scale-110"
        title="Kiểm tra Đài Radio Cổ National tại quầy Bar"
      >
        <div className="relative w-full h-full">
          <svg viewBox="0 0 120 90" className="w-full h-full" fill="none" style={{ imageRendering: 'pixelated' }}>
            {/* Radio Wooden Cabinet Box */}
            <rect x="10" y="20" width="100" height="65" rx="6" fill="#78350f" stroke="#371a06" strokeWidth="2.5" />
            <rect x="14" y="24" width="92" height="57" rx="4" fill="#92400e" />

            {/* Telescopic Antenna extending up */}
            <line x1="22" y1="20" x2="10" y2="2" stroke="#cbd5e1" strokeWidth="2.5" />
            <circle cx="10" cy="2" r="2" fill="#dc2626" />

            {/* Speaker Grill with vintage textile pattern */}
            <rect x="20" y="32" width="40" height="42" fill="#451a03" stroke="#291407" strokeWidth="1.5" />
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={i} x1="22" y1={36 + i * 6} x2="58" y2={36 + i * 6} stroke="#b45309" strokeWidth="1.5" strokeDasharray="3 2" />
            ))}

            {/* Tuning Dial Screen (Thước đo tần số 99.9 MHz) */}
            <rect x="66" y="32" width="38" height="18" fill="#180b07" stroke="#f59e0b" strokeWidth="1.5" />
            {/* Glowing amber backlight when tuned */}
            {isRadioTuned ? (
              <rect x="68" y="34" width="34" height="14" fill="#f59e0b" fillOpacity="0.4" />
            ) : (
              <rect x="68" y="34" width="34" height="14" fill="#3f2310" />
            )}
            <line x1="70" y1="41" x2="100" y2="41" stroke="#fef08a" strokeWidth="1" strokeDasharray="2 2" />
            {/* Red frequency needle */}
            <line x1={isRadioTuned ? '85' : '74'} y1="34" x2={isRadioTuned ? '85' : '74'} y2="48" stroke="#ef4444" strokeWidth="2" />

            {/* Control Knobs */}
            <circle cx="74" cy="62" r="6" fill="#27272a" stroke="#d4d4d8" strokeWidth="1" />
            <circle cx="92" cy="62" r="6" fill="#27272a" stroke="#d4d4d8" strokeWidth="1" />
            <line x1="74" y1="58" x2="74" y2="62" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="92" y1="58" x2="92" y2="62" stroke="#ffffff" strokeWidth="1.5" />

            {/* Sound waves emitted if tuned */}
            {isRadioTuned && (
              <g transform="translate(60, 10)">
                <path d="M0,0 Q10,-10 20,0" fill="none" stroke="#22c55e" strokeWidth="2" className="animate-ping" />
              </g>
            )}
          </svg>

          {/* Interactive Tag */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 bg-[#180b07]/90 border-2 border-[#f59e0b] text-[#fde047] font-ui-label text-[11px] font-bold shadow-md rounded whitespace-nowrap">
            <RadioIcon className={`w-3.5 h-3.5 ${isRadioTuned ? 'text-[#22c55e]' : 'text-[#f59e0b]'}`} />
            <span>Đài National {isRadioTuned ? '• 99.9 MHz' : '(Dò Sóng)'}</span>
          </div>

          <div className="absolute inset-0 rounded-lg border-2 border-dashed border-[#f59e0b]/0 group-hover/radio:border-[#f59e0b] transition-all pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
