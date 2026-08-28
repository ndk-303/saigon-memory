import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, Sparkles, MapPin, Eye, DoorOpen } from 'lucide-react';
import { PointOfInterest, SceneId, ChapterId, ItemId } from '../types';
import { CHAPTER_POIS, CHAPTERS_INFO } from '../data/gameData';
import { sound } from '../utils/audio';
import { Chapter2Scene } from './scenes/Chapter2Scene';
import { Chapter3Scene } from './scenes/Chapter3Scene';
import { Chapter4Scene } from './scenes/Chapter4Scene';

interface MainGameCanvasProps {
  onSelectPOI: (poi: PointOfInterest) => void;
  onDropOnPOI?: (action: string, itemId: ItemId) => void;
  currentChapter: ChapterId;
  currentScene: SceneId;
  onChangeScene: (scene: SceneId) => void;
  isFuseboxRepaired: boolean;
  isMailboxUnlocked: boolean;
  isRadioTuned: boolean;
  isChestOpened: boolean;
  hasScissors?: boolean;
  isGuitarTuned?: boolean;
  hasHomeKey?: boolean;
  isHuTieuCooked?: boolean;
  hasMosaicTile?: boolean;
  hasTweezer?: boolean;
  hasRareStamp?: boolean;
  hasMagnifier?: boolean;
  onOpenMap: () => void;
}

