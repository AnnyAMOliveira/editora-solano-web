type ClassValue = string | false | null | undefined;

/**
 * Minimal class name joiner. Kept dependency-free on purpose — the project
 * does not need conditional-class merging beyond this.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
