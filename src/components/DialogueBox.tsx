import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { DialogueNode, DialogueChoice } from '../types';
import { GuardAvatar, AuntieAvatar, MaiAvatar, GrandpaAvatar } from './PixelIcons';
import { sound } from '../utils/audio';

interface DialogueBoxProps {
  dialogue: DialogueNode;
  onNext: (nextId?: string) => void;
  onSelectChoice: (choice: DialogueChoice) => void;
  onClose?: () => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  dialogue,
  onNext,
  onSelectChoice,
  onClose,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const typeIndexRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    typeIndexRef.current = 0;

    if (timerRef.current) clearInterval(timerRef.current);

    const full = dialogue.text;
    timerRef.current = window.setInterval(() => {
      if (typeIndexRef.current < full.length) {
        setDisplayedText(full.slice(0, typeIndexRef.current + 1));
        typeIndexRef.current += 1;
        if (typeIndexRef.current % 3 === 0) {
          sound.playDialogueType();
        }
      } else {
        setIsTyping(false);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 22);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [dialogue.id, dialogue.text]);

  const handleSkipOrNext = () => {
    if (isTyping) {
      // Instant reveal
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplayedText(dialogue.text);
      setIsTyping(false);
      sound.playClick();
    } else {
      if (!dialogue.choices || dialogue.choices.length === 0) {
        sound.playClick();
        onNext(dialogue.nextId);
      }
    }
  };

  const renderAvatar = () => {
    switch (dialogue.avatarType) {
      case 'guard':
        return <GuardAvatar className="w-18 h-18 sm:w-20 sm:h-20" />;
      case 'auntie':
        return <AuntieAvatar className="w-18 h-18 sm:w-20 sm:h-20" />;
      case 'grandpa':
        return <GrandpaAvatar className="w-18 h-18 sm:w-20 sm:h-20" />;
      case 'mai':
      default:
        return <MaiAvatar className="w-18 h-18 sm:w-20 sm:h-20" />;
    }
  };

  return (
    <div
      className="relative w-full max-w-3xl mx-auto bg-[#2c1c18]/95 backdrop-blur-md border-4 border-[#9f8e7a] p-4 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.85)] z-40 transition-all select-none"
      onClick={handleSkipOrNext}
    >
      {/* 4 Corner pixel accents in primary gold */}
      <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#f4a424]" />
      <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#f4a424]" />
      <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#f4a424]" />
      <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#f4a424]" />

      {/* Floating Speaker Tag */}
      <div className="absolute -top-5 left-6 bg-[#f4a424] px-4 py-1 border-2 border-[#180b07] shadow-[2px_2px_0px_black] z-10">
        <span className="text-[#180b07] font-ui-label text-xs sm:text-sm font-bold uppercase tracking-wider">
          {dialogue.speakerTitle || dialogue.speaker}
        </span>
      </div>

      <div className="flex gap-4 sm:gap-6 items-start mt-2">
        {/* Avatar Portrait */}
        <div className="shrink-0 shadow-[4px_4px_0px_rgba(0,0,0,0.6)]">
          {renderAvatar()}
        </div>

        {/* Dialogue Body & Choices */}
        <div className="flex-1 flex flex-col justify-between min-h-[85px]">
          <p className="font-dialogue-text text-[#f9dcd5] text-base sm:text-lg leading-relaxed antialiased">
            {displayedText}
            {isTyping && <span className="inline-block w-2 h-4 bg-[#ffc67c] ml-1 animate-blink" />}
          </p>

          {/* Dialogue Choices */}
          {dialogue.choices && dialogue.choices.length > 0 && !isTyping && (
            <div className="mt-4 flex flex-col gap-2 pt-2 border-t border-[#524434]/80">
              {dialogue.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playSelect();
                    onSelectChoice(choice);
                  }}
                  className="text-left px-3 py-1.5 bg-[#1e100c] hover:bg-[#ffc67c] hover:text-[#1e100c] border border-[#9f8e7a] text-[#ffc67c] font-ui-label text-xs sm:text-sm transition-all flex items-center gap-2 group cursor-pointer shadow-sm"
                >
                  <span className="text-[#f4a424] group-hover:text-[#1e100c] font-bold">▶</span>
                  <span>{choice.text}</span>
                </button>
              ))}
            </div>
          )}

          {/* Next Indicator */}
          {(!dialogue.choices || dialogue.choices.length === 0) && (
            <div className="self-end mt-3 flex items-center gap-1.5 text-[#ffc67c] hover:text-[#f4a424] cursor-pointer group">
              <span className="font-ui-label text-xs sm:text-sm uppercase font-bold tracking-widest">
                {isTyping ? 'Bỏ qua' : 'Tiếp'}
              </span>
              <Play className="w-3.5 h-3.5 fill-current animate-pulse group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
