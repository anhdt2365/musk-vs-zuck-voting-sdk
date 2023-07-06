import { BorshAccountsCoder } from "@project-serum/anchor";
import { accountsCoder, BattleData, UserData, AccountName } from "../types";

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

/**
 * Class decorator to define an interface with static methods
 * Reference: https://github.com/Microsoft/TypeScript/issues/13462#issuecomment-295685298
 */
function staticImplements<T>() {
    return <U extends T>(constructor: U) => {
        constructor;
    };
}

function parseAnchorAccount(accountName: AccountName, data: Buffer) {
    const discriminator = BorshAccountsCoder.accountDiscriminator(accountName);
    if (discriminator.compare(data.subarray(0, 8))) {
        console.error("incorrect account name during parsing");
        return null;
    }

    try {
        return accountsCoder.decode(accountName, data);
    } catch (_e) {
        console.error("unknown account name during parsing");
        return null;
    }
}

// YOUR ACCOUNTS
@staticImplements<ParsableEntity<BattleData>>()
export class ParsableBattle {
    private constructor() { }

    public static parse(data: Buffer | undefined | null): BattleData | null {
        if (!data) {
            return null;
        }

        try {
            return parseAnchorAccount(AccountName.Battle, data);
        } catch (e) {
            console.error(`error while parsing Battle: ${e}`);
            return null;
        }
    }
}

@staticImplements<ParsableEntity<UserData>>()
export class ParsableUser {
    private constructor() { }

    public static parse(data: Buffer | undefined | null): UserData | null {
        if (!data) {
            return null;
        }

        try {
            return parseAnchorAccount(AccountName.User, data);
        } catch (e) {
            console.error(`error while parsing User: ${e}`);
            return null;
        }
    }
}
