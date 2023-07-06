import { PublicKey, SystemProgram, LAMPORTS_PER_SOL, Transaction } from "@solana/web3.js";
import { TransactionBuilder } from "@orca-so/common-sdk";
import { Context, PDA } from "..";
import { BN } from "@project-serum/anchor";
import { BattleData, UserData } from "../types";
import { BATTLE_ACCOUNT_TESTNET } from "../constants";
import { getDay } from "../utils";

export class MuskVsZuckVotingClient {
    ctx: Context;
    public pda: PDA;

    constructor(
        ctx: Context,
        pda: PDA
    ) {
        this.ctx = ctx;
        this.pda = pda;
    }

    public static async getClient(
        ctx: Context,
    ): Promise<MuskVsZuckVotingClient> {
        const pda = new PDA(ctx.program.programId);
        return new MuskVsZuckVotingClient(ctx, pda);
    }

    public async initialize(
        startTime: string,
        endTime: string,
        testMode: boolean,
    ): Promise<TransactionBuilder> {
        const battle = this.pda.battle(this.ctx.wallet.publicKey);

        const tx = (
            await this.ctx.methods.initialize({
                accounts: {
                    authority: this.ctx.wallet.publicKey,
                    battleAccount: battle.key,
                },
                inputs: {
                    startTime: new BN(startTime),
                    endTime: new BN(endTime),
                    testMode
                },
            })
        ).toTx();

        return tx;
    }

    public async voteMusk(
        admin: PublicKey,
    ): Promise<TransactionBuilder> {
        const battle = this.pda.battle(admin);
        const user = this.pda.user(this.ctx.wallet.publicKey);

        const tx = (
            await this.ctx.methods.voteMusk({
                accounts: {
                    authority: this.ctx.wallet.publicKey,
                    userAccount: user.key,
                    battleAccount: battle.key,
                },
                inputs: {},
            })
        ).toTx();

        return tx;
    }

    public async voteZuck(
        admin: PublicKey,
    ): Promise<TransactionBuilder> {
        const battle = this.pda.battle(admin);
        const user = this.pda.user(this.ctx.wallet.publicKey);

        const tx = (
            await this.ctx.methods.voteZuck({
                accounts: {
                    authority: this.ctx.wallet.publicKey,
                    userAccount: user.key,
                    battleAccount: battle.key,
                },
                inputs: {},
            })
        ).toTx();

        return tx;
    }

    public async getBattleByAdmin(
        admin: PublicKey,
    ): Promise<BattleData> {
        const pda = new PDA(this.ctx.program.programId);
        const battle = pda.battle(admin);

        const battleData = await this.ctx.fetcher.getBattle(battle.key, true);
        if (!battleData) {
            throw new Error(`Battle of admin ${admin} not found`);
        }
        battleData.account = battle.key;
        return battleData;
    }

    public async getUserByUser(
        user: PublicKey,
    ): Promise<UserData> {
        const pda = new PDA(this.ctx.program.programId);
        const userAccount = pda.user(user);

        const userData = await this.ctx.fetcher.getUser(userAccount.key, true);
        if (!userData) {
            throw new Error(`User Account of user ${user} not found`);
        }
        userData.account = userAccount.key;
        return userData;
    }

    public async getOneBattle(
        battle: PublicKey,
    ): Promise<BattleData> {
        const battleData = await this.ctx.fetcher.getBattle(battle, true);
        if (!battleData) {
            throw new Error(`Battle ${battle} not found`);
        }
        return battleData;
    }

    public async getOneUser(
        user: PublicKey,
    ): Promise<UserData> {
        const userData = await this.ctx.fetcher.getUser(user, true);
        if (!userData) {
            throw new Error(`User Config of user ${user} not found`);
        }

        return userData;
    }

    public async canVoteNow(
        // battle: PublicKey,
        user: PublicKey
    ): Promise<boolean> {
        const battleData = await this.getOneBattle(new PublicKey(BATTLE_ACCOUNT_TESTNET));
        // const battleData = await this.getOneBattle(battle);
        const userData = await this.getUserByUser(user);

        const now = Math.floor(Date.now() / 1000);
        return (getDay(now, battleData.testMode) != getDay(Number(userData.lastVoteTime), battleData.testMode));
    }
}
