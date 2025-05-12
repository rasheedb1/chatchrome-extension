/**
 * Captures a screenshot of the current visible tab
 * @returns Promise<string> A promise that resolves with the screenshot data URL
 * @throws Error if the screenshot capture fails
 */
export const getScreenshot = async (): Promise<string> => {
  try {
    const response = await chrome.runtime.sendMessage({ action: "takeScreenshot" });
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    if (!response.screenshot) {
      throw new Error("No screenshot data received from background script");
    }
    
    return response.screenshot;
  } catch (error) {
    // If the error is already an Error instance, rethrow it
    if (error instanceof Error) {
      throw error;
    }
    // Otherwise, wrap the unknown error in a new Error
    throw new Error(`Failed to capture screenshot: ${error}`);
  }
}; 