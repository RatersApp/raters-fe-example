import type { Connection } from '@solana/web3.js';
import { toast } from 'react-toastify';

const POLLING_INTERVAL = 1000; // one second
const MAX_POLLS = 30;

/**
 * Polls for transaction signature statuses
 * @param   {String}     signature  a transaction signature
 * @param   {Connection} connection an RPC connection
 * @param   {Function}   console.log  a function to create log
 * @returns
 */
const pollSignatureStatus = async (
  signature: string,
  connection: Connection,
): Promise<void> => {
  let count = 0;

  const interval = setInterval(async () => {
    // Failed to confirm transaction in time
    if (count === MAX_POLLS) {
      clearInterval(interval);
      console.log({
        status: 'error',
        method: 'signAndSendTransaction',
        message: `Transaction: ${signature}`,
        signature: signature,
        messageTwo: `Failed to confirm transaction within ${MAX_POLLS} seconds. The transaction may or may not have succeeded.`,
      });
      return;
    }

    const { value } = await connection.getSignatureStatus(signature);
    const confirmationStatus = value?.confirmationStatus;

    if (confirmationStatus) {
      const hasReachedSufficientCommitment =
        confirmationStatus === 'confirmed' ||
        confirmationStatus === 'finalized';

      console.log({
        status: hasReachedSufficientCommitment ? 'success' : 'info',
        method: 'signAndSendTransaction',
        message: `Transaction: ${signature}`,
        signature: signature,
        messageTwo: `Status: ${
          confirmationStatus.charAt(0).toUpperCase() +
          confirmationStatus.slice(1)
        }`,
      });

      if (hasReachedSufficientCommitment) {
        clearInterval(interval);
        toast(`Transaction: ${signature}`);
        toast(
          `Status: ${
            confirmationStatus.charAt(0).toUpperCase() +
            confirmationStatus.slice(1)
          }`,
        );
        return;
      }
    } else {
      console.log({
        status: 'info',
        method: 'signAndSendTransaction',
        message: `Transaction: ${signature}`,
        signature: signature,
        messageTwo: 'Status: Waiting on confirmation...',
      });
    }

    count++;
  }, POLLING_INTERVAL);
};

export default pollSignatureStatus;
