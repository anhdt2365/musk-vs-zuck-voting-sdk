import { Instruction } from "@orca-so/common-sdk";
import { PublicKey } from "@solana/web3.js";
import { Program, BN } from "@project-serum/anchor";
import { MuskVsZuckVotingProgram } from "../artifacts/musk-vs-zuck-voting-program";
export declare type InitializeParams = {
    accounts: {
        authority: PublicKey;
        battleAccount: PublicKey;
    };
    inputs: {
        startTime: BN;
        endTime: BN;
        testMode: boolean;
    };
};
export declare function initialize(program: Program<MuskVsZuckVotingProgram>, params: InitializeParams): Promise<Instruction>;
