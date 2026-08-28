import React, { useState } from 'react';
import { Sparkles, Music, Scissors, Radio as RadioIcon, Search, MessageSquare } from 'lucide-react';
import { PointOfInterest, ItemId } from '../../types';
import { sound } from '../../utils/audio';

interface Chapter3SceneProps {
  onSelectPOI: (poi: PointOfInterest) => void;
  onDropOnPOI?: (action: string, itemId: ItemId) => void;
  isRadioTuned: boolean;
  hasGuitarString?: boolean;
  isGuitarTuned?: boolean;
  hasScissors?: boolean;
}

export const Chapter3Scene: React.FC<Chapter3SceneProps> = ({
  onSelectPOI,
  onDropOnPOI,
  isRadioTuned,
  isGuitarTuned = false,
  hasScissors = false,
}) => {
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);

  const handleTrigger = (action: string, id: string, title: string, cursorType: 'gear' | 'search' | 'talk' = 'gear') => {
    sound.playClick();
    onSelectPOI({
      id,
      chapter: 3,
      title,
      cursorType,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      description: '',
      targetAction: action,
    });
  };

  const handleDrop = (e: React.DragEvent, action: string) => {
    e.preventDefault();
    setHoveredTarget(null);
    const sourceId = e.dataTransfer.getData('text/plain') as ItemId;
    if (sourceId && onDropOnPOI) {
      onDropOnPOI(action, sourceId);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#1e130c] flex items-center justify-center">
      {/* 16-bit retro pixel art game scene from Stitch */}
      <img
        src="https://lh3.googleusercontent.com/aida/AEtjO1UfTqdbrfAvKK928uFo7H2HRVivBIIv1Zx81tZ8MkRp2STaObczCopPBNUBwtDeX9_sRyfjv1mK4yWIZXT9pZzIdVi-j0o6ix_YlfUAgNcbTGh-OXeoGNoBIo_ed6ZmpVLZTl0NCyC81pSKgDXAUWVDjgEq9r9AsHhAcPdHufA6HRJTYX_dosm5GuGFD3Goj6MnoCZZ0SKjI5qXIIQ2vDNWeCwHuwFJR8iuj7XE3MfzhMdfFMr-w2BerVDr"
        alt="Chung Cư Tôn Thất Đạm 1985"
        className="w-full h-full object-cover pointer-events-none"
      />

      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* 1. Cô Năm Thợ May Hotspot */}
        <div
          className="absolute pointer-events-auto cursor-pointer flex items-center justify-center transition-transform z-20"
          style={{ left: '26%', top: '54%', width: '6%', height: '10%' }}
          onMouseEnter={() => {
            setHoveredTarget('tailor');
            sound.playBlip(380, 0.02);
          }}
          onMouseLeave={() => setHoveredTarget(null)}
          onClick={() => handleTrigger('talk_tailor', 'ch3_tailor', 'Cô Năm Thợ May', 'talk')}
          onDragOver={(e) => { e.preventDefault(); setHoveredTarget('tailor'); }}
          onDrop={(e) => handleDrop(e, 'talk_tailor')}
          title="Cô Năm Thợ May"
        >
          <div className="relative flex items-center justify-center group/poi">
            {/* Radar pulse wave */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#f4a424] animate-ping absolute inset-0 opacity-40" />

            {/* Center icon badge */}
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${
                hoveredTarget === 'tailor'
                  ? 'scale-125 bg-[#f4a424] text-[#180b07] border-white shadow-[0_0_12px_#f4a424]'
                  : 'bg-[#2c1c18]/85 text-[#ffc67c] border-[#f4a424]'
              }`}
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </div>

            {/* Floating Tooltip Label */}
            <div
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1e100c] border-2 border-[#ffc67c] text-[#ffc67c] font-ui-label text-[11px] whitespace-nowrap pointer-events-none shadow-md transition-opacity z-30 ${
                hoveredTarget === 'tailor' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Nói chuyện với Cô Năm Thợ May
            </div>
          </div>
        </div>

        {/* 2. Giỏ Len Ban Công & Kéo Cắt Vải Hotspot */}
        <div
          className="absolute pointer-events-auto cursor-pointer flex items-center justify-center transition-transform z-20"
          style={{ left: '15%', top: '78%', width: '6%', height: '10%' }}
          onMouseEnter={() => {
            setHoveredTarget('wool');
            sound.playBlip(360, 0.02);
          }}
          onMouseLeave={() => setHoveredTarget(null)}
          onClick={() => handleTrigger('inspect_wool_basket', 'ch3_wool', 'Giỏ Len Ban Công', 'search')}
          onDragOver={(e) => { e.preventDefault(); setHoveredTarget('wool'); }}
          onDrop={(e) => handleDrop(e, 'inspect_wool_basket')}
          title="Giỏ Len Ban Công"
        >
          <div className="relative flex items-center justify-center group/poi">
            {/* Radar pulse wave */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#f4a424] animate-ping absolute inset-0 opacity-40" />

            {/* Center icon badge */}
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${
                hoveredTarget === 'wool'
                  ? 'scale-125 bg-[#f4a424] text-[#180b07] border-white shadow-[0_0_12px_#f4a424]'
                  : hasScissors
                  ? 'bg-[#14532d]/90 text-[#86efac] border-[#86efac]'
                  : 'bg-[#2c1c18]/85 text-[#ffc67c] border-[#f4a424]'
              }`}
            >
              {hasScissors ? (
                <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              ) : (
                <Scissors className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>

            {/* Floating Tooltip Label */}
            <div
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1e100c] border-2 border-[#ffc67c] text-[#ffc67c] font-ui-label text-[11px] whitespace-nowrap pointer-events-none shadow-md transition-opacity z-30 ${
                hoveredTarget === 'wool' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {hasScissors ? 'Giỏ Len Ban Công (Đã Lấy Kéo)' : 'Giỏ Len Ban Công (Có Kéo Đồng)'}
            </div>
          </div>
        </div>

        {/* 3. Hoàng Nhạc Sĩ & Đàn Guitar Thùng Hotspot */}
        <div
          className="absolute pointer-events-auto cursor-pointer flex items-center justify-center transition-transform z-20"
          style={{ left: '66%', top: '50%', width: '6%', height: '10%' }}
          onMouseEnter={() => {
            setHoveredTarget('hoang');
            sound.playBlip(400, 0.02);
          }}
          onMouseLeave={() => setHoveredTarget(null)}
          onClick={() => handleTrigger('talk_hoang', 'ch3_hoang', 'Hoàng Nhạc Sĩ', 'talk')}
          onDragOver={(e) => { e.preventDefault(); setHoveredTarget('hoang'); }}
          onDrop={(e) => handleDrop(e, 'talk_hoang')}
          title="Hoàng Nhạc Sĩ"
        >
          <div className="relative flex items-center justify-center group/poi">
            {/* Radar pulse wave */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#f4a424] animate-ping absolute inset-0 opacity-40" />

            {/* Center icon badge */}
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${
                hoveredTarget === 'hoang'
                  ? 'scale-125 bg-[#f4a424] text-[#180b07] border-white shadow-[0_0_12px_#f4a424]'
                  : isGuitarTuned
                  ? 'bg-[#14532d]/90 text-[#86efac] border-[#86efac]'
                  : 'bg-[#2c1c18]/85 text-[#ffc67c] border-[#f4a424]'
              }`}
            >
              <Music className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </div>

            {/* Floating Tooltip Label */}
            <div
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1e100c] border-2 border-[#ffc67c] text-[#ffc67c] font-ui-label text-[11px] whitespace-nowrap pointer-events-none shadow-md transition-opacity z-30 ${
                hoveredTarget === 'hoang' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {isGuitarTuned ? 'Hoàng Nhạc Sĩ (Đàn Đã Chỉnh Dây Mi)' : 'Nói chuyện với Hoàng Nhạc Sĩ'}
            </div>
          </div>
        </div>

        {/* 4. Đài Radio Cổ National Hotspot */}
        <div
          className="absolute pointer-events-auto cursor-pointer flex items-center justify-center transition-transform z-20"
          style={{ left: '84%', top: '63%', width: '6%', height: '10%' }}
          onMouseEnter={() => {
            setHoveredTarget('radio');
            sound.playBlip(440, 0.02);
          }}
          onMouseLeave={() => setHoveredTarget(null)}
          onClick={() => handleTrigger('inspect_radio', 'ch3_radio', 'Đài Radio Cổ National', 'gear')}
          onDragOver={(e) => { e.preventDefault(); setHoveredTarget('radio'); }}
          onDrop={(e) => handleDrop(e, 'inspect_radio')}
          title="Đài Radio Cổ National"
        >
          <div className="relative flex items-center justify-center group/poi">
            {/* Radar pulse wave */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#f4a424] animate-ping absolute inset-0 opacity-40" />

            {/* Center icon badge */}
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${
                hoveredTarget === 'radio'
                  ? 'scale-125 bg-[#f4a424] text-[#180b07] border-white shadow-[0_0_12px_#f4a424]'
                  : isRadioTuned
                  ? 'bg-[#14532d]/90 text-[#86efac] border-[#86efac]'
                  : 'bg-[#2c1c18]/85 text-[#ffc67c] border-[#f4a424]'
              }`}
            >
              {isRadioTuned ? (
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <RadioIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>

            {/* Floating Tooltip Label */}
            <div
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1e100c] border-2 border-[#ffc67c] text-[#ffc67c] font-ui-label text-[11px] whitespace-nowrap pointer-events-none shadow-md transition-opacity z-30 ${
                hoveredTarget === 'radio' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {isRadioTuned ? 'Đài Radio Cổ (Đã Bắt Sóng 99.9 MHz)' : 'Dò Sóng Đài Radio Cổ National'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
