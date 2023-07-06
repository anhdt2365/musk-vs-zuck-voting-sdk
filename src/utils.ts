const SECONDS_PER_DAY = 24 * 60 * 60;
const SECONDS_PER_MINUTE = 60;

export const getDay = (timestamp: number, testMode: boolean) => {
    if (!testMode) {
        return Math.floor(timestamp / SECONDS_PER_DAY) % 31 + 1;
    } else {
        return Math.floor(timestamp / SECONDS_PER_MINUTE) % 60;
    }
}