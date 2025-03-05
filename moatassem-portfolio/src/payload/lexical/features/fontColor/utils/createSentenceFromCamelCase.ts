export const createSentenceFromCamelCase = (str: string, maxLength?: number) => {
  const base = str.replace(/([A-Z])/g, ' $1')
  const final = base.charAt(0).toUpperCase() + base.slice(1)

  if (maxLength) {
    if (maxLength < 4) {
      // If maxLength is too small to include any characters plus the ellipsis, return just the ellipsis
      return '...'
    }
    // Include only the part of the string that fits within maxLength, accounting for the length of '...'
    return final.length > maxLength ? `${final.slice(0, maxLength - 3)}...` : final
  }

  return final
}
