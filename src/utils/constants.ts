// Mock data for demo purposes
export const mockProducts = [
  {
    id: '1',
    title: 'Max Leopard + Dragon + Venom Account',
    price: 1200000,
    level: '2550',
    image: 'https://images.unsplash.com/photo-1538481527238-111187fdd524?w=400&h=400&fit=crop',
    game: 'blox-fruits',
    tag: 'HOT',
  },
  {
    id: '2',
    title: 'Buddha Awakened + All Swords Account',
    price: 850000,
    level: '2400',
    image: 'https://images.unsplash.com/photo-1516484665647-c5400da7a645?w=400&h=400&fit=crop',
    game: 'blox-fruits',
    tag: 'SALE',
  },
  {
    id: '3',
    title: 'Dough V2 + CDK + Full Accessory',
    price: 2100000,
    level: '2550',
    image: 'https://images.unsplash.com/photo-1511512578047-404d69888006?w=400&h=400&fit=crop',
    game: 'blox-fruits',
    tag: 'PREMIUM',
  },
];

// Mock coupon codes
export const mockCoupons = {
  SUMMER2024: 50000,
  WELCOME10: 'percentage:10',
  HOLO20: 'percentage:20',
};

// Card providers
export const CARD_PROVIDERS = [
  { id: 'vina', name: 'Vinaphone', denominations: [10000, 20000, 30000, 50000, 100000] },
  { id: 'mobi', name: 'Mobifone', denominations: [10000, 20000, 30000, 50000, 100000] },
  { id: 'viettel', name: 'Viettel', denominations: [10000, 20000, 30000, 50000, 100000] },
];

// Banks
export const BANKS = [
  { code: 'MB', name: 'MB Bank', logo: 'mb' },
  { code: 'VCB', name: 'Vietcombank', logo: 'vcb' },
  { code: 'TCB', name: 'Techcombank', logo: 'tcb' },
  { code: 'BID', name: 'BIDV', logo: 'bid' },
];

// Crypto
export const CRYPTO_TYPES = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', rate: 42000 },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', rate: 2200 },
  { id: 'usdt', name: 'USDT', symbol: 'USDT', rate: 1 },
];
