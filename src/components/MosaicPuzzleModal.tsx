import React, { useState } from 'react';
import { LayoutGrid, Sparkles, CheckCircle2, Box, Lightbulb, Lock, Unlock, RefreshCcw, Landmark, Clock, Coffee, Mail, Send, Building2, Music, Flower2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface MosaicPuzzleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSolved: () => void;
  isAlreadySolved?: boolean;
}

interface TileInfo {
  val: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
  bgGradient: string;
}

export const MosaicPuzzleModal: React.FC<MosaicPuzzleModalProps> = ({
  isOpen,
  onClose,
  onSolved,
  isAlreadySolved = false,
}) => {
  // 3x3 Tile Board (0 represents the empty slot). Initial state is 1 move away from solved.
  const [board, setBoard] = useState<number[]>(
    isAlreadySolved ? [1, 2, 3, 4, 5, 6, 7, 8, 0] : [1, 2, 3, 4, 5, 6, 7, 0, 8]
  );
  const [moveCount, setMoveCount] = useState<number>(0);
  const [isSolved, setIsSolved] = useState(isAlreadySolved);
  const [showHint, setShowHint] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleTileClick = (index: number) => {
    if (isSolved) return;
    const emptyIndex = board.indexOf(0);

    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;

    // Check adjacency (Manhattan distance = 1)
    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1) {
      sound.playClick();
      const newBoard = [...board];
      newBoard[emptyIndex] = newBoard[index];
      newBoard[index] = 0;
      setBoard(newBoard);
      setMoveCount((prev) => prev + 1);

      const solved = newBoard.slice(0, 8).every((val, idx) => val === idx + 1);
      if (solved) {
        setIsSolved(true);
        sound.playQuestComplete();
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#38bdf8', '#f59e0b', '#ec4899', '#22c55e', '#fde047'],
        });
        setTimeout(() => {
          onSolved();
        }, 1800);
      }
    } else {
      sound.playSpark();
    }
  };

  const getTileData = (val: number): TileInfo => {
    const tileMap: Record<number, TileInfo> = {
      1: {
        val: 1,
        title: 'Chợ Bến Thành',
        subtitle: '1992',
        icon: <Landmark className="w-5 h-5 text-[#fef08a]" />,
        accentColor: '#f59e0b',
        bgGradient: 'from-[#b45309] to-[#78350f]',
      },
      2: {
        val: 2,
        title: 'Tháp Đồng Hồ',
        subtitle: 'Bến Thành',
        icon: <Clock className="w-5 h-5 text-[#fed7aa]" />,
        accentColor: '#f97316',
        bgGradient: 'from-[#c2410c] to-[#7c2d12]',
      },
      3: {
        val: 3,
        title: 'Nước Mía Cốt',
        subtitle: 'Chợ Cũ',
        icon: <Coffee className="w-5 h-5 text-[#a7f3d0]" />,
        accentColor: '#10b981',
        bgGradient: 'from-[#047857] to-[#064e3b]',
      },
      4: {
        val: 4,
        title: 'Bưu Điện TP',
        subtitle: '1968',
        icon: <Mail className="w-5 h-5 text-[#bae6fd]" />,
        accentColor: '#0284c7',
        bgGradient: 'from-[#0369a1] to-[#0c4a6e]',
      },
      5: {
        val: 5,
        title: 'Hòm Thư Cổ',
        subtitle: 'Bưu Điện',
        icon: <Send className="w-5 h-5 text-[#fbcfe8]" />,
        accentColor: '#e11d48',
        bgGradient: 'from-[#be123c] to-[#881337]',
      },
      6: {
        val: 6,
        title: 'Chung Cư 1985',
        subtitle: 'Tôn Thất Đạm',
        icon: <Building2 className="w-5 h-5 text-[#ddd6fe]" />,
        accentColor: '#8b5cf6',
        bgGradient: 'from-[#6d28d9] to-[#4c1d95]',
      },
      7: {
        val: 7,
        title: 'Guitar Thùng',
        subtitle: 'Dây Mi Mộc',
        icon: <Music className="w-5 h-5 text-[#fde047]" />,
        accentColor: '#eab308',
        bgGradient: 'from-[#a16207] to-[#713f12]',
      },
      8: {
        val: 8,
        title: 'Hẻm Hoa Giấy',
        subtitle: 'Nhà Cổ Q3',
        icon: <Flower2 className="w-5 h-5 text-[#f472b6]" />,
        accentColor: '#ec4899',
        bgGradient: 'from-[#be185d] to-[#831843]',
      },
    };

    return (
      tileMap[val] || {
        val,
        title: `Mảnh ${val}`,
        subtitle: 'Ký ức',
        icon: <Sparkles className="w-5 h-5" />,
        accentColor: '#38bdf8',
        bgGradient: 'from-[#0284c7] to-[#0369a1]',
      }
    );
  };

  const emptyIndex = board.indexOf(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md select-none animate-fadeIn">
      {/* Outer Vintage Outer Shell */}
      <div className="relative w-full max-w-[820px] bg-[#1e110a] border-8 border-[#8c7355] p-4 sm:p-6 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col">
        {/* Pixel Corner Inlays */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#f59e0b]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#f59e0b]" />

        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 mb-3 border-b-4 border-[#452718]">
          <div className="flex items-center gap-2.5">
            <Box className="w-6 h-6 text-[#f59e0b] animate-bounce" />
            <div>
              <h2 className="font-ui-label text-base sm:text-xl text-[#ffc67c] font-bold uppercase tracking-wider">
                RƯƠNG GIA BẢO KHẢM TRANH MOSAIC (1985)
              </h2>
              <p className="text-xs text-[#d7c3ae] font-ui-label">
                Căn Nhà Cổ Hẻm Hoa Giấy • Quận 3, Sài Gòn
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-3 py-1 bg-[#1e100c] text-[#ffb4ab] border-2 border-[#ffb4ab] hover:bg-[#ffb4ab] hover:text-[#1e100c] font-ui-label text-xs font-bold transition-colors cursor-pointer"
          >
            ĐÓNG [ESC]
          </button>
        </div>

        {/* FULL BESPOKE SVG & RETRO MAHOGANY CHEST CHASSIS */}
        <div className="relative w-full bg-gradient-to-b from-[#3a1d10] via-[#291309] to-[#170a04] border-4 border-[#5e371b] rounded-lg p-4 sm:p-6 shadow-inner flex flex-col items-center gap-4 overflow-hidden">
          
          {/* SVG Background Layer: Wood Grains, Mother-of-pearl Inlays, and Corner Brackets */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="brassGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
              <pattern id="woodGrain" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0,10 Q20,15 40,10 M0,25 Q20,20 40,25 M0,38 Q20,40 40,38" fill="none" stroke="#542e17" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#woodGrain)" />

            {/* Corner Brass Protectors */}
            <polygon points="0,0 50,0 50,15 15,15 15,50 0,50" fill="url(#brassGradient)" />
            <polygon points="100%,0 calc(100% - 50px),0 calc(100% - 50px),15 calc(100% - 15px),15 calc(100% - 15px),50 100%,50" fill="url(#brassGradient)" />
            <polygon points="0,100% 50,100% 50,calc(100% - 15px) 15,calc(100% - 15px) 15,calc(100% - 50px) 0,calc(100% - 50px)" fill="url(#brassGradient)" />
            <polygon points="100%,100% calc(100% - 50px),100% calc(100% - 50px),calc(100% - 15px) calc(100% - 15px),calc(100% - 15px) calc(100% - 15px),calc(100% - 50px) 100%,calc(100% - 50px)" fill="url(#brassGradient)" />
          </svg>

          {/* Chest Header / Status Row */}
          <div className="w-full flex justify-between items-center relative z-10 border-b border-[#5e371b] pb-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shadow-md transition-all ${
                  isSolved
                    ? 'bg-[#14532d] border-[#86efac] text-[#86efac]'
                    : 'bg-[#451a03] border-[#f59e0b] text-[#f59e0b]'
                }`}
              >
                {isSolved ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </div>
              <span className="font-ui-label text-xs sm:text-sm font-bold text-[#ffc67c] uppercase tracking-wider">
                {isSolved ? 'KHÓA ĐỒNG ĐÃ MỞ (CHEST UNLOCKED)' : 'Ổ KHÓA CỔ BƯỚM ĐANG KHÓA'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#86efac] bg-[#120804] px-2.5 py-1 rounded border border-[#5e371b]">
                LƯỢT TRƯỢT: <strong className="text-[#fde047]">{moveCount}</strong>
              </span>
            </div>
          </div>

          {/* CENTRAL RECESSED MOSAIC PANEL (Nắp Rương Khảm Tranh Mosaic 3x3) */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Outer carved wooden bezel frame */}
            <div className="p-3 sm:p-4 bg-[#120703] border-4 border-[#946b41] rounded-xl shadow-[inset_0_4px_24px_rgba(0,0,0,0.9),0_10px_25px_rgba(0,0,0,0.8)] relative">
              
              {/* Golden Mother-of-pearl Corner Trim Accents */}
              <div className="absolute top-1 left-1 w-3 h-3 bg-[#f59e0b] rotate-45" />
              <div className="absolute top-1 right-1 w-3 h-3 bg-[#f59e0b] rotate-45" />
              <div className="absolute bottom-1 left-1 w-3 h-3 bg-[#f59e0b] rotate-45" />
              <div className="absolute bottom-1 right-1 w-3 h-3 bg-[#f59e0b] rotate-45" />

              {/* 3x3 Sliding Tile Board Grid */}
              <div className="w-[290px] sm:w-[380px] h-[290px] sm:h-[380px] bg-[#0c0502] border-2 border-[#542d17] p-2 grid grid-cols-3 gap-2 sm:gap-2.5 rounded-lg shadow-inner">
                {board.map((tileVal, idx) => {
                  const isEmpty = tileVal === 0;

                  if (isEmpty) {
                    return (
                      <div
                        key={idx}
                        className="w-full h-full bg-[#180b06]/80 border-2 border-dashed border-[#542d17] rounded-md flex flex-col items-center justify-center text-[#542d17] shadow-inner"
                      >
                        <span className="font-ui-label text-[10px] uppercase font-bold tracking-widest opacity-40">
                          LÒNG RỖNG
                        </span>
                      </div>
                    );
                  }

                  const info = getTileData(tileVal);
                  const row = Math.floor(idx / 3);
                  const col = idx % 3;
                  const emptyRow = Math.floor(emptyIndex / 3);
                  const emptyCol = emptyIndex % 3;
                  const isMovable = Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;

                  return (
                    <button
                      key={idx}
                      disabled={isSolved}
                      onClick={() => handleTileClick(idx)}
                      onMouseEnter={() => {
                        setHoveredIdx(idx);
                        if (isMovable) sound.playBlip(380, 0.02);
                      }}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className={`relative w-full h-full rounded-md border-2 p-1 sm:p-2 flex flex-col justify-between items-center transition-all cursor-pointer select-none overflow-hidden ${
                        isSolved
                          ? 'bg-gradient-to-br from-[#14532d] via-[#166534] to-[#052e16] border-[#86efac] text-white shadow-[0_0_12px_rgba(134,239,172,0.4)]'
                          : isMovable
                          ? `bg-gradient-to-br ${info.bgGradient} border-[${info.accentColor}] hover:scale-102 hover:border-[#fef08a] shadow-[0_4px_12px_rgba(0,0,0,0.6)] active:scale-95`
                          : `bg-gradient-to-br from-[#2c150c] to-[#180b06] border-[#5e371b] opacity-80 cursor-not-allowed`
                      }`}
                      style={{
                        borderColor: isSolved ? '#86efac' : isMovable ? info.accentColor : '#5e371b',
                      }}
                      title={isMovable ? `Nhấp để trượt ${info.title}` : info.title}
                    >
                      {/* Ceramic Glaze Reflection Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

                      {/* Top Header: Tile Number & Mini Badge */}
                      <div className="w-full flex justify-between items-center relative z-10">
                        <span
                          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[9px] sm:text-[10px] font-black flex items-center justify-center shadow-md font-mono border"
                          style={{
                            backgroundColor: '#120804',
                            color: info.accentColor,
                            borderColor: info.accentColor,
                          }}
                        >
                          {tileVal}
                        </span>

                        {isMovable && !isSolved && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#fde047] animate-ping" />
                        )}
                      </div>

                      {/* Center Graphic Icon Motif */}
                      <div className="relative z-10 my-auto flex flex-col items-center">
                        <div
                          className="w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-inner border border-white/20"
                          style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.35)',
                          }}
                        >
                          {info.icon}
                        </div>
                      </div>

                      {/* Bottom Title Label */}
                      <div className="w-full relative z-10 text-center">
                        <span className="font-ui-label text-[9px] sm:text-[11px] font-bold text-white uppercase tracking-tight block truncate leading-tight drop-shadow-md">
                          {info.title}
                        </span>
                        <span className="font-ui-label text-[8px] sm:text-[9px] text-[#fef08a]/80 block truncate leading-none mt-0.5">
                          {info.subtitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Victory Unlocked Chest Banner */}
          {isSolved && (
            <div className="w-full bg-gradient-to-r from-[#14532d] via-[#166534] to-[#14532d] border-2 border-[#86efac] p-3 rounded-lg flex items-center justify-center gap-2.5 shadow-xl animate-bounce">
              <CheckCircle2 className="w-6 h-6 text-[#86efac] shrink-0" />
              <div className="text-center">
                <p className="font-ui-label text-xs sm:text-sm text-white font-black uppercase tracking-wider">
                  NẮP RƯƠNG GIA BẢO ĐÃ BẬT MỞ!
                </p>
                <p className="text-[11px] text-[#bbf7d0] font-dialogue-text">
                  Bức tranh ký ức 4 chặng Sài Gòn đã được ghép liền lạc trọn vẹn.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer & Guidance */}
        <div className="flex flex-col gap-1.5 mt-3">
          <div className="flex justify-between items-center">
            <p className="font-dialogue-text text-xs text-[#d7c3ae]">
              Nhấp vào các mảnh ghép bên cạnh ô trống để trượt các phiến đá mosaic theo thứ tự 1 đến 8.
            </p>
            <button
              onClick={() => {
                sound.playClick();
                setShowHint((prev) => !prev);
              }}
              className="text-xs font-dialogue-text text-[#fde047] hover:text-white flex items-center gap-1 cursor-pointer underline whitespace-nowrap ml-2"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}</span>
            </button>
          </div>

          {showHint && (
            <div className="p-2.5 bg-[#1e100c] border border-[#f59e0b] rounded text-xs text-[#fde047] font-dialogue-text animate-fadeIn shadow-md">
              💡 <strong>Gợi ý:</strong> Xếp các mảnh gốm mosaic theo đúng thứ tự 4 chặng ký ức: 
              <br />
              • Hàng 1: <strong>1. Chợ Bến Thành</strong> - <strong>2. Tháp Đồng Hồ</strong> - <strong>3. Nước Mía</strong>
              <br />
              • Hàng 2: <strong>4. Bưu Điện TP</strong> - <strong>5. Hòm Thư</strong> - <strong>6. Chung Cư 1985</strong>
              <br />
              • Hàng 3: <strong>7. Guitar Mộc</strong> - <strong>8. Hẻm Hoa Giấy</strong> - <strong>[Ô Trống]</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
