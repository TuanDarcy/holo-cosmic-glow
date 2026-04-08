/**
 * Validate email address
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate card serial (16 digits)
 */
export function validateSerial(serial: string): boolean {
  const cleaned = serial.replace(/\s/g, '');
  return /^\d{16}$/.test(cleaned);
}

/**
 * Validate card PIN (8 digits)
 */
export function validatePin(pin: string): boolean {
  const cleaned = pin.replace(/\s/g, '');
  return /^\d{8}$/.test(cleaned);
}

/**
 * Validate phone number
 */
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+84|0)[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate crypto wallet address
 */
export function validateWalletAddress(address: string, type: 'bitcoin' | 'ethereum' | 'usdt'): boolean {
  if (type === 'bitcoin') {
    return /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address);
  }
  if (type === 'ethereum') {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }
  return true; // USDT uses Ethereum addresses
}
