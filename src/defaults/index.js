/**
 * .......................
 * Array bars height range
 * .......................
 * ARRAY_MAX_VALUE > 500 will overlap with Control-Bar
 */
const ARRAY_MIN_VALUE = 40;
const ARRAY_MAX_VALUE = 400;

/**
 * ...................
 * Sorting speed range
 * ...................
 * SORTING_SPEED_LOWER_LIMIT is 0 always
 */
const SORTING_SPEED_UPPER_LIMIT = 800;
const DEFAULT_SELECTED_SPEED = 600;

/**
 * ............
 * Array length
 * ............
 */
const MIN_ARRAY_SIZE = 10;
const MAX_ARRAY_SIZE = 200;
const DEFAULT_ARRAY_SIZE = 100;

/**
 * Default selected sorting algorithm
 * shown in dropdown algo selector
 */
const DEFAULT_SELECTED_ALGORITHM = 'BUBBLE_SORT';

/**
 * .............................
 * EXPORTS
 * ............................. 
 */
export {
    ARRAY_MIN_VALUE,
    ARRAY_MAX_VALUE,
    SORTING_SPEED_UPPER_LIMIT,
    DEFAULT_SELECTED_SPEED,
    MIN_ARRAY_SIZE,
    MAX_ARRAY_SIZE,
    DEFAULT_ARRAY_SIZE,
    DEFAULT_SELECTED_ALGORITHM
}