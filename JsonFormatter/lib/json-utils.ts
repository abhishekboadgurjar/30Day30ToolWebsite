export function formatJson(jsonString: string): string {
  if (!jsonString.trim()) {
    throw new Error("Please enter some JSON data")
  }

  try {
    const parsed = JSON.parse(jsonString)
    return JSON.stringify(parsed, null, 2)
  } catch (error) {
    throw new Error("Invalid JSON: Please check your syntax")
  }
}

export function minifyJson(jsonString: string): string {
  if (!jsonString.trim()) {
    throw new Error("Please enter some JSON data")
  }

  try {
    const parsed = JSON.parse(jsonString)
    return JSON.stringify(parsed)
  } catch (error) {
    throw new Error("Invalid JSON: Please check your syntax")
  }
}

export function validateJson(jsonString: string): boolean {
  if (!jsonString.trim()) {
    throw new Error("Please enter some JSON data")
  }

  try {
    JSON.parse(jsonString)
    return true
  } catch (error) {
    throw new Error("Invalid JSON: Please check your syntax")
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    // Fallback for older browsers
    try {
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      return true
    } catch (fallbackError) {
      console.error("Failed to copy to clipboard:", fallbackError)
      return false
    }
  }
}
