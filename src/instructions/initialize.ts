import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { Program, BN } from "@project-serum/anchor";
import { MuskVsZuckVotingProgram } from "../artifacts/musk-vs-zuck-voting-program";

export type InitializeParams = {
    accounts: {
        authority: PublicKey;
        battleAccount: PublicKey;
    };
    inputs: {
        startTime: BN,
        endTime: BN,
        testMode: boolean
    };
};

export async function initialize(
    program: Program<MuskVsZuckVotingProgram>,
    params: InitializeParams
): Promise<Instruction> {
    const { accounts, inputs } = params;

    const ix = await program.methods.initialize(
        inputs.startTime,
        inputs.endTime,
        inputs.testMode
    )
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
