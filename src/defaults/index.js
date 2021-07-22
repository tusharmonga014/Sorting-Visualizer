/**
 * Array's lowest value
 */
const ARRAY_MIN_VALUE = 10;
/**
 * Array's largest value
 * ARRAY_MAX_VALUE > 500 will overlap with Control-Bar
 */
const ARRAY_MAX_VALUE = 425;

/**
 * Sorting speed range
 * SORTING_SPEED_LOWER_LIMIT is 0 always
 */
const SORTING_SPEED_UPPER_LIMIT = 800;
const DEFAULT_SELECTED_SPEED = 600;

/**
 * Minimum array length
 */
const MIN_ARRAY_SIZE = 10;
/**
 * Maximum array length
 */
const MAX_ARRAY_SIZE = 200;
const DEFAULT_ARRAY_SIZE = 100;

/**
 * Bar colour when its neither sorted 
 * nor in the process of being sorted
 */
const BAR__COLOUR_DEFAULT = 'rgb(0, 204, 255)';
/**
 * Bar colour when its in the process for sorting
 */
const BAR_COLOUR_WHILE_CHECKING = 'blue';
/**
 * Bar colour when it has been sorted
 */
const BAR_COLOUR_SORTED = 'purple';
/**
 * Bar colour when it is pivot
 */
const BAR_COLOUR_PIVOT = 'rgb(102, 255, 51)';


/**
 * Default selected sorting algorithm
 * shown in dropdown algo selector
 */
const DEFAULT_SELECTED_ALGORITHM = 'BUBBLE_SORT';

/**
 * tells margin between bars
 * @param {*} arraySize the length of array 
 * @returns space between each bar depending upon the arraySize
 */
const MARGIN_BETWEEN_BARS = (arraySize) => {
    return arraySize <= 10 ? 4 : arraySize <= 50 ? 2 : 1
};

/**
 * tells the amount of screen to occupy
 * @param {*} arraySize the length of the array
 * @returns the amount of screen to occupy in 
 *          terms of decimal from 0-1 where 
 *          0 shows empty space and
 *          1 shows full screen 
 */
const SCREEN_PERCENTAGE_TO_OCCUPY = (arraySize) => {
    return arraySize <= 10 ? 0.33 : arraySize <= 50 ? 0.50 : 0.66;
}

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
    BAR__COLOUR_DEFAULT,
    BAR_COLOUR_WHILE_CHECKING,
    BAR_COLOUR_SORTED,
    BAR_COLOUR_PIVOT,
    DEFAULT_SELECTED_ALGORITHM,
    MARGIN_BETWEEN_BARS,
    SCREEN_PERCENTAGE_TO_OCCUPY
}