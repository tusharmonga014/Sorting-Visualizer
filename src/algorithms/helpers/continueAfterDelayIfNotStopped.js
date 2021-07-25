import checkCurrentSortingRunStatus from "./checkCurrentStatus";
import sleep from "./sleep";

/**
 * Checks if not paused or stopped and moves when after delay time
 * @returns True for continuing, False for stopping
 */
export async function continueAfterDelayIfNotStopped() {

    // Checking if Paused or Stopped
    let checkFurther = await checkCurrentSortingRunStatus()
        .then(() => true)
        .catch(() => false);
    if (!checkFurther)
        return false;

    // Delaying accroding to selected speed
    await sleep();

    // Checking if Paused or Stopped
    let finalCheckResult = await checkCurrentSortingRunStatus()
        .then(() => true)
        .catch(() => false);

    return finalCheckResult;
}