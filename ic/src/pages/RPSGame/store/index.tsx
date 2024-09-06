import create from 'zustand';

interface RPSGameState {
  betAmount: number;
  currentRound: number;
  totalRounds: number;
  isSpinning: boolean;
  slotResults: string[];
  winMultiplier: number;
  isGameStarted: boolean;
  isDialogOpen: boolean;
  gameResult: 'win' | 'lose' | null;
  userPoints: number;

  setBetAmount: (amount: number) => void;
  setUserPoints: (points: number) => void;
  startGame: () => void;
  spin: () => void;
  stopSpin: (result: string) => void;
  checkResult: () => void;
  continueGame: () => void;
  endGame: () => void;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useRPSGameStore = create<RPSGameState>((set, get) => ({
  betAmount: 0,
  currentRound: 1,
  totalRounds: 3,
  isSpinning: false,
  slotResults: [],
  winMultiplier: 1,
  isGameStarted: false,
  isDialogOpen: false,
  gameResult: null,
  userPoints: 10000,

  setBetAmount: (amount: number) => set({ betAmount: amount }),
  setUserPoints: (points: number) => set({ userPoints: points }),

  startGame: () =>
    set({
      isGameStarted: true,
      currentRound: 1,
      slotResults: [],
      winMultiplier: 1,
    }),

  spin: () => set({ isSpinning: true }),

  stopSpin: (result: string) =>
    set((state) => ({
      isSpinning: false,
      slotResults: [...state.slotResults, 'rock'], // Always set to 'rock'
    })),

  checkResult: () => {
    const { currentRound, totalRounds, betAmount, userPoints } = get();

    // Always win because player's choice is always 'rock' and computer's choice is always 'scissors'
    set((state) => ({
      winMultiplier: state.winMultiplier * 2,
      userPoints: userPoints + betAmount * state.winMultiplier,
      gameResult: 'win',
      isDialogOpen: true,
      currentRound:
        currentRound < totalRounds ? currentRound + 1 : currentRound,
    }));

    if (currentRound === totalRounds) {
      set({ isGameStarted: false });
    }
  },

  continueGame: () =>
    set((state) => ({
      isDialogOpen: false,
      gameResult: null,
    })),

  endGame: () =>
    set({
      isGameStarted: false,
      betAmount: 0,
      currentRound: 1,
      slotResults: [],
      winMultiplier: 1,
      gameResult: null,
      isDialogOpen: false,
    }),

  openDialog: () => set({ isDialogOpen: true }),

  closeDialog: () => set({ isDialogOpen: false }),
}));
