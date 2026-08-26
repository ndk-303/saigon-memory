import React, { useState, useRef, useEffect } from 'react';
import { X, Eye, RotateCw, Sparkles, Eraser, Unlock, FileText, CheckCircle2 } from 'lucide-react';
import { InventoryItem } from '../types';
import {
  PixelDusterIcon,
  PixelCoinIcon,
  PixelSugarcaneJuiceIcon,
  PixelPliersIcon,
  PixelNotebookIcon,
  PixelKeyIcon,
  PixelPhotoIcon,
  PixelTweezerIcon,
  PixelStampIcon,
  PixelMagnifierIcon,
  PixelLetterIcon,
  PixelReceiptIcon,
  PixelScissorsIcon,
  PixelThreadIcon,
  PixelGuitarStringIcon,
  PixelRadioKnobIcon,
  PixelMosaicTileIcon,
  PixelRecipeIcon,
  PixelSoupPotIcon,
  PixelPolishedCoinIcon,
  PixelDecodedNotebookIcon,
} from './PixelIcons';
import { sound } from '../utils/audio';

interface ItemInspectModalProps {
  item: InventoryItem | null;
  onClose: () => void;
  onUpdateItemCleanProgress?: (itemId: string, progress: number) => void;
}

export const ItemInspectModal: React.FC<ItemInspectModalProps> = ({
  item,
  onClose,
  onUpdateItemCleanProgress,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMechanismToggled, setIsMechanismToggled] = useState(false);
  const [cleanProgress, setCleanProgress] = useState(0);
  const [isScratching, setIsScratching] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!item) return;
    setRotationAngle(0);
    setIsFlipped(false);
    setIsMechanismToggled(false);
    setCleanProgress(item.inspectData?.dirtCleanProgress || (item.inspectData?.isDirty ? 0 : 100));

    // Initialize dirt scratch canvas if dirty
    if (item.inspectData?.isDirty) {
      setTimeout(() => {
        initDirtCanvas();
      }, 50);
    }
  }, [item]);

  const initDirtCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Fill with vintage dust / patina texture
    ctx.fillStyle = 'rgba(60, 40, 25, 0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Speckles of dust & rust
    for (let i = 0; i < 120; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(140, 100, 60, 0.9)' : 'rgba(30, 20, 10, 0.95)';
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 4 + 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || cleanProgress >= 100) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    // Erase dirt
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();

    sound.playScratchDirt();

    // Estimate clean ratio
    setCleanProgress((prev) => {
      const next = Math.min(100, prev + 2.5);
      if (next >= 85 && prev < 85) {
        sound.playSpark();
        if (item && onUpdateItemCleanProgress) {
          onUpdateItemCleanProgress(item.id, 100);
        }
      }
      return next;
    });
  };

  if (!item) return null;

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'feather':
        return <PixelDusterIcon className="w-24 h-24" />;
      case 'coin':
        return <PixelCoinIcon className="w-24 h-24" />;
      case 'coin_polished':
        return <PixelPolishedCoinIcon className="w-24 h-24" />;
      case 'juice':
        return <PixelSugarcaneJuiceIcon className="w-24 h-24" />;
      case 'pliers':
        return <PixelPliersIcon className="w-24 h-24" />;
      case 'notebook':
        return <PixelNotebookIcon className="w-24 h-24" />;
      case 'notebook_decoded':
        return <PixelDecodedNotebookIcon className="w-24 h-24" />;
      case 'key':
        return <PixelKeyIcon className="w-24 h-24" />;
      case 'photo':
        return <PixelPhotoIcon className="w-24 h-24" />;
      case 'tweezer':
        return <PixelTweezerIcon className="w-24 h-24" />;
      case 'stamp':
        return <PixelStampIcon className="w-24 h-24" />;
      case 'magnifier':
        return <PixelMagnifierIcon className="w-24 h-24" />;
      case 'letter':
        return <PixelLetterIcon className="w-24 h-24" />;
      case 'receipt':
        return <PixelReceiptIcon className="w-24 h-24" />;
      case 'scissors':
        return <PixelScissorsIcon className="w-24 h-24" />;
      case 'thread':
        return <PixelThreadIcon className="w-24 h-24" />;
      case 'guitar_string':
        return <PixelGuitarStringIcon className="w-24 h-24" />;
      case 'knob':
        return <PixelRadioKnobIcon className="w-24 h-24" />;
      case 'tile':
        return <PixelMosaicTileIcon className="w-24 h-24" />;
      case 'recipe':
        return <PixelRecipeIcon className="w-24 h-24" />;
      case 'soup':
        return <PixelSoupPotIcon className="w-24 h-24" />;
      default:
        return null;
    }
  };

  const isFullyCleaned = cleanProgress >= 80 || !item.inspectData?.isDirty;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#2c1c18] border-4 border-[#9f8e7a] p-5 sm:p-6 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Ornate Gold Corner Pips */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-[#f4a424]" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-[#f4a424]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#f4a424]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#f4a424]" />

        {/* Header */}
        <div className="flex justify-between items-center pb-3 mb-4 border-b-2 border-[#524434]">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#f4a424] animate-pulse" />
            <h3 className="font-ui-label text-sm sm:text-base text-[#ffc67c] uppercase font-bold tracking-wider">
              SOI KỸ CHI TIẾT 2D & TƯƠNG TÁC XÚC GIÁC
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-[#9f8e7a] hover:text-[#ffb4ab] p-1.5 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 2D Interactive Stage & Canvas */}
        <div className="relative w-full h-56 sm:h-64 bg-[#140805] border-4 border-[#524434] dither-bg flex items-center justify-center mb-4 overflow-hidden shadow-inner">
          {/* Subtle Stage Lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,164,36,0.15)_0%,transparent_70%)] pointer-events-none" />

          {/* Interactive Item Display Container */}
          <div
            className="relative transition-transform duration-300 flex items-center justify-center"
            style={{
              transform: `rotate(${rotationAngle}deg) ${isFlipped ? 'scaleX(-1)' : 'scaleX(1)'}`,
            }}
          >
            {renderIcon(item.iconType)}

            {/* Revealed Hidden Engraving / Number when Cleaned */}
            {isFullyCleaned && item.inspectData?.hiddenClueVi && (
              <div className="absolute -bottom-6 bg-[#0f172a]/90 text-[#38bdf8] text-[10px] font-bold px-2 py-0.5 border border-[#38bdf8] rounded shadow-lg animate-bounce pointer-events-none whitespace-nowrap">
                ★ {item.inspectData.hiddenClueVi}
              </div>
            )}
          </div>

          {/* Scratch Dirt Overlay Canvas */}
          {item.inspectData?.isDirty && cleanProgress < 85 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
              <canvas
                ref={canvasRef}
                width={240}
                height={200}
                onMouseDown={() => setIsScratching(true)}
                onMouseUp={() => setIsScratching(false)}
                onMouseMove={(e) => isScratching && handleScratch(e)}
                onTouchStart={() => setIsScratching(true)}
                onTouchEnd={() => setIsScratching(false)}
                onTouchMove={(e) => handleScratch(e)}
                className="cursor-crosshair w-60 h-48 border border-dashed border-[#f4a424]/40"
              />
              <div className="absolute bottom-2 left-4 right-4 bg-black/80 py-1 px-2 border border-[#f59e0b] text-center text-[10px] text-[#fef08a] flex items-center justify-center gap-1">
                <Eraser className="w-3 h-3 text-[#f59e0b] animate-bounce" />
                Rê chuột / Chạm để cào sạch bụi bẩn lộ chi tiết ({Math.round(cleanProgress)}%)
              </div>
            </div>
          )}

          {/* Top-Right Tactile Controls Badge */}
          <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
            <button
              onClick={() => {
                sound.playClick();
                setRotationAngle((prev) => (prev + 90) % 360);
              }}
              title="Xoay 90 độ"
              className="p-1.5 bg-[#372621]/90 hover:bg-[#f4a424] text-[#ffedd5] hover:text-black border border-[#9f8e7a] text-xs transition-colors flex items-center gap-1 shadow cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span className="text-[10px]">Xoay</span>
            </button>

            <button
              onClick={() => {
                sound.playSelect();
                setIsFlipped((prev) => !prev);
              }}
              title="Lật mặt sau"
              className="p-1.5 bg-[#372621]/90 hover:bg-[#38bdf8] text-[#ffedd5] hover:text-black border border-[#9f8e7a] text-xs transition-colors flex items-center gap-1 shadow cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="text-[10px]">{isFlipped ? 'Mặt Trước' : 'Mặt Sau'}</span>
            </button>

            {item.inspectData?.hasMechanism && (
              <button
                onClick={() => {
                  sound.playSpark();
                  setIsMechanismToggled((prev) => !prev);
                }}
                className="p-1.5 bg-[#f59e0b] hover:bg-[#fde68a] text-black border border-black text-xs font-bold transition-colors flex items-center gap-1 shadow cursor-pointer animate-pulse"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span className="text-[10px]">{item.inspectData.mechanismLabelVi || 'Mở Khớp'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Item Title & Meta */}
        <div className="text-center mb-3">
          <h4 className="font-ui-label text-lg font-bold text-[#ffc67c]">
            {item.nameVi}
          </h4>
          <span className="text-xs text-[#9f8e7a] font-meta-sm">
            {item.name} • {item.inspectData?.isDirty ? (isFullyCleaned ? '✓ Đã Làm Sạch' : '⚠ Bám Bụi Thời Gian') : 'Kỷ Vật Nguyên Bản'}
          </span>
        </div>

        {/* Dynamic Description & Side Details */}
        <div className="w-full bg-[#1e100c] border-2 border-[#524434] p-3 text-left mb-4 space-y-2">
          <p className="font-dialogue-text text-xs sm:text-sm text-[#f9dcd5] leading-relaxed">
            {item.descriptionVi}
          </p>

          <div className="bg-[#2c1c18] p-2 border border-[#524434] text-xs text-[#ffedd5]">
            <span className="text-[#f59e0b] font-bold">
              {isFlipped ? '🔍 Chi Tiết Mặt Sau: ' : '🔍 Chi Tiết Mặt Trước: '}
            </span>
            {isFlipped
              ? item.inspectData?.backDetailsVi || 'Mặt sau phẳng phiu mang dấu ấn của thời gian.'
              : item.inspectData?.frontDetailsVi || 'Mặt trước nguyên vẹn với đường nét cổ điển.'}
          </div>

          {isMechanismToggled && (
            <div className="bg-[#0f172a] p-2 border border-[#38bdf8] text-xs text-[#7dd3fc] animate-fadeIn">
              <span className="font-bold text-[#38bdf8]">⚙ Khớp Cơ Học Đã Mở: </span>
              {item.loreVi}
            </div>
          )}

          <p className="font-dialogue-text text-[11px] text-[#a1d494] italic border-t border-[#524434]/50 pt-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
            {item.loreVi}
          </p>
        </div>

        {/* Close Button */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2 bg-[#f4a424] hover:bg-[#ffc67c] text-[#180b07] font-ui-label text-xs sm:text-sm font-bold border-2 border-[#633e00] transition-colors cursor-pointer"
          >
            ĐÓNG LẠI (ESC)
          </button>
        </div>
      </div>
    </div>
  );
};
