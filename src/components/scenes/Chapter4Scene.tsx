import React, { useState } from 'react';
import { Search, Sparkles, UtensilsCrossed, DoorOpen, Box, Key, Flame } from 'lucide-react';
import { PointOfInterest, ItemId } from '../../types';
import { sound } from '../../utils/audio';

interface Chapter4SceneProps {
  onSelectPOI: (poi: PointOfInterest) => void;
  onDropOnPOI?: (action: string, itemId: ItemId) => void;
  hasHomeKey?: boolean;
  isHuTieuCooked?: boolean;
  isChestOpened?: boolean;
  hasMosaicTile?: boolean;
}

export const Chapter4Scene: React.FC<Chapter4SceneProps> = ({
  onSelectPOI,
  onDropOnPOI,
  hasHomeKey = false,
  isHuTieuCooked = false,
  isChestOpened = false,
  hasMosaicTile = false,
}) => {
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);

  const handleTrigger = (action: string, id: string, title: string, cursorType: 'gear' | 'search' | 'talk' | 'door' = 'gear') => {
    sound.playClick();
    onSelectPOI({
      id,
      chapter: 4,
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
        src="https://lh3.googleusercontent.com/aida/AEtjO1UCosE4gUyn59rS6BblG7ro6Sv52Z7WgeE9Ls96a8hCVcnAKaLc81OchcbGFvo3DWOHNjdA_G6xHVxPwrx5PJZzwKzvt3UOYNCfZTGZJuFUWEF2Vvg4cmAWOX_Mjni6AGFattotknqf4ZwFwi3gWVG-Za07C24WgTWOL7Yc0B_-eGEnEhIFEXFWyzKlNISBrlrrhIaAm9G_OA8pL3GcpfoqnpFJ-vAuWyiSHdXSWcLBaeWLsO6q49JyPeQc"
        alt="Hẻm Hoa Giấy Quận 3"
        className="w-full h-full object-cover pointer-events-none"
      />

      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* 1. Bếp Nấu Hủ Tiếu Gia Truyền Hotspot (Left) */}
        <div
          className="absolute pointer-events-auto cursor-pointer flex items-center justify-center transition-transform z-20"
          style={{ left: '18%', top: '62%', width: '6%', height: '10%' }}
          onMouseEnter={() => {
            setHoveredTarget('kitchen');
            sound.playBlip(360, 0.02);
          }}
          onMouseLeave={() => setHoveredTarget(null)}
          onClick={() => handleTrigger('inspect_kitchen', 'ch4_kitchen', 'Bếp Nấu Hủ Tiếu Gia Truyền', 'gear')}
          onDragOver={(e) => { e.preventDefault(); setHoveredTarget('kitchen'); }}
          onDrop={(e) => handleDrop(e, 'inspect_kitchen')}
          title="Bếp Nấu Hủ Tiếu Gia Truyền"
        >
          <div className="relative flex items-center justify-center group/poi">
            {/* Radar pulse wave */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#f4a424] animate-ping absolute inset-0 opacity-40" />

            {/* Center icon badge */}
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${
                hoveredTarget === 'kitchen'
                  ? 'scale-125 bg-[#f4a424] text-[#180b07] border-white shadow-[0_0_12px_#f4a424]'
                  : isHuTieuCooked
                  ? 'bg-[#14532d]/90 text-[#86efac] border-[#86efac]'
                  : 'bg-[#2c1c18]/85 text-[#ffc67c] border-[#f4a424]'
              }`}
            >
              {isHuTieuCooked ? (
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>

            {/* Floating Tooltip Label */}
            <div
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1e100c] border-2 border-[#ffc67c] text-[#ffc67c] font-ui-label text-[11px] whitespace-nowrap pointer-events-none shadow-md transition-opacity z-30 ${
                hoveredTarget === 'kitchen' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {isHuTieuCooked ? 'Nồi Hủ Tiếu (Đã Nấu Xong)' : 'Bếp Nấu Hủ Tiếu Gia Truyền'}
            </div>
          </div>
        </div>

        {/* 2. Cổng Sắt Hoa Giấy Hotspot (Center Gate) */}
        <div
          className="absolute pointer-events-auto cursor-pointer flex items-center justify-center transition-transform z-20"
          style={{ left: '46%', top: '46%', width: '6%', height: '10%' }}
          onMouseEnter={() => {
            setHoveredTarget('gate');
            sound.playBlip(390, 0.02);
          }}
          onMouseLeave={() => setHoveredTarget(null)}
          onClick={() => handleTrigger('inspect_gate', 'ch4_gate', 'Cổng Nhà Cổ Hẻm Hoa Giấy', 'door')}
          onDragOver={(e) => { e.preventDefault(); setHoveredTarget('gate'); }}
          onDrop={(e) => handleDrop(e, 'inspect_gate')}
          title="Cổng Nhà Cổ Hẻm Hoa Giấy"
        >
          <div className="relative flex items-center justify-center group/poi">
            {/* Radar pulse wave */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#f4a424] animate-ping absolute inset-0 opacity-40" />

            {/* Center icon badge */}
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${
                hoveredTarget === 'gate'
                  ? 'scale-125 bg-[#f4a424] text-[#180b07] border-white shadow-[0_0_12px_#f4a424]'
                  : hasHomeKey
                  ? 'bg-[#14532d]/90 text-[#86efac] border-[#86efac]'
                  : 'bg-[#2c1c18]/85 text-[#ffc67c] border-[#f4a424]'
              }`}
            >
              {hasHomeKey ? (
                <DoorOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Key className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>

            {/* Floating Tooltip Label */}
            <div
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1e100c] border-2 border-[#ffc67c] text-[#ffc67c] font-ui-label text-[11px] whitespace-nowrap pointer-events-none shadow-md transition-opacity z-30 ${
                hoveredTarget === 'gate' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {hasHomeKey ? 'Cổng Sắt Hoa Giấy (Đã Mở Chìa)' : 'Cổng Nhà Cổ Hẻm Hoa Giấy'}
            </div>
          </div>
        </div>

        {/* 3. Tủ Chè Khảm Xà Cừ Hotspot (Right Ancient House) */}
        <div
          className="absolute pointer-events-auto cursor-pointer flex items-center justify-center transition-transform z-20"
          style={{ left: '76%', top: '50%', width: '6%', height: '10%' }}
          onMouseEnter={() => {
            setHoveredTarget('tea');
            sound.playBlip(420, 0.02);
          }}
          onMouseLeave={() => setHoveredTarget(null)}
          onClick={() => handleTrigger('inspect_tea_cabinet', 'ch4_tea_cabinet', 'Tủ Chè Khảm Xà Cừ', 'search')}
          onDragOver={(e) => { e.preventDefault(); setHoveredTarget('tea'); }}
          onDrop={(e) => handleDrop(e, 'inspect_tea_cabinet')}
          title="Tủ Chè Khảm Xà Cừ"
        >
          <div className="relative flex items-center justify-center group/poi">
            {/* Radar pulse wave */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#f4a424] animate-ping absolute inset-0 opacity-40" />

            {/* Center icon badge */}
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${
                hoveredTarget === 'tea'
                  ? 'scale-125 bg-[#f4a424] text-[#180b07] border-white shadow-[0_0_12px_#f4a424]'
                  : hasMosaicTile
                  ? 'bg-[#14532d]/90 text-[#86efac] border-[#86efac]'
                  : 'bg-[#2c1c18]/85 text-[#ffc67c] border-[#f4a424]'
              }`}
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>

            {/* Floating Tooltip Label */}
            <div
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1e100c] border-2 border-[#ffc67c] text-[#ffc67c] font-ui-label text-[11px] whitespace-nowrap pointer-events-none shadow-md transition-opacity z-30 ${
                hoveredTarget === 'tea' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {hasMosaicTile ? 'Tủ Chè Khảm Xà Cừ (Đã Lấy Mảnh Ghép)' : 'Tủ Chè Khảm Xà Cừ'}
            </div>
          </div>
        </div>

        {/* 4. Rương Gia Bảo Mosaic 3x3 Hotspot (Bottom Foreground) */}
        <div
          className="absolute pointer-events-auto cursor-pointer flex items-center justify-center transition-transform z-20"
          style={{ left: '56%', top: '78%', width: '6%', height: '10%' }}
          onMouseEnter={() => {
            setHoveredTarget('chest');
            sound.playBlip(450, 0.02);
          }}
          onMouseLeave={() => setHoveredTarget(null)}
          onClick={() => handleTrigger('inspect_chest', 'ch4_chest', 'Rương Gia Bảo Mosaic 3x3', 'gear')}
          onDragOver={(e) => { e.preventDefault(); setHoveredTarget('chest'); }}
          onDrop={(e) => handleDrop(e, 'inspect_chest')}
          title="Rương Gia Bảo Mosaic 3x3"
        >
          <div className="relative flex items-center justify-center group/poi">
            {/* Radar pulse wave */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#f4a424] animate-ping absolute inset-0 opacity-40" />

            {/* Center icon badge */}
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${
                hoveredTarget === 'chest'
                  ? 'scale-125 bg-[#f4a424] text-[#180b07] border-white shadow-[0_0_12px_#f4a424]'
                  : isChestOpened
                  ? 'bg-[#14532d]/90 text-[#86efac] border-[#86efac]'
                  : 'bg-[#2c1c18]/85 text-[#ffc67c] border-[#f4a424]'
              }`}
            >
              {isChestOpened ? (
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Box className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>

            {/* Floating Tooltip Label */}
            <div
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1e100c] border-2 border-[#ffc67c] text-[#ffc67c] font-ui-label text-[11px] whitespace-nowrap pointer-events-none shadow-md transition-opacity z-30 ${
                hoveredTarget === 'chest' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {isChestOpened ? 'Rương Gia Bảo (Đã Mở Nắp)' : 'Rương Gia Bảo (Khảm Tranh Mosaic)'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};