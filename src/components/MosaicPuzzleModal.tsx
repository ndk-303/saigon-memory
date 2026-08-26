import React, { useState } from 'react';
import { LayoutGrid, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface MosaicPuzzleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSolved: () => void;
  isAlreadySolved?: boolean;
}

export const MosaicPuzzleModal: React.FC<MosaicPuzzleModalProps> = ({
  isOpen,
  onClose,
  onSolved,
  isAlreadySolved = false,
}) => {
  // 3x3 Tile Board (0 represents the empty slot). Initial state is 1 click away from winning.
  const [board, setBoard] = useState<number[]>(isAlreadySolved ? [1, 2, 3, 4, 5, 6, 7, 8, 0] : [1, 2, 3, 4, 5, 6, 7, 0, 8]);
  const [isSolved, setIsSolved] = useState(isAlreadySolved);

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

      // Check win condition [1, 2, 3, 4, 5, 6, 7, 8, 0]
      const solved = newBoard.slice(0, 8).every((val, idx) => val === idx + 1);
      if (solved) {
        setIsSolved(true);
        sound.playQuestComplete();
        confetti({
          particleCount: 90,
          spread: 95,
          origin: { y: 0.5 },
          colors: ['#0284c7', '#f59e0b', '#ec4899', '#22c55e'],
        });
        setTimeout(() => {
          onSolved();
        }, 1500);
      }
    } else {
      sound.playSpark();
    }
  };

  const getTileName = (val: number) => {
    const titles: Record<number, string> = {
      1: 'Chợ Bến Thành (1992)',
      2: 'Tháp Đồng Hồ',
      3: 'Quầy Nước Mía',
      4: 'Bưu Điện Sài Gòn',
      5: 'Hòm Thư 1968',
      6: 'Chung Cư Tôn Thất Đạm',
      7: 'Đàn Guitar Mộc',
      8: 'Hẻm Hoa Giấy Q3',
    };
    return titles[val] || '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-[620px] bg-[#2c1c18] border-8 border-[#0284c7] p-6 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-[#38bdf8]" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-[#38bdf8]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#38bdf8]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#38bdf8]" />

        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 mb-4 border-b-4 border-[#524434]">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-[#38bdf8]" />
            <div>
              <h2 className="font-ui-label text-lg sm:text-xl text-[#ffc67c] font-bold uppercase tracking-wider">
                TRANH GHÉP MOSAIC NẮP RƯƠNG
              </h2>
              <p className="text-xs text-[#d7c3ae] font-ui-label">
                Căn Nhà Cổ Hẻm Hoa Giấy (Quận 3)
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-3 py-1 bg-[#1e100c] text-[#ffb4ab] border-2 border-[#ffb4ab] hover:bg-[#ffb4ab] hover:text-[#1e100c] font-ui-label text-xs font-bold transition-colors"
          >
            ĐÓNG [ESC]
          </button>
        </div>

        {/* Description Banner */}
        <p className="text-xs text-[#f9dcd5] font-dialogue-text bg-[#180b07] border border-[#524434] p-2.5 mb-4 text-center">
          Nhấp vào mảnh ghép bên cạnh ô trống để trượt mảnh đá mosaic, hoàn thành bức tranh 4 chặng ký ức Sài Gòn.
        </p>

        {/* 3x3 Tile Board Grid */}
        <div className="w-[300px] sm:w-[360px] h-[300px] sm:h-[360px] mx-auto bg-[#1a100c] border-4 border-[#0369a1] p-2 grid grid-cols-3 gap-2 shadow-2xl mb-4">
          {board.map((tileVal, idx) => {
            const isEmpty = tileVal === 0;

            if (isEmpty) {
              return (
                <div
                  key={idx}
                  className="w-full h-full bg-[#0f172a]/60 border-2 border-dashed border-[#334155] flex items-center justify-center text-[10px] text-[#64748b] font-ui-label"
                >
                  Ô Trống
                </div>
              );
            }

            return (
              <button
                key={idx}
                disabled={isSolved}
                onClick={() => handleTileClick(idx)}
                className={`relative w-full h-full border-2 flex flex-col items-center justify-center p-1.5 transition-transform hover:scale-102 cursor-pointer shadow-md ${
                  isSolved
                    ? 'bg-[#0369a1] border-[#38bdf8] text-white'
                    : 'bg-[#1e293b] border-[#0284c7] hover:bg-[#0284c7] text-[#ffedd5]'
                }`}
              >
                {/* Tile Number Badge */}
                <span className="absolute top-1 left-1.5 w-5 h-5 bg-[#0f172a] text-[#f59e0b] border border-[#d97706] rounded-full text-[10px] font-bold flex items-center justify-center">
                  {tileVal}
                </span>

                {/* Decorative Pixel Mosaic Pattern */}
                <div className="w-8 h-8 rounded bg-gradient-to-tr from-[#0284c7] to-[#38bdf8] border border-white/40 mb-1 shadow-inner flex items-center justify-center text-xs font-bold text-white">
                  ✦
                </div>

                <span className="text-[10px] font-ui-label text-center leading-tight line-clamp-1 font-bold text-[#ffc67c]">
                  {getTileName(tileVal)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Win / Complete Banner */}
        <div className="text-center">
          {isSolved ? (
            <div className="inline-flex items-center gap-2 text-sm text-[#4ade80] font-ui-label font-bold bg-[#14532d] px-4 py-2 border border-[#22c55e] animate-pulse">
              <CheckCircle2 className="w-5 h-5" />
              TRANH MOSAIC ĐÃ HOÀN TẤT! NẮP RƯƠNG GỖ LIM ĐÃ MỞ!
            </div>
          ) : (
            <p className="text-xs text-[#9f8e7a] font-ui-label">
              Bức tranh hoàn chỉnh tượng trưng cho: Tình Bạn - Tình Yêu - Đam Mê - Di Sản.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
