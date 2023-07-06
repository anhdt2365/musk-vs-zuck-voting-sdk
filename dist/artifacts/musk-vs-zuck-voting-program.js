"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDL = void 0;
exports.IDL = {
    "version": "0.1.0",
    "name": "musk_vs_zuck_voting_program",
    "instructions": [
        {
            "name": "initialize",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "battleAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "startDate",
                    "type": "u64"
                },
                {
                    "name": "endDate",
                    "type": "u64"
                },
                {
                    "name": "testMode",
                    "type": "bool"
                }
            ]
        },
        {
            "name": "voteMusk",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "userAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "battleAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "voteZuck",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "userAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "battleAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        }
    ],
    "accounts": [
        {
            "name": "battle",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "bump",
                        "type": "u8"
                    },
                    {
                        "name": "totalMuskPoint",
                        "type": "u64"
                    },
                    {
                        "name": "totalZuckPoint",
                        "type": "u64"
                    },
                    {
                        "name": "startDate",
                        "type": "u64"
                    },
                    {
                        "name": "endDate",
                        "type": "u64"
                    },
                    {
                        "name": "testMode",
                        "type": "bool"
                    }
                ]
            }
        },
        {
            "name": "user",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "bump",
                        "type": "u8"
                    },
                    {
                        "name": "initialized",
                        "type": "bool"
                    },
                    {
                        "name": "votedMuskPoint",
                        "type": "u64"
                    },
                    {
                        "name": "votedZuckPoint",
                        "type": "u64"
                    },
                    {
                        "name": "lastVoteTime",
                        "type": "u64"
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "AccountAlreadyInit",
            "msg": "Vote Account already init"
        },
        {
            "code": 6001,
            "name": "NotInVoteTime",
            "msg": "Not in vote time"
        },
        {
            "code": 6002,
            "name": "OnlyOneVote",
            "msg": "Only one vote per day"
        },
        {
            "code": 6003,
            "name": "InvalidVoteTime",
            "msg": "Start date must be smaller than end date"
        }
    ]
};
