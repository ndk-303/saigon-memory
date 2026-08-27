import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  InventoryItem,
  ItemId,
  Quest,
  DialogueNode,
  DialogueChoice,
  PointOfInterest,
  SceneId,
  ChapterId,
} from './types';
import {
  INITIAL_ITEMS,
  INITIAL_QUESTS,
  DIALOGUE_DATABASE,
  ALL_DISCOVERABLE_ITEMS,
  CHAPTERS_INFO,
  ITEM_COMBINATIONS,
} from './data/gameData';
import { BrowserChrome, GameStatusBar } from './components/BrowserChrome';
import { MainGameCanvas } from './components/MainGameCanvas';
import { InventoryPanel } from './components/InventoryPanel';
import { DialogueBox } from './components/DialogueBox';
import { WirePuzzleModal } from './components/WirePuzzleModal';
import { DialLockPuzzleModal } from './components/DialLockPuzzleModal';
import { RadioTuningModal } from './components/RadioTuningModal';
import { MosaicPuzzleModal } from './components/MosaicPuzzleModal';
import { SugarcaneJuiceModal } from './components/SugarcaneJuiceModal';
import { GuitarTuningModal } from './components/GuitarTuningModal';
import { HuTieuCookingModal } from './components/HuTieuCookingModal';
import { QuestLogModal } from './components/QuestLogModal';
import { ItemInspectModal } from './components/ItemInspectModal';
import { ChapterTransitionOverlay } from './components/ChapterTransitionOverlay';
import { ChapterMapModal } from './components/ChapterMapModal';
import { SceneTransitionCurtain } from './components/SceneTransitionCurtain';
import { StoryEndingModal } from './components/StoryEndingModal';
import { BootScene } from './components/BootScene';
import { MainMenuScene } from './components/MainMenuScene';
import { firebaseService, GameProgressData, GameFlags } from './services/firebaseService';
import { sound } from './utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, CloudCheck, Save } from 'lucide-react';

export type GameSceneState = 'boot' | 'main_menu' | 'playing';

