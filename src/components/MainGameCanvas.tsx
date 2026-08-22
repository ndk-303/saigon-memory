import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, Sparkles, MapPin, Eye } from 'lucide-react';
import { PointOfInterest, SceneId } from '../types';
import { MAIN_SCENE_POIS } from '../data/gameData';
import { sound } from '../utils/audio';

interface MainGameCanvasProps {
  onSelectPOI: (poi: PointOfInterest) => void;
  isFuseboxRepaired: boolean;
  hasGivenJuice: boolean;
  currentScene: SceneId;
  onChangeScene: (scene: SceneId) => void;
}

export const MainGameCanvas: React.FC<MainGameCanvasProps> = ({
  onSelectPOI,
  isFuseboxRepaired,
  hasGivenJuice,
  currentScene,
  onChangeScene,
}) => {
  const [hoveredPoi, setHoveredPoi] = useState<PointOfInterest | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [catHeart, setCatHeart] = useState(false);

  // Handle ambient floating dust particles
  const [particles, setParticles] = useState<Array<{ id: number; left: number; top: number; size: number; duration: number }>>([]);

  useEffect(() => {
    const p = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 12 + 8,
    }));
    setParticles(p);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getSceneBackground = () => {
    switch (currentScene) {
      case 'FUSE_BOX_DETAIL':
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfJ0MfEUuYfOR6EvRR_P0VCFRSNBIANQQDLheAM9oXXduBdz7O6dM9tdM1ciAGexNC5OibdMDssPLSL8Pp9gIUpSZqzLvTgwx5zgcLDoWy14KFDNP5BSRbpdDKkjJmq_ym_CnDH0TztiT3iPop14Jw7gg4SmvBD-TtpovhvxMo7CUdyrJrslR_40Tp4JutqU9wnuZdnz2lGNcUA4UXWnwuPmUoViWhsZybeGTqmGZTS8YDgK9okrdFMA';
      case 'CHE_STALL_DETAIL':
      case 'MAIN_STREET':
      default:
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ3eB-TFwvi_CkGaPRxKCs7_sKCs6NXYYC5QE3BRnMQjX_L0kNdwAjF22s2BAsV6nFMVAGwyIbh0Jef7eSMphHG-8AHJf9uPJQoYD9sw9UPjLlIhZx4LlGAUGsQ6Qna-Yokc_ysLFk6fEYeFYnGamq87wsbiXHHBW3Eerf8VszUQOQFQ7tal0-XKakhDHrd2TPldsDJdwkDmJQMZLIWlBt0AtUpp-9C2UTydi4BqLwfrDlc5hH0UhiLA';
    }
  };

  return (
    <div
      className="relative flex-1 w-full h-full overflow-hidden select-none bg-[#180b07] flex items-center justify-center group"
      onMouseMove={handleMouseMove}
    >
      {/* Background Pixel Scene */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 filter contrast-105"
        style={{
          backgroundImage: `url('${getSceneBackground()}')`,
        }}
      />

      {/* Atmospheric Golden Sunset & CRT Scanline Filter */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none z-10" />
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none z-10" />

      {/* Top Scene Location Ribbon */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#2c1c18]/90 backdrop-blur-md px-3.5 py-1.5 border-2 border-[#9f8e7a] shadow-lg">
        <MapPin className="w-4 h-4 text-[#f4a424]" />
        <div>
          <h2 className="font-ui-label text-xs sm:text-sm text-[#ffc67c] font-bold uppercase tracking-wider">
            SÀI GÒN 1992
          </h2>
          <p className="font-meta-sm text-[10px] text-[#d7c3ae]">
            Chương I: Ký Ức Chợ Bến Thành
          </p>
        </div>
      </div>

      {/* Camera View Switcher (Subtle exploration buttons) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-[#2c1c18]/85 backdrop-blur-sm p-1 border border-[#524434]">
        <button
          onClick={() => {
            sound.playClick();
            onChangeScene('MAIN_STREET');
          }}
          className={`px-2 py-1 text-[11px] font-ui-label font-bold border transition-colors ${
            currentScene === 'MAIN_STREET'
              ? 'bg-[#f4a424] text-[#180b07] border-[#ffc67c]'
              : 'bg-[#1e100c] text-[#d7c3ae] border-[#524434] hover:bg-[#372621]'
          }`}
          title="Toàn cảnh góc chợ Bến Thành"
        >
          Toàn Cảnh
        </button>
        <button
          onClick={() => {
            sound.playClick();
            onChangeScene('FUSE_BOX_DETAIL');
          }}
          className={`px-2 py-1 text-[11px] font-ui-label font-bold border transition-colors ${
            currentScene === 'FUSE_BOX_DETAIL'
              ? 'bg-[#f4a424] text-[#180b07] border-[#ffc67c]'
              : 'bg-[#1e100c] text-[#d7c3ae] border-[#524434] hover:bg-[#372621]'
          }`}
          title="Cận cảnh cột đèn & hộp điện"
        >
          Cột Đèn
        </button>
      </div>

      {/* Animated Floating Pixel Dust */}
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

      {/* Traffic Light State & Live Sparks on Electrical Fuse Box */}
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

      {/* Sleeping Cat Hearts Effect */}
      {catHeart && (
        <div className="absolute left-[39%] top-[55%] z-30 font-ui-label text-sm text-[#f87171] animate-bounce pointer-events-none">
          ❤️ Gừ gừ...
        </div>
      )}

      {/* Interactive Points of Interest (POIs) */}
      {MAIN_SCENE_POIS.map((poi) => {
        const isHovered = hoveredPoi?.id === poi.id;
        const isFusebox = poi.id === 'poi_fusebox';

        return (
          <div
            key={poi.id}
            onClick={() => {
              if (poi.id === 'poi_cat') {
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
                    : isFusebox && !isFuseboxRepaired
                    ? 'bg-[#ffb4ab]/30 text-[#ffb4ab] border-[#ffb4ab] animate-pulse'
                    : 'bg-[#2c1c18]/80 text-[#ffc67c] border-[#f4a424]'
                }`}
              >
                {poi.cursorType === 'talk' ? (
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                ) : poi.cursorType === 'search' ? (
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                ) : poi.cursorType === 'hand' ? (
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </div>

              {/* Tooltip Label */}
              <div
                className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1e100c] border-2 border-[#ffc67c] text-[#ffc67c] font-ui-label text-[11px] whitespace-nowrap pointer-events-none shadow-md transition-opacity ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {poi.title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
