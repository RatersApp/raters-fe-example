// const values

// export const CONNECTION_NETWORK_URL = 'https://solana-mainnet.g.alchemy.com/v2/0X2OleYH7Y-aYXFOZya5MGPnDLt4gaKO';
// export const CONNECTION_NETWORK_URL = 'https://devnet.helius-rpc.com/?api-key=0651acfe-78b5-4317-9710-a78b0e639dc8';

export const CONNECTION_NETWORK_URL = globalThis.location?.search.includes(
  'devnet',
)
  ? 'https://devnet.helius-rpc.com/?api-key=0651acfe-78b5-4317-9710-a78b0e639dc8'
  : 'https://mainnet.helius-rpc.com/?api-key=86930c69-2429-4464-a9ed-47b43add4642';
