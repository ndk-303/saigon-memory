import React from 'react';
import { X } from 'lucide-react';
import { Quest } from '../types';
import { sound } from '../utils/audio';

interface QuestLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  quests: Quest[];
  onToggleQuest?: (questId: string) => void;
}

export const QuestLogModal: React.FC<QuestLogModalProps> = ({
  isOpen,
  onClose,
  quests,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
      {/* Notebook Container */}
      <div className="relative w-full max-w-[860px] h-[540px] sm:h-[580px] bg-[#9f8e7a] border-4 border-[#372621] shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex overflow-visible">
        {/* Pixel Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute -top-6 -right-6 w-12 h-12 bg-[#ffb4ab] text-[#690005] border-4 border-[#93000a] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffdad6] transition-transform hover:scale-105 flex items-center justify-center z-50 cursor-pointer"
          title="Đóng Sổ Tay"
        >
          <X className="w-8 h-8 font-black stroke-[3]" />
        </button>

        {/* Left Leather Edge */}
        <div className="w-3 sm:w-4 h-full bg-[#42312c] border-r-2 border-[#1e100c] shrink-0" />

        {/* LEFT PAGE: Sketch & Polaroid Clue */}
        <section className="flex-1 bg-[#d7c3ae] text-[#1e100c] p-4 sm:p-6 flex flex-col justify-between relative border-r border-[#9f8e7a]/50 shadow-inner overflow-hidden">
          {/* Paper curl decorative accent */}
          <div
            className="absolute top-0 right-0 w-8 h-8 bg-[#bba28a] opacity-30 pointer-events-none"
            style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
          />

          <div>
            {/* Sketch of Ben Thanh Clock Tower */}
            <div className="relative w-full aspect-[16/9] bg-[#271814] border-2 border-[#1e100c] overflow-hidden shadow-sm flex items-center justify-center">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEIuHbTIdeiWs_woEHeG9FgB9bXsW1USdIfeNiBSlz8VCVK98HaUlmvwm52L7t9Mr4RLNEaUaBzzu4cdDwTbrVxMxoaviebvw_9wnh5Xj2I5Jp-etjW5pZd_sLUr8i82LBCg3NG-3-vi342kBfnfm2dh4ZrP1TcXlVjM27GYt18UbFQx_fZSX5dl3zVExWybiFRJkUp8wS5mgE--N7y9Ox3lUWTbpmujpQrdh3MFOQQPZ_fjAJm2ACBg"
                alt="Phác thảo Chợ Bến Thành 12:00"
                className="w-full h-full object-cover opacity-85 mix-blend-luminosity"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1 right-2 font-dialogue-text text-xs font-bold text-[#f9dcd5] bg-[#1e100c]/80 px-1">
                12:00 PM
              </span>
            </div>
            <p className="font-dialogue-text text-[11px] text-[#524434] mt-1.5 italic text-center">
              Phác thảo Tháp đồng hồ Bến Thành - Kỷ niệm hè 1992
            </p>
          </div>

          {/* Polaroid & Note */}
          <div className="flex items-end gap-3 sm:gap-4 mt-2">
            <div className="w-24 sm:w-28 bg-[#f9dcd5] p-1.5 border border-[#524434] shadow-[4px_4px_0px_rgba(0,0,0,0.3)] rotate-[-3deg] shrink-0">
              <div className="w-full h-20 sm:h-24 bg-[#1e100c] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzbC6VD4ox1fGyxJloIW5jjxEU9beVuVrX-stq09iW4Bq2WFz-a0NwwVKFLJBKpVl_qmYlToArFqK1Bc7wbFCbIwfekDm5sBTAnTHsY3loAMxwKLQT2ux4X-OZTVCfhmCyZtufMrLTAZu4gviWu8NyhaPwlPFHTfqKrmIEveNSH-SxvA_IIzgke9KA2cLP0NLTSfRenGPUyLB0WVNeL5cR_e61DfHRMmoPhsxYQSpUORubwEiXH68D7A"
                  alt="Ảnh polaroid Bác Bảo Vệ"
                  className="w-full h-full object-cover sepia contrast-150"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[9px] font-ui-label text-[#1e100c] text-center mt-0.5">
                Bác Ba - 1992
              </p>
            </div>

            <div className="font-dialogue-text text-xs sm:text-sm italic font-bold text-[#1e100c] leading-relaxed relative pb-2">
              <span className="text-[#8e110b]">"Bác Bảo Vệ - Manh mối hộp điện"</span>
              <p className="text-[10px] font-normal text-[#524434] mt-0.5 not-italic">
                Người bạn thân thiết cùng làm việc với ông nội.
              </p>
            </div>
          </div>
        </section>

        {/* Center Spiral Ring Binding */}
        <div className="w-8 sm:w-10 h-full bg-[#524434] flex flex-col justify-evenly py-6 relative z-10 shadow-[inset_0px_0px_8px_rgba(0,0,0,0.7)] shrink-0 items-center">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-2.5 bg-[#9f8e7a] border-y border-[#180b07] shadow-md relative"
            >
              <div className="absolute left-1 top-0 w-1.5 h-full bg-[#372621]" />
              <div className="absolute right-1 top-0 w-1.5 h-full bg-[#372621]" />
            </div>
          ))}
        </div>

        {/* RIGHT PAGE: Quests Checklist */}
        <section className="flex-1 bg-[#d7c3ae] text-[#1e100c] p-4 sm:p-6 flex flex-col justify-between relative shadow-inner overflow-hidden">
          {/* Header */}
          <div>
            <header className="border-b-4 border-[#1e100c] pb-2 sm:pb-3 relative mb-4">
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-4 border-l-4 border-[#f4a424]" />
              <h1 className="font-ui-label text-xl sm:text-2xl font-bold tracking-widest uppercase text-[#1e100c]">
                NHIỆM VỤ
              </h1>
            </header>

            {/* Checklist */}
            <ul className="flex flex-col gap-4 font-dialogue-text text-xs sm:text-sm">
              {quests.map((quest) => (
                <li
                  key={quest.id}
                  className={`flex items-start gap-3 relative transition-all ${
                    quest.isCompleted ? 'opacity-60' : 'opacity-100 font-semibold'
                  }`}
                >
                  {/* Active Indicator Pulse */}
                  {quest.isActive && !quest.isCompleted && (
                    <div className="absolute -left-4 top-1.5 w-2 h-2 rounded-full bg-[#f4a424] animate-pulse" />
                  )}

                  <input
                    type="checkbox"
                    checked={quest.isCompleted}
                    readOnly
                    className="pixel-checkbox shrink-0 mt-0.5"
                  />

                  <div className="flex-1">
                    <span
                      className={`block leading-snug ${
                        quest.isCompleted
                          ? 'line-through decoration-[#1e100c] decoration-2'
                          : 'text-[#1e100c]'
                      }`}
                    >
                      {quest.titleVi}
                    </span>
                    <span className="block text-[10px] text-[#524434] font-meta-sm mt-0.5">
                      {quest.descriptionVi}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Vintage Rubber Stamp: D1 - '92 */}
          <div className="self-end border-4 border-[#93000a]/50 text-[#93000a]/60 px-3 py-1 font-ui-label text-base sm:text-lg font-black rotate-[-12deg] tracking-widest pointer-events-none select-none">
            D1 - '92
          </div>
        </section>

        {/* Right Leather Edge */}
        <div className="w-3 sm:w-4 h-full bg-[#42312c] border-l-2 border-[#1e100c] shrink-0" />
      </div>
    </div>
  );
};
