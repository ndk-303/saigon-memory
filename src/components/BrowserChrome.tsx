import React from 'react';
import { Volume2, VolumeX, BookOpen, RefreshCw, Layers, ShieldCheck, ExternalLink } from 'lucide-react';
import { sound } from '../utils/audio';

interface BrowserChromeProps {
  url?: string;
  isMuted: boolean;
  onToggleMute: () => void;
  inventoryLayout: 'right' | 'bottom';
  onToggleLayout: () => void;
  onOpenQuestLog: () => void;
  onResetGame: () => void;
  activeQuestsCount: number;
}

export const BrowserChrome: React.FC<BrowserChromeProps> = ({
  url = 'https://saigonmemory.game/chapter-1-ben-thanh',
  isMuted,
  onToggleMute,
  inventoryLayout,
  onToggleLayout,
  onOpenQuestLog,
  onResetGame,
  activeQuestsCount,
}) => {
  return (
    <div className="w-full bg-[#372622] border-b-4 border-[#524434] select-none shrink-0 z-30 shadow-md">
      {/* Chrome address & control bar */}
      <div className="h-12 px-4 flex items-center justify-between gap-3 text-[#d7c3ae] font-ui-label">
        {/* Window controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#d93a30] hover:opacity-80 cursor-pointer shadow-sm" title="Đóng" onClick={onResetGame} />
          <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#d99f1d] hover:opacity-80 cursor-pointer shadow-sm" title="Thu nhỏ" onClick={onToggleLayout} />
          <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1fa733] hover:opacity-80 cursor-pointer shadow-sm" title="Toàn màn hình" />
          <span className="hidden sm:inline-block ml-2 text-xs text-[#ffc67c] font-bold uppercase tracking-wider">
            SAIGON MEMORY
          </span>
        </div>

        {/* Omnibar / Address bar */}
        <div className="flex-1 max-w-xl bg-[#271814] h-8 rounded-md flex items-center px-3 gap-2 border border-[#524434] text-xs shadow-inner overflow-hidden">
          <ShieldCheck className="w-4 h-4 text-[#a1d494] shrink-0" />
          <span className="text-[#fadcd5] font-dialogue-text truncate flex-1">
            {url}
          </span>
          <span className="hidden md:inline-flex items-center text-[10px] text-[#ffc67c] bg-[#1e100c] px-1.5 py-0.5 rounded border border-[#524434]">
            1992
          </span>
        </div>

        {/* Quick Toolbar Actions */}
        <div className="flex items-center gap-2 text-sm shrink-0">
          {/* Quest Log Button */}
          <button
            id="quest-log-btn"
            onClick={() => {
              sound.playClick();
              onOpenQuestLog();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#271814] hover:bg-[#43302c] border border-[#9f8e7a] rounded text-[#ffc67c] transition-colors relative text-xs"
            title="Mở Sổ Tay Nhiệm Vụ"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#ffc67c]" />
            <span className="hidden sm:inline font-bold">Nhiệm Vụ</span>
            {activeQuestsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#ffc67c] animate-ping absolute -top-1 -right-1" />
            )}
          </button>

          {/* Layout Switcher (Right panel vs Bottom bar) */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleLayout();
            }}
            className="p-1.5 bg-[#271814] hover:bg-[#43302c] border border-[#524434] rounded text-[#d7c3ae] transition-colors"
            title={`Chuyển giao diện túi đồ (Đang: ${inventoryLayout === 'right' ? 'Bên phải' : 'Thanh dưới'})`}
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleMute();
              sound.playClick();
            }}
            className="p-1.5 bg-[#271814] hover:bg-[#43302c] border border-[#524434] rounded text-[#ffc67c] transition-colors"
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#ffb4ab]" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Reset */}
          <button
            onClick={() => {
              sound.playClick();
              onResetGame();
            }}
            className="p-1.5 bg-[#271814] hover:bg-[#43302c] border border-[#524434] rounded text-[#d7c3ae] transition-colors"
            title="Chơi lại từ đầu"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const GameStatusBar: React.FC<{
  fps?: number;
  locationName?: string;
}> = ({ fps = 60, locationName = "Cửa Nam Chợ Bến Thành, Quận 1" }) => {
  return (
    <div className="h-7 bg-[#180b07] border-t-2 border-[#524434] flex items-center justify-between px-4 text-[11px] text-[#9f8e7a] font-ui-label shrink-0 z-30 select-none">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-[#a1d494]">
          <span className="w-2 h-2 rounded-full bg-[#27c93f] animate-pulse" />
          Đang kết nối
        </span>
        <span className="hidden sm:inline text-[#d7c3ae]">
          {locationName}
        </span>
        <span className="hidden md:inline text-[#9f8e7a]">
          Tọa độ: 10.7725° N, 106.6980° E
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[#ffc67c]">Thời gian: 12:00 PM</span>
        <span className="text-[#d7c3ae]">FPS: {fps}</span>
        <span className="hidden sm:inline text-[#9f8e7a]">MEM: 124MB</span>
      </div>
    </div>
  );
};
