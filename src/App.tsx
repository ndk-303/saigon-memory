import React, { useState, useEffect } from 'react';
import { InventoryItem, ItemId, Quest, DialogueNode, DialogueChoice, PointOfInterest, SceneId } from './types';
import { INITIAL_ITEMS, INITIAL_QUESTS, DIALOGUE_DATABASE, ALL_DISCOVERABLE_ITEMS } from './data/gameData';
import { BrowserChrome, GameStatusBar } from './components/BrowserChrome';
import { MainGameCanvas } from './components/MainGameCanvas';
import { InventoryPanel } from './components/InventoryPanel';
import { DialogueBox } from './components/DialogueBox';
import { WirePuzzleModal } from './components/WirePuzzleModal';
import { QuestLogModal } from './components/QuestLogModal';
import { ItemInspectModal } from './components/ItemInspectModal';
import { StoryEndingModal } from './components/StoryEndingModal';
import { sound } from './utils/audio';

export default function App() {
  // Game State
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_ITEMS);
  const [selectedItemId, setSelectedItemId] = useState<ItemId | null>('sugarcane_juice');
  const [inspectedItem, setInspectedItem] = useState<InventoryItem | null>(null);

  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [currentDialogue, setCurrentDialogue] = useState<DialogueNode | null>(DIALOGUE_DATABASE['guard_intro']);

  // Modals & Puzzles
  const [isWirePuzzleOpen, setIsWirePuzzleOpen] = useState(false);
  const [isQuestLogOpen, setIsQuestLogOpen] = useState(false);
  const [isStoryEndingOpen, setIsStoryEndingOpen] = useState(false);

  // Story Milestones
  const [isFuseboxRepaired, setIsFuseboxRepaired] = useState(false);
  const [hasGivenJuice, setHasGivenJuice] = useState(true);
  const [hasPliers, setHasPliers] = useState(false);
  const [hasGrandpaKey, setHasGrandpaKey] = useState(false);

  // Layout & Settings
  const [inventoryLayout, setInventoryLayout] = useState<'right' | 'bottom'>('right');
  const [isMuted, setIsMuted] = useState(false);
  const [currentScene, setCurrentScene] = useState<SceneId>('MAIN_STREET');

  // Keyboard Shortcuts (Q for quests, Esc to close modals, Space to advance dialogue)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'q' || e.key === 'Q') {
        setIsQuestLogOpen((prev) => !prev);
        sound.playClick();
      } else if (e.key === 'Escape') {
        setIsWirePuzzleOpen(false);
        setIsQuestLogOpen(false);
        setInspectedItem(null);
        setIsStoryEndingOpen(false);
      } else if (e.key === 'm' || e.key === 'M') {
        setIsMuted((prev) => {
          sound.isMuted = !prev;
          return !prev;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleMute = () => {
    setIsMuted((prev) => {
      sound.isMuted = !prev;
      return !prev;
    });
  };

  const handleSelectItem = (id: ItemId) => {
    if (id === 'notebook') {
      setIsQuestLogOpen(true);
      return;
    }
    setSelectedItemId((prev) => (prev === id ? null : id));
  };

  const handleSelectPOI = (poi: PointOfInterest) => {
    switch (poi.targetAction) {
      case 'talk_guard':
        if (hasGrandpaKey) {
          setCurrentDialogue(DIALOGUE_DATABASE['guard_after_key']);
        } else if (hasPliers) {
          setCurrentDialogue(DIALOGUE_DATABASE['guard_advice']);
        } else {
          setCurrentDialogue(DIALOGUE_DATABASE['guard_intro']);
        }
        break;

      case 'inspect_fusebox':
        if (isFuseboxRepaired) {
          setCurrentDialogue(DIALOGUE_DATABASE['fusebox_fixed']);
        } else {
          setCurrentDialogue(DIALOGUE_DATABASE['fusebox_locked']);
        }
        break;

      case 'talk_auntie':
        if (hasGrandpaKey) {
          setCurrentDialogue(DIALOGUE_DATABASE['auntie_chest']);
        } else {
          setCurrentDialogue(DIALOGUE_DATABASE['auntie_intro']);
        }
        break;

      case 'pet_cat':
        setCurrentDialogue(DIALOGUE_DATABASE['cat_purr']);
        break;

      case 'inspect_market':
        setCurrentDialogue(DIALOGUE_DATABASE['market_clock']);
        break;

      default:
        break;
    }
  };

  const handleDialogueNext = (nextId?: string) => {
    if (!nextId) {
      // Execute any pending dialogue action trigger before closing
      if (currentDialogue?.actionTrigger === 'open_wire_puzzle') {
        setIsWirePuzzleOpen(true);
      } else if (currentDialogue?.actionTrigger === 'open_quest_log') {
        setIsQuestLogOpen(true);
      } else if (currentDialogue?.actionTrigger === 'complete_story') {
        setIsStoryEndingOpen(true);
      }
      setCurrentDialogue(null);
      return;
    }

    const nextNode = DIALOGUE_DATABASE[nextId];
    if (nextNode) {
      // Check triggers on specific nodes
      if (nextNode.actionTrigger === 'get_pliers' && !hasPliers) {
        setHasPliers(true);
        setInventory((prev) => {
          if (!prev.some((item) => item.id === 'pliers')) {
            return [...prev, ALL_DISCOVERABLE_ITEMS.pliers];
          }
          return prev;
        });
        sound.playSelect();
      }
      setCurrentDialogue(nextNode);
    } else {
      setCurrentDialogue(null);
    }
  };

  const handleSelectChoice = (choice: DialogueChoice) => {
    const nextNode = DIALOGUE_DATABASE[choice.nextId];
    if (nextNode) {
      if (nextNode.actionTrigger === 'get_pliers' && !hasPliers) {
        setHasPliers(true);
        setInventory((prev) => {
          if (!prev.some((item) => item.id === 'pliers')) {
            return [...prev, ALL_DISCOVERABLE_ITEMS.pliers];
          }
          return prev;
        });
      } else if (nextNode.actionTrigger === 'complete_story') {
        // Complete last quest
        setQuests((prev) =>
          prev.map((q) => (q.id === 'unlock_memory_box' ? { ...q, isCompleted: true } : q))
        );
        setIsStoryEndingOpen(true);
      }
      setCurrentDialogue(nextNode);
    }
  };

  const handlePuzzleSolved = () => {
    setIsFuseboxRepaired(true);
    setIsWirePuzzleOpen(false);

    // Give the Grandfather antique key!
    setHasGrandpaKey(true);
    setInventory((prev) => {
      const updated = [...prev];
      if (!updated.some((i) => i.id === 'antique_key')) {
        updated.push(ALL_DISCOVERABLE_ITEMS.antique_key);
      }
      if (!updated.some((i) => i.id === 'memory_photo')) {
        updated.push(ALL_DISCOVERABLE_ITEMS.memory_photo);
      }
      return updated;
    });

    // Update Quests
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === 'check_fusebox') return { ...q, isCompleted: true, isActive: false };
        if (q.id === 'find_key') return { ...q, isCompleted: true, isActive: false };
        if (q.id === 'unlock_memory_box') return { ...q, isActive: true };
        return q;
      })
    );

    sound.playQuestComplete();

    // Trigger dialogue from Mai
    setCurrentDialogue({
      id: 'key_found',
      speaker: 'Mai',
      speakerTitle: 'MAI',
      avatarType: 'mai',
      text: 'Tuyệt quá! Nguồn điện đã được phục hồi, và ngăn bí mật dưới hộp điện đã mở ra chiếc Chìa Khóa Nhà Ông Nội và bức ảnh xưa! Giờ mình hãy mang chìa khóa sang gặp Cô Ba bán chè.',
      choices: [
        { text: 'Đến quán chè mở rương ký ức ngay!', nextId: 'auntie_chest' },
      ],
    });
  };

  const handleResetGame = () => {
    setInventory(INITIAL_ITEMS);
    setSelectedItemId('sugarcane_juice');
    setQuests(INITIAL_QUESTS);
    setCurrentDialogue(DIALOGUE_DATABASE['guard_intro']);
    setIsFuseboxRepaired(false);
    setHasGivenJuice(true);
    setHasPliers(false);
    setHasGrandpaKey(false);
    setIsWirePuzzleOpen(false);
    setIsQuestLogOpen(false);
    setIsStoryEndingOpen(false);
    setCurrentScene('MAIN_STREET');
  };

  const activeQuestsCount = quests.filter((q) => q.isActive && !q.isCompleted).length;

  return (
    <div className="w-screen h-screen bg-[#0c0806] flex items-center justify-center p-0 md:p-3 overflow-hidden select-none font-ui-label">
      {/* 90s Simulated Browser / Retro Operating Shell Window */}
      <div className="relative w-full max-w-[1240px] h-full md:max-h-[740px] bg-[#1e100c] border-2 md:border-4 border-[#524434] shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden rounded-none md:rounded-lg">
        {/* Top Browser Chrome & Address Bar */}
        <BrowserChrome
          url="https://saigonmemory.game/chapter-1-ben-thanh"
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          inventoryLayout={inventoryLayout}
          onToggleLayout={() =>
            setInventoryLayout((prev) => (prev === 'right' ? 'bottom' : 'right'))
          }
          onOpenQuestLog={() => setIsQuestLogOpen(true)}
          onResetGame={handleResetGame}
          activeQuestsCount={activeQuestsCount}
        />

        {/* Game Main Body Container */}
        <div className="relative flex-1 flex overflow-hidden">
          {/* Main Visual Stage */}
          <div className="relative flex-1 h-full flex flex-col overflow-hidden">
            <MainGameCanvas
              onSelectPOI={handleSelectPOI}
              isFuseboxRepaired={isFuseboxRepaired}
              hasGivenJuice={hasGivenJuice}
              currentScene={currentScene}
              onChangeScene={setCurrentScene}
            />

            {/* Bottom Horizontal Inventory (when toggled to bottom layout) */}
            {inventoryLayout === 'bottom' && (
              <InventoryPanel
                items={inventory}
                selectedItemId={selectedItemId}
                onSelectItem={handleSelectItem}
                onInspectItem={(item) => setInspectedItem(item)}
                layout="bottom"
              />
            )}
          </div>

          {/* Right Side Vertical Inventory (Default matching Image 1 & 4) */}
          {inventoryLayout === 'right' && (
            <InventoryPanel
              items={inventory}
              selectedItemId={selectedItemId}
              onSelectItem={handleSelectItem}
              onInspectItem={(item) => setInspectedItem(item)}
              layout="right"
            />
          )}

          {/* Overlay Dialogue Box */}
          {currentDialogue && (
            <div className="absolute bottom-4 sm:bottom-6 left-4 right-4 z-40 pointer-events-auto">
              <DialogueBox
                dialogue={currentDialogue}
                onNext={handleDialogueNext}
                onSelectChoice={handleSelectChoice}
                onClose={() => setCurrentDialogue(null)}
              />
            </div>
          )}
        </div>

        {/* Bottom OS / Game Status Bar */}
        <GameStatusBar
          fps={60}
          locationName={
            currentScene === 'FUSE_BOX_DETAIL'
              ? 'Cột Đèn Giao Thông & Hộp Điện Cũ'
              : 'Góc Phố Chợ Bến Thành (1992)'
          }
        />

        {/* MODALS */}
        {/* 1. Wire Connecting Minigame Modal */}
        <WirePuzzleModal
          isOpen={isWirePuzzleOpen}
          onClose={() => setIsWirePuzzleOpen(false)}
          onSolved={handlePuzzleSolved}
          isAlreadySolved={isFuseboxRepaired}
        />

        {/* 2. Quest Log / Notebook Modal */}
        <QuestLogModal
          isOpen={isQuestLogOpen}
          onClose={() => setIsQuestLogOpen(false)}
          quests={quests}
        />

        {/* 3. Item Lore / Inspector Modal */}
        <ItemInspectModal
          item={inspectedItem}
          onClose={() => setInspectedItem(null)}
        />

        {/* 4. Story Epilogue / Victory Modal */}
        <StoryEndingModal
          isOpen={isStoryEndingOpen}
          onRestart={handleResetGame}
        />
      </div>
    </div>
  );
}
