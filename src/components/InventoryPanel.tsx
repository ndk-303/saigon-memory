import React, { useState } from 'react';
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
import { Eye, Sparkles, Wand2 } from 'lucide-react';

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

  const TOTAL_SLOTS = layout === 'right' ? 7 : 8;

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

  const slots = Array.from({ length: TOTAL_SLOTS }).map((_, index) => {
    return items[index] || null;
  });

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

  if (layout === 'right') {
    return (
      <aside className="w-24 sm:w-28 bg-[#1e100c]/95 backdrop-blur-md border-l-4 border-[#524434] flex flex-col items-center py-3 px-2 select-none z-20 shrink-0 shadow-2xl overflow-y-auto">
        {/* Header Banner */}
        <div className="w-full bg-[#372621] border-2 border-[#9f8e7a] py-1.5 px-2 mb-2 text-center shadow-md relative">
          <div className="text-[11px] sm:text-xs font-ui-label text-[#ffc67c] uppercase font-bold tracking-widest">
            Túi Đồ
          </div>
          <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-[#ffc67c]" />
          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#ffc67c]" />
        </div>

        {/* Combine Mode Indicator */}
        {combineModeSource && (
          <div className="w-full bg-[#f59e0b]/20 border border-[#f59e0b] p-1 mb-2 text-center text-[9px] text-[#fde68a] animate-pulse">
            Chọn món thứ 2 để ghép...
          </div>
        )}

        {/* Vertical Slots */}
        <div className="flex flex-col gap-2.5 w-full items-center">
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
                className={`group relative w-16 h-16 sm:w-20 sm:h-20 bg-[#271814] flex flex-col items-center justify-center cursor-pointer transition-all ${
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

                    <span className="text-[9px] sm:text-[10px] text-[#f9dcd5] font-ui-label text-center px-1 truncate w-full leading-tight">
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

        {/* Mini Tip */}
        <div className="mt-3 text-[8px] text-[#9f8e7a] text-center leading-tight px-1 italic">
          Kéo đè 2 món để Ghép • Double Click để Soi
        </div>
      </aside>
    );
  }

  // Bottom Horizontal Layout
  return (
    <div className="h-24 bg-[#1e100c]/95 backdrop-blur-md border-t-4 border-[#524434] flex items-center px-4 gap-3 select-none z-20 shrink-0 overflow-x-auto shadow-2xl">
      <div className="bg-[#372621] border-2 border-[#9f8e7a] py-2 px-3 text-center shrink-0">
        <div className="text-xs font-ui-label text-[#ffc67c] uppercase font-bold tracking-widest">
          Túi Đồ
        </div>
        <div className="text-[9px] text-[#a1d494]">Kéo ghép</div>
      </div>

      <div className="flex gap-2.5 items-center">
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
              className={`group relative w-16 h-16 bg-[#271814] flex flex-col items-center justify-center cursor-pointer transition-all shrink-0 ${
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
    </div>
  );
};
