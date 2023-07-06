"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MuskVsZuckVotingClient = void 0;
const web3_js_1 = require("@solana/web3.js");
const __1 = require("..");
const anchor_1 = require("@project-serum/anchor");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
class MuskVsZuckVotingClient {
    constructor(ctx, pda) {
        this.ctx = ctx;
        this.pda = pda;
    }
    static getClient(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const pda = new __1.PDA(ctx.program.programId);
            return new MuskVsZuckVotingClient(ctx, pda);
        });
    }
    initialize(startTime, endTime, testMode) {
        return __awaiter(this, void 0, void 0, function* () {
            const battle = this.pda.battle(this.ctx.wallet.publicKey);
            const tx = (yield this.ctx.methods.initialize({
                accounts: {
                    authority: this.ctx.wallet.publicKey,
                    battleAccount: battle.key,
                },
                inputs: {
                    startTime: new anchor_1.BN(startTime),
                    endTime: new anchor_1.BN(endTime),
                    testMode
                },
            })).toTx();
            return tx;
        });
    }
    voteMusk(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const battle = this.pda.battle(admin);
            const user = this.pda.user(this.ctx.wallet.publicKey);
            const tx = (yield this.ctx.methods.voteMusk({
                accounts: {
                    authority: this.ctx.wallet.publicKey,
                    userAccount: user.key,
                    battleAccount: battle.key,
                },
                inputs: {},
            })).toTx();
            return tx;
        });
    }
    voteZuck(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const battle = this.pda.battle(admin);
            const user = this.pda.user(this.ctx.wallet.publicKey);
            const tx = (yield this.ctx.methods.voteZuck({
                accounts: {
                    authority: this.ctx.wallet.publicKey,
                    userAccount: user.key,
                    battleAccount: battle.key,
                },
                inputs: {},
            })).toTx();
            return tx;
        });
    }
    getBattleByAdmin(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const pda = new __1.PDA(this.ctx.program.programId);
            const battle = pda.battle(admin);
            const battleData = yield this.ctx.fetcher.getBattle(battle.key, true);
            if (!battleData) {
                throw new Error(`Battle of admin ${admin} not found`);
            }
            battleData.account = battle.key;
            return battleData;
        });
    }
    getUserByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const pda = new __1.PDA(this.ctx.program.programId);
            const userAccount = pda.user(user);
            const userData = yield this.ctx.fetcher.getUser(userAccount.key, true);
            if (!userData) {
                throw new Error(`User Account of user ${user} not found`);
            }
            userData.account = userAccount.key;
            return userData;
        });
    }
    getOneBattle(battle) {
        return __awaiter(this, void 0, void 0, function* () {
            const battleData = yield this.ctx.fetcher.getBattle(battle, true);
            if (!battleData) {
                throw new Error(`Battle ${battle} not found`);
            }
            return battleData;
        });
    }
    getOneUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield this.ctx.fetcher.getUser(user, true);
            if (!userData) {
                throw new Error(`User Config of user ${user} not found`);
            }
            return userData;
        });
    }
    canVoteNow(
    // battle: PublicKey,
    user) {
        return __awaiter(this, void 0, void 0, function* () {
            const battleData = yield this.getOneBattle(new web3_js_1.PublicKey(constants_1.BATTLE_ACCOUNT_TESTNET));
            // const battleData = await this.getOneBattle(battle);
            const userData = yield this.getUserByUser(user);
            const now = Math.floor(Date.now() / 1000);
            return ((0, utils_1.getDay)(now, battleData.testMode) != (0, utils_1.getDay)(Number(userData.lastVoteTime), battleData.testMode));
        });
    }
}
exports.MuskVsZuckVotingClient = MuskVsZuckVotingClient;
