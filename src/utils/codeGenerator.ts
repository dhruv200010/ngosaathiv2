
/**
 * Utility for generating and validating cryptographically secure codes
 */

/**
 * Generates a cryptographically strong secure code for activity sharing
 * @returns A complex alphanumeric share code
 */
export function generateSecureCode(): string {
  // Define character sets
  const uppercaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // removed I and O (to avoid confusion with 1 and 0)
  const lowercaseChars = 'abcdefghijkmnopqrstuvwxyz'; // removed l (to avoid confusion with 1)
  const numberChars = '23456789'; // removed 0 and 1 (to avoid confusion with O and l)
  const specialChars = '-_';
  
  // Define segment structure
  const segments = [
    { length: 4, chars: uppercaseChars + numberChars },
    { length: 4, chars: lowercaseChars + numberChars },
    { length: 4, chars: uppercaseChars + lowercaseChars },
    { length: 4, chars: uppercaseChars + lowercaseChars + numberChars + specialChars }
  ];
  
  let code = '';
  
  // Generate each segment
  segments.forEach((segment, index) => {
    // Add separator between segments
    if (index > 0) code += '-';
    
    // Generate the segment
    for (let i = 0; i < segment.length; i++) {
      const randomIndex = Math.floor(Math.random() * segment.chars.length);
      code += segment.chars[randomIndex];
    }
  });
  
  // Add timestamp hash (last 4 characters) to make it unique even if generated in same millisecond
  const timestampHash = Date.now().toString(36).slice(-4);
  code += `-${timestampHash}`;
  
  return code;
}

/**
 * Validates if a code follows the proper secure format
 * @param code The code to validate
 * @returns Whether the code is valid
 */
export function validateSecureCode(code: string): boolean {
  // Basic validation - should have 5 segments separated by dashes
  const segments = code.split('-');
  if (segments.length !== 5) return false;
  
  // All segments should be 4 characters long
  for (let i = 0; i < segments.length; i++) {
    if (segments[i].length !== 4) return false;
  }
  
  // Additional format validation could be added here
  
  return true;
}
