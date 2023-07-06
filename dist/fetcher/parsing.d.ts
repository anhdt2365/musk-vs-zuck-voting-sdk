/// <reference types="node" />
import { BattleData, UserData } from "../types";
/**
 * Static abstract class definition to parse entities.
 * @category Parsable
 */
export interface ParsableEntity<T> {
    /**
     * Parse account data
     *
     * @param accountData Buffer data for the entity
     * @returns Parsed entity
     */
    parse: (accountData: Buffer | undefined | null) => T | null;
}
export declare class ParsableBattle {
    private constructor();
    static parse(data: Buffer | undefined | null): BattleData | null;
}
export declare class ParsableUser {
    private constructor();
    static parse(data: Buffer | undefined | null): UserData | null;
}
