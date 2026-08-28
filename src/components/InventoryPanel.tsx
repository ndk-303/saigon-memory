import React, { useState, useRef, useEffect } from 'react';
import { InventoryItem, ItemId } from '../types';
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
import { Eye, Wand2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Package } from 'lucide-react';

interface InventoryPanelProps {
  items: InventoryItem[];
  selectedItemId: ItemId | null;
  onSelectItem: (id: ItemId) => void;
  onInspectItem: (item: InventoryItem) => void;
  onCombineItems: (sourceId: ItemId, targetId: ItemId) => void;
  layout: 'right' | 'bottom';
}

export const InventoryPanel: React.FC<InventoryPanelProps> = ({
  items,
  selectedItemId,
  onSelectItem,
  onInspectItem,
  onCombineItems,
  layout,
}) => {
  const [draggedItemId, setDraggedItemId] = useState<ItemId | null>(null);
  const [hoveredSlotIndex, setHoveredSlotIndex] = useState<number | null>(null);
  const [combineModeSource, setCombineModeSource] = useState<ItemId | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Dynamic slot calculation: Always show at least MIN_SLOTS, and enough slots for all items plus buffer empty slots
  const MIN_SLOTS = layout === 'right' ? 7 : 8;
  const totalSlotsCount = Math.max(MIN_SLOTS, items.length + 2);

  const slots = Array.from({ length: totalSlotsCount }).map((_, index) => {
    return items[index] || null;
  });

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    if (layout === 'right') {
      const hasOverflow = el.scrollHeight > el.clientHeight;
      setCanScrollUp(el.scrollTop > 5);
      setCanScrollDown(hasOverflow && el.scrollTop + el.clientHeight < el.scrollHeight - 5);
    } else {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(hasOverflow && el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [items.length, layout]);

  // If new item added or selected item changes, scroll into view if needed
  useEffect(() => {
    if (selectedItemId && scrollContainerRef.current) {
      const selectedIndex = items.findIndex((i) => i.id === selectedItemId);
      if (selectedIndex !== -1) {
        const slotElements = scrollContainerRef.current.children;
        const targetElement = slotElements[selectedIndex] as HTMLElement;
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
      }
    }
    checkScroll();
  }, [items.length, selectedItemId]);

  const handleScrollStep = (direction: 'prev' | 'next') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    sound.playClick();
    const scrollAmount = layout === 'right' ? 140 : 180;
    if (layout === 'right') {
      el.scrollBy({ top: direction === 'prev' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: direction === 'prev' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'feather':
        return <PixelDusterIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'coin':
        return <PixelCoinIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'coin_polished':
        return <PixelPolishedCoinIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'juice':
        return <PixelSugarcaneJuiceIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'pliers':
        return <PixelPliersIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'notebook':
        return <PixelNotebookIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'notebook_decoded':
        return <PixelDecodedNotebookIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'key':
        return <PixelKeyIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'photo':
        return <PixelPhotoIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'tweezer':
        return <PixelTweezerIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'stamp':
        return <PixelStampIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'magnifier':
        return <PixelMagnifierIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'letter':
        return <PixelLetterIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'receipt':
        return <PixelReceiptIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'scissors':
        return <PixelScissorsIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'thread':
        return <PixelThreadIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'guitar_string':
        return <PixelGuitarStringIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'knob':
        return <PixelRadioKnobIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'tile':
        return <PixelMosaicTileIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'recipe':
        return <PixelRecipeIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'soup':
        return <PixelSoupPotIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      default:
        return null;
    }
  };

  const handleDragStart = (e: React.DragEvent, id: ItemId) => {
    setDraggedItemId(id);
    e.dataTransfer.setData('text/plain', id);
    sound.playSelect();
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setHoveredSlotIndex(index);
  };

  const handleDragLeave = () => {
    setHoveredSlotIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetItem: InventoryItem | null) => {
    e.preventDefault();
    setHoveredSlotIndex(null);
    const sourceId = (e.dataTransfer.getData('text/plain') || draggedItemId) as ItemId;
    setDraggedItemId(null);

    if (sourceId && targetItem && sourceId !== targetItem.id) {
      onCombineItems(sourceId, targetItem.id);
    }
  };

  const handleSlotClick = (item: InventoryItem | null) => {
    if (!item) return;

    if (combineModeSource) {
      if (combineModeSource !== item.id) {
        onCombineItems(combineModeSource, item.id);
      }
      setCombineModeSource(null);
      return;
    }

    sound.playSelect();
    onSelectItem(item.id);
  };

  // RIGHT VERTICAL LAYOUT
  if (layout === 'right') {
    return (
      <aside className="w-24 sm:w-28 h-full bg-[#1e100c]/95 backdrop-blur-md border-l-4 border-[#524434] flex flex-col items-center py-2 px-1.5 select-none z-20 shrink-0 shadow-2xl overflow-hidden relative">
        {/* Header Banner */}
        <div className="w-full bg-[#372621] border-2 border-[#9f8e7a] py-1 px-1 mb-1 text-center shadow-md relative shrink-0">
          <div className="text-[10px] sm:text-xs font-ui-label text-[#ffc67c] uppercase font-bold tracking-wider flex items-center justify-center gap-1">
            <Package className="w-3 h-3 text-[#f59e0b]" />
            <span>Túi ({items.length})</span>
          </div>
          <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-[#ffc67c]" />
          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#ffc67c]" />
        </div>

        {/* Combine Mode Indicator */}
        {combineModeSource && (
          <div className="w-full bg-[#f59e0b]/20 border border-[#f59e0b] p-1 mb-1 text-center text-[9px] text-[#fde68a] animate-pulse shrink-0">
            Chọn món thứ 2...
          </div>
        )}

        {/* Scroll Up Button */}
        {canScrollUp && (
          <button
            onClick={() => handleScrollStep('prev')}
            className="w-full py-0.5 bg-[#372621] hover:bg-[#524434] text-[#ffc67c] border border-[#9f8e7a] flex items-center justify-center text-[10px] mb-1 shrink-0 cursor-pointer shadow transition-colors animate-pulse"
            title="Cuộn lên"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        )}

        {/* Scrollable Slots Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex-1 w-full overflow-y-auto flex flex-col gap-2 items-center py-1 px-0.5 scroll-smooth custom-retro-scroll"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#9f8e7a #1e100c',
          }}
        >
          {slots.map((item, index) => {
            const isSelected = item && item.id === selectedItemId;
            const isDragOver = hoveredSlotIndex === index && draggedItemId && item && draggedItemId !== item.id;
            const isCombiningThis = combineModeSource === item?.id;

            return (
              <div
                key={index}
                draggable={!!item}
                onDragStart={(e) => item && handleDragStart(e, item.id)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, item)}
                onClick={() => handleSlotClick(item)}
                onDoubleClick={() => {
                  if (item) {
                    onInspectItem(item);
                  }
                }}
                className={`group relative w-16 h-16 sm:w-20 sm:h-20 bg-[#271814] flex flex-col items-center justify-center cursor-pointer transition-all shrink-0 rounded-sm ${
                  isDragOver || isCombiningThis
                    ? 'border-4 border-[#38bdf8] bg-[#1e293b] scale-105 shadow-[0_0_15px_#38bdf8]'
                    : isSelected
                    ? 'border-4 border-[#f4a424] bg-[#43302c] shadow-[0_0_12px_#f4a424]'
                    : 'border-2 border-[#524434] hover:border-[#9f8e7a] hover:bg-[#372621]'
                }`}
              >
                {item ? (
                  <>
                    <div className="relative pointer-events-none transform transition-transform group-hover:scale-105">
                      {renderIcon(item.iconType)}
                      {item.inspectData?.isDirty && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#eab308] rounded-full ring-1 ring-black" title="Bám bụi - cần lau chùi" />
                      )}
                    </div>

                    <span className="text-[8px] sm:text-[9px] text-[#f9dcd5] font-ui-label text-center px-0.5 truncate w-full leading-tight select-none">
                      {item.nameVi}
                    </span>

                    {/* Hover quick action bar */}
                    <div className="absolute -bottom-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onInspectItem(item);
                        }}
                        title="Soi Chi Tiết 2D"
                        className="bg-[#180b07] hover:bg-[#f4a424] text-[#ffedd5] hover:text-black p-0.5 border border-[#9f8e7a] rounded text-[8px]"
                      >
                        <Eye className="w-2.5 h-2.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCombineModeSource(item.id);
                        }}
                        title="Kéo hoặc bấm để Ghép Đồ"
                        className="bg-[#180b07] hover:bg-[#38bdf8] text-[#ffedd5] hover:text-black p-0.5 border border-[#9f8e7a] rounded text-[8px]"
                      >
                        <Wand2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <span className="text-[10px] text-[#524434] font-ui-label font-bold">
                    {index + 1}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Scroll Down Button */}
        {canScrollDown && (
          <button
            onClick={() => handleScrollStep('next')}
            className="w-full py-0.5 bg-[#372621] hover:bg-[#524434] text-[#ffc67c] border border-[#9f8e7a] flex items-center justify-center text-[10px] mt-1 shrink-0 cursor-pointer shadow transition-colors animate-pulse"
            title="Cuộn xuống"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        )}

        {/* Mini Tip */}
        <div className="mt-1 text-[7px] text-[#9f8e7a] text-center leading-tight px-0.5 italic shrink-0">
          Cuộn chuột để xem thêm
        </div>
      </aside>
    );
  }

  // BOTTOM HORIZONTAL LAYOUT
  return (
    <div className="h-24 w-full bg-[#1e100c]/95 backdrop-blur-md border-t-4 border-[#524434] flex items-center px-2 sm:px-3 gap-2 select-none z-20 shrink-0 shadow-2xl overflow-hidden relative">
      <div className="bg-[#372621] border-2 border-[#9f8e7a] py-1.5 px-2.5 text-center shrink-0 flex flex-col justify-center">
        <div className="text-xs font-ui-label text-[#ffc67c] uppercase font-bold tracking-wider flex items-center gap-1">
          <Package className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>Túi Đồ ({items.length})</span>
        </div>
        <div className="text-[9px] text-[#a1d494]">Kéo ghép • Soi 2D</div>
      </div>

      {/* Left Scroll Button */}
      {canScrollLeft && (
        <button
          onClick={() => handleScrollStep('prev')}
          className="h-16 px-1 bg-[#372621] hover:bg-[#524434] text-[#ffc67c] border-2 border-[#9f8e7a] flex items-center justify-center shrink-0 cursor-pointer shadow transition-colors animate-pulse"
          title="Cuộn sang trái"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Scrollable Slots Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex-1 overflow-x-auto flex gap-2.5 items-center py-1 px-1 scroll-smooth custom-retro-scroll"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#9f8e7a #1e100c',
        }}
      >
        {slots.map((item, index) => {
          const isSelected = item && item.id === selectedItemId;
          const isDragOver = hoveredSlotIndex === index && draggedItemId && item && draggedItemId !== item.id;
          const isCombiningThis = combineModeSource === item?.id;

          return (
            <div
              key={index}
              draggable={!!item}
              onDragStart={(e) => item && handleDragStart(e, item.id)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, item)}
              onClick={() => handleSlotClick(item)}
              onDoubleClick={() => {
                if (item) {
                  onInspectItem(item);
                }
              }}
              className={`group relative w-16 h-16 bg-[#271814] flex flex-col items-center justify-center cursor-pointer transition-all shrink-0 rounded-sm ${
                isDragOver || isCombiningThis
                  ? 'border-4 border-[#38bdf8] bg-[#1e293b] scale-105 shadow-[0_0_15px_#38bdf8]'
                  : isSelected
                  ? 'border-4 border-[#f4a424] bg-[#43302c] shadow-[0_0_12px_#f4a424]'
                  : 'border-2 border-[#524434] hover:border-[#9f8e7a] hover:bg-[#372621]'
              }`}
            >
              {item ? (
                <>
                  <div className="relative pointer-events-none transform transition-transform group-hover:scale-105">
                    {renderIcon(item.iconType)}
                  </div>
                  <span className="text-[8px] text-[#f9dcd5] font-ui-label text-center truncate w-full px-0.5 leading-none mt-0.5">
                    {item.nameVi}
                  </span>

                  {/* Hover quick action bar */}
                  <div className="absolute -bottom-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onInspectItem(item);
                      }}
                      title="Soi Chi Tiết 2D"
                      className="bg-[#180b07] hover:bg-[#f4a424] text-[#ffedd5] hover:text-black p-0.5 border border-[#9f8e7a] rounded text-[8px]"
                    >
                      <Eye className="w-2 h-2" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCombineModeSource(item.id);
                      }}
                      title="Kéo hoặc bấm để Ghép Đồ"
                      className="bg-[#180b07] hover:bg-[#38bdf8] text-[#ffedd5] hover:text-black p-0.5 border border-[#9f8e7a] rounded text-[8px]"
                    >
                      <Wand2 className="w-2 h-2" />
                    </button>
                  </div>
                </>
              ) : (
                <span className="text-[10px] text-[#524434] font-ui-label font-bold">
                  {index + 1}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Right Scroll Button */}
      {canScrollRight && (
        <button
          onClick={() => handleScrollStep('next')}
          className="h-16 px-1 bg-[#372621] hover:bg-[#524434] text-[#ffc67c] border-2 border-[#9f8e7a] flex items-center justify-center shrink-0 cursor-pointer shadow transition-colors animate-pulse"
          title="Cuộn sang phải"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
