"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDA = exports.USER_SEED = exports.BATTLE_SEED = void 0;
const anchor = __importStar(require("@project-serum/anchor"));
exports.BATTLE_SEED = "battle";
exports.USER_SEED = "user";
class PDA {
    constructor(programId) {
        this.battle = (admin) => {
            const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync([anchor.utils.bytes.utf8.encode(exports.BATTLE_SEED), admin.toBuffer()], this.programId);
            return {
                key: pda,
                bump: bump,
            };
        };
        this.user = (user) => {
            const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync([
                anchor.utils.bytes.utf8.encode(exports.USER_SEED),
                user.toBuffer(),
            ], this.programId);
            return {
                key: pda,
                bump: bump,
            };
        };
        this.programId = programId;
    }
}
exports.PDA = PDA;
