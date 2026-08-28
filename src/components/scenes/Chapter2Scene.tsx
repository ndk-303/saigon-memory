import React, { useState } from 'react';
import { PointOfInterest } from '../../types';
import { sound } from '../../utils/audio';
import { Search, Sparkles, MessageSquare } from 'lucide-react';

interface Chapter2SceneProps {
  onSelectPOI: (poi: PointOfInterest) => void;
  isMailboxUnlocked: boolean;
  hasTweezer?: boolean;
  hasRareStamp?: boolean;
  hasMagnifier?: boolean;
}

export const Chapter2Scene: React.FC<Chapter2SceneProps> = ({
  onSelectPOI,
  isMailboxUnlocked,
  hasTweezer = false,
  hasRareStamp = false,
  hasMagnifier = false,
}) => {
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);

  const handleTrigger = (action: string, id: string, title: string, cursorType: 'gear' | 'search' | 'talk' = 'gear') => {
    sound.playClick();
    onSelectPOI({
      id,
      chapter: 2,
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

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#1e130c] flex items-center justify-center">
      {/* 16-bit retro pixel art game scene from Stitch */}
      <img
        src="https://lh3.googleusercontent.com/aida/AEtjO1UL6x4M6OowzXhGd3atPfPYtVF-Puu6GQTqf_r2RWFMYuvidcorvakAdNpbKv9XZ0VD3jJAE88c2Amq3G2B3eLglosJ3P2Nzg3NexHG0z9kDGQA6OCIFxiynXuGiSrNWyBG35mj8_uUqj_UF-1Pj8E3tkhCeB6suTe_pz1d68VqVcf0NFo_ceG8rNAtD7-esFbSiZsQOB_iRgpxuRwPldOcdBJg2eZ83fegHLgt9d4x3KmJGBbp0PhUGiA-"
        alt="Bưu Điện Trung Tâm Sài Gòn"
        className="w-full h-full object-cover pointer-events-none"
      />

      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Peter's Hotspot */}
        <div
          className="absolute pointer-events-auto cursor-pointer flex items-center justify-center transition-transform z-20"
          style={{ left: '40%', top: '48%', width: '6%', height: '10%' }}
          onMouseEnter={() => {
            setHoveredTarget('peter');
            sound.playBlip(380, 0.02);
          }}
          onMouseLeave={() => setHoveredTarget(null)}
          onClick={() => handleTrigger('talk_peter', 'peter', 'Du Khách Peter', 'talk')}
          title="Du Khách Peter"
        >
          <div className="relative flex items-center justify-center group/poi">
            {/* Radar pulse wave */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#f4a424] animate-ping absolute inset-0 opacity-40" />

            {/* Center icon badge */}
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${
                hoveredTarget === 'peter'
                  ? 'scale-125 bg-[#f4a424] text-[#180b07] border-white shadow-[0_0_12px_#f4a424]'
                  : 'bg-[#2c1c18]/85 text-[#ffc67c] border-[#f4a424]'
              }`}
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </div>

            {/* Floating Tooltip Label */}
            <div
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1e100c] border-2 border-[#ffc67c] text-[#ffc67c] font-ui-label text-[11px] whitespace-nowrap pointer-events-none shadow-md transition-opacity z-30 ${
                hoveredTarget === 'peter' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {hasMagnifier ? 'Du Khách Peter (Đã đổi Kính Lúp)' : 'Nói chuyện với Peter'}
            </div>
          </div>
        </div>

        {/* Mailbox 72 Hotspot */}
        <div
          className="absolute pointer-events-auto cursor-pointer flex items-center justify-center transition-transform z-20"
          style={{ left: '72%', top: '38%', width: '6%', height: '10%' }}
          onMouseEnter={() => {
            setHoveredTarget('mailbox');
            sound.playBlip(420, 0.02);
          }}
          onMouseLeave={() => setHoveredTarget(null)}
          onClick={() => handleTrigger('inspect_mailbox_72', 'mailbox_72', 'Hòm Thư Số 72', 'gear')}
          title="Hòm Thư Số 72"
        >
          <div className="relative flex items-center justify-center group/poi">
            {/* Radar pulse wave */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#f4a424] animate-ping absolute inset-0 opacity-40" />

            {/* Center icon badge */}
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${
                hoveredTarget === 'mailbox'
                  ? 'scale-125 bg-[#f4a424] text-[#180b07] border-white shadow-[0_0_12px_#f4a424]'
                  : isMailboxUnlocked
                  ? 'bg-[#14532d]/90 text-[#86efac] border-[#86efac]'
                  : 'bg-[#2c1c18]/85 text-[#ffc67c] border-[#f4a424]'
              }`}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>

            {/* Floating Tooltip Label */}
            <div
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1e100c] border-2 border-[#ffc67c] text-[#ffc67c] font-ui-label text-[11px] whitespace-nowrap pointer-events-none shadow-md transition-opacity z-30 ${
                hoveredTarget === 'mailbox' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {isMailboxUnlocked ? 'Hòm Thư Số 72 (Đã Mở)' : 'Hòm Thư Số 72 (Mật Mã 4 Số)'}
            </div>
          </div>
        </div>

        {/* Stamp Floor Crack Hotspot */}
        {!hasRareStamp && (
          <div
            className="absolute pointer-events-auto cursor-pointer flex items-center justify-center transition-transform z-20"
            style={{ left: '44%', top: '82%', width: '6%', height: '10%' }}
            onMouseEnter={() => {
              setHoveredTarget('stamp');
              sound.playBlip(360, 0.02);
            }}
            onMouseLeave={() => setHoveredTarget(null)}
            onClick={() => handleTrigger('inspect_floor_crack', 'floor_stamp', 'Kẽ Gạch & Tem', 'search')}
            title="Kẽ Gạch & Tem Cổ"
          >
            <div className="relative flex items-center justify-center group/poi">
              {/* Radar pulse wave */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#f4a424] animate-ping absolute inset-0 opacity-40" />

              {/* Center icon badge */}
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${
                  hoveredTarget === 'stamp'
                    ? 'scale-125 bg-[#f4a424] text-[#180b07] border-white shadow-[0_0_12px_#f4a424]'
                    : 'bg-[#2c1c18]/85 text-[#ffc67c] border-[#f4a424]'
                }`}
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>

              {/* Floating Tooltip Label */}
              <div
                className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1e100c] border-2 border-[#ffc67c] text-[#ffc67c] font-ui-label text-[11px] whitespace-nowrap pointer-events-none shadow-md transition-opacity z-30 ${
                  hoveredTarget === 'stamp' ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Vật kẹt dưới sàn gạch
              </div>
            </div>
          </div>
        )}

        {/* Writing Desk & Tweezer Hotspot */}
        <div
          className="absolute pointer-events-auto cursor-pointer flex items-center justify-center transition-transform z-20"
          style={{ left: '86%', top: '65%', width: '6%', height: '10%' }}
          onMouseEnter={() => {
            setHoveredTarget('desk');
            sound.playBlip(340, 0.02);
          }}
          onMouseLeave={() => setHoveredTarget(null)}
          onClick={() => handleTrigger('inspect_souvenir', 'souvenir_table', 'Bàn Viết Thư Bưu Điện', 'search')}
          title="Bàn Viết Thư Bưu Điện"
        >
          <div className="relative flex items-center justify-center group/poi">
            {/* Radar pulse wave */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#f4a424] animate-ping absolute inset-0 opacity-40" />

            {/* Center icon badge */}
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${
                hoveredTarget === 'desk'
                  ? 'scale-125 bg-[#f4a424] text-[#180b07] border-white shadow-[0_0_12px_#f4a424]'
                  : 'bg-[#2c1c18]/85 text-[#ffc67c] border-[#f4a424]'
              }`}
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>

            {/* Floating Tooltip Label */}
            <div
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1e100c] border-2 border-[#ffc67c] text-[#ffc67c] font-ui-label text-[11px] whitespace-nowrap pointer-events-none shadow-md transition-opacity z-30 ${
                hoveredTarget === 'desk' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {hasTweezer ? 'Bàn Viết Thư Bưu Điện' : 'Bàn Viết Thư (Có Kẹp Gắp Tem)'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
