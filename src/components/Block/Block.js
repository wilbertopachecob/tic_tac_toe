import React from "react";
import PropTypes from "prop-types";
import css from "./Block.module.scss";
import { classNames } from "../../utilities";

/**
 * Block component representing a single square in the Tic Tac Toe game
 * @param {Object} props - Component props
 * @param {string|null} props.value - The value displayed in the block (X, O, or null)
 * @param {Function} props.onClick - Function called when block is clicked
 * @param {boolean} props.isWinningBlock - Whether this block is part of the winning combination
 * @param {number} props.index - The index of this block in the board
 * @returns {JSX.Element} Block component
 */
const Block = ({ value, onClick, isWinningBlock = false, index }) => {
  const handleClick = () => {
    if (value === null) {
      onClick();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={classNames(
        css.block,
        value && css.filled,
        isWinningBlock && css.winning,
        value === "X" && css.xPlayer,
        value === "O" && css.oPlayer
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={value === null ? 0 : -1}
      role="button"
      aria-label={
        value
          ? `Block ${index + 1} contains ${value}`
          : `Empty block ${index + 1}, click to place your mark`
      }
      aria-pressed={value !== null}
    >
      <span className={css.value}>{value}</span>
    </div>
  );
};

Block.propTypes = {
  value: PropTypes.oneOf(["X", "O", null]),
  onClick: PropTypes.func.isRequired,
  isWinningBlock: PropTypes.bool,
  index: PropTypes.number.isRequired,
};



export default Block;
