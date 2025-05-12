// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Check if the action is to take a screenshot
  if (request.action === "takeScreenshot") {
    // Capture the visible tab as PNG
    chrome.tabs.captureVisibleTab({ format: "png" })
      .then((dataUrl) => {
        // Send the screenshot data back to the content script
        sendResponse({ screenshot: dataUrl });
      })
      .catch((error) => {
        console.error("Error capturing screenshot:", error);
        sendResponse({ error: "Failed to capture screenshot" });
      });

    // Return true to indicate we will send a response asynchronously
    return true;
  }
}); 