import getTimeDelay from "./getTimeDelay";

async function sleep() {
    await new Promise((resolve) => {
        setTimeout(() => resolve(), getTimeDelay());
    });
}

export default sleep;