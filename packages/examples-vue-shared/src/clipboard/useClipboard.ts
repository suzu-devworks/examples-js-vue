export function useClipboard() {
  async function copyText(text: string): Promise<boolean> {
    if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }

  async function pasteText(): Promise<string | null> {
    if (typeof navigator === 'undefined' || !navigator.clipboard?.readText) {
      return null
    }

    try {
      return await navigator.clipboard.readText()
    } catch {
      return null
    }
  }

  return {
    copyText,
    pasteText,
  }
}
