import {
  TransactionMessage,
  VersionedTransaction,
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL,
  Keypair,
} from '@solana/web3.js';
import type { TransactionInstruction, Connection } from '@solana/web3.js';
import {
  createTransferCheckedInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getMint,
  getOrCreateAssociatedTokenAccount,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createAmountToUiAmountInstruction,
} from '@solana/spl-token';

const USDC_SOLANA_MAINNET = new PublicKey(
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
);

//const USDC_SOLANA_MAINNET = new PublicKey('EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1'); // usdc devnet

/**
 * Get a balance of a wallet
 * @param   {String}      publicKey  a public key
 * @param   {Connection}  connection an RPC connection
 * @param   {String}      token token
 * @returns {Promise<number>}   balance
 */
const getBalance = async (
  publicKey: PublicKey,
  connection: Connection,
  token: 'sol' | 'usdc',
): Promise<number> => {
  let balance = 0;
  switch (token) {
    case 'sol':
      // const account = await getAccount(connection, publicKey);
      balance = await connection.getBalance(publicKey);
      if (balance) balance = balance / 10 ** 9;

      break;
    case 'usdc':
      // const publicKey = new PublicKey('H48PiZM98EYEnZca1k97wE4hsTj2WyJPwANEG1oPZCjA'); // test

      const fromWalletUSDC = await getAssociatedTokenAddress(
        USDC_SOLANA_MAINNET, // token
        publicKey, // who the token account belongs to (the currect wallet user)
      );

      const tokenAccountBalance = await connection.getTokenAccountBalance(
        fromWalletUSDC,
      );
      balance = tokenAccountBalance.value?.uiAmount || 0;

      break;
    default:
      break;
  }

  return balance;
};

export default getBalance;
