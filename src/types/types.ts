import { BN, BorshAccountsCoder, Idl } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { MuskVsZuckVotingProgram } from "../artifacts/musk-vs-zuck-voting-program";
import * as IDL from "../artifacts/musk-vs-zuck-voting-program.json";

export type MuskVsZuckVotingProgramType = MuskVsZuckVotingProgram;
export const MuskVsZuckVotingProgramIDL = IDL as Idl;
export const accountsCoder = new BorshAccountsCoder(MuskVsZuckVotingProgramIDL);

export enum AccountName {
    Battle = "battle",
    User = "user",
}

export type BattleData = {
    account: PublicKey,
    bump: number;
    totalMuskPoint: BN;
    totalZuckPoint: BN;
    startDate: BN;
    endDate: BN;
    testMode: boolean;
};

export type UserData = {
    account: PublicKey,
    bump: number;
    initialized: boolean;
    votedMuskPoint: BN;
    votedZuckPoint: BN;
    lastVoteTime: BN;
};
