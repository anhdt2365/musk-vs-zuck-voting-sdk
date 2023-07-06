"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDay = void 0;
const SECONDS_PER_DAY = 24 * 60 * 60;
const SECONDS_PER_MINUTE = 60;
const getDay = (timestamp, testMode) => {
    if (!testMode) {
        return Math.floor(timestamp / SECONDS_PER_DAY) % 31 + 1;
    }
    else {
        return Math.floor(timestamp / SECONDS_PER_MINUTE) % 60;
    }
};
exports.getDay = getDay;
