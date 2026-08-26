export type ItemId =
  | 'notebook'
  | 'notebook_decoded'
  | 'coin'
  | 'coin_polished'
  | 'sugarcane_juice'
  | 'sugarcane_juice_empty'
  | 'feather_duster'
  | 'pliers'
  | 'antique_key'
  | 'memory_photo'
  | 'tweezer'
  | 'rare_stamp'
  | 'magnifier'
  | 'love_letter'
  | 'cafe_receipt'
  | 'scissors'
  | 'nylon_thread'
  | 'guitar_string'
  | 'radio_knob'
  | 'brass_key'
  | 'mosaic_tile'
  | 'recipe_book'
  | 'spice_mix'
  | 'traditional_soup_pot';

export type ChapterId = 1 | 2 | 3 | 4;

export interface InventoryItem {
  id: ItemId;
  name: string;
  nameVi: string;
  descriptionVi: string;
  loreVi: string;
  iconType:
    | 'notebook'
    | 'notebook_decoded'
    | 'coin'
    | 'coin_polished'
    | 'juice'
    | 'feather'
    | 'pliers'
    | 'key'
    | 'photo'
    | 'tweezer'
    | 'stamp'
    | 'magnifier'
    | 'letter'
    | 'receipt'
    | 'scissors'
    | 'thread'
    | 'guitar_string'
    | 'knob'
    | 'tile'
    | 'recipe'
    | 'soup';
  iconColor: string;
  chapter: ChapterId;
  // Inspectable 2D traits
  inspectData?: {
    frontDetailsVi?: string;
    backDetailsVi?: string;
    hiddenClueVi?: string;
    isDirty?: boolean; // Requires cleaning
    dirtCleanProgress?: number; // 0 to 100
    hasMechanism?: boolean; // Can open/toggle
    mechanismLabelVi?: string;
    isMechanismOpen?: boolean;
  };
}

export interface ItemCombinationRecipe {
  itemA: ItemId;
  itemB: ItemId;
  resultItem: ItemId;
  successMessageVi: string;
}

export interface Quest {
  id: string;
  chapter: ChapterId;
  titleVi: string;
  descriptionVi: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface DialogueChoice {
  text: string;
  nextId: string;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  speakerTitle: string;
  avatarType: 'guard' | 'auntie' | 'mai' | 'grandpa' | 'peter' | 'postman' | 'tailor' | 'hoang';
  text: string;
  nextId?: string;
  choices?: DialogueChoice[];
  actionTrigger?:
    | 'open_wire_puzzle'
    | 'open_sugarcane_press'
    | 'open_dial_puzzle'
    | 'open_guitar_tuning'
    | 'open_radio_puzzle'
    | 'open_hutieu_cooking'
    | 'open_mosaic_puzzle'
    | 'open_quest_log'
    | 'open_map'
    | 'give_juice'
    | 'get_pliers'
    | 'get_tweezer'
    | 'get_stamp'
    | 'get_magnifier'
    | 'get_scissors'
    | 'get_thread'
    | 'get_knob'
    | 'get_brass_key'
    | 'get_mosaic_tile'
    | 'complete_chapter'
    | 'complete_story';
}

export interface PointOfInterest {
  id: string;
  chapter: ChapterId;
  title: string;
  cursorType: 'search' | 'talk' | 'door' | 'inspect' | 'hand' | 'gear';
  x: number; // percentage from left
  y: number; // percentage from top
  width: number;
  height: number;
  description: string;
  requiresItem?: ItemId;
  targetAction: string;
}

export type SceneId =
  | 'CH1_BEN_THANH'
  | 'CH1_FUSE_BOX'
  | 'CH2_POST_OFFICE'
  | 'CH2_MAILBOX'
  | 'CH3_APARTMENT'
  | 'CH3_RADIO'
  | 'CH4_ALLEY_HOUSE'
  | 'CH4_CHEST';

export interface ChapterInfo {
  id: ChapterId;
  titleVi: string;
  subtitleVi: string;
  themeVi: string;
  locationVi: string;
  year: number;
  sceneId: SceneId;
  descriptionVi: string;
  nextClueVi: string;
  rewardItemNameVi: string;
}
