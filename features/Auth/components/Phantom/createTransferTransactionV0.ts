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
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

export const SERVICE_FEE_ACCOUNT = globalThis.location?.search.includes(
  'devnet',
)
  ? new PublicKey('HGbhyhqknVXmUVTKW9o5GvsKiJxJySqAkLFfQLavUKKw')
  : new PublicKey('F4wbuVSbjWJE3oowddXEeu7iwhxrXR8MSd9BmqpykZtq'); // real

const USDC_SOLANA_MAINNET = new PublicKey(
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
);

//const USDC_SOLANA_MAINNET = new PublicKey('EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1'); // usdc devnet

/**
 * Creates an arbitrary transfer transactionV0 (Versioned Transaction)
 * @param   {PublicKey}       publicKey  a public key
 * @param   {Connection}      connection an RPC connection
 * @param   {'sol' | 'usdc'}  token token
 * @param   {number}          amountToPay
 * @param   {number}          serviceFeeAmount
 * @param   {PublicKey}       toAccount
 * @returns {VersionedTransaction}   a transactionV0
 */
const createTransferTransactionV0 = async (
  publicKey: PublicKey,
  connection: Connection,
  token: 'sol' | 'usdc',
  amountToPay: number,
  serviceFeeAmount = 0,
  toAccount: PublicKey,
): Promise<VersionedTransaction> => {
  // get latest `blockhash`
  let instructions: TransactionInstruction[] = [];

  switch (token) {
    case 'sol':
      // create an array with your desired `instructions`
      // in this case, just a transfer instruction
      instructions = [
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: toAccount,
          lamports: amountToPay * LAMPORTS_PER_SOL,
        }),
      ];

      if (serviceFeeAmount > 0) {
        instructions.push(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: SERVICE_FEE_ACCOUNT,
            lamports: serviceFeeAmount * LAMPORTS_PER_SOL,
          }),
        );
      }

      break;
    case 'usdc':
      // Get the from, to and service token accounts
      // Account one may not exist, so we create it (which costs SOL).
      const fromWalletUSDC = await getAssociatedTokenAddress(
        USDC_SOLANA_MAINNET, // token
        publicKey, // who the token account belongs to (the cryptoliker)
      );

      const toWalletUSDC = await getAssociatedTokenAddress(
        USDC_SOLANA_MAINNET, // token
        toAccount, // who the token account belongs to (the reviewer)
      );

      const createdReceiver = await checkIfTokenAccountExists(
        connection,
        toWalletUSDC,
      );

      if (!createdReceiver) {
        instructions.push(
          createAssociatedTokenAccountInstruction(
            publicKey,
            toWalletUSDC,
            toAccount,
            USDC_SOLANA_MAINNET,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID,
          ),
        );
      }

      // const userKeypair = new Keypair();

      // const fromWalletUSDC = await getOrCreateAssociatedTokenAccount(
      //   connection,
      //   userKeypair, // user pays the fee to create it
      //   USDC_SOLANA_MAINNET, // which token the account is for
      //   publicKey // who the token account belongs to (the reviewer)
      // );

      // const toWalletUSDC = await getOrCreateAssociatedTokenAccount(
      //   connection,
      //   userKeypair, // user pays the fee to create it
      //   USDC_SOLANA_MAINNET, // which token the account is for
      //   toAccount // who the token account belongs to (the reviewer)
      // );

      // const SERVICE_FEE_ACCOUNT_USDC = await getOrCreateAssociatedTokenAccount(
      //   connection,
      //   userKeypair, // user pays the fee to create it
      //   USDC_SOLANA_MAINNET, // which token the account is for
      //   SERVICE_FEE_ACCOUNT // who the token account belongs to (the reviewer)
      // );

      // console.log(toWalletUSDC.address.toBase58());

      const usdcMint = await getMint(connection, USDC_SOLANA_MAINNET);

      // Create the instruction to send USDC from the buyer to the shop
      instructions.push(
        createTransferCheckedInstruction(
          fromWalletUSDC, // source
          USDC_SOLANA_MAINNET, // mint (token address)
          toWalletUSDC, // destination
          publicKey, // owner of source address
          amountToPay * 10 ** usdcMint.decimals, // amount to transfer (in units of the USDC token)
          usdcMint.decimals, // decimals of the USDC token
        ),
      );

      if (serviceFeeAmount > 0) {
        const SERVICE_FEE_ACCOUNT_USDC = await getAssociatedTokenAddress(
          USDC_SOLANA_MAINNET, // token
          SERVICE_FEE_ACCOUNT, // who the token account belongs to (service)
        );

        const createdService = await checkIfTokenAccountExists(
          connection,
          SERVICE_FEE_ACCOUNT_USDC,
        );

        if (!createdService) {
          instructions.push(
            createAssociatedTokenAccountInstruction(
              publicKey,
              SERVICE_FEE_ACCOUNT_USDC,
              SERVICE_FEE_ACCOUNT,
              USDC_SOLANA_MAINNET,
              TOKEN_PROGRAM_ID,
              ASSOCIATED_TOKEN_PROGRAM_ID,
            ),
          );
        }

        instructions.push(
          createTransferCheckedInstruction(
            fromWalletUSDC, // source
            USDC_SOLANA_MAINNET, // mint (token address)
            SERVICE_FEE_ACCOUNT_USDC, // destination
            publicKey, // owner of source address
            serviceFeeAmount * 10 ** usdcMint.decimals, // amount to transfer (in units of the USDC token)
            usdcMint.decimals, // decimals of the USDC token
          ),
        );
      }

      break;
    default:
      // let's send small amount, because no token was choosen
      // connect to the cluster and get the minimum rent for rent exempt status
      // perform this step to get an "arbitrary" amount to transfer
      const minRent = await connection.getMinimumBalanceForRentExemption(0);

      // create an array with your desired `instructions`
      // in this case, just a transfer instruction
      instructions = [
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: toAccount,
          lamports: minRent,
        }),
      ];

      break;
  }

  const blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
  // create v0 compatible message
  const messageV0 = new TransactionMessage({
    payerKey: publicKey,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();

  // make a versioned transaction
  const transactionV0 = new VersionedTransaction(messageV0);

  return transactionV0;
};

// Check if the receiver's token account exists
export const checkIfTokenAccountExists = async (
  connection: Connection,
  tokenAccount: PublicKey,
) => {
  try {
    await getAccount(connection, tokenAccount, 'confirmed', TOKEN_PROGRAM_ID);

    return true;
  } catch (thrownObject) {
    const error = thrownObject as Error;
    if (error.name === 'TokenAccountNotFoundError') {
      return false;
    }

    throw error;
  }
};

export default createTransferTransactionV0;
