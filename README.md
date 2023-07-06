# musk-vs-zuck-voting-sdk

## How to use

### 1. Create Battle
```javascript
import {
  PublicKey,
  Connection,
  Keypair,
  Commitment,
} from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@project-serum/anchor";
import { Context, MuskVsZuckVotingClient, MUSK_VS_ZUCK_VOTING_PROGRAM_ID_TESTNET } from "@renec-foundation/musk-vs-zuck-voting-sdk";


...

// yourKey = Keypair.fromSecretKey(Uint8Array.from([124, 149, 222, 31, 236, 142, 29, 95...]));

const commitment: Commitment = "confirmed";
const connection = new Connection(const.RPC_ENDPOINT_URL, { commitment });
const wallet = new Wallet(yourKey);
const provider = new AnchorProvider(connection, wallet, { commitment });

const ctx = Context.withProvider(provider, new PublicKey(MUSK_VS_ZUCK_VOTING_PROGRAM_ID_TESTNET));

const votingClient = await MuskVsZuckVotingClient.getClient(ctx);

// In second form, exp. 1688634767
let startTime = (new Date().getTime() / 1000 - 1).toFixed().toString();
let endTime = ((new Date().getTime() / 1000) + 1000).toFixed().toString();

// `true` if check vote once per minute, `false` if check vote once per day
let testMode = true;

const tx = await votingClient.initialized(
    startTime,
    endTime,
    testMode
);

await tx.buildAndExecute();

const battleData = await votingClient.getBattleByAdmin(wallet.publicKey);
console.log("battleData", battleData);

// Get particular battle data
particularBattleData = await votingClient.getOneBattle(battleData.account);
console.log("particularBattleData", particularBattleData);
```

+ Output
```
battleData {
  bump: 255,
  totalMuskPoint: <BN: 1>,
  totalZuckPoint: <BN: 0>,
  startDate: <BN: 64a6869e>,
  endDate: <BN: 64a68a86>,
  testMode: true,
  account: PublicKey [PublicKey(DecWJwByta3GGRKPL2voACehQsoH2W51r4ZA65baQorL)] {
    _bn: <BN: bbeee109f26a1634dcc09278156198688b93e7cb8c091910338c2ee1fad0fa0d>
  }
}

particularBattleData {
  bump: 255,
  totalMuskPoint: <BN: 1>,
  totalZuckPoint: <BN: 0>,
  startDate: <BN: 64a6869e>,
  endDate: <BN: 64a68a86>,
  testMode: true,
  account: PublicKey [PublicKey(DecWJwByta3GGRKPL2voACehQsoH2W51r4ZA65baQorL)] {
    _bn: <BN: bbeee109f26a1634dcc09278156198688b93e7cb8c091910338c2ee1fad0fa0d>
  }
}
```


### 2. Vote Musk
```javascript
import {
  PublicKey,
  Connection,
  Keypair,
  Commitment,
} from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@project-serum/anchor";
import { Context, MuskVsZuckVotingClient, MUSK_VS_ZUCK_VOTING_PROGRAM_ID_TESTNET } from "@renec-foundation/musk-vs-zuck-voting-sdk";


...

// yourKey = Keypair.fromSecretKey(Uint8Array.from([124, 149, 222, 31, 236, 142, 29, 95...]));

const commitment: Commitment = "confirmed";
const connection = new Connection(const.RPC_ENDPOINT_URL, { commitment });
const wallet = new Wallet(yourKey);
const provider = new AnchorProvider(connection, wallet, { commitment });

const ctx = Context.withProvider(provider, new PublicKey(MUSK_VS_ZUCK_VOTING_PROGRAM_ID_TESTNET));

const votingClient = await MuskVsZuckVotingClient.getClient(ctx);

const tx = await votingClient.voteMusk(
    wallet.publicKey
);

await tx.buildAndExecute();

const userData = await votingClient.getUserByUser(wallet.publicKey);
console.log("userData", userData);
```

+ Output
```
userData: {
  bump: 255,
  initialized: true,
  votedMuskPoint: <BN: 1>,
  votedZuckPoint: <BN: 0>,
  lastVoteTime: <BN: 64a68765>,
  account: PublicKey [PublicKey(B9JqMprUgth4vyW2mTtmG2ggoZ3mHZF4GJ94xZdTxQ3Q)] {
    _bn: <BN: 96b5ae3216e2d64d5379aa43a8d7986cc312e0cd0c29813121a297bed00053ff>
  }
}
```


### 3. Vote Zuck
```javascript
import {
  PublicKey,
  Connection,
  Keypair,
  Commitment,
} from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@project-serum/anchor";
import { Context, MuskVsZuckVotingClient, MUSK_VS_ZUCK_VOTING_PROGRAM_ID_TESTNET } from "@renec-foundation/musk-vs-zuck-voting-sdk";


...

// yourKey = Keypair.fromSecretKey(Uint8Array.from([124, 149, 222, 31, 236, 142, 29, 95...]));

const commitment: Commitment = "confirmed";
const connection = new Connection(const.RPC_ENDPOINT_URL, { commitment });
const wallet = new Wallet(yourKey);
const provider = new AnchorProvider(connection, wallet, { commitment });

const ctx = Context.withProvider(provider, new PublicKey(MUSK_VS_ZUCK_VOTING_PROGRAM_ID_TESTNET));

const votingClient = await MuskVsZuckVotingClient.getClient(ctx);

const tx = await votingClient.voteZuck(
    wallet.publicKey
);

await tx.buildAndExecute();

const userData = await votingClient.getUserByUser(wallet.publicKey);
console.log("userData", userData);
```

+ Output
```
userData: {
  bump: 255,
  initialized: true,
  votedMuskPoint: <BN: 1>,
  votedZuckPoint: <BN: 1>,
  lastVoteTime: <BN: 64a68765>,
  account: PublicKey [PublicKey(B9JqMprUgth4vyW2mTtmG2ggoZ3mHZF4GJ94xZdTxQ3Q)] {
    _bn: <BN: 96b5ae3216e2d64d5379aa43a8d7986cc312e0cd0c29813121a297bed00053ff>
  }
}
```


### 4. Check can vote now
```javascript
import {
  PublicKey,
  Connection,
  Keypair,
  Commitment,
} from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@project-serum/anchor";
import { Context, MuskVsZuckVotingClient, MUSK_VS_ZUCK_VOTING_PROGRAM_ID_TESTNET } from "@renec-foundation/musk-vs-zuck-voting-sdk";


...

// yourKey = Keypair.fromSecretKey(Uint8Array.from([124, 149, 222, 31, 236, 142, 29, 95...]));

const commitment: Commitment = "confirmed";
const connection = new Connection(const.RPC_ENDPOINT_URL, { commitment });
const wallet = new Wallet(yourKey);
const provider = new AnchorProvider(connection, wallet, { commitment });

const ctx = Context.withProvider(provider, new PublicKey(MUSK_VS_ZUCK_VOTING_PROGRAM_ID_TESTNET));

const votingClient = await MuskVsZuckVotingClient.getClient(ctx);

// `true` if user can vote now, `false` if user must to wait util next day
console.log(await votingClient.canVoteNow(wallet.publicKey));
```