export default function App() {
  // Game Screen State Flow
  const [gameState, setGameState] = useState<GameSceneState>('boot');
  const [bootStatusText, setBootStatusText] = useState('Đang khởi tạo ứng dụng...');
  const [bootProgress, setBootProgress] = useState(15);

  // Firebase Auth & Cloud Save State
  const [guestUid, setGuestUid] = useState<string | null>(null);
  const [cloudSaveData, setCloudSaveData] = useState<GameProgressData | null>(null);
  const [isLoadingSave, setIsLoadingSave] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Chapter & Scene State
  const [currentChapter, setCurrentChapter] = useState<ChapterId>(1);
  const [unlockedChapters, setUnlockedChapters] = useState<ChapterId[]>([1]);
  const [currentScene, setCurrentScene] = useState<SceneId>('CH1_BEN_THANH');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Items & Quests
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_ITEMS);
  const [selectedItemId, setSelectedItemId] = useState<ItemId | null>('sugarcane_juice');
  const [inspectedItem, setInspectedItem] = useState<InventoryItem | null>(null);
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [currentDialogue, setCurrentDialogue] = useState<DialogueNode | null>(
    DIALOGUE_DATABASE['guard_intro']
  );

  // Combination & Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Minigame & Puzzle Modals
  const [isSugarcaneModalOpen, setIsSugarcaneModalOpen] = useState(false);
  const [isWirePuzzleOpen, setIsWirePuzzleOpen] = useState(false);
  const [isDialPuzzleOpen, setIsDialPuzzleOpen] = useState(false);
  const [isGuitarModalOpen, setIsGuitarModalOpen] = useState(false);
  const [isRadioPuzzleOpen, setIsRadioPuzzleOpen] = useState(false);
  const [isHuTieuModalOpen, setIsHuTieuModalOpen] = useState(false);
  const [isMosaicPuzzleOpen, setIsMosaicPuzzleOpen] = useState(false);

  // Chapter Modals & Ending
  const [isChapterOverlayOpen, setIsChapterOverlayOpen] = useState(false);
  const [completedChapterForOverlay, setCompletedChapterForOverlay] = useState<ChapterId>(1);
  const [isChapterMapOpen, setIsChapterMapOpen] = useState(false);
  const [isQuestLogOpen, setIsQuestLogOpen] = useState(false);
  const [isStoryEndingOpen, setIsStoryEndingOpen] = useState(false);

  // Milestones & Solved States Flags
  const [isJuicePressed, setIsJuicePressed] = useState(false);
  const [isFuseboxRepaired, setIsFuseboxRepaired] = useState(false);
  const [hasPliers, setHasPliers] = useState(false);
  const [isMailboxUnlocked, setIsMailboxUnlocked] = useState(false);
  const [hasTweezer, setHasTweezer] = useState(false);
  const [hasRareStamp, setHasRareStamp] = useState(false);
  const [hasMagnifier, setHasMagnifier] = useState(false);
  const [isGuitarTuned, setIsGuitarTuned] = useState(false);
  const [isRadioTuned, setIsRadioTuned] = useState(false);
  const [hasScissors, setHasScissors] = useState(false);
  const [hasThread, setHasThread] = useState(false);
  const [hasRadioKnob, setHasRadioKnob] = useState(false);
  const [hasHomeKey, setHasHomeKey] = useState(false);
  const [isHuTieuCooked, setIsHuTieuCooked] = useState(false);
  const [isChestOpened, setIsChestOpened] = useState(false);
  const [hasMosaicTile, setHasMosaicTile] = useState(false);

  // Settings
  const [inventoryLayout, setInventoryLayout] = useState<'right' | 'bottom'>('right');
  const [isMuted, setIsMuted] = useState(false);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Compile current flags helper
  const getCurrentFlags = useCallback((): GameFlags => ({
    isJuicePressed,
    isFuseboxRepaired,
    hasPliers,
    isMailboxUnlocked,
    hasTweezer,
    hasRareStamp,
    hasMagnifier,
    isGuitarTuned,
    isRadioTuned,
    hasScissors,
    hasThread,
    hasRadioKnob,
    hasHomeKey,
    isHuTieuCooked,
    isChestOpened,
    hasMosaicTile,
  }), [
    isJuicePressed,
    isFuseboxRepaired,
    hasPliers,
    isMailboxUnlocked,
    hasTweezer,
    hasRareStamp,
    hasMagnifier,
    isGuitarTuned,
    isRadioTuned,
    hasScissors,
    hasThread,
    hasRadioKnob,
    hasHomeKey,
    isHuTieuCooked,
    isChestOpened,
    hasMosaicTile,
  ]);

  // Cloud Auto-Save Function
  const saveProgressToCloud = useCallback(
    async (
      overrideChapter?: ChapterId,
      overrideScene?: SceneId,
      overrideInventory?: InventoryItem[],
      overrideFlags?: Partial<GameFlags>,
      overrideQuests?: Quest[],
      overrideUnlocked?: ChapterId[]
    ) => {
      setIsSaving(true);
      const currentFlags = getCurrentFlags();
      const payload = {
        currentChapter: overrideChapter ?? currentChapter,
        currentScene: overrideScene ?? currentScene,
        unlockedChapters: overrideUnlocked ?? unlockedChapters,
        inventory: overrideInventory ?? inventory,
        flags: { ...currentFlags, ...(overrideFlags || {}) },
        quests: overrideQuests ?? quests,
      };

      const success = await firebaseService.saveGameProgress(payload);
      if (success) {
        setCloudSaveData({
          ...payload,
          updatedAt: new Date().toISOString(),
          userId: guestUid || undefined,
        });
      }
      setIsSaving(false);
      return success;
    },
    [currentChapter, currentScene, unlockedChapters, inventory, quests, getCurrentFlags, guestUid]
  );

  // =========================================================================
  // BOOT & FIREBASE AUTHENTICATION LIFECYCLE
  // =========================================================================
  useEffect(() => {
    let isMounted = true;

    async function initGameSession() {
      try {
        setBootStatusText('Đang xác thực tài khoản Khách Ẩn Danh...');
        setBootProgress(35);

        const authResult = await firebaseService.initAnonymousAuth();
        if (!isMounted) return;

        setGuestUid(authResult.uid);
        setBootStatusText('Đang tải bản lưu từ Firebase Firestore...');
        setBootProgress(70);

        const save = await firebaseService.loadGameProgress();
        if (!isMounted) return;

        if (save) {
          setCloudSaveData(save);
        }
        setIsLoadingSave(false);
        setBootProgress(100);
        setBootStatusText('Khởi động thành công!');

        setTimeout(() => {
          if (isMounted) {
            setGameState('main_menu');
          }
        }, 600);
      } catch (err) {
        console.error('Boot initialization error:', err);
        if (!isMounted) return;
        setIsLoadingSave(false);
        setBootProgress(100);
        setBootStatusText('Vào game chế độ ngoại tuyến...');
        setTimeout(() => {
          if (isMounted) {
            setGameState('main_menu');
          }
        }, 800);
      }
    }

    initGameSession();

    return () => {
      isMounted = false;
    };
  }, []);

  // Keyboard Shortcuts (Q: Sổ tay, M: Bản đồ, Esc: Đóng modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      if (e.key === 'q' || e.key === 'Q') {
        setIsQuestLogOpen((prev) => !prev);
        sound.playClick();
      } else if (e.key === 'm' || e.key === 'M') {
        setIsChapterMapOpen((prev) => !prev);
        sound.playClick();
      } else if (e.key === 'Escape') {
        setIsSugarcaneModalOpen(false);
        setIsWirePuzzleOpen(false);
        setIsDialPuzzleOpen(false);
        setIsGuitarModalOpen(false);
        setIsRadioPuzzleOpen(false);
        setIsHuTieuModalOpen(false);
        setIsMosaicPuzzleOpen(false);
        setIsQuestLogOpen(false);
        setIsChapterMapOpen(false);
        setInspectedItem(null);
        setIsStoryEndingOpen(false);
        setIsChapterOverlayOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const handleToggleMute = () => {
    setIsMuted((prev) => {
      sound.isMuted = !prev;
      return !prev;
    });
  };

  const handleSelectItem = (id: ItemId) => {
    if (id === 'notebook' || id === 'notebook_decoded') {
      setIsQuestLogOpen(true);
      return;
    }
    setSelectedItemId((prev) => (prev === id ? null : id));
  };

  // =========================================================================
  // MAIN MENU ACTIONS: START NEW GAME, CONTINUE, SELECT CHAPTER, GO HOME
  // =========================================================================
  const handleStartNewGame = async () => {
    // Reset all game state to default Chapter 1
    setCurrentChapter(1);
    setUnlockedChapters([1]);
    setCurrentScene('CH1_BEN_THANH');
    setInventory(INITIAL_ITEMS);
    setSelectedItemId('sugarcane_juice');
    setQuests(INITIAL_QUESTS);
    setCurrentDialogue(DIALOGUE_DATABASE['guard_intro']);

    // Reset flags
    setIsJuicePressed(false);
    setIsFuseboxRepaired(false);
    setHasPliers(false);
    setIsMailboxUnlocked(false);
    setHasTweezer(false);
    setHasRareStamp(false);
    setHasMagnifier(false);
    setIsGuitarTuned(false);
    setIsRadioTuned(false);
    setHasScissors(false);
    setHasThread(false);
    setHasRadioKnob(false);
    setHasHomeKey(false);
    setIsHuTieuCooked(false);
    setIsChestOpened(false);
    setHasMosaicTile(false);

    // Close modals
    setIsSugarcaneModalOpen(false);
    setIsWirePuzzleOpen(false);
    setIsDialPuzzleOpen(false);
    setIsGuitarModalOpen(false);
    setIsRadioPuzzleOpen(false);
    setIsHuTieuModalOpen(false);
    setIsMosaicPuzzleOpen(false);
    setIsChapterOverlayOpen(false);
    setIsChapterMapOpen(false);
    setIsQuestLogOpen(false);
    setIsStoryEndingOpen(false);
    setInspectedItem(null);

    // Save fresh progress to Firebase
    const freshFlags: GameFlags = {
      isJuicePressed: false,
      isFuseboxRepaired: false,
      hasPliers: false,
      isMailboxUnlocked: false,
      hasTweezer: false,
      hasRareStamp: false,
      hasMagnifier: false,
      isGuitarTuned: false,
      isRadioTuned: false,
      hasScissors: false,
      hasThread: false,
      hasRadioKnob: false,
      hasHomeKey: false,
      isHuTieuCooked: false,
      isChestOpened: false,
      hasMosaicTile: false,
    };

    saveProgressToCloud(1, 'CH1_BEN_THANH', INITIAL_ITEMS, freshFlags, INITIAL_QUESTS, [1]);

    sound.playSelect();
    setGameState('playing');
    showToast('✨ Bắt đầu hành trình mới từ Chợ Bến Thành (1992)!');
  };

  const handleContinueGame = () => {
    if (!cloudSaveData) return;

    // Restore full state from Cloud Save
    const {
      currentChapter: savedChap,
      currentScene: savedScene,
      unlockedChapters: savedUnlocked,
      inventory: savedInventory,
      flags: savedFlags,
      quests: savedQuests,
    } = cloudSaveData;

    const restoredUnlocked = Array.from(
      new Set([
        1,
        ...(savedUnlocked || [1]),
        ...(savedFlags?.isFuseboxRepaired ? [2] : []),
        ...(savedFlags?.isMailboxUnlocked ? [3] : []),
        ...(savedFlags?.isRadioTuned ? [4] : []),
      ])
    ).sort() as ChapterId[];

    // Calculate smart resume chapter: If current chapter was solved, auto-advance to next
    let chapToSet: ChapterId = savedChap || 1;
    if (savedFlags?.isFuseboxRepaired && chapToSet === 1) {
      chapToSet = 2;
    } else if (savedFlags?.isMailboxUnlocked && chapToSet <= 2) {
      chapToSet = 3;
    } else if (savedFlags?.isRadioTuned && chapToSet <= 3) {
      chapToSet = 4;
    }

    const targetInfo = CHAPTERS_INFO.find((c) => c.id === chapToSet);
    const sceneToSet = (targetInfo ? targetInfo.sceneId : savedScene) || 'CH1_BEN_THANH';

    setCurrentChapter(chapToSet);
    setCurrentScene(sceneToSet);
    setUnlockedChapters(restoredUnlocked);
    setInventory(savedInventory || INITIAL_ITEMS);
    
    // Set quest active status according to resumed chapter
    const updatedQuests = (savedQuests || INITIAL_QUESTS).map((q) => ({
      ...q,
      isActive: q.chapter === chapToSet,
    }));
    setQuests(updatedQuests);

    if (savedFlags) {
      setIsJuicePressed(!!savedFlags.isJuicePressed);
      setIsFuseboxRepaired(!!savedFlags.isFuseboxRepaired);
      setHasPliers(!!savedFlags.hasPliers);
      setIsMailboxUnlocked(!!savedFlags.isMailboxUnlocked);
      setHasTweezer(!!savedFlags.hasTweezer);
      setHasRareStamp(!!savedFlags.hasRareStamp);
      setHasMagnifier(!!savedFlags.hasMagnifier);
      setIsGuitarTuned(!!savedFlags.isGuitarTuned);
      setIsRadioTuned(!!savedFlags.isRadioTuned);
      setHasScissors(!!savedFlags.hasScissors);
      setHasThread(!!savedFlags.hasThread);
      setHasRadioKnob(!!savedFlags.hasRadioKnob);
      setHasHomeKey(!!savedFlags.hasHomeKey);
      setIsHuTieuCooked(!!savedFlags.isHuTieuCooked);
      setIsChestOpened(!!savedFlags.isChestOpened);
      setHasMosaicTile(!!savedFlags.hasMosaicTile);
    }

    // Set initial chapter dialogue
    switch (chapToSet) {
      case 2:
        setCurrentDialogue(DIALOGUE_DATABASE['post_office_intro']);
        break;
      case 3:
        setCurrentDialogue(DIALOGUE_DATABASE['apartment_intro']);
        break;
      case 4:
        setCurrentDialogue(DIALOGUE_DATABASE['alley_intro']);
        break;
      case 1:
      default:
        setCurrentDialogue(savedFlags?.isFuseboxRepaired ? DIALOGUE_DATABASE['guard_after_key'] : DIALOGUE_DATABASE['guard_intro']);
        break;
    }

    sound.playSelect();
    setGameState('playing');
    showToast(`✨ Đã nạp lại tiến trình: Chương ${chapToSet} - ${targetInfo?.titleVi || ''}!`);
  };

  const handleSelectChapterFromMenu = (chapId: ChapterId) => {
    // If save exists, apply flags and inventory first
    if (cloudSaveData) {
      const {
        unlockedChapters: savedUnlocked,
        inventory: savedInventory,
        flags: savedFlags,
        quests: savedQuests,
      } = cloudSaveData;

      const restoredUnlocked = Array.from(
        new Set([
          1,
          chapId,
          ...(savedUnlocked || [1]),
          ...(savedFlags?.isFuseboxRepaired ? [2] : []),
          ...(savedFlags?.isMailboxUnlocked ? [3] : []),
          ...(savedFlags?.isRadioTuned ? [4] : []),
        ])
      ).sort() as ChapterId[];

      setUnlockedChapters(restoredUnlocked);
      if (savedInventory) setInventory(savedInventory);
      if (savedQuests) setQuests(savedQuests);

      if (savedFlags) {
        setIsJuicePressed(!!savedFlags.isJuicePressed);
        setIsFuseboxRepaired(!!savedFlags.isFuseboxRepaired);
        setHasPliers(!!savedFlags.hasPliers);
        setIsMailboxUnlocked(!!savedFlags.isMailboxUnlocked);
        setHasTweezer(!!savedFlags.hasTweezer);
        setHasRareStamp(!!savedFlags.hasRareStamp);
        setHasMagnifier(!!savedFlags.hasMagnifier);
        setIsGuitarTuned(!!savedFlags.isGuitarTuned);
        setIsRadioTuned(!!savedFlags.isRadioTuned);
        setHasScissors(!!savedFlags.hasScissors);
        setHasThread(!!savedFlags.hasThread);
        setHasRadioKnob(!!savedFlags.hasRadioKnob);
        setHasHomeKey(!!savedFlags.hasHomeKey);
        setIsHuTieuCooked(!!savedFlags.isHuTieuCooked);
        setIsChestOpened(!!savedFlags.isChestOpened);
        setHasMosaicTile(!!savedFlags.hasMosaicTile);
      }
    }

    const targetInfo = CHAPTERS_INFO.find((c) => c.id === chapId);
    const newScene = targetInfo ? targetInfo.sceneId : ('CH1_BEN_THANH' as SceneId);
    setCurrentChapter(chapId);
    setCurrentScene(newScene);

    // Start initial dialogue for chosen chapter
    switch (chapId) {
      case 2:
        setCurrentDialogue(DIALOGUE_DATABASE['post_office_intro']);
        break;
      case 3:
        setCurrentDialogue(DIALOGUE_DATABASE['apartment_intro']);
        break;
      case 4:
        setCurrentDialogue(DIALOGUE_DATABASE['alley_intro']);
        break;
      case 1:
      default:
        setCurrentDialogue(DIALOGUE_DATABASE['guard_intro']);
        break;
    }

    sound.playSelect();
    setGameState('playing');
    showToast(`✨ Bắt đầu chơi: Chương ${chapId} - ${targetInfo?.titleVi || ''}!`);
  };

  const handleGoHome = async () => {
    // Auto-save before returning home
    await saveProgressToCloud();
    sound.playClick();
    setGameState('main_menu');
  };

  // Item Combination Logic (Combine Mechanics)
  const handleCombineItems = (sourceId: ItemId, targetId: ItemId) => {
    const recipe = ITEM_COMBINATIONS.find(
      (r) =>
        (r.itemA === sourceId && r.itemB === targetId) ||
        (r.itemA === targetId && r.itemB === sourceId)
    );

    if (recipe) {
      sound.playCombineSuccess();
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#f59e0b', '#22c55e', '#ffffff'],
      });

      const newItem = ALL_DISCOVERABLE_ITEMS[recipe.resultItem];
      if (newItem) {
        let updatedInventory: InventoryItem[] = [];
        setInventory((prev) => {
          const filtered = prev.filter((i) => {
            if (recipe.resultItem === 'guitar_string' && i.id === 'nylon_thread') return false;
            if (recipe.resultItem === 'notebook_decoded' && i.id === 'notebook') return false;
            if (recipe.resultItem === 'coin_polished' && i.id === 'coin') return false;
            return true;
          });
          updatedInventory = [...filtered, newItem];
          return updatedInventory;
        });

        setSelectedItemId(newItem.id);
        showToast(`✨ Ghép thành công: ${newItem.nameVi}! ${recipe.successMessageVi}`);

        let updatedQuests = quests;
        if (recipe.resultItem === 'coin_polished') {
          updatedQuests = quests.map((q) => (q.id === 'ch1_combine_coin' ? { ...q, isCompleted: true } : q));
        } else if (recipe.resultItem === 'notebook_decoded') {
          updatedQuests = quests.map((q) => (q.id === 'ch2_combine_lens' ? { ...q, isCompleted: true } : q));
        } else if (recipe.resultItem === 'guitar_string') {
          updatedQuests = quests.map((q) => (q.id === 'ch3_combine_string' ? { ...q, isCompleted: true } : q));
        }
        setQuests(updatedQuests);

        // Auto save on combination
        saveProgressToCloud(undefined, undefined, updatedInventory, undefined, updatedQuests);
      }
    } else {
      sound.playCombineFail();
      showToast('❌ Hai vật phẩm này không thể ghép với nhau!');
    }
  };

  const handleUpdateItemCleanProgress = (itemId: string, progress: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId && item.inspectData) {
          return {
            ...item,
            inspectData: {
              ...item.inspectData,
              dirtCleanProgress: progress,
              isDirty: progress < 80,
            },
          };
        }
        return item;
      })
    );
  };

  const changeToChapter = (targetChapter: ChapterId) => {
    setIsTransitioning(true);
    sound.playSelect();

    setTimeout(() => {
      setCurrentChapter(targetChapter);
      setUnlockedChapters((prev) => {
        const set = new Set<ChapterId>([1, ...prev, targetChapter]);
        if (isFuseboxRepaired || targetChapter >= 2) set.add(2);
        if (isMailboxUnlocked || targetChapter >= 3) set.add(3);
        if (isRadioTuned || hasHomeKey || targetChapter >= 4) set.add(4);
        return Array.from(set).sort() as ChapterId[];
      });

      const targetInfo = CHAPTERS_INFO.find((c) => c.id === targetChapter);
      const newScene = targetInfo ? targetInfo.sceneId : ('CH1_BEN_THANH' as SceneId);
      setCurrentScene(newScene);

      // Activate chapter quest
      const updatedQuests = quests.map((q) => ({
        ...q,
        isActive: q.chapter === targetChapter,
      }));
      setQuests(updatedQuests);

      // Start initial dialogue for chapter
      switch (targetChapter) {
        case 2:
          setCurrentDialogue(DIALOGUE_DATABASE['post_office_intro']);
          break;
        case 3:
          setCurrentDialogue(DIALOGUE_DATABASE['apartment_intro']);
          break;
        case 4:
          setCurrentDialogue(DIALOGUE_DATABASE['alley_intro']);
          break;
        case 1:
        default:
          setCurrentDialogue(DIALOGUE_DATABASE['guard_intro']);
          break;
      }

      setIsTransitioning(false);

      // Auto save on chapter change
      saveProgressToCloud(targetChapter, newScene, undefined, undefined, updatedQuests);
    }, 450);
  };

  // POI Interaction Router
  const handleSelectPOI = (poi: PointOfInterest) => {
    switch (poi.targetAction) {
      // CHAPTER 1
      case 'talk_guard':
        if (isFuseboxRepaired) {
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
        setCurrentDialogue(DIALOGUE_DATABASE['auntie_intro']);
        break;

      case 'pet_cat':
        setCurrentDialogue(DIALOGUE_DATABASE['cat_purr']);
        break;

      case 'inspect_market':
        setCurrentDialogue(DIALOGUE_DATABASE['market_clock']);
        break;

      // CHAPTER 2 (BƯU ĐIỆN)
      case 'talk_peter':
        if (hasRareStamp && !hasMagnifier) {
          setCurrentDialogue(DIALOGUE_DATABASE['peter_reward']);
        } else if (hasMagnifier) {
          setCurrentDialogue({
            id: 'peter_done',
            speaker: 'Peter',
            speakerTitle: 'PETER',
            avatarType: 'peter',
            text: 'Kính lúp quang học rất hữu ích để soi nét vẽ chìm trong sổ tay đó! Chúc bạn sớm mở được hòm thư số 72!',
          });
        } else {
          setCurrentDialogue(DIALOGUE_DATABASE['peter_intro']);
        }
        break;

      case 'talk_postman':
        setCurrentDialogue(DIALOGUE_DATABASE['postman_intro']);
        break;

      case 'inspect_souvenir':
        if (!hasTweezer) {
          setHasTweezer(true);
          const newInv = [...inventory, ALL_DISCOVERABLE_ITEMS.tweezer];
          setInventory(newInv);
          sound.playSelect();
          setCurrentDialogue({
            id: 'tweezer_found',
            speaker: 'Linh',
            speakerTitle: 'LINH',
            avatarType: 'mai',
            text: 'Mình đã nhặt được Kẹp Gắp Bưu Thiếp trên bàn viết thư! Giờ có thể dùng nó để lấy con tem cổ kẹt dưới sàn gạch.',
          });
          saveProgressToCloud(undefined, undefined, newInv, { hasTweezer: true });
        } else {
          setCurrentDialogue({
            id: 'desk_clean',
            speaker: 'Linh',
            speakerTitle: 'LINH',
            avatarType: 'mai',
            text: 'Bàn gỗ mun viết thư chứa đầy bưu thiếp và mực tím học trò.',
          });
        }
        break;

      case 'inspect_floor_crack':
        if (hasRareStamp) {
          setCurrentDialogue({
            id: 'stamp_collected',
            speaker: 'Linh',
            speakerTitle: 'LINH',
            avatarType: 'mai',
            text: 'Khe nứt sàn gạch bông giờ đã sạch sẽ.',
          });
        } else if (hasTweezer) {
          setHasRareStamp(true);
          const newInv = [...inventory, ALL_DISCOVERABLE_ITEMS.rare_stamp];
          setInventory(newInv);
          sound.playSelect();
          setCurrentDialogue({
            id: 'stamp_picked',
            speaker: 'Linh',
            speakerTitle: 'LINH',
            avatarType: 'mai',
            text: 'Khéo léo dùng que kẹp, mình đã gắp được Con Tem Cổ 1970 còn nguyên vẹn! Mau mang lại cho Peter.',
          });
          saveProgressToCloud(undefined, undefined, newInv, { hasRareStamp: true });
        } else {
          setCurrentDialogue({
            id: 'stamp_stuck',
            speaker: 'Linh',
            speakerTitle: 'LINH',
            avatarType: 'mai',
            text: 'Con tem cổ màu đỏ kẹt sâu dưới khe sàn gạch bông. Cần dùng Kẹp Gắp Bưu Thiếp trên bàn viết thư để lấy!',
          });
        }
        break;

      case 'inspect_mailbox_72':
        if (isMailboxUnlocked) {
          setCurrentDialogue(DIALOGUE_DATABASE['mailbox_solved']);
        } else {
          setCurrentDialogue(DIALOGUE_DATABASE['mailbox_locked']);
        }
        break;

      // CHAPTER 3 (CHUNG CƯ TÔN THẤT ĐẠM)
      case 'talk_tailor':
        if (hasScissors && !hasThread) {
          setCurrentDialogue(DIALOGUE_DATABASE['tailor_give_scissors']);
        } else if (hasThread) {
          setCurrentDialogue({
            id: 'tailor_thanks',
            speaker: 'Cô Năm Thợ May',
            speakerTitle: 'CÔ NĂM THỢ MAY',
            avatarType: 'tailor',
            text: 'Có cây kéo đồng má để lại, đường may của cô bén ngót liền! Kéo này bén lắm, con có thể cắt sợi chỉ dù làm dây đàn đó nghen!',
          });
        } else {
          setCurrentDialogue(DIALOGUE_DATABASE['tailor_intro']);
        }
        break;

      case 'inspect_wool_basket':
        if (!hasScissors) {
          setHasScissors(true);
          const newInv = [...inventory, ALL_DISCOVERABLE_ITEMS.scissors];
          setInventory(newInv);
          sound.playSelect();
          setCurrentDialogue({
            id: 'scissors_found',
            speaker: 'Linh',
            speakerTitle: 'LINH',
            avatarType: 'mai',
            text: 'A, trong giỏ len phơi nắng có Cây Kéo Đồng Cổ của Cô Năm! Mau mang lại cho cô.',
          });
          saveProgressToCloud(undefined, undefined, newInv, { hasScissors: true });
        } else {
          setCurrentDialogue({
            id: 'wool_empty',
            speaker: 'Linh',
            speakerTitle: 'LINH',
            avatarType: 'mai',
            text: 'Giỏ mây đựng đầy những cuộn len màu sắc ấm cúng.',
          });
        }
        break;

      case 'talk_hoang':
        if (inventory.some((i) => i.id === 'guitar_string') && !hasRadioKnob) {
          setCurrentDialogue(DIALOGUE_DATABASE['hoang_intro']);
        } else if (hasRadioKnob) {
          setCurrentDialogue({
            id: 'hoang_jamming',
            speaker: 'Hoàng',
            speakerTitle: 'HOÀNG NHẠC SĨ',
            avatarType: 'hoang',
            text: 'Tiếng đàn nốt Mi ngân vang thánh thót quá! Bạn đã lắp Núm Xoay vào đài radio cổ ở quầy bar chưa?',
          });
        } else {
          setCurrentDialogue(DIALOGUE_DATABASE['hoang_intro']);
        }
        break;

      case 'inspect_radio':
        if (isRadioTuned) {
          setCurrentDialogue(DIALOGUE_DATABASE['radio_solved']);
        } else {
          setCurrentDialogue(DIALOGUE_DATABASE['radio_locked']);
        }
        break;

      // CHAPTER 4 (HẺM HOA GIẤY QUẬN 3)
      case 'inspect_gate':
        if (hasHomeKey) {
          setCurrentDialogue(DIALOGUE_DATABASE['gate_opened']);
        } else {
          setCurrentDialogue(DIALOGUE_DATABASE['gate_locked']);
        }
        break;

      case 'inspect_tea_cabinet':
        if (!hasMosaicTile) {
          setHasMosaicTile(true);
          const newInv = [...inventory, ALL_DISCOVERABLE_ITEMS.mosaic_tile];
          setInventory(newInv);
          sound.playSelect();
          setCurrentDialogue(DIALOGUE_DATABASE['tea_cabinet_inspect']);
          saveProgressToCloud(undefined, undefined, newInv, { hasMosaicTile: true });
        } else {
          setCurrentDialogue({
            id: 'cabinet_done',
            speaker: 'Linh',
            speakerTitle: 'LINH',
            avatarType: 'mai',
            text: 'Tủ chè cổ kính thơm mùi tinh dầu quế và gỗ hương.',
          });
        }
        break;

      case 'inspect_kitchen':
        if (isHuTieuCooked) {
          setCurrentDialogue({
            id: 'kitchen_done',
            speaker: 'Linh',
            speakerTitle: 'LINH',
            avatarType: 'mai',
            text: 'Nồi nước lèo hủ tiếu thơm lừng sánh ánh vàng nấu theo đúng công thức của ông ngoại.',
          });
        } else {
          setCurrentDialogue(DIALOGUE_DATABASE['kitchen_stove_inspect']);
        }
        break;

      case 'inspect_chest':
        if (isChestOpened) {
          setCurrentDialogue(DIALOGUE_DATABASE['chest_solved']);
        } else {
          setCurrentDialogue(DIALOGUE_DATABASE['chest_locked']);
        }
        break;

      default:
        break;
    }
  };

  // Dialogue Node Advance & Triggers
  const handleDialogueNext = (nextId?: string) => {
    if (!nextId) {
      if (currentDialogue?.actionTrigger === 'open_sugarcane_press') {
        setIsSugarcaneModalOpen(true);
      } else if (currentDialogue?.actionTrigger === 'open_wire_puzzle') {
        setIsWirePuzzleOpen(true);
      } else if (currentDialogue?.actionTrigger === 'open_dial_puzzle') {
        setIsDialPuzzleOpen(true);
      } else if (currentDialogue?.actionTrigger === 'open_guitar_tuning') {
        setIsGuitarModalOpen(true);
      } else if (currentDialogue?.actionTrigger === 'open_radio_puzzle') {
        setIsRadioPuzzleOpen(true);
      } else if (currentDialogue?.actionTrigger === 'open_hutieu_cooking') {
        setIsHuTieuModalOpen(true);
      } else if (currentDialogue?.actionTrigger === 'open_mosaic_puzzle') {
        setIsMosaicPuzzleOpen(true);
      } else if (currentDialogue?.actionTrigger === 'get_magnifier') {
        setHasMagnifier(true);
        const newInv = [...inventory, ALL_DISCOVERABLE_ITEMS.magnifier];
        setInventory(newInv);
        sound.playSelect();
        showToast('✨ Nhận được Kính Lúp Quang Học! Kéo kính lúp vào Sổ Tay để soi mật mã!');
        saveProgressToCloud(undefined, undefined, newInv, { hasMagnifier: true });
      } else if (currentDialogue?.actionTrigger === 'get_thread') {
        setHasThread(true);
        const newInv = [...inventory, ALL_DISCOVERABLE_ITEMS.nylon_thread];
        setInventory(newInv);
        sound.playSelect();
        showToast('✨ Nhận được Cuộn Chỉ Dù! Kéo Kéo Đồng vào Cuộn Chỉ Dù để cắt dây đàn!');
        saveProgressToCloud(undefined, undefined, newInv, { hasThread: true });
      } else if (currentDialogue?.actionTrigger === 'get_knob') {
        setHasRadioKnob(true);
        const newInv = [...inventory, ALL_DISCOVERABLE_ITEMS.radio_knob];
        setInventory(newInv);
        sound.playSelect();
        showToast('✨ Nhận được Núm Xoay Radio! Hãy mang tới đài radio cổ tại quầy bar!');
        saveProgressToCloud(undefined, undefined, newInv, { hasRadioKnob: true });
      } else if (currentDialogue?.actionTrigger === 'complete_story') {
        setIsStoryEndingOpen(true);
      }
      setCurrentDialogue(null);
      return;
    }

    const nextNode = DIALOGUE_DATABASE[nextId];
    if (nextNode) {
      if (nextNode.actionTrigger === 'get_pliers' && !hasPliers) {
        setHasPliers(true);
        const newInv = [...inventory, ALL_DISCOVERABLE_ITEMS.pliers];
        setInventory(newInv);
        sound.playSelect();
        showToast('✨ Nhận được Kìm Cắt Dây Điện từ Bác Bảo Vệ!');
        saveProgressToCloud(undefined, undefined, newInv, { hasPliers: true });
      }
      setCurrentDialogue(nextNode);
    } else {
      setCurrentDialogue(null);
    }
  };

  const handleSelectChoice = (choice: DialogueChoice) => {
    handleDialogueNext(choice.nextId);
  };

  // Minigame Solved Callbacks with Auto-Save
  const handleSugarcaneSolved = () => {
    setIsJuicePressed(true);
    setIsSugarcaneModalOpen(false);
    showToast('✨ Ly nước mía tắc thơm ngon mát lạnh đã sẵn sàng!');
    const updatedQuests = quests.map((q) => (q.id === 'ch1_juice' ? { ...q, isCompleted: true } : q));
    setQuests(updatedQuests);
    saveProgressToCloud(undefined, undefined, undefined, { isJuicePressed: true }, updatedQuests);
  };

  const handleChapter1Solved = () => {
    setIsFuseboxRepaired(true);
    setIsWirePuzzleOpen(false);
    const newInv = [
      ...inventory,
      ALL_DISCOVERABLE_ITEMS.antique_key,
      ALL_DISCOVERABLE_ITEMS.memory_photo,
    ];
    setInventory(newInv);

    const updatedQuests = quests.map((q) =>
      q.id === 'ch1_fusebox' || q.id === 'ch1_clock'
        ? { ...q, isCompleted: true, isActive: false }
        : q.chapter === 2 ? { ...q, isActive: true } : q
    );
    setQuests(updatedQuests);

    setCompletedChapterForOverlay(1);
    setIsChapterOverlayOpen(true);

    const newUnlocked = Array.from(new Set<ChapterId>([...unlockedChapters, 1, 2])).sort() as ChapterId[];
    setUnlockedChapters(newUnlocked);
    saveProgressToCloud(2, 'CH2_POST_OFFICE', newInv, { isFuseboxRepaired: true }, updatedQuests, newUnlocked);
  };

  const handleChapter2Solved = () => {
    setIsMailboxUnlocked(true);
    setIsDialPuzzleOpen(false);
    const newInv = [
      ...inventory,
      ALL_DISCOVERABLE_ITEMS.love_letter,
      ALL_DISCOVERABLE_ITEMS.cafe_receipt,
    ];
    setInventory(newInv);

    const updatedQuests = quests.map((q) =>
      q.chapter === 2
        ? { ...q, isCompleted: true, isActive: false }
        : q.chapter === 3 ? { ...q, isActive: true } : q
    );
    setQuests(updatedQuests);

    setCompletedChapterForOverlay(2);
    setIsChapterOverlayOpen(true);

    const newUnlocked = Array.from(new Set<ChapterId>([...unlockedChapters, 1, 2, 3])).sort() as ChapterId[];
    setUnlockedChapters(newUnlocked);
    saveProgressToCloud(3, 'CH3_APARTMENT', newInv, { isMailboxUnlocked: true }, updatedQuests, newUnlocked);
  };

  const handleGuitarSolved = () => {
    setIsGuitarTuned(true);
    setIsGuitarModalOpen(false);
    setHasRadioKnob(true);
    const newInv = [...inventory, ALL_DISCOVERABLE_ITEMS.radio_knob];
    setInventory(newInv);
    showToast('✨ Dây đàn đã lên chuẩn nốt Mi (E4)! Nhận được Núm Xoay Radio!');
    const updatedQuests = quests.map((q) => (q.id === 'ch3_tune_guitar' ? { ...q, isCompleted: true } : q));
    setQuests(updatedQuests);
    saveProgressToCloud(undefined, undefined, newInv, { isGuitarTuned: true, hasRadioKnob: true }, updatedQuests);
  };

  const handleChapter3Solved = () => {
    setIsRadioTuned(true);
    setHasHomeKey(true);
    setIsRadioPuzzleOpen(false);
    const newInv = [...inventory, ALL_DISCOVERABLE_ITEMS.brass_key];
    setInventory(newInv);

    const updatedQuests = quests.map((q) =>
      q.chapter === 3
        ? { ...q, isCompleted: true, isActive: false }
        : q.chapter === 4 ? { ...q, isActive: true } : q
    );
    setQuests(updatedQuests);

    setCompletedChapterForOverlay(3);
    setIsChapterOverlayOpen(true);

    const newUnlocked = Array.from(new Set<ChapterId>([...unlockedChapters, 1, 2, 3, 4])).sort() as ChapterId[];
    setUnlockedChapters(newUnlocked);
    saveProgressToCloud(4, 'CH4_ALLEY_HOUSE', newInv, { isRadioTuned: true, hasHomeKey: true }, updatedQuests, newUnlocked);
  };

  const handleHuTieuSolved = () => {
    setIsHuTieuCooked(true);
    setIsHuTieuModalOpen(false);
    const newInv = [...inventory, ALL_DISCOVERABLE_ITEMS.traditional_soup_pot];
    setInventory(newInv);
    showToast('✨ Nồi Hủ Tiếu Gia Truyền đã nấu xong chuẩn vị ông ngoại!');
    const updatedQuests = quests.map((q) => (q.id === 'ch4_cook_hutieu' ? { ...q, isCompleted: true } : q));
    setQuests(updatedQuests);
    saveProgressToCloud(undefined, undefined, newInv, { isHuTieuCooked: true }, updatedQuests);
  };

  const handleChapter4Solved = () => {
    setIsChestOpened(true);
    setIsMosaicPuzzleOpen(false);
    const newInv = [...inventory, ALL_DISCOVERABLE_ITEMS.recipe_book];
    setInventory(newInv);

    const updatedQuests = quests.map((q) =>
      q.chapter === 4 ? { ...q, isCompleted: true, isActive: false } : q
    );
    setQuests(updatedQuests);

    setIsStoryEndingOpen(true);
    saveProgressToCloud(4, 'CH4_ALLEY_HOUSE', newInv, { isChestOpened: true }, updatedQuests);
  };

  const currentChapterInfo =
    CHAPTERS_INFO.find((c) => c.id === currentChapter) || CHAPTERS_INFO[0];
  const activeQuestsCount = quests.filter((q) => q.isActive && !q.isCompleted).length;

  // =========================================================================
  // RENDER FLOW: BOOT -> MAIN MENU -> GAME PLAYING
  // =========================================================================
  if (gameState === 'boot') {
    return <BootScene statusText={bootStatusText} progress={bootProgress} />;
  }

  if (gameState === 'main_menu') {
    return (
      <MainMenuScene
        guestUid={guestUid}
        saveData={cloudSaveData}
        isLoadingSave={isLoadingSave}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onStartNewGame={handleStartNewGame}
        onContinueGame={handleContinueGame}
        onSelectChapter={handleSelectChapterFromMenu}
      />
    );
  }

  return (
    <div className="w-screen h-screen bg-[#0c0806] flex items-center justify-center p-0 md:p-3 overflow-hidden select-none font-ui-label">
      {/* Retro 90s Shell Window */}
      <div className="relative w-full max-w-[1260px] h-full md:max-h-[760px] bg-[#1e100c] border-2 md:border-4 border-[#524434] shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden rounded-none md:rounded-lg">
        {/* Top Browser Chrome */}
        <BrowserChrome
          url={`https://saigonmemory.game/chapter-${currentChapter}-${currentChapterInfo.locationVi.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          inventoryLayout={inventoryLayout}
          onToggleLayout={() =>
            setInventoryLayout((prev) => (prev === 'right' ? 'bottom' : 'right'))
          }
          onOpenQuestLog={() => setIsQuestLogOpen(true)}
          onResetGame={handleStartNewGame}
          onGoHome={handleGoHome}
          isSaving={isSaving}
          activeQuestsCount={activeQuestsCount}
        />

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-[#180b07]/95 border-2 border-[#f59e0b] px-4 py-2 text-xs sm:text-sm text-[#fef08a] font-bold shadow-2xl animate-bounce flex items-center gap-2 rounded">
            <Sparkles className="w-4 h-4 text-[#f59e0b] animate-spin" />
            {toastMessage}
          </div>
        )}

        {/* Main Stage & Inventory Container */}
        <div className="relative flex-1 flex overflow-hidden">
          <div className="relative flex-1 h-full flex flex-col overflow-hidden">
            <MainGameCanvas
              onSelectPOI={handleSelectPOI}
              currentChapter={currentChapter}
              currentScene={currentScene}
              onChangeScene={setCurrentScene}
              isFuseboxRepaired={isFuseboxRepaired}
              isMailboxUnlocked={isMailboxUnlocked}
              isRadioTuned={isRadioTuned}
              isChestOpened={isChestOpened}
              hasScissors={hasScissors}
              isGuitarTuned={isGuitarTuned}
              hasHomeKey={hasHomeKey}
              isHuTieuCooked={isHuTieuCooked}
              hasMosaicTile={hasMosaicTile}
              onOpenMap={() => setIsChapterMapOpen(true)}
            />

            {/* Bottom Horizontal Inventory */}
            {inventoryLayout === 'bottom' && (
              <InventoryPanel
                items={inventory}
                selectedItemId={selectedItemId}
                onSelectItem={handleSelectItem}
                onInspectItem={(item) => setInspectedItem(item)}
                onCombineItems={handleCombineItems}
                layout="bottom"
              />
            )}
          </div>

          {/* Right Vertical Inventory */}
          {inventoryLayout === 'right' && (
            <InventoryPanel
              items={inventory}
              selectedItemId={selectedItemId}
              onSelectItem={handleSelectItem}
              onInspectItem={(item) => setInspectedItem(item)}
              onCombineItems={handleCombineItems}
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

        {/* Bottom Status Bar */}
        <GameStatusBar
          fps={60}
          locationName={`${currentChapterInfo.locationVi} (${currentChapterInfo.year}) • ${currentChapterInfo.titleVi}`}
          guestUid={guestUid}
          isSaving={isSaving}
        />

        {/* 1. Sugarcane Juice Press Modal (Ch.1) */}
        <SugarcaneJuiceModal
          isOpen={isSugarcaneModalOpen}
          onClose={() => setIsSugarcaneModalOpen(false)}
          onSolved={handleSugarcaneSolved}
          isAlreadySolved={isJuicePressed}
        />

        {/* 2. Wire Puzzle Modal (Ch.1) */}
        <WirePuzzleModal
          isOpen={isWirePuzzleOpen}
          onClose={() => setIsWirePuzzleOpen(false)}
          onSolved={handleChapter1Solved}
          isAlreadySolved={isFuseboxRepaired}
        />

        {/* 3. Dial Lock Modal (Ch.2) */}
        <DialLockPuzzleModal
          isOpen={isDialPuzzleOpen}
          onClose={() => setIsDialPuzzleOpen(false)}
          onSolved={handleChapter2Solved}
          isAlreadySolved={isMailboxUnlocked}
        />

        {/* 4. Guitar Acoustic Tuning Modal (Ch.3) */}
        <GuitarTuningModal
          isOpen={isGuitarModalOpen}
          onClose={() => setIsGuitarModalOpen(false)}
          onSolved={handleGuitarSolved}
          isAlreadySolved={isGuitarTuned}
        />

        {/* 5. Radio Tuning Modal (Ch.3) */}
        <RadioTuningModal
          isOpen={isRadioPuzzleOpen}
          onClose={() => setIsRadioPuzzleOpen(false)}
          onSolved={handleChapter3Solved}
          isAlreadySolved={isRadioTuned}
        />

        {/* 6. Traditional Hu Tieu Cooking Modal (Ch.4) */}
        <HuTieuCookingModal
          isOpen={isHuTieuModalOpen}
          onClose={() => setIsHuTieuModalOpen(false)}
          onSolved={handleHuTieuSolved}
          isAlreadySolved={isHuTieuCooked}
        />

        {/* 7. Mosaic Sliding Puzzle Modal (Ch.4) */}
        <MosaicPuzzleModal
          isOpen={isMosaicPuzzleOpen}
          onClose={() => setIsMosaicPuzzleOpen(false)}
          onSolved={handleChapter4Solved}
          isAlreadySolved={isChestOpened}
        />

        {/* 8. Chapter Transition Overlay */}
        <ChapterTransitionOverlay
          isOpen={isChapterOverlayOpen}
          completedChapter={completedChapterForOverlay}
          onProceedToNextChapter={(nextChap) => {
            setIsChapterOverlayOpen(false);
            changeToChapter(nextChap);
          }}
          onOpenMap={() => {
            setIsChapterOverlayOpen(false);
            setIsChapterMapOpen(true);
          }}
        />

        {/* 9. Chapter Map Journey Modal */}
        <ChapterMapModal
          isOpen={isChapterMapOpen}
          onClose={() => setIsChapterMapOpen(false)}
          currentChapter={currentChapter}
          unlockedChapters={unlockedChapters}
          onSelectChapter={(chapId) => changeToChapter(chapId)}
        />

        {/* 10. Quest Log / Memory Notebook Modal */}
        <QuestLogModal
          isOpen={isQuestLogOpen}
          onClose={() => setIsQuestLogOpen(false)}
          quests={quests}
        />

        {/* 11. Item Inspector Modal */}
        <ItemInspectModal
          item={inspectedItem}
          onClose={() => setInspectedItem(null)}
          onUpdateItemCleanProgress={handleUpdateItemCleanProgress}
        />

        {/* 12. Grand Finale Ending Modal */}
        <StoryEndingModal
          isOpen={isStoryEndingOpen}
          onRestart={handleStartNewGame}
          onOpenMap={() => {
            setIsStoryEndingOpen(false);
            setIsChapterMapOpen(true);
          }}
        />

        {/* 13. Smooth Scene Transition Curtain */}
        <SceneTransitionCurtain
          isTransitioning={isTransitioning}
          chapterTitle={currentChapterInfo.titleVi}
          locationName={currentChapterInfo.locationVi}
          year={currentChapterInfo.year}
        />
      </div>
    </div>
  );
}