export const MainGameCanvas: React.FC<MainGameCanvasProps> = ({
  onSelectPOI,
  onDropOnPOI,
  currentChapter,
  currentScene,
  onChangeScene,
  isFuseboxRepaired,
  isMailboxUnlocked,
  isRadioTuned,
  isChestOpened,
  hasScissors = false,
  isGuitarTuned = false,
  hasHomeKey = false,
  isHuTieuCooked = false,
  hasMosaicTile = false,
  hasTweezer = false,
  hasRareStamp = false,
  hasMagnifier = false,
  onOpenMap,
}) => {
  const [hoveredPoi, setHoveredPoi] = useState<PointOfInterest | null>(null);
  const [catHeart, setCatHeart] = useState(false);

  // Floating dust particles
  const [particles, setParticles] = useState<Array<{ id: number; left: number; top: number; size: number; duration: number }>>([]);

  useEffect(() => {
    const p = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 12 + 8,
    }));
    setParticles(p);
  }, [currentChapter]);

  const currentChapterInfo = CHAPTERS_INFO.find((c) => c.id === currentChapter) || CHAPTERS_INFO[0];
  const pois = CHAPTER_POIS[currentChapter] || CHAPTER_POIS[1];

  const getSceneBackground = () => {
    switch (currentChapter) {
      case 2:
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfJ0MfEUuYfOR6EvRR_P0VCFRSNBIANQQDLheAM9oXXduBdz7O6dM9tdM1ciAGexNC5OibdMDssPLSL8Pp9gIUpSZqzLvTgwx5zgcLDoWy14KFDNP5BSRbpdDKkjJmq_ym_CnDH0TztiT3iPop14Jw7gg4SmvBD-TtpovhvxMo7CUdyrJrslR_40Tp4JutqU9wnuZdnz2lGNcUA4UXWnwuPmUoViWhsZybeGTqmGZTS8YDgK9okrdFMA';
      case 1:
      default:
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ3eB-TFwvi_CkGaPRxKCs7_sKCs6NXYYC5QE3BRnMQjX_L0kNdwAjF22s2BAsV6nFMVAGwyIbh0Jef7eSMphHG-8AHJf9uPJQoYD9sw9UPjLlIhZx4LlGAUGsQ6Qna-Yokc_ysLFk6fEYeFYnGamq87wsbiXHHBW3Eerf8VszUQOQFQ7tal0-XKakhDHrd2TPldsDJdwkDmJQMZLIWlBt0AtUpp-9C2UTydi4BqLwfrDlc5hH0UhiLA';
    }
  };

  const getChapterColorTheme = () => {
    switch (currentChapter) {
      case 2:
        return { border: 'border-[#38bdf8]', text: 'text-[#38bdf8]', badgeBg: 'bg-[#0369a1]' };
      case 3:
        return { border: 'border-[#f59e0b]', text: 'text-[#f59e0b]', badgeBg: 'bg-[#854d0e]' };
      case 4:
        return { border: 'border-[#ec4899]', text: 'text-[#ec4899]', badgeBg: 'bg-[#9d174d]' };
      case 1:
      default:
        return { border: 'border-[#f4a424]', text: 'text-[#f4a424]', badgeBg: 'bg-[#b45309]' };
    }
  };

  const theme = getChapterColorTheme();

  return (
    <div className="relative flex-1 w-full h-full overflow-hidden select-none bg-[#180b07] flex items-center justify-center group">
      {/* CHAPTER 2 CUSTOM DEDICATED SCENE (Bưu Điện Trung Tâm Sài Gòn 1968) */}
      {currentChapter === 2 ? (
        <Chapter2Scene
          onSelectPOI={onSelectPOI}
          onDropOnPOI={onDropOnPOI}
          isMailboxUnlocked={isMailboxUnlocked}
          hasTweezer={hasTweezer}
          hasRareStamp={hasRareStamp}
          hasMagnifier={hasMagnifier}
        />
      ) : currentChapter === 3 ? (
        /* CHAPTER 3 CUSTOM DEDICATED SCENE (Chung Cư Tôn Thất Đạm 1985) */
        <Chapter3Scene
          onSelectPOI={onSelectPOI}
          onDropOnPOI={onDropOnPOI}
          isRadioTuned={isRadioTuned}
          isGuitarTuned={isGuitarTuned}
          hasScissors={hasScissors}
        />
      ) : currentChapter === 4 ? (
        /* CHAPTER 4 CUSTOM DEDICATED SCENE (Hẻm Hoa Giấy Quận 3 1995) */
        <Chapter4Scene
          onSelectPOI={onSelectPOI}
          onDropOnPOI={onDropOnPOI}
          hasHomeKey={hasHomeKey}
          isHuTieuCooked={isHuTieuCooked}
          isChestOpened={isChestOpened}
          hasMosaicTile={hasMosaicTile}
        />
      ) : (
        /* CHAPTER 1 CLASSICAL CANVAS SCENES */
        <>
          {/* Background Pixel Scene */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 filter contrast-105"
            style={{
              backgroundImage: `url('${getSceneBackground()}')`,
            }}
          />

          {/* Sleeping Cat Hearts Effect */}
          {catHeart && (
            <div className="absolute left-[39%] top-[55%] z-30 font-ui-label text-sm text-[#f87171] animate-bounce pointer-events-none">
              ❤️ Gừ gừ...
            </div>
          )}

          {/* Chapter 1 Fusebox status glow */}
          {currentChapter === 1 && (
            <div className="absolute left-[77%] top-[70%] z-20 pointer-events-none">
              {isFuseboxRepaired ? (
                <div className="flex items-center gap-1 bg-[#23501e]/80 border border-[#a1d494] px-1.5 py-0.5 rounded text-[9px] text-[#a1d494] font-ui-label animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
                  Nguồn điện đã nối
                </div>
              ) : (
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-[#ffc67c] rounded-full animate-spark" />
                  <div className="w-2 h-2 bg-[#ffb4ab] rounded-full animate-spark absolute -top-1 -right-1" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
            </div>
          )}

          {/* Chapter 2 Mailbox status glow */}
          {currentChapter === 2 && isMailboxUnlocked && (
            <div className="absolute left-[80%] top-[45%] z-20 pointer-events-none flex items-center gap-1 bg-[#23501e]/80 border border-[#a1d494] px-1.5 py-0.5 rounded text-[9px] text-[#a1d494] font-ui-label animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
              Hòm thư 72 đã mở
            </div>
          )}

          {/* Interactive Points of Interest (POIs) */}
          {pois.map((poi) => {
            const isHovered = hoveredPoi?.id === poi.id;

            return (
              <div
                key={poi.id}
                onClick={() => {
                  if (poi.id === 'poi_ch1_cat' || poi.targetAction === 'pet_cat') {
                    sound.playCatPurr();
                    setCatHeart(true);
                    setTimeout(() => setCatHeart(false), 2000);
                  } else {
                    sound.playClick();
                  }
                  onSelectPOI(poi);
                }}
                onMouseEnter={() => {
                  setHoveredPoi(poi);
                  sound.playBlip(380, 0.02);
                }}
                onMouseLeave={() => setHoveredPoi(null)}
                onDragOver={(e) => {
                  e.preventDefault();
                  setHoveredPoi(poi);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setHoveredPoi(null);
                  const sourceId = e.dataTransfer.getData('text/plain') as ItemId;
                  if (sourceId && onDropOnPOI) {
                    onDropOnPOI(poi.targetAction, sourceId);
                  }
                }}
                className="absolute z-20 cursor-pointer flex items-center justify-center transition-transform"
                style={{
                  left: `${poi.x}%`,
                  top: `${poi.y}%`,
                  width: `${poi.width}%`,
                  height: `${poi.height}%`,
                }}
                title={poi.title}
              >
                {/* Interactive Target Ring Indicator */}
                <div className="relative flex items-center justify-center group/poi">
                  {/* Radar pulse wave */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#f4a424] animate-ping absolute inset-0 opacity-40" />

                  {/* Center icon badge */}
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${
                      isHovered
                        ? 'scale-125 bg-[#f4a424] text-[#180b07] border-white shadow-[0_0_12px_#f4a424]'
                        : 'bg-[#2c1c18]/85 text-[#ffc67c] border-[#f4a424]'
                    }`}
                  >
                    {poi.cursorType === 'talk' ? (
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    ) : poi.cursorType === 'search' ? (
                      <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    ) : poi.cursorType === 'gear' ? (
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : poi.cursorType === 'door' ? (
                      <DoorOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>

                  {/* Floating Tooltip Label */}
                  <div
                    className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1e100c] border-2 border-[#ffc67c] text-[#ffc67c] font-ui-label text-[11px] whitespace-nowrap pointer-events-none shadow-md transition-opacity z-30 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {poi.title}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* Atmospheric Vignette & CRT Scanline Filter */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none z-10" />
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none z-10" />

      {/* Top Left Scene Location & Year Ribbon */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-3 bg-[#2c1c18]/90 backdrop-blur-md px-4 py-2 border-2 border-[#9f8e7a] shadow-lg">
        <MapPin className={`w-5 h-5 ${theme.text}`} />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-ui-label text-xs sm:text-sm text-[#ffc67c] font-bold uppercase tracking-wider">
              {currentChapterInfo.locationVi}
            </h2>
            <span className="px-1.5 py-0.2 bg-[#180b07] text-[#fcd34d] font-ui-label text-[10px] font-bold border border-[#524434]">
              {currentChapterInfo.year}
            </span>
          </div>
          <p className="font-meta-sm text-[10px] text-[#d7c3ae]">
            {currentChapterInfo.titleVi}
          </p>
        </div>
      </div>

      {/* Top Right Quick Chapter Map Button */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => {
            sound.playClick();
            onOpenMap();
          }}
          className="px-3 py-1.5 bg-[#2c1c18]/90 hover:bg-[#372621] text-[#ffc67c] font-ui-label text-xs font-bold border-2 border-[#9f8e7a] shadow-md flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <span className="text-xs">🗺️</span>
          <span>BẢN ĐỒ CHƯƠNG ({currentChapter}/4)</span>
        </button>
      </div>

      {/* Chapter Solved Banner to guide player to next chapter */}
      {((currentChapter === 1 && isFuseboxRepaired) ||
        (currentChapter === 2 && isMailboxUnlocked) ||
        (currentChapter === 3 && isRadioTuned)) && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-[#14532d]/95 border-2 border-[#86efac] text-[#bbf7d0] px-4 py-2.5 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.4)] backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#fde047] animate-spin" />
          <div className="text-xs sm:text-sm font-ui-label font-bold text-white">
            Màn chơi này đã giải xong!
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onOpenMap();
            }}
            className="px-3 py-1 bg-[#22c55e] hover:bg-[#16a34a] text-[#052e16] font-ui-label text-xs font-bold rounded cursor-pointer transition-all shadow hover:scale-105"
          >
            MỞ BẢN ĐỒ ĐỂ SANG MÀN {currentChapter + 1} ➔
          </button>
        </div>
      )}

      {/* Animated Floating Pixel Dust Particles */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#ffc67c]/40 animate-pulse"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: '0 0 4px #ffc67c',
            }}
          />
        ))}
      </div>
    </div>
  );
};
