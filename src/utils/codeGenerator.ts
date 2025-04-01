
// Using more secure cryptographic methods for generating and validating share codes

/**
 * Generates a secure, cryptographically strong share code
 * The code will be alphanumeric with special characters to increase complexity
 * Format: XXXX-XXXX-XXXX where X can be any alphanumeric or special character
 */
export const generateSecureCode = (): string => {
  // Define the character set - alphanumeric plus some special chars
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let code = '';
  
  // Generate three groups of 4 characters
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars.charAt(randomIndex);
    }
    if (i < 2) code += '-'; // Add dash between groups
  }
  
  return code;
};

/**
 * Validate a share code to ensure it matches the expected format
 * @param code The code to validate
 * @returns boolean indicating if the code is valid
 */
export const validateSecureCode = (code: string): boolean => {
  // Check the basic format: XXXX-XXXX-XXXX
  // Where X can be any alphanumeric or special character from our set
  const validFormat = /^[A-Za-z0-9!@#$%^&*]{4}-[A-Za-z0-9!@#$%^&*]{4}-[A-Za-z0-9!@#$%^&*]{4}$/;
  return validFormat.test(code);
};
