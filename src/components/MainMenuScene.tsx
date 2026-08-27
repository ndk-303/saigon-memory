import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  Sparkles,
  MapPin,
  Clock,
  Volume2,
  VolumeX,
  HelpCircle,
  FolderSync,
  Cloud,
  CheckCircle2,
  BookOpen,
  Map,
  Compass,
  AlertTriangle,
} from 'lucide-react';
import { ChapterId } from '../types';
import { CHAPTERS_INFO } from '../data/gameData';
import { sound } from '../utils/audio';
import { GameProgressData } from '../services/firebaseService';

interface MainMenuSceneProps {
  guestUid: string | null;
  saveData: GameProgressData | null;
  isLoadingSave: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onStartNewGame: () => void;
  onContinueGame: () => void;
  onSelectChapter: (chapterId: ChapterId) => void;
}

export const MainMenuScene: React.FC<MainMenuSceneProps> = ({
  guestUid,
  saveData,
  isLoadingSave,
  isMuted,
  onToggleMute,
  onStartNewGame,
  onContinueGame,
  onSelectChapter,
}) => {
  const [showConfirmNewGame, setShowConfirmNewGame] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showChapterSelect, setShowChapterSelect] = useState(false);
  const [flickerState, setFlickerState] = useState(true);

  // Neon sign flicker effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFlickerState((prev) => !prev);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Calculate effective unlocked chapters and target resume chapter
  const effectiveUnlockedChapters = Array.from(
    new Set([
      1,
      ...(saveData?.unlockedChapters || [1]),
      ...(saveData?.flags?.isFuseboxRepaired ? [2] : []),
      ...(saveData?.flags?.isMailboxUnlocked ? [3] : []),
      ...(saveData?.flags?.isRadioTuned ? [4] : []),
    ])
  ).sort() as ChapterId[];

  let effectiveChapter: ChapterId = saveData?.currentChapter || 1;
  if (saveData?.flags?.isFuseboxRepaired && effectiveChapter === 1) {
    effectiveChapter = 2;
  } else if (saveData?.flags?.isMailboxUnlocked && effectiveChapter <= 2) {
    effectiveChapter = 3;
  } else if (saveData?.flags?.isRadioTuned && effectiveChapter <= 3) {
    effectiveChapter = 4;
  }

  const hasValidSave = !!saveData;
  const savedChapterInfo = hasValidSave
    ? CHAPTERS_INFO.find((c) => c.id === effectiveChapter) || CHAPTERS_INFO[0]
    : null;

  const formatSaveTime = (isoString?: string) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
    } catch {
      return '';
    }
  };

  const handleNewGameClick = () => {
    sound.playClick();
    if (hasValidSave) {
      setShowConfirmNewGame(true);
    } else {
      onStartNewGame();
    }
  };

  const handleContinueClick = () => {
    if (!hasValidSave) return;
    sound.playClick();
    onContinueGame();
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#100705] flex flex-col items-center justify-between text-[#ffc67c]">
      {/* Background Pixel & Vector Art: Saigon Twilight Skyline & Iconic Ben Thanh Silhouette */}
      <div className="absolute inset-0 pointer-events-none">
        <svg viewBox="0 0 1000 650" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="menuSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e1026" />
              <stop offset="35%" stopColor="#431407" />
              <stop offset="70%" stopColor="#7c2d12" />
              <stop offset="90%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <linearGradient id="neonGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          {/* Twilight Sky */}
          <rect x="0" y="0" width="1000" height="500" fill="url(#menuSky)" />

          {/* Distant Saigon Skyline Silhouettes (Nha Rong Wharf, Notre-Dame Spires, Colonial Buildings) */}
          <polygon points="40,380 40,290 90,290 90,380" fill="#1b0c08" />
          <polygon points="120,380 120,240 140,210 160,240 160,380" fill="#140805" />
          <polygon points="180,380 180,270 240,270 240,380" fill="#1b0c08" />

          {/* Notre-Dame Twin Spires Silhouette */}
          <polygon points="310,380 310,210 325,140 340,210 340,380" fill="#160805" />
          <polygon points="350,380 350,210 365,140 380,210 380,380" fill="#160805" />
          <polygon points="325,140 325,115" stroke="#f59e0b" strokeWidth="2" />
          <polygon points="365,140 365,115" stroke="#f59e0b" strokeWidth="2" />

          {/* Ben Thanh Market Clock Tower in Center Background */}
          <g transform="translate(430, 180)">
            <rect x="20" y="100" width="100" height="120" fill="#1e0b07" stroke="#2c140c" strokeWidth="2" />
            <polygon points="10,100 70,30 130,100" fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" />
            {/* Clock face */}
            <circle cx="70" cy="135" r="22" fill="#fef08a" stroke="#451a03" strokeWidth="3" />
            {/* Clock hands showing 5:15 PM */}
            <line x1="70" y1="135" x2="70" y2="120" stroke="#180805" strokeWidth="3" strokeLinecap="round" />
            <line x1="70" y1="135" x2="82" y2="135" stroke="#180805" strokeWidth="2.5" strokeLinecap="round" />
            {/* 3 Arched windows */}
            <rect x="40" y="170" width="16" height="30" rx="8" fill="#120604" />
            <rect x="62" y="170" width="16" height="30" rx="8" fill="#120604" />
            <rect x="84" y="170" width="16" height="30" rx="8" fill="#120604" />
          </g>

          {/* Right Skyline & Old Apartment Blocks */}
          <polygon points="620,380 620,260 700,260 700,380" fill="#1b0c08" />
          {/* Windows lit in warm yellow */}
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x={635 + (i % 3) * 20}
              y={275 + Math.floor(i / 3) * 22}
              width="10"
              height="12"
              fill={i % 3 === 0 ? '#fde047' : '#78350f'}
              opacity={i % 2 === 0 ? 0.9 : 0.4}
            />
          ))}

          {/* Street Level & Vintage Cobblestones */}
          <rect x="0" y="380" width="1000" height="270" fill="#140805" />
          <line x1="0" y1="380" x2="1000" y2="380" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />

          {/* Vintage Gas Lamp Posts on Left and Right */}
          <g transform="translate(140, 310)">
            <line x1="0" y1="0" x2="0" y2="130" stroke="#26120b" strokeWidth="4" />
            <polygon points="-12,-15 12,-15 8,0 -8,0" fill="#fde047" stroke="#78350f" strokeWidth="2" opacity="0.9" />
            <circle cx="0" cy="-8" r="28" fill="#fef08a" opacity="0.15" />
          </g>
          <g transform="translate(860, 310)">
            <line x1="0" y1="0" x2="0" y2="130" stroke="#26120b" strokeWidth="4" />
            <polygon points="-12,-15 12,-15 8,0 -8,0" fill="#fde047" stroke="#78350f" strokeWidth="2" opacity="0.9" />
            <circle cx="0" cy="-8" r="28" fill="#fef08a" opacity="0.15" />
          </g>

          {/* Vintage Cyclo (Xích Lô) Silhouette parked on roadside */}
          <g transform="translate(240, 420)">
            <circle cx="20" cy="30" r="16" fill="none" stroke="#3e2014" strokeWidth="3" />
            <circle cx="65" cy="30" r="16" fill="none" stroke="#3e2014" strokeWidth="3" />
            <circle cx="100" cy="30" r="14" fill="none" stroke="#3e2014" strokeWidth="3" />
            <path d="M20,30 L45,10 L75,10 L65,30 L100,30" fill="none" stroke="#3e2014" strokeWidth="3" />
            <path d="M40,10 L30,-10 L60,-10" fill="none" stroke="#3e2014" strokeWidth="3" />
          </g>
        </svg>
      </div>

      {/* CRT Scanline & Retro Grain Overlay */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

      {/* TOP BAR: Audio Toggle & Quick Info */}
      <div className="relative z-20 w-full max-w-5xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 bg-[#1e100c]/85 border border-[#854d0e] rounded-md text-xs font-ui-label">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-[#fde047] font-bold">Phiên Bản 1.0</span>
          <span className="text-[#a88267] hidden sm:inline">• Pixel Retro 16-Bit</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              setShowHowToPlay(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2c150e]/90 hover:bg-[#3f2117] border border-[#a16207] text-[#ffc67c] text-xs font-ui-label rounded cursor-pointer transition-all hover:scale-105 shadow"
            title="Hướng dẫn chơi & Phím tắt"
          >
            <HelpCircle className="w-4 h-4 text-[#f59e0b]" />
            <span className="hidden sm:inline">HƯỚNG DẪN</span>
          </button>

          <button
            onClick={onToggleMute}
            className="p-2 bg-[#2c150e]/90 hover:bg-[#3f2117] border border-[#a16207] text-[#ffc67c] rounded cursor-pointer transition-all hover:scale-105 shadow"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#ef4444]" /> : <Volume2 className="w-4 h-4 text-[#22c55e]" />}
          </button>
        </div>
      </div>

      {/* CENTER: TITLE & MAIN ACTIONS */}
      <div className="relative z-20 flex flex-col items-center justify-center my-auto text-center px-4">
        {/* Vintage Neon Header Box */}
        <div className="mb-2 inline-flex items-center gap-2 px-4 py-1 bg-[#2c140c]/90 border-2 border-[#d97706] rounded-full shadow-[0_0_15px_rgba(245,158,11,0.3)]">
          <Sparkles className="w-4 h-4 text-[#fde047] animate-spin" />
          <span className="font-ui-label text-xs sm:text-sm font-bold tracking-widest text-[#fde047] uppercase">
            Point & Click Adventure
          </span>
          <Sparkles className="w-4 h-4 text-[#fde047] animate-spin" />
        </div>

        {/* Main Game Title */}
        <h1
          className={`font-viet-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wider transition-all duration-300 drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] ${
            flickerState
              ? 'text-[#fef08a] [text-shadow:0_0_20px_#f59e0b,0_0_40px_#dc2626]'
              : 'text-[#fde047] [text-shadow:0_0_12px_#f59e0b]'
          }`}
        >
          HỒI ỨC SÀI GÒN
        </h1>

        {/* Subtitle */}
        <p className="font-dialogue-body text-sm sm:text-lg text-[#fcd34d] max-w-xl mt-1 sm:mt-2 italic tracking-wide drop-shadow">
          "Hành trình lần theo những ký ức vàng son qua bốn thập kỷ thăng trầm"
        </p>

        {/* 4 Chapter Icons Ribbon */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 my-6 py-2 px-4 bg-[#1e0e09]/80 border border-[#78350f] rounded-lg backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-xs font-ui-label text-[#ffc67c]">
            <span className="text-sm">🏛️</span> 1992 Bến Thành
          </div>
          <span className="text-[#78350f]">•</span>
          <div className="flex items-center gap-1.5 text-xs font-ui-label text-[#ffc67c]">
            <span className="text-sm">✉️</span> 1968 Bưu Điện
          </div>
          <span className="text-[#78350f]">•</span>
          <div className="flex items-center gap-1.5 text-xs font-ui-label text-[#ffc67c]">
            <span className="text-sm">☕</span> 1985 Tôn Thất Đạm
          </div>
          <span className="text-[#78350f]">•</span>
          <div className="flex items-center gap-1.5 text-xs font-ui-label text-[#ffc67c]">
            <span className="text-sm">🌺</span> 1995 Hẻm Hoa Giấy
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3 w-full max-w-sm sm:max-w-md mt-2">
          {/* 1. BUTTON TIẾP TỤC (CONTINUE) */}
          <button
            onClick={handleContinueClick}
            disabled={!hasValidSave || isLoadingSave}
            className={`relative group w-full py-3.5 sm:py-4 px-6 rounded-lg font-ui-label text-base sm:text-lg font-bold border-2 transition-all duration-200 flex items-center justify-between cursor-pointer ${
              hasValidSave && !isLoadingSave
                ? 'bg-gradient-to-r from-[#854d0e] via-[#b45309] to-[#d97706] hover:from-[#a16207] hover:to-[#f59e0b] border-[#fef08a] text-[#180b07] shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:scale-[1.02]'
                : 'bg-[#21110c]/80 border-[#522919] text-[#714e3e] cursor-not-allowed opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <Play className={`w-6 h-6 ${hasValidSave ? 'fill-current text-[#180b07]' : 'text-[#714e3e]'}`} />
              <div className="text-left">
                <div className="leading-tight">TIẾP TỤC HÀNH TRÌNH</div>
                {hasValidSave && savedChapterInfo && (
                  <div className="text-xs font-normal text-[#1e0b07]/90 mt-0.5">
                    {savedChapterInfo.titleVi} • {savedChapterInfo.year}
                  </div>
                )}
              </div>
            </div>

            {hasValidSave && (
              <span className="px-2 py-0.5 bg-[#180b07] text-[#fde047] text-[11px] font-bold rounded border border-[#fef08a]">
                Chương {effectiveChapter}
              </span>
            )}
            {!hasValidSave && !isLoadingSave && (
              <span className="text-xs text-[#714e3e] italic">Chưa có bản lưu</span>
            )}
            {isLoadingSave && (
              <span className="text-xs text-[#fde047] animate-pulse">Đang tải...</span>
            )}
          </button>

          {/* 2. BUTTON CHƠI MỚI (NEW GAME) */}
          <button
            onClick={handleNewGameClick}
            className="w-full py-3.5 px-6 rounded-lg font-ui-label text-base sm:text-lg font-bold bg-[#381c12] hover:bg-[#4d281a] border-2 border-[#d97706] text-[#ffedd5] hover:text-[#fef08a] shadow-lg transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 text-[#f59e0b]" />
            <span>CHƠI MỚI</span>
          </button>

          {/* 3. BUTTON CHỌN CHƯƠNG (NẾU ĐÃ MỞ KHÓA > 1 CHƯƠNG) */}
          {hasValidSave && effectiveUnlockedChapters.length > 1 && (
            <button
              onClick={() => {
                sound.playClick();
                setShowChapterSelect(true);
              }}
              className="w-full py-2.5 px-6 rounded-lg font-ui-label text-sm sm:text-base font-bold bg-[#1e0f0a]/90 hover:bg-[#2b160f] border border-[#a16207] text-[#fcd34d] shadow transition-all flex items-center justify-center gap-2 cursor-pointer hover:border-[#f59e0b]"
            >
              <Compass className="w-4 h-4 text-[#f59e0b]" />
              <span>CHỌN CHƯƠNG ĐÃ MỞ KHÓA ({effectiveUnlockedChapters.length}/4)</span>
            </button>
          )}
        </div>
      </div>

      {/* BOTTOM FOOTER: Guest ID & Firestore Status */}
      <div className="relative z-20 w-full max-w-5xl px-6 py-3 border-t border-[#3c1d12] bg-[#120705]/95 backdrop-blur flex flex-col sm:flex-row items-center justify-between text-xs text-[#a88267] gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1e0f0a] border border-[#522919] rounded">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            <span className="text-[#fcd34d] font-bold">Khách Ẩn Danh:</span>
            <span className="font-mono text-[#fed7aa]">
              {guestUid ? `${guestUid.substring(0, 10)}...` : 'Đang kết nối...'}
            </span>
          </div>
        </div>

        {hasValidSave && (
          <div className="flex items-center gap-1 text-[#fcd34d] mx-auto font-ui-label text-[11px]">
            <FolderSync className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>Lưu lần cuối: {formatSaveTime(saveData?.updatedAt)}</span>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: XÁC NHẬN CHƠI MỚI (KHI ĐÃ CÓ BẢN LƯU) */}
      {/* ========================================================================= */}
      {showConfirmNewGame && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#1e0f0a] border-2 border-[#ef4444] rounded-lg p-6 shadow-2xl text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-[#7f1d1d]/40 border-2 border-[#ef4444] flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-[#ef4444]" />
            </div>

            <h3 className="font-viet-display text-xl font-bold text-[#fef08a] mb-2">
              BẮT ĐẦU VÁN MỚI?
            </h3>

            <p className="font-dialogue-body text-sm text-[#fcd34d] mb-4">
              Bạn đang có một bản lưu tiến trình tại{' '}
              <strong className="text-[#fef08a]">
                {savedChapterInfo ? `Chương ${saveData?.currentChapter} (${savedChapterInfo.locationVi})` : 'tiến trình trước'}
              </strong>
              . Bắt đầu mới sẽ thiết lập lại toàn bộ túi đồ và câu đố từ Chương 1.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowConfirmNewGame(false)}
                className="px-4 py-2 bg-[#2c140c] hover:bg-[#3c1c11] text-[#ffc67c] font-ui-label text-xs font-bold border border-[#78350f] rounded cursor-pointer"
              >
                HỦY BỎ
              </button>

              <button
                onClick={() => {
                  setShowConfirmNewGame(false);
                  onStartNewGame();
                }}
                className="px-4 py-2 bg-[#dc2626] hover:bg-[#ef4444] text-white font-ui-label text-xs font-bold border border-[#f87171] rounded cursor-pointer shadow-lg"
              >
                XÁC NHẬN CHƠI MỚI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CHỌN CHƯƠNG ĐÃ MỞ KHÓA */}
      {/* ========================================================================= */}
      {showChapterSelect && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#1e0f0a] border-2 border-[#d97706] rounded-lg p-6 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#522919]">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#f59e0b]" />
                <h3 className="font-viet-display text-lg font-bold text-[#fef08a]">
                  CHỌN CHƯƠNG HỒI ỨC
                </h3>
              </div>
              <button
                onClick={() => setShowChapterSelect(false)}
                className="text-[#a88267] hover:text-[#fef08a] text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-4">
              {CHAPTERS_INFO.map((chap) => {
                const isUnlocked = effectiveUnlockedChapters.includes(chap.id);
                return (
                  <button
                    key={chap.id}
                    disabled={!isUnlocked}
                    onClick={() => {
                      if (!isUnlocked) return;
                      sound.playClick();
                      setShowChapterSelect(false);
                      onSelectChapter(chap.id);
                    }}
                    className={`p-3 rounded border text-left flex items-center justify-between transition-all ${
                      isUnlocked
                        ? 'bg-[#2c140c] hover:bg-[#3c1d12] border-[#a16207] hover:border-[#f59e0b] cursor-pointer'
                        : 'bg-[#140805] border-[#291208] text-[#522919] cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-ui-label font-bold text-xs text-[#f59e0b]">
                          CHƯƠNG {chap.id} • {chap.year}
                        </span>
                        <span className="text-xs text-[#fcd34d] font-bold">{chap.locationVi}</span>
                      </div>
                      <div className="text-xs text-[#a88267] mt-0.5">{chap.titleVi}</div>
                    </div>

                    <div>
                      {isUnlocked ? (
                        <span className="px-2 py-1 bg-[#180b07] text-[#22c55e] border border-[#22c55e]/40 rounded text-[11px] font-bold">
                          ĐÃ MỞ KHÓA
                        </span>
                      ) : (
                        <span className="text-xs text-[#522919]">🔒 Đang khóa</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowChapterSelect(false)}
              className="w-full py-2 bg-[#2c140c] hover:bg-[#3c1d12] text-[#ffc67c] font-ui-label text-xs font-bold border border-[#78350f] rounded cursor-pointer"
            >
              ĐÓNG
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: HƯỚNG DẪN CHƠI & ĐIỀU KHIỂN */}
      {/* ========================================================================= */}
      {showHowToPlay && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#1e0f0a] border-2 border-[#f59e0b] rounded-lg p-6 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#522919]">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#f59e0b]" />
                <h3 className="font-viet-display text-lg font-bold text-[#fef08a]">
                  HƯỚNG DẪN CHƠI & ĐIỀU KHIỂN
                </h3>
              </div>
              <button
                onClick={() => setShowHowToPlay(false)}
                className="text-[#a88267] hover:text-[#fef08a] text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-dialogue-body text-xs sm:text-sm text-[#fcd34d] mb-4">
              <div className="p-2.5 bg-[#2c140c] border border-[#522919] rounded flex items-start gap-2.5">
                <span className="text-base">🖱️</span>
                <div>
                  <strong className="text-[#fef08a]">Point & Click Cổ Điển:</strong> Nhấp chuột vào các điểm nóng (vòng tròn phát sáng) để trò chuyện, kiểm tra đồ vật hoặc giải đố.
                </div>
              </div>

              <div className="p-2.5 bg-[#2c140c] border border-[#522919] rounded flex items-start gap-2.5">
                <span className="text-base">🎒</span>
                <div>
                  <strong className="text-[#fef08a]">Túi Đồ & Kết Hợp Vật Phẩm:</strong> Kéo hoặc chọn vật phẩm để tương tác. Có thể ghép 2 vật phẩm lại với nhau (VD: Kéo + Cuộn Len) để chế tác công cụ mới.
                </div>
              </div>

              <div className="p-2.5 bg-[#2c140c] border border-[#522919] rounded flex items-start gap-2.5">
                <span className="text-base">⌨️</span>
                <div>
                  <strong className="text-[#fef08a]">Phím Tắt Nhanh:</strong>
                  <ul className="list-disc list-inside mt-1 text-xs text-[#ffc67c] space-y-0.5">
                    <li><strong className="text-white">Q</strong>: Mở Sổ Tay Nhiệm Vụ Ký Ức</li>
                    <li><strong className="text-white">M</strong>: Mở Bản Đồ Tuyến Thời Gian 4 Chương</li>
                    <li><strong className="text-white">ESC</strong>: Đóng nhanh các bảng câu đố</li>
                  </ul>
                </div>
              </div>

              <div className="p-2.5 bg-[#2c140c] border border-[#522919] rounded flex items-start gap-2.5">
                <span className="text-base">☁️</span>
                <div>
                  <strong className="text-[#fef08a]">Tự Động Lưu Đám Mây (Auto-Save):</strong> Tiến trình chơi của bạn được tự động đồng bộ lên Firebase Cloud Firestore sau mỗi vật phẩm nhặt được hoặc câu đố hoàn thành.
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowHowToPlay(false)}
              className="w-full py-2 bg-[#d97706] hover:bg-[#f59e0b] text-[#180b07] font-ui-label text-xs font-bold rounded cursor-pointer shadow transition-all"
            >
              ĐÃ HIỂU, QUAY LẠI MENU
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
