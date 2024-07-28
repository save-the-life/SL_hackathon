import { Dispatch, SetStateAction } from 'react';

export const handleMouseDown = (
  event:
    | React.MouseEvent<HTMLButtonElement>
    | React.TouchEvent<HTMLButtonElement>,
  buttonDisabled: boolean,
  diceCount: number,
  setIsHolding: Dispatch<SetStateAction<boolean>>,
) => {
  event.preventDefault();
  if (buttonDisabled || diceCount < 1) return;
  setIsHolding(true);
};

export const handleMouseUp = (
  event:
    | React.MouseEvent<HTMLButtonElement>
    | React.TouchEvent<HTMLButtonElement>,
  buttonDisabled: boolean,
  diceCount: number,
  setIsHolding: Dispatch<SetStateAction<boolean>>,
  rollDice: () => void,
  setDiceCount: Dispatch<SetStateAction<number>>,
) => {
  event.preventDefault();
  if (buttonDisabled || diceCount < 1) return;
  setIsHolding(false);
  rollDice();
  setDiceCount((prevCount) => prevCount - 1);
};

export const movePiece = (
  steps: number,
  position: number,
  setPosition: Dispatch<SetStateAction<number>>,
  setMoving: Dispatch<SetStateAction<boolean>>,
  setButtonDisabled: Dispatch<SetStateAction<boolean>>,
  setSelectingTile: Dispatch<SetStateAction<boolean>>,
  setStarPoints: Dispatch<SetStateAction<number>>,
  setDiceCount: Dispatch<SetStateAction<number>>,
  showReward: (type: string, value: number) => void,
) => {
  setMoving(true);

  let currentPosition = position;
  const moveStep = () => {
    currentPosition = (currentPosition + 1) % 20;
    setPosition(currentPosition);

    // 홈을 지날 때 보상 적용
    if (currentPosition === 0) {
      setStarPoints((prev) => prev + 200);
      showReward('star', 200);
    }

    if (steps > 1) {
      steps--;
      setTimeout(moveStep, 300);
    } else {
      applyReward(currentPosition, setStarPoints, setDiceCount, showReward);

      switch (currentPosition) {
        case 2:
          setTimeout(() => {
            setPosition(15);
            applyReward(15, setStarPoints, setDiceCount, showReward);
            setMoving(false);
            setButtonDisabled(false);
          }, 300);
          break;
        case 8:
          setTimeout(() => {
            setPosition(5);
            setStarPoints((prev) => prev + 200); // 홈 보상 추가
            showReward('star', 200); // 홈 보상 표시
            applyReward(5, setStarPoints, setDiceCount, showReward);
            setMoving(false);
            setButtonDisabled(false);
          }, 300);
          break;
        case 13:
          setTimeout(() => {
            setPosition(0);
            applyReward(0, setStarPoints, setDiceCount, showReward);
            setMoving(false);
            setButtonDisabled(false);
          }, 300);
          break;
        case 18:
          setSelectingTile(true);
          setMoving(false);
          break;
        default:
          setMoving(false);
          setButtonDisabled(false);
          break;
      }
    }
  };
  moveStep();
};

export const applyReward = (
  tileNumber: number,
  setStarPoints: Dispatch<SetStateAction<number>>,
  setDiceCount: Dispatch<SetStateAction<number>>,
  showReward: (type: string, value: number) => void,
) => {
  const tile = document.getElementById(tileNumber.toString());
  if (tile) {
    const starReward = parseInt(tile.getAttribute('data-star') || '0', 10);
    const diceReward = parseInt(tile.getAttribute('data-dice') || '0', 10);

    if (starReward > 0) {
      setStarPoints((prev) => prev + starReward);
      showReward('star', starReward);
    }
    if (diceReward > 0) {
      setDiceCount((prev) => prev + diceReward);
      showReward('dice', diceReward);
    }

    if (
      tileNumber === 2 ||
      tileNumber === 8 ||
      tileNumber === 13 ||
      (tileNumber !== 19 && tileNumber === 18)
    ) {
      showReward('airplane', 0);
    }
  }
};

export const handleTileClick = (
  tileNumber: number,
  selectingTile: boolean,
  setPosition: Dispatch<SetStateAction<number>>,
  setSelectingTile: Dispatch<SetStateAction<boolean>>,
  setMoving: Dispatch<SetStateAction<boolean>>,
  setButtonDisabled: Dispatch<SetStateAction<boolean>>,
  applyRewardCallback: (tileNumber: number) => void,
) => {
  if (!selectingTile || tileNumber === 18) return;
  setPosition(tileNumber);
  setSelectingTile(false);
  setMoving(false);
  setButtonDisabled(false);
  if (tileNumber !== 19) {
    applyRewardCallback(0); // 홈 보상
  }
  applyRewardCallback(tileNumber);
};