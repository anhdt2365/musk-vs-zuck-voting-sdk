import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { Program, BN } from "@project-serum/anchor";
import { MuskVsZuckVotingProgram } from "../artifacts/musk-vs-zuck-voting-program";

export type VoteMuskParams = {
    accounts: {
        authority: PublicKey;
        userAccount: PublicKey;
        battleAccount: PublicKey;
    };
    inputs: {};
};

export async function voteMusk(
    program: Program<MuskVsZuckVotingProgram>,
    params: VoteMuskParams
): Promise<Instruction> {
    const { accounts, } = params;

    const ix = await program.methods.voteMusk()
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
