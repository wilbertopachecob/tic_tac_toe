/**
 * Combines multiple class names into a single string
 * @param {...string} classes - Class names to combine
 * @returns {string} Combined class names
 */
const classNames = (...classes) => classes.filter(Boolean).join(" ");

/**
 * Checks if an array has all elements equal to a specific value
 * @param {Array} array - Array to check
 * @param {*} value - Value to compare against
 * @returns {boolean} True if all elements equal the value
 */
const allEqual = (array, value) => array.every(item => item === value);

/**
 * Creates a deep copy of an array
 * @param {Array} array - Array to copy
 * @returns {Array} Deep copy of the array
 */
const deepCopy = (array) => JSON.parse(JSON.stringify(array));

/**
 * Delays execution for a specified number of milliseconds
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after the delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export { classNames, allEqual, deepCopy, delay };
