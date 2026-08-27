import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, User, Auth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  Firestore,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { ChapterId, InventoryItem, Quest, SceneId } from '../types';

export interface GameFlags {
  isJuicePressed: boolean;
  isFuseboxRepaired: boolean;
  hasPliers: boolean;
  isMailboxUnlocked: boolean;
  hasTweezer: boolean;
  hasRareStamp: boolean;
  hasMagnifier: boolean;
  isGuitarTuned: boolean;
  isRadioTuned: boolean;
  hasScissors: boolean;
  hasThread: boolean;
  hasRadioKnob: boolean;
  hasHomeKey: boolean;
  isHuTieuCooked: boolean;
  isChestOpened: boolean;
  hasMosaicTile: boolean;
}

export interface GameProgressData {
  userId?: string;
  currentChapter: ChapterId;
  currentScene: SceneId;
  unlockedChapters: ChapterId[];
  inventory: InventoryItem[];
  flags: GameFlags;
  quests: Quest[];
  updatedAt: string;
  saveName?: string;
}

class FirebaseService {
  private app: FirebaseApp;
  public auth: Auth;
  public db: Firestore;
  private currentUser: User | null = null;
  private isInitialized = false;

  constructor() {
    this.app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
  }

  /**
   * Initializes anonymous authentication for the guest player
   */
  async initAnonymousAuth(): Promise<{ uid: string; isAnonymous: boolean }> {
    return new Promise((resolve, reject) => {
      // Check current auth state
      const unsubscribe = onAuthStateChanged(
        this.auth,
        async (user) => {
          unsubscribe();
          if (user) {
            this.currentUser = user;
            this.isInitialized = true;
            resolve({ uid: user.uid, isAnonymous: user.isAnonymous });
          } else {
            try {
              const credential = await signInAnonymously(this.auth);
              this.currentUser = credential.user;
              this.isInitialized = true;
              resolve({ uid: credential.user.uid, isAnonymous: true });
            } catch (err) {
              console.error('Firebase Anonymous Auth error:', err);
              reject(err);
            }
          }
        },
        (error) => {
          console.error('Auth state change error:', error);
          reject(error);
        }
      );
    });
  }

  /**
   * Get currently authenticated user UID
   */
  getCurrentUserId(): string | null {
    return this.currentUser?.uid || this.auth.currentUser?.uid || null;
  }

  /**
   * Saves player's full progress into Firestore under game_saves/{uid} and instant localStorage
   */
  async saveGameProgress(data: Omit<GameProgressData, 'updatedAt' | 'userId'>): Promise<boolean> {
    const uid = this.getCurrentUserId();
    const savePayload: GameProgressData = {
      ...data,
      userId: uid || 'guest_local',
      updatedAt: new Date().toISOString(),
    };

    // 1. Instant local storage persistence (always succeeds immediately)
    try {
      localStorage.setItem('saigon_memory_save_latest', JSON.stringify(savePayload));
      if (uid) {
        localStorage.setItem(`saigon_memory_save_${uid}`, JSON.stringify(savePayload));
      }
    } catch (e) {
      console.warn('localStorage quota warning:', e);
    }

    // 2. Cloud Firestore sync
    if (!uid) {
      return true; // Still considered successful because local persistence is saved
    }

    try {
      const saveDocRef = doc(this.db, 'game_saves', uid);
      await setDoc(saveDocRef, savePayload, { merge: true });
      return true;
    } catch (error) {
      console.error('Failed to sync game progress to Firestore (saved locally):', error);
      return true; // Return true because local cache saved successfully
    }
  }

  /**
   * Loads player's progress from Firestore or localStorage
   */
  async loadGameProgress(): Promise<GameProgressData | null> {
    const uid = this.getCurrentUserId();

    // 1. Check Cloud Firestore if user is authenticated
    if (uid) {
      try {
        const saveDocRef = doc(this.db, 'game_saves', uid);
        const docSnap = await getDoc(saveDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as GameProgressData;
          // Update local backup
          try {
            localStorage.setItem('saigon_memory_save_latest', JSON.stringify(data));
            localStorage.setItem(`saigon_memory_save_${uid}`, JSON.stringify(data));
          } catch {
            // ignore
          }
          return data;
        }
      } catch (error) {
        console.warn('Could not read from Firestore, falling back to local storage:', error);
      }
    }

    // 2. Fallback to localStorage backup
    try {
      if (uid) {
        const userBackup = localStorage.getItem(`saigon_memory_save_${uid}`);
        if (userBackup) return JSON.parse(userBackup) as GameProgressData;
      }

      const globalBackup = localStorage.getItem('saigon_memory_save_latest');
      if (globalBackup) return JSON.parse(globalBackup) as GameProgressData;
    } catch (e) {
      console.error('Error parsing local save backup:', e);
    }

    return null;
  }

  /**
   * Resets or deletes saved game progress
   */
  async resetGameProgress(): Promise<boolean> {
    try {
      const uid = this.getCurrentUserId();
      if (!uid) return false;

      const saveDocRef = doc(this.db, 'game_saves', uid);
      await deleteDoc(saveDocRef);
      localStorage.removeItem(`saigon_memory_save_${uid}`);
      return true;
    } catch (error) {
      console.error('Failed to reset game progress in Firestore:', error);
      return false;
    }
  }
}

export const firebaseService = new FirebaseService();
