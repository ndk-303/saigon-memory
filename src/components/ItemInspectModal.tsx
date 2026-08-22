import React from 'react';
import { X, Eye } from 'lucide-react';
import { InventoryItem } from '../types';
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

interface ItemInspectModalProps {
  item: InventoryItem | null;
  onClose: () => void;
}

export const ItemInspectModal: React.FC<ItemInspectModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'feather':
        return <PixelDusterIcon className="w-20 h-20" />;
      case 'coin':
        return <PixelCoinIcon className="w-20 h-20" />;
      case 'juice':
        return <PixelSugarcaneJuiceIcon className="w-20 h-20" />;
      case 'pliers':
        return <PixelPliersIcon className="w-20 h-20" />;
      case 'notebook':
        return <PixelNotebookIcon className="w-20 h-20" />;
      case 'key':
        return <PixelKeyIcon className="w-20 h-20" />;
      case 'photo':
        return <PixelPhotoIcon className="w-20 h-20" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-md bg-[#2c1c18] border-4 border-[#9f8e7a] p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* Corner pips */}
        <div className="absolute top-0 left-0 w-3 h-3 bg-[#f4a424]" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-[#f4a424]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#f4a424]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#f4a424]" />

        {/* Header */}
        <div className="flex justify-between items-center pb-2 mb-3 border-b-2 border-[#524434]">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#ffc67c]" />
            <h3 className="font-ui-label text-sm text-[#ffc67c] uppercase font-bold tracking-wider">
              KIỂM TRA VẬT PHẨM
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-[#9f8e7a] hover:text-[#ffb4ab] p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main display container */}
        <div className="flex flex-col items-center text-center">
          <div className="w-28 h-28 bg-[#180b07] border-2 border-[#524434] dither-bg flex items-center justify-center mb-3 shadow-inner">
            {renderIcon(item.iconType)}
          </div>

          <h4 className="font-ui-label text-base font-bold text-[#ffc67c] mb-1">
            {item.nameVi}
          </h4>
          <span className="text-[11px] text-[#9f8e7a] font-meta-sm mb-3">
            {item.name}
          </span>

          <div className="w-full bg-[#1e100c] border border-[#524434] p-3 text-left mb-3">
            <p className="font-dialogue-text text-xs text-[#f9dcd5] leading-relaxed mb-2">
              {item.descriptionVi}
            </p>
            <p className="font-dialogue-text text-[11px] text-[#a1d494] italic border-t border-[#524434]/50 pt-1.5">
              📝 {item.loreVi}
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-1.5 bg-[#f4a424] hover:bg-[#ffc67c] text-[#180b07] font-ui-label text-xs font-bold transition-colors cursor-pointer"
          >
            ĐÓNG
          </button>
        </div>
      </div>
    </div>
  );
};
