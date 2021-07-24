import getCurrentSortingRunStatus from "./getSortingRunStatus";

async function checkCurrentSortingRunStatus() {
    if (getCurrentSortingRunStatus() === 'PAUSED') {
        return new Promise((resolve, reject) => {
            setInterval(() => {
                if (getCurrentSortingRunStatus() === 'CONTINUED')
                    resolve();
                else if (getCurrentSortingRunStatus() === 'STOPPED')
                    reject();
            }, 10);

        });
    } else if (getCurrentSortingRunStatus() === 'STOPPED') {
        return new Promise((resolve, reject) => reject());
    } else {
        return new Promise(resolve => resolve());
    }
}

export default checkCurrentSortingRunStatus;