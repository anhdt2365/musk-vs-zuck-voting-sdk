import * as anchor from "@project-serum/anchor";
export declare const BATTLE_SEED = "battle";
export declare const USER_SEED = "user";
export interface PDAInfo {
    key: anchor.web3.PublicKey;
    bump: number;
}
export declare class PDA {
    readonly programId: anchor.web3.PublicKey;
    constructor(programId: anchor.web3.PublicKey);
    battle: (admin: anchor.web3.PublicKey) => PDAInfo;
    user: (user: anchor.web3.PublicKey) => PDAInfo;
}
