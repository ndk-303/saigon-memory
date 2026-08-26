import React, { useState, useEffect } from 'react';
import { X, Flame, Sparkles, CheckCircle2, Wind, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface HuTieuCookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSolved: () => void;
  isAlreadySolved?: boolean;
}

interface Ingredient {
  id: string;
  nameVi: string;
  descVi: string;
  order: number;
  color: string;
}

const INGREDIENTS: Ingredient[] = [
  {
    id: 'bone_squid',
    nameVi: '1. Xương Ống & Mực Nướng',
    descVi: 'Hầm tủy xương và mực khô nướng than tạo vị ngọt thanh',
    order: 1,
    color: '#fed7aa',
  },
  {
    id: 'radish_shallot',
    nameVi: '2. Củ Cải Muối & Hành Phi',
    descVi: 'Dậy mùi thơm nồng nàn đặc trưng của hủ tiếu Sài Gòn xưa',
    order: 2,
    color: '#ca8a04',
  },
  {
    id: 'sugar_sauce',
    nameVi: '3. Đường Phèn & Nước Mắm Cốt',
    descVi: 'Nêm vị đậm đà mặn mà thấm đượm đầu lưỡi',
    order: 3,
    color: '#b45309',
  },
  {
    id: 'garlic_pepper',
    nameVi: '4. Tỏi Phi Giòn & Tiêu Sọ',
    descVi: 'Tầng hương thơm cuối cùng bốc lên nghi ngút',
    order: 4,
    color: '#facc15',
  },
];

