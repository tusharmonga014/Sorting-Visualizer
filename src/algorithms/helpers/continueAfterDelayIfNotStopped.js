import checkCurrentSortingRunStatus from "./checkCurrentStatus";
import sleep from "./sleep";

/**
 * Checks if not paused or stopped and moves when after delay time
 * @returns True for continuing, False for stopping
 */
export async function continueAfterDelayIfNotStopped() {
    return await Promise.all([
        // Checking if Paused or Stopped
        checkCurrentSortingRunStatus(),
        // Delays according to selected speed
        sleep(),
        // Checking if Paused or Stopped
        checkCurrentSortingRunStatus()
    ])
        .then(() => true)
        .catch(() => false);
}