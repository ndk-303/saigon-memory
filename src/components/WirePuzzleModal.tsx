import React, { useState } from 'react';
import { X, Scissors, Cable, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface WirePuzzleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSolved: () => void;
  isAlreadySolved?: boolean;
}

type WireColor = 'red' | 'yellow' | 'green';

interface WireConnection {
  color: WireColor;
  connected: boolean;
}

export const WirePuzzleModal: React.FC<WirePuzzleModalProps> = ({
  isOpen,
  onClose,
  onSolved,
  isAlreadySolved = false,
}) => {
  const [connections, setConnections] = useState<Record<WireColor, boolean>>({
    red: isAlreadySolved,
    yellow: true, // Yellow is partially connected initially as seen in Image 8
    green: isAlreadySolved,
  });

  const [activeTool, setActiveTool] = useState<'cut' | 'connect'>('connect');
  const [selectedTerminal, setSelectedTerminal] = useState<{ side: 'left' | 'right'; color: WireColor } | null>(null);
  const [solved, setSolved] = useState(isAlreadySolved);
  const [showMessage, setShowMessage] = useState(isAlreadySolved ? 'Mạch điện đã hoạt động hoàn hảo!' : '');

  if (!isOpen) return null;

  const handleTerminalClick = (side: 'left' | 'right', color: WireColor) => {
    if (solved) return;

    if (activeTool === 'cut') {
      sound.playSpark();
      setConnections(prev => ({ ...prev, [color]: false }));
      setShowMessage(`Đã cắt mạch dây ${color === 'red' ? 'Đỏ' : color === 'yellow' ? 'Vàng' : 'Xanh'}`);
      return;
    }

    // Connect mode
    if (!selectedTerminal) {
      sound.playClick();
      setSelectedTerminal({ side, color });
      setShowMessage(`Đã chọn chốt ${color.toUpperCase()} bên ${side === 'left' ? 'trái' : 'phải'}. Hãy nhấp chốt tương ứng.`);
    } else {
      if (selectedTerminal.side !== side && selectedTerminal.color === color) {
        // Successful match!
        sound.playWireConnect();
        const updated = { ...connections, [color]: true };
        setConnections(updated);
        setSelectedTerminal(null);
        setShowMessage(`Đã nối thành công dây ${color === 'red' ? 'Đỏ' : color === 'yellow' ? 'Vàng' : 'Xanh'}!`);

        // Check if all are connected
        if (updated.red && updated.yellow && updated.green) {
          setSolved(true);
          sound.playPuzzleSolved();
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffc67c', '#f4a424', '#a1d494', '#ffb4ab'],
          });
          setTimeout(() => {
            onSolved();
          }, 1200);
        }
      } else {
        sound.playSpark();
        setShowMessage('Không thể nối chốt khác màu hoặc cùng một phía!');
        setSelectedTerminal(null);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      {/* Outer Wooden/Metallic Frame */}
      <div className="relative w-full max-w-[640px] bg-[#372621] border-8 border-[#9f8e7a] p-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col">
        {/* 4 Golden Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-[#f4a424]" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-[#f4a424]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#f4a424]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#f4a424]" />

        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 mb-3 border-b-4 border-[#524434]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#f4a424]" />
            <h2 className="font-ui-label text-lg sm:text-xl text-[#ffc67c] font-bold tracking-wider uppercase">
              NỐI DÂY ĐIỆN
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 bg-[#271814] hover:bg-[#93000a] text-[#ffb4ab] border-2 border-[#9f8e7a] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Puzzle Interior Circuit Board */}
        <div className="relative w-full h-[280px] bg-[#180b07] border-4 border-[#524434] dither-bg overflow-hidden p-4 flex flex-col justify-between">
          {/* Rust & circuit overlay */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[repeating-linear-gradient(45deg,#000_0px,#000_2px,transparent_2px,transparent_6px)]" />

          {/* Left and Right Bus Bars */}
          <div className="absolute left-4 top-6 bottom-6 w-3 bg-[#524434] border-x border-[#9f8e7a]" />
          <div className="absolute right-4 top-6 bottom-6 w-3 bg-[#524434] border-x border-[#9f8e7a]" />

          {/* SVG Wires Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* RED WIRE (Top) */}
            {connections.red ? (
              <g>
                <path
                  d="M 50 60 L 220 60 L 220 75 L 360 75 L 360 60 L 590 60"
                  fill="none"
                  stroke="#ffb4ab"
                  strokeWidth="8"
                  strokeLinecap="square"
                />
                <path
                  d="M 50 60 L 220 60 L 220 75 L 360 75 L 360 60 L 590 60"
                  fill="none"
                  stroke="#690005"
                  strokeWidth="3"
                  transform="translate(0, 3)"
                />
              </g>
            ) : (
              <g>
                <path d="M 50 60 L 220 60 L 220 100 L 270 100" fill="none" stroke="#ffb4ab" strokeWidth="8" />
                <path d="M 330 100 L 370 100 L 370 60 L 590 60" fill="none" stroke="#ffb4ab" strokeWidth="8" />
              </g>
            )}

            {/* YELLOW WIRE (Middle) */}
            {connections.yellow ? (
              <g>
                <path
                  d="M 50 140 L 260 140 L 260 70 L 590 70"
                  fill="none"
                  stroke="#ffc67c"
                  strokeWidth="8"
                  strokeLinecap="square"
                />
                <path
                  d="M 50 140 L 260 140 L 260 70 L 590 70"
                  fill="none"
                  stroke="#845400"
                  strokeWidth="3"
                  transform="translate(0, 3)"
                />
              </g>
            ) : (
              <path d="M 50 140 L 260 140 L 260 160" fill="none" stroke="#ffc67c" strokeWidth="8" />
            )}

            {/* GREEN WIRE (Bottom) */}
            {connections.green ? (
              <g>
                <path
                  d="M 50 220 L 250 220 L 250 150 L 590 150"
                  fill="none"
                  stroke="#a1d494"
                  strokeWidth="8"
                  strokeLinecap="square"
                />
                <path
                  d="M 50 220 L 250 220 L 250 150 L 590 150"
                  fill="none"
                  stroke="#0a3909"
                  strokeWidth="3"
                  transform="translate(0, 3)"
                />
              </g>
            ) : (
              <g>
                <path d="M 50 220 L 170 220 L 170 250" fill="none" stroke="#a1d494" strokeWidth="8" />
                <path d="M 230 190 L 230 150 L 590 150" fill="none" stroke="#a1d494" strokeWidth="8" />
              </g>
            )}
          </svg>

          {/* Sparks when broken */}
          {!connections.red && (
            <div className="absolute left-[265px] top-[95px] w-3 h-3 bg-[#ffb4ab] rounded-full animate-spark z-20" />
          )}
          {!connections.green && (
            <div className="absolute left-[165px] top-[245px] w-3 h-3 bg-[#a1d494] rounded-full animate-spark z-20" />
          )}

          {/* Left Terminals */}
          <div className="relative z-30 flex flex-col justify-around h-full pl-6">
            {/* Terminal Red */}
            <button
              onClick={() => handleTerminalClick('left', 'red')}
              className={`w-7 h-7 rounded-full bg-[#ffb4ab] border-2 flex items-center justify-center transition-transform hover:scale-125 cursor-pointer shadow-md ${
                selectedTerminal?.side === 'left' && selectedTerminal?.color === 'red'
                  ? 'border-white scale-125 animate-pulse'
                  : 'border-[#180b07]'
              }`}
              title="Chốt Đỏ (Trái)"
            >
              <div className="w-2 h-2 rounded-full bg-[#690005]" />
            </button>

            {/* Terminal Yellow */}
            <button
              onClick={() => handleTerminalClick('left', 'yellow')}
              className={`w-7 h-7 rounded-full bg-[#ffc67c] border-2 flex items-center justify-center transition-transform hover:scale-125 cursor-pointer shadow-md ${
                selectedTerminal?.side === 'left' && selectedTerminal?.color === 'yellow'
                  ? 'border-white scale-125 animate-pulse'
                  : 'border-[#180b07]'
              }`}
              title="Chốt Vàng (Trái)"
            >
              <div className="w-2 h-2 rounded-full bg-[#633e00]" />
            </button>

            {/* Terminal Green */}
            <button
              onClick={() => handleTerminalClick('left', 'green')}
              className={`w-7 h-7 rounded-full bg-[#a1d494] border-2 flex items-center justify-center transition-transform hover:scale-125 cursor-pointer shadow-md ${
                selectedTerminal?.side === 'left' && selectedTerminal?.color === 'green'
                  ? 'border-white scale-125 animate-pulse'
                  : 'border-[#180b07]'
              }`}
              title="Chốt Xanh (Trái)"
            >
              <div className="w-2 h-2 rounded-full bg-[#0a3909]" />
            </button>
          </div>

          {/* Right Terminals */}
          <div className="absolute right-6 top-0 bottom-0 z-30 flex flex-col justify-around h-full">
            {/* Terminal Yellow (Top right) */}
            <button
              onClick={() => handleTerminalClick('right', 'yellow')}
              className={`w-7 h-7 rounded-full bg-[#ffc67c] border-2 flex items-center justify-center transition-transform hover:scale-125 cursor-pointer shadow-md ${
                selectedTerminal?.side === 'right' && selectedTerminal?.color === 'yellow'
                  ? 'border-white scale-125 animate-pulse'
                  : 'border-[#180b07]'
              }`}
              title="Chốt Vàng (Phải)"
            >
              <div className="w-2 h-2 rounded-full bg-[#633e00]" />
            </button>

            {/* Terminal Green (Middle right) */}
            <button
              onClick={() => handleTerminalClick('right', 'green')}
              className={`w-7 h-7 rounded-full bg-[#a1d494] border-2 flex items-center justify-center transition-transform hover:scale-125 cursor-pointer shadow-md ${
                selectedTerminal?.side === 'right' && selectedTerminal?.color === 'green'
                  ? 'border-white scale-125 animate-pulse'
                  : 'border-[#180b07]'
              }`}
              title="Chốt Xanh (Phải)"
            >
              <div className="w-2 h-2 rounded-full bg-[#0a3909]" />
            </button>

            {/* Terminal Red (Bottom right) */}
            <button
              onClick={() => handleTerminalClick('right', 'red')}
              className={`w-7 h-7 rounded-full bg-[#ffb4ab] border-2 flex items-center justify-center transition-transform hover:scale-125 cursor-pointer shadow-md ${
                selectedTerminal?.side === 'right' && selectedTerminal?.color === 'red'
                  ? 'border-white scale-125 animate-pulse'
                  : 'border-[#180b07]'
              }`}
              title="Chốt Đỏ (Phải)"
            >
              <div className="w-2 h-2 rounded-full bg-[#690005]" />
            </button>
          </div>
        </div>

        {/* Status Prompt & Hint */}
        <div className="mt-3 text-xs font-dialogue-text text-[#ffc67c] bg-[#180b07] px-3 py-1.5 border border-[#524434] flex items-center justify-between">
          <span>{showMessage || 'Nhấp chọn chế độ CẮT hoặc NỐI, sau đó kết nối các chốt cùng màu.'}</span>
          {solved && (
            <span className="flex items-center gap-1 text-[#a1d494] font-bold">
              <CheckCircle2 className="w-4 h-4" /> ĐÃ MỞ NGĂN KHÓA!
            </span>
          )}
        </div>

        {/* Action Tool Buttons (CẮT / NỐI) */}
        <div className="flex justify-end gap-3 mt-3">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTool('cut');
              setSelectedTerminal(null);
            }}
            className={`px-5 py-2 font-ui-label text-xs sm:text-sm font-bold border-2 transition-all flex items-center gap-2 cursor-pointer shadow-md ${
              activeTool === 'cut'
                ? 'bg-[#93000a] text-white border-[#ffb4ab]'
                : 'bg-[#271814] text-[#d7c3ae] border-[#524434] hover:bg-[#43302c]'
            }`}
          >
            <Scissors className="w-4 h-4" />
            CẮT DÂY
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTool('connect');
              setSelectedTerminal(null);
            }}
            className={`px-5 py-2 font-ui-label text-xs sm:text-sm font-bold border-2 transition-all flex items-center gap-2 cursor-pointer shadow-md ${
              activeTool === 'connect'
                ? 'bg-[#f4a424] text-[#180b07] border-white shadow-[0_0_10px_#f4a424]'
                : 'bg-[#271814] text-[#ffc67c] border-[#9f8e7a] hover:bg-[#43302c]'
            }`}
          >
            <Cable className="w-4 h-4" />
            NỐI DÂY
          </button>
        </div>
      </div>
    </div>
  );
};
