import BigNumber from 'bignumber.js';

export default function calculateFeeService(amount: any) {
  const amount_bi = new BigNumber(amount);
  const fee = 0.05;
  return [
    amount_bi.multipliedBy(1 - fee).toNumber(),
    amount_bi.multipliedBy(fee).toNumber(),
  ];
}
