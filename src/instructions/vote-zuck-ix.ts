import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { Program, BN } from "@project-serum/anchor";
import { MuskVsZuckVotingProgram } from "../artifacts/musk-vs-zuck-voting-program";

export type VoteZuckParams = {
    accounts: {
        authority: PublicKey;
        userAccount: PublicKey;
        battleAccount: PublicKey;
    };
    inputs: {};
};

export async function voteZuck(
    program: Program<MuskVsZuckVotingProgram>,
    params: VoteZuckParams
): Promise<Instruction> {
    const { accounts, } = params;

    const ix = await program.methods.voteZuck()
        .accounts({
            ...accounts,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
        }).instruction();

    return {
        instructions: [ix],
        cleanupInstructions: [],
        signers: [],
    };
}
