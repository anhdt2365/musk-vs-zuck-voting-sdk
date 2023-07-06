import { Instruction } from "@orca-so/common-sdk";
import { PublicKey } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { MuskVsZuckVotingProgram } from "../artifacts/musk-vs-zuck-voting-program";
export declare type VoteMuskParams = {
    accounts: {
        authority: PublicKey;
        userAccount: PublicKey;
        battleAccount: PublicKey;
    };
    inputs: {};
};
export declare function voteMusk(program: Program<MuskVsZuckVotingProgram>, params: VoteMuskParams): Promise<Instruction>;
