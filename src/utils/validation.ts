import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const validatePhoneNumber = (phone: string): { isValid: boolean; error?: string } => {
  try {
    const phoneNumber = parsePhoneNumberFromString(phone, 'FR');
    if (!phoneNumber || !phoneNumber.isValid()) {
      return { isValid: false, error: 'Numéro de téléphone invalide' };
    }
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: 'Format de numéro invalide' };
  }
};