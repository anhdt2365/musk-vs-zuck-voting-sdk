"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsableUser = exports.ParsableBattle = void 0;
const anchor_1 = require("@project-serum/anchor");
const types_1 = require("../types");
/**
 * Class decorator to define an interface with static methods
 * Reference: https://github.com/Microsoft/TypeScript/issues/13462#issuecomment-295685298
 */
function staticImplements() {
    return (constructor) => {
        constructor;
    };
}
function parseAnchorAccount(accountName, data) {
    const discriminator = anchor_1.BorshAccountsCoder.accountDiscriminator(accountName);
    if (discriminator.compare(data.subarray(0, 8))) {
        console.error("incorrect account name during parsing");
        return null;
    }
    try {
        return types_1.accountsCoder.decode(accountName, data);
    }
    catch (_e) {
        console.error("unknown account name during parsing");
        return null;
    }
}
// YOUR ACCOUNTS
let ParsableBattle = class ParsableBattle {
    constructor() { }
    static parse(data) {
        if (!data) {
            return null;
        }
        try {
            return parseAnchorAccount(types_1.AccountName.Battle, data);
        }
        catch (e) {
            console.error(`error while parsing Battle: ${e}`);
            return null;
        }
    }
};
ParsableBattle = __decorate([
    staticImplements()
], ParsableBattle);
exports.ParsableBattle = ParsableBattle;
let ParsableUser = class ParsableUser {
    constructor() { }
    static parse(data) {
        if (!data) {
            return null;
        }
        try {
            return parseAnchorAccount(types_1.AccountName.User, data);
        }
        catch (e) {
            console.error(`error while parsing User: ${e}`);
            return null;
        }
    }
};
ParsableUser = __decorate([
    staticImplements()
], ParsableUser);
exports.ParsableUser = ParsableUser;
