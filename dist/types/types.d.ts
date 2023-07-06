import { BN, BorshAccountsCoder, Idl } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { MuskVsZuckVotingProgram } from "../artifacts/musk-vs-zuck-voting-program";
export declare type MuskVsZuckVotingProgramType = MuskVsZuckVotingProgram;
export declare const MuskVsZuckVotingProgramIDL: Idl;
export declare const accountsCoder: BorshAccountsCoder<string>;
export declare enum AccountName {
    Battle = "battle",
    User = "user"
}
export declare type BattleData = {
    account: PublicKey;
    bump: number;
    totalMuskPoint: BN;
    totalZuckPoint: BN;
    startDate: BN;
    endDate: BN;
    testMode: boolean;
};
export declare type UserData = {
    account: PublicKey;
    bump: number;
    initialized: boolean;
    votedMuskPoint: BN;
    votedZuckPoint: BN;
    lastVoteTime: BN;
};
