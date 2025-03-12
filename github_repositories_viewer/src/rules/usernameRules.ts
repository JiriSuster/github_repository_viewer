export const usernameRules = [
  (v: string) => !!v || 'username is required',
  (v: string) => (v.length >= 1 && v.length <= 39) || 'username must be between 1-39 characters',
  (v: string) =>
    (v.charAt(0) != '-' && v.charAt(v.length - 1) != '-') ||
    "username must not start or end with '-'",
  (v: string) => !v.includes('--') || "username must not include multiple '-' in a row",
  (v: string) => {
    const regex = /[^a-zA-Z0-9-]/g
    const badChars = v.match(regex) || []
    return (
      badChars.length == 0 ||
      `username must not contain these characters: ${[...new Set(badChars)]}`
    )
  },
]
