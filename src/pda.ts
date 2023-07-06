import * as anchor from "@project-serum/anchor";

export const BATTLE_SEED = "battle";
export const USER_SEED = "user";

export interface PDAInfo {
    key: anchor.web3.PublicKey;
    bump: number;
}

export class PDA {
    readonly programId: anchor.web3.PublicKey;

    public constructor(programId: anchor.web3.PublicKey) {
        this.programId = programId;
    }

    battle = (admin: anchor.web3.PublicKey): PDAInfo => {
        const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
            [anchor.utils.bytes.utf8.encode(BATTLE_SEED), admin.toBuffer()],
            this.programId,
        );
        return {
            key: pda,
            bump: bump,
        };
    };

    user = (user: anchor.web3.PublicKey): PDAInfo => {
        const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
            [
                anchor.utils.bytes.utf8.encode(USER_SEED),
                user.toBuffer(),
            ],
            this.programId
        );
        return {
            key: pda,
            bump: bump,
        };
    };
}
