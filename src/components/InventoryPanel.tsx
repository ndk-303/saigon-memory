import React from 'react';
import { InventoryItem, ItemId } from '../types';
import {
  PixelDusterIcon,
  PixelCoinIcon,
  PixelSugarcaneJuiceIcon,
  PixelPliersIcon,
  PixelNotebookIcon,
  PixelKeyIcon,
  PixelPhotoIcon,
} from './PixelIcons';
import { sound } from '../utils/audio';

interface InventoryPanelProps {
  items: InventoryItem[];
  selectedItemId: ItemId | null;
  onSelectItem: (id: ItemId) => void;
  onInspectItem: (item: InventoryItem) => void;
  layout: 'right' | 'bottom';
}

export const InventoryPanel: React.FC<InventoryPanelProps> = ({
  items,
  selectedItemId,
  onSelectItem,
  onInspectItem,
  layout,
}) => {
  const TOTAL_SLOTS = layout === 'right' ? 4 : 8;

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'feather':
        return <PixelDusterIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'coin':
        return <PixelCoinIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'juice':
        return <PixelSugarcaneJuiceIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'pliers':
        return <PixelPliersIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'notebook':
        return <PixelNotebookIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'key':
        return <PixelKeyIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      case 'photo':
        return <PixelPhotoIcon className="w-8 h-8 sm:w-10 sm:h-10" />;
      default:
        return null;
    }
  };

  const slots = Array.from({ length: TOTAL_SLOTS }).map((_, index) => {
    return items[index] || null;
  });

  if (layout === 'right') {
    return (
      <aside className="w-24 sm:w-28 bg-[#1e100c]/90 backdrop-blur-md border-l-4 border-[#524434] flex flex-col items-center py-4 px-2 select-none z-20 shrink-0 shadow-2xl">
        {/* Ornate Header Header Banner */}
        <div className="w-full bg-[#372621] border-2 border-[#9f8e7a] py-1.5 px-2 mb-4 text-center shadow-md relative">
          <div className="text-xs sm:text-sm font-ui-label text-[#ffc67c] uppercase font-bold tracking-widest">
            Túi Đồ
          </div>
          <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-[#ffc67c]" />
          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#ffc67c]" />
        </div>

        {/* Vertical Slots */}
        <div className="flex flex-col gap-3 w-full items-center">
          {slots.map((item, index) => {
            const isSelected = item && item.id === selectedItemId;
            return (
              <div
                key={index}
                onClick={() => {
                  if (item) {
                    sound.playSelect();
                    onSelectItem(item.id);
                  }
                }}
                onDoubleClick={() => {
                  if (item) {
                    onInspectItem(item);
                  }
                }}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-[#271814] flex items-center justify-center cursor-pointer transition-all ${
                  isSelected
                    ? 'border-4 border-[#f4a424] bg-[#43302c] shadow-[0_0_12px_#f4a424]'
                    : 'border-2 border-[#524434] hover:border-[#9f8e7a] hover:bg-[#372621]'
                }`}
                title={item ? `${item.nameVi} (Nhấp đúp để xem chi tiết)` : `Ô trống ${index + 1}`}
              >
                {/* Slot index number */}
                <span className="absolute top-1 left-1.5 text-[10px] font-ui-label text-[#9f8e7a] font-bold">
                  {index + 1}
                </span>

                {/* Item Content */}
                {item ? (
                  <div className="flex flex-col items-center justify-center p-1 group">
                    <div className="transition-transform group-hover:scale-110">
                      {renderIcon(item.iconType)}
                    </div>
                    <span className="text-[9px] font-ui-label text-[#ffc67c] truncate max-w-[60px] text-center mt-0.5 leading-tight">
                      {item.nameVi.split(' ')[0]}
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-full dither-bg opacity-30 pointer-events-none" />
                )}

                {/* Selected Corner Pip */}
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#f4a424] border border-[#180b07]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom prompt */}
        <div className="mt-auto text-[9px] text-[#9f8e7a] font-dialogue-text text-center px-1">
          Chọn vật phẩm để dùng
        </div>
      </aside>
    );
  }

  // Bottom Horizontal Layout
  return (
    <div className="h-20 bg-[#2b1c17] border-t-4 border-[#524434] px-4 flex items-center justify-center gap-2 sm:gap-3 select-none z-20 shrink-0 shadow-2xl">
      <span className="hidden md:inline-block text-xs font-ui-label text-[#ffc67c] font-bold uppercase tracking-wider mr-2">
        TÚI ĐỒ:
      </span>
      {slots.map((item, index) => {
        const isSelected = item && item.id === selectedItemId;
        return (
          <div
            key={index}
            onClick={() => {
              if (item) {
                sound.playSelect();
                onSelectItem(item.id);
              }
            }}
            onDoubleClick={() => {
              if (item) {
                onInspectItem(item);
              }
            }}
            className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-[#1e100c] flex items-center justify-center cursor-pointer transition-all ${
              isSelected
                ? 'border-3 border-[#f4a424] bg-[#43302c] shadow-[0_0_10px_#f4a424] -translate-y-1'
                : 'border-2 border-[#524434] hover:border-[#9f8e7a] hover:bg-[#372621]'
            }`}
            title={item ? `${item.nameVi} (Nhấp đúp để xem chi tiết)` : `Ô trống ${index + 1}`}
          >
            {/* Slot index number */}
            <span className="absolute top-0.5 left-1 text-[9px] font-ui-label text-[#9f8e7a] font-bold">
              {index + 1}
            </span>

            {/* Item Content */}
            {item ? (
              <div className="flex flex-col items-center justify-center p-1 group">
                <div className="transition-transform group-hover:scale-110">
                  {renderIcon(item.iconType)}
                </div>
              </div>
            ) : (
              <div className="w-full h-full dither-bg opacity-30 pointer-events-none" />
            )}

            {isSelected && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#f4a424]" />
            )}
          </div>
        );
      })}
    </div>
  );
};
