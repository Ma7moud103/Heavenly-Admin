function normalizeStrings(value: string | null | undefined) {
  return value?.trim().toLowerCase() ?? '';
}

export { normalizeStrings };
