export function TwoByteHexToRGB555(hex: string): string {
  // Convert hex to binary and bit shift left by 1
  const binary = (parseInt(hex, 16) << 1).toString(2).padStart(16, "0");

  // Extract RGB components, converting each one to decimal and padding to 2 digits
  const r = parseInt(binary.slice(10, 15), 2).toString().padStart(2, "0");
  const g = parseInt(binary.slice(5, 10), 2).toString().padStart(2, "0");
  const b = parseInt(binary.slice(0, 5), 2).toString().padStart(2, "0");

  return `RGB ${r}, ${g}, ${b}`;
}

export function TwoByteHexToBinary(hex: string): string {
  return parseInt(hex, 16).toString(2).padStart(16, "0");
}

export function TwoByteHexToBinaryShifted(hex: string): string {
  return (parseInt(hex, 16) << 1).toString(2).padStart(16, "0");
}

export function TwoByteHexToRGB888(hex: string): string {
  const binary = (parseInt(hex, 16) << 1).toString(2).padStart(16, "0");

  // Extract components
  const r5 = parseInt(binary.slice(10, 15), 2);
  const g5 = parseInt(binary.slice(5, 10), 2);
  const b5 = parseInt(binary.slice(0, 5), 2);

  // Scale to 8-bit
  const r8 = Math.round(r5 * (255 / 31)); // Equivalent to r5 * (255/31) approximately
  const g8 = Math.round(g5 * (255 / 31));
  const b8 = Math.round(b5 * (255 / 31));

  return `rgb(${r8}, ${g8}, ${b8})`;
}

export function TwoByteHexToModernHex(hex: string): string {
  const binary = (parseInt(hex, 16) << 1).toString(2).padStart(16, "0");

  // Extract components
  const r5 = parseInt(binary.slice(10, 15), 2);
  const g5 = parseInt(binary.slice(5, 10), 2);
  const b5 = parseInt(binary.slice(0, 5), 2);

  // Scale to 8-bit
  const r8 = Math.round(r5 * (255 / 31)); // Equivalent to r5 * (255/31) approximately
  const g8 = Math.round(g5 * (255 / 31));
  const b8 = Math.round(b5 * (255 / 31));

  // Convert to hex and pad to 2 digits
  const rHex = r8.toString(16).padStart(2, "0");
  const gHex = g8.toString(16).padStart(2, "0");
  const bHex = b8.toString(16).padStart(2, "0");

  return `${rHex}${gHex}${bHex}`.toUpperCase();
}

export function ModernHexToRGB555(hex: string): string {
  const r8 = parseInt(hex.slice(0, 2), 16);
  const g8 = parseInt(hex.slice(2, 4), 16);
  const b8 = parseInt(hex.slice(4, 6), 16);

  // Convert to RGB555
  const r5 = Math.round(r8 * (31 / 255));
  const g5 = Math.round(g8 * (31 / 255));
  const b5 = Math.round(b8 * (31 / 255));

  return `RGB ${r5}, ${g5}, ${b5}`;
}

export function ModernHexToRGB888(hex: string): string {
  const r8 = parseInt(hex.slice(0, 2), 16);
  const g8 = parseInt(hex.slice(2, 4), 16);
  const b8 = parseInt(hex.slice(4, 6), 16);

  return `rgb(${r8}, ${g8}, ${b8})`;
}

export function GBCRGBToTwoByteHex(r: number, g: number, b: number): string {
  // Ensure values are in range 0-31
  r = Math.max(0, Math.min(31, r));
  g = Math.max(0, Math.min(31, g));
  b = Math.max(0, Math.min(31, b));

  // Reconstruct the binary representation exactly as TwoByteHexToRGB555 creates it
  const bBits = b.toString(2).padStart(5, "0");
  const gBits = g.toString(2).padStart(5, "0");
  const rBits = r.toString(2).padStart(5, "0");

  const binary = bBits + gBits + rBits;
  const twoByteHex = parseInt(binary, 2)
    .toString(16)
    .padStart(4, "0")
    .toUpperCase();
  return twoByteHex;
}

export function GBCRGBToModernHex(r: number, g: number, b: number): string {
  // Ensure values are in range 0-31
  r = Math.max(0, Math.min(31, r));
  g = Math.max(0, Math.min(31, g));
  b = Math.max(0, Math.min(31, b));

  // Scale to 8-bit
  const r8 = Math.round(r * (255 / 31));
  const g8 = Math.round(g * (255 / 31));
  const b8 = Math.round(b * (255 / 31));

  // Convert to hex and pad to 2 digits
  const rHex = r8.toString(16).padStart(2, "0");
  const gHex = g8.toString(16).padStart(2, "0");
  const bHex = b8.toString(16).padStart(2, "0");

  return `${rHex}${gHex}${bHex}`.toUpperCase();
}

export function GBCRGBToRGB888(r: number, g: number, b: number): string {
  // Ensure values are in range 0-31
  r = Math.max(0, Math.min(31, r));
  g = Math.max(0, Math.min(31, g));
  b = Math.max(0, Math.min(31, b));

  // Scale to 8-bit
  const r8 = Math.round(r * (255 / 31));
  const g8 = Math.round(g * (255 / 31));
  const b8 = Math.round(b * (255 / 31));

  return `rgb(${r8}, ${g8}, ${b8})`;
}