export const HuTieuCookingModal: React.FC<HuTieuCookingModalProps> = ({
  isOpen,
  onClose,
  onSolved,
  isAlreadySolved = false,
}) => {
  const [addedIngredients, setAddedIngredients] = useState<string[]>(
    isAlreadySolved ? INGREDIENTS.map((i) => i.id) : []
  );
  const [temperature, setTemperature] = useState(isAlreadySolved ? 95 : 65);
  const [isBoiling, setIsBoiling] = useState(isAlreadySolved);
  const [isCompleted, setIsCompleted] = useState(isAlreadySolved);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  useEffect(() => {
    if (isAlreadySolved) {
      setIsCompleted(true);
      return;
    }

    // Passive temperature decay towards room temp
    const interval = setInterval(() => {
      setTemperature((prev) => Math.max(50, prev - 1.2));
    }, 400);

    return () => clearInterval(interval);
  }, [isAlreadySolved]);

  if (!isOpen) return null;

  const handlePumpBellows = () => {
    sound.playCookSizzle();
    setTemperature((prev) => Math.min(115, prev + 8));
  };

  const handleAddIngredient = (ing: Ingredient) => {
    if (addedIngredients.includes(ing.id) || isCompleted) return;

    // Check temp
    if (temperature < 80) {
      sound.playElectricShock();
      setFeedbackMsg('⚠ Nước lèo chưa đủ nóng (dưới 80°C)! Hãy quạt than thêm!');
      return;
    }

    const expectedOrder = addedIngredients.length + 1;
    if (ing.order !== expectedOrder) {
      sound.playElectricShock();
      setFeedbackMsg(`⚠ Sai thứ tự gia vị! Cần thả nguyên liệu bước ${expectedOrder} trước!`);
      return;
    }

    // Success add
    sound.playJuiceSquirt();
    sound.playCookSizzle();
    const next = [...addedIngredients, ing.id];
    setAddedIngredients(next);
    setFeedbackMsg(`✓ Đã nêm thành công ${ing.nameVi}!`);

    if (next.length === INGREDIENTS.length) {
      setIsCompleted(true);
      setIsBoiling(true);
      sound.playPuzzleSolved();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#22c55e', '#ef4444'],
      });
      setTimeout(() => {
        onSolved();
      }, 1500);
    }
  };

  const isTempOptimal = temperature >= 85 && temperature <= 105;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#241511] border-8 border-[#524434] p-5 sm:p-6 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col text-center">
        {/* Corner Ornaments */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-[#f4a424]" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-[#f4a424]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#f4a424]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#f4a424]" />

        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 mb-3 border-b-4 border-[#3e2c28]">
          <div className="flex items-center gap-2">
            <Utensils className="w-6 h-6 text-[#f59e0b] animate-bounce" />
            <h2 className="font-ui-label text-base sm:text-lg text-[#ffc67c] font-bold uppercase tracking-wider">
              NẤU NỒI NƯỚC LÈO HỦ TIẾU GIA TRUYỀN
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-[#9f8e7a] hover:text-[#ffb4ab] p-1 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Instructions */}
        <p className="text-xs text-[#d7c3ae] font-dialogue-text mb-3">
          ★ Thổi bếp than giữ nhiệt độ trong vùng xanh (85°C - 105°C) và nêm 4 gia vị đúng thứ tự công thức ông ngoại!
        </p>

        {/* Feedback Message */}
        {feedbackMsg && (
          <div className="bg-[#180b07] border border-[#f59e0b] p-1.5 mb-3 text-xs text-[#fde68a] font-ui-label">
            {feedbackMsg}
          </div>
        )}

        {/* Main Cooking Pot & Stove Stage */}
        <div className="relative w-full h-52 bg-[#160a07] border-4 border-[#3e2c28] p-4 flex items-center justify-around overflow-hidden shadow-inner mb-4">
          {/* Left: Temperature Gauge & Bellows */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-28 bg-[#1e293b] border-2 border-[#64748b] rounded-full p-1 relative flex flex-col justify-end">
              {/* Optimal zone marker */}
              <div className="absolute top-6 left-0 right-0 h-10 bg-[#22c55e]/30 border-y border-[#22c55e]" />
              {/* Mercury column */}
              <div
                className={`w-full rounded-full transition-all duration-200 ${
                  isTempOptimal ? 'bg-[#22c55e]' : temperature > 105 ? 'bg-[#ef4444]' : 'bg-[#38bdf8]'
                }`}
                style={{ height: `${Math.min(100, (temperature / 120) * 100)}%` }}
              />
            </div>

            <div className="text-[11px] font-mono font-bold text-[#ffedd5]">
              {Math.round(temperature)}°C
            </div>

            <button
              onClick={handlePumpBellows}
              className="px-3 py-1.5 bg-[#ea580c] hover:bg-[#f97316] text-black font-ui-label text-[11px] font-bold border border-black rounded shadow flex items-center gap-1 cursor-pointer active:scale-95"
            >
              <Wind className="w-3.5 h-3.5" />
              Thổi Than
            </button>
          </div>

          {/* Center: Steaming Traditional Pot */}
          <div className="flex flex-col items-center justify-end h-full">
            {/* Steam animation */}
            <div className="flex gap-2 mb-1">
              <div className="w-2 h-8 bg-white/60 rounded-full blur-[1px] animate-pulse" />
              <div className="w-2 h-10 bg-white/70 rounded-full blur-[1px] animate-pulse delay-100" />
              <div className="w-2 h-8 bg-white/60 rounded-full blur-[1px] animate-pulse delay-200" />
            </div>

            {/* Brass Aluminum Pot */}
            <div className="relative w-36 h-24 bg-[#d97706] border-4 border-[#78350f] rounded-b-2xl shadow-2xl flex flex-col justify-between p-2 overflow-hidden">
              {/* Pot Handles */}
              <div className="absolute -left-3 top-6 w-3 h-5 bg-[#78350f] rounded-l" />
              <div className="absolute -right-3 top-6 w-3 h-5 bg-[#78350f] rounded-r" />

              {/* Broth Liquid */}
              <div className="w-full h-full bg-gradient-to-b from-[#f59e0b] to-[#b45309] rounded-b-xl flex flex-wrap gap-1 p-1 items-center justify-center">
                {addedIngredients.map((id) => (
                  <div key={id} className="w-4 h-4 rounded-full bg-[#fef08a] border border-[#78350f] animate-spin" />
                ))}
              </div>
            </div>

            {/* Glowing Charcoal Stove */}
            <div className="w-40 h-8 bg-[#334155] border-2 border-[#1e293b] rounded-b flex items-center justify-center gap-2">
              <Flame className={`w-4 h-4 ${isTempOptimal ? 'text-[#f59e0b] animate-bounce' : 'text-[#ef4444]'}`} />
              <Flame className={`w-4 h-4 ${isTempOptimal ? 'text-[#f59e0b] animate-bounce delay-75' : 'text-[#ef4444]'}`} />
              <Flame className={`w-4 h-4 ${isTempOptimal ? 'text-[#f59e0b] animate-bounce delay-150' : 'text-[#ef4444]'}`} />
            </div>
          </div>
        </div>

        {/* 4 Ingredient Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {INGREDIENTS.map((ing) => {
            const isAdded = addedIngredients.includes(ing.id);
            return (
              <button
                key={ing.id}
                disabled={isAdded || isCompleted}
                onClick={() => handleAddIngredient(ing)}
                className={`p-2.5 text-left border-2 transition-all flex flex-col justify-between ${
                  isAdded
                    ? 'bg-[#14532d] border-[#22c55e] text-[#bbf7d0] opacity-80'
                    : 'bg-[#271814] border-[#524434] hover:border-[#f59e0b] hover:bg-[#372621] text-[#ffedd5] cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-ui-label text-xs font-bold text-[#ffc67c]">
                    {ing.nameVi}
                  </span>
                  {isAdded && <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />}
                </div>
                <span className="text-[10px] text-[#d7c3ae] mt-1 line-clamp-1">
                  {ing.descVi}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              sound.playClick();
              setAddedIngredients([]);
              setTemperature(65);
              setIsCompleted(false);
              setFeedbackMsg('');
            }}
            className="px-4 py-2 bg-[#372621] text-[#ffedd5] font-ui-label text-xs font-bold border-2 border-[#9f8e7a] hover:bg-[#524434] transition-colors cursor-pointer"
          >
            NẤU LẠI TỪ ĐẦU
          </button>

          {isCompleted && (
            <button
              onClick={() => {
                sound.playQuestComplete();
                onSolved();
              }}
              className="px-6 py-2 bg-[#22c55e] text-[#052e16] font-ui-label text-xs sm:text-sm font-bold border-2 border-[#14532d] hover:bg-[#4ade80] transition-colors flex items-center gap-1.5 shadow-lg animate-bounce cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              HOÀN TẤT NỒI NƯỚC LÈO
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
