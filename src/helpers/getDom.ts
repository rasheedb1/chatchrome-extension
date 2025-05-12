/**
 * Captures the complete HTML content of the current page
 * @returns Promise<string> A promise that resolves with the page's HTML content
 */
export const getDom = async (): Promise<string> => {
  try {
    // Get the complete HTML content of the page
    const html = document.documentElement.outerHTML;
    
    if (!html) {
      throw new Error("Could not capture DOM content");
    }
    
    return html;
  } catch (error) {
    // If the error is already an Error instance, rethrow it
    if (error instanceof Error) {
      throw error;
    }
    // Otherwise, wrap the unknown error in a new Error
    throw new Error(`Failed to capture DOM: ${error}`);
  }
}; 