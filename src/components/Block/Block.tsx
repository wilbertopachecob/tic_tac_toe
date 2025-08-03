import React from "react";
import type { BlockProps } from "@/types";
import css from "./Block.module.scss";
import { classNames } from "@/utilities";

/**
 * Block component representing a single square in the Tic Tac Toe game
 * @param props - Component props
 * @returns Block component
 */
const Block: React.FC<BlockProps> = ({ 
  value, 
  onClick, 
  isWinningBlock = false, 
  index, 
  disabled = false 
}) => {
  const handleClick = (): void => {
    if (value === null && !disabled) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  // Get position description for screen readers
  const getPositionDescription = (): string => {
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    return `row ${row}, column ${col}`;
  };

  // Get detailed ARIA label
  const getAriaLabel = (): string => {
    const position = getPositionDescription();
    
    if (disabled) {
      return `Game finished. ${position} contains ${value || 'nothing'}`;
    }
    
    if (value) {
      const playerName = value === 'X' ? 'X' : 'O';
      const winningText = isWinningBlock ? ' (part of winning combination)' : '';
      return `Block ${index + 1} at ${position} contains ${playerName}${winningText}`;
    }
    
    return `Empty block ${index + 1} at ${position}. Click to place your mark.`;
  };

  // Get detailed ARIA description
  const getAriaDescription = (): string => {
    if (value) {
      return `This square contains ${value}. ${isWinningBlock ? 'This is part of the winning combination.' : ''}`;
    }
    return `This is an empty square. Press Enter or Space to place your mark.`;
  };

  return (
    <div
      className={classNames(
        css.block,
        value && css.filled,
        isWinningBlock && css.winning,
        value === "X" && css.xPlayer,
        value === "O" && css.oPlayer,
        disabled && css.disabled
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={value === null && !disabled ? 0 : -1}
      role="gridcell"
      aria-label={getAriaLabel()}
      aria-describedby={`block-description-${index}`}
      aria-disabled={disabled}
      data-index={index}
      data-position={getPositionDescription()}
    >
      <span 
        className={css.value}
        aria-hidden="true"
      >
        {value}
      </span>
      
      {/* Hidden description for screen readers */}
      <span 
        id={`block-description-${index}`}
        className="sr-only"
      >
        {getAriaDescription()}
      </span>
    </div>
  );
};

export default Block; 