import { PublicKey } from "@solana/web3.js";
import { TransactionBuilder } from "@orca-so/common-sdk";
import { Context, PDA } from "..";
import { BattleData, UserData } from "../types";
export declare class MuskVsZuckVotingClient {
    ctx: Context;
    pda: PDA;
    constructor(ctx: Context, pda: PDA);
    static getClient(ctx: Context): Promise<MuskVsZuckVotingClient>;
    initialize(startTime: string, endTime: string, testMode: boolean): Promise<TransactionBuilder>;
    voteMusk(admin: PublicKey): Promise<TransactionBuilder>;
    voteZuck(admin: PublicKey): Promise<TransactionBuilder>;
    getBattleByAdmin(admin: PublicKey): Promise<BattleData>;
    getUserByUser(user: PublicKey): Promise<UserData>;
    getOneBattle(battle: PublicKey): Promise<BattleData>;
    getOneUser(user: PublicKey): Promise<UserData>;
    canVoteNow(user: PublicKey): Promise<boolean>;
}
