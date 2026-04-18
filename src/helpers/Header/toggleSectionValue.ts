export function toggleSectionValue(
  current: string | null,
  next: string,
): string | null {
  return current === next ? null : next
}