import { Instruction } from "@orca-so/common-sdk";
import { PublicKey } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { MuskVsZuckVotingProgram } from "../artifacts/musk-vs-zuck-voting-program";
export declare type VoteZuckParams = {
    accounts: {
        authority: PublicKey;
        userAccount: PublicKey;
        battleAccount: PublicKey;
    };
    inputs: {};
};
export declare function voteZuck(program: Program<MuskVsZuckVotingProgram>, params: VoteZuckParams): Promise<Instruction>;
