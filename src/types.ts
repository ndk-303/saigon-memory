export type ItemId =
  | 'notebook'
  | 'coin'
  | 'sugarcane_juice'
  | 'feather_duster'
  | 'pliers'
  | 'antique_key'
  | 'memory_photo';

export interface InventoryItem {
  id: ItemId;
  name: string;
  nameVi: string;
  descriptionVi: string;
  loreVi: string;
  iconType: 'notebook' | 'coin' | 'juice' | 'feather' | 'pliers' | 'key' | 'photo';
  iconColor: string;
}

export interface Quest {
  id: string;
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
  avatarType: 'guard' | 'auntie' | 'mai' | 'grandpa';
  text: string;
  nextId?: string;
  choices?: DialogueChoice[];
  actionTrigger?: 'open_wire_puzzle' | 'open_quest_log' | 'give_juice' | 'get_pliers' | 'complete_story';
}

export interface PointOfInterest {
  id: string;
  title: string;
  cursorType: 'search' | 'talk' | 'door' | 'inspect' | 'hand';
  x: number; // percentage from left
  y: number; // percentage from top
  width: number;
  height: number;
  description: string;
  requiresItem?: ItemId;
  targetAction: 'talk_guard' | 'talk_auntie' | 'inspect_fusebox' | 'pet_cat' | 'inspect_market' | 'inspect_fruit';
}

export type SceneId = 'MAIN_STREET' | 'FUSE_BOX_DETAIL' | 'CHE_STALL_DETAIL';
