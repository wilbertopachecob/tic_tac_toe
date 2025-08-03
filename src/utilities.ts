import type { ClassNamesFunction, AllEqualFunction, DeepCopyFunction, DelayFunction } from './types';

/**
 * Combines multiple class names into a single string
 * @param classes - Class names to combine
 * @returns Combined class names
 */
const classNames: ClassNamesFunction = (...classes) => classes.filter(Boolean).join(" ");

/**
 * Checks if an array has all elements equal to a specific value
 * @param array - Array to check
 * @param value - Value to compare against
 * @returns True if all elements equal the value
 */
const allEqual: AllEqualFunction = (array, value) => array.every(item => item === value);

/**
 * Creates a deep copy of an array
 * @param array - Array to copy
 * @returns Deep copy of the array
 */
const deepCopy: DeepCopyFunction = (array) => JSON.parse(JSON.stringify(array));

/**
 * Delays execution for a specified number of milliseconds
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after the delay
 */
const delay: DelayFunction = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export { classNames, allEqual, deepCopy, delay }; 