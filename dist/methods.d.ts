import { TransactionBuilder, Instruction } from "@orca-so/common-sdk";
import { Context } from "./context";
import * as ixs from "./instructions";
export declare class Methods {
    ctx: Context;
    ix: Instruction | null | undefined;
    constructor(ctx: Context, ix?: Instruction);
    initialize(params: ixs.InitializeParams): Promise<this>;
    voteMusk(params: ixs.VoteMuskParams): Promise<this>;
    voteZuck(params: ixs.VoteZuckParams): Promise<this>;
    toTx(): TransactionBuilder;
}
