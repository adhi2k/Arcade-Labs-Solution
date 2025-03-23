// Function to handle Shadow DOM (if needed)
function getShadowRootElement(selector) {
  const shadowHost = document.querySelector('ql-lab-control-panel'); // Adjust if shadow host differs
  if (shadowHost && shadowHost.shadowRoot) {
    return shadowHost.shadowRoot.querySelector(selector);
  }
  return null;
}

// Function to wait for dynamically loaded elements
function waitForElement(selector, callback) {
  const observer = new MutationObserver((mutations, obs) => {
    const element = document.querySelector(selector);
    if (element) {
      callback(element);
      obs.disconnect(); // Stop observing once found
    }
  });
  observer.observe(document, { childList: true, subtree: true });
}

// Attempt to extract the title directly from the DOM or Shadow DOM
const titleSelector = 'h1.ql-display-large.lab-preamble__title';

// Check if the element is in Shadow DOM
let titleElement = getShadowRootElement(titleSelector);
if (titleElement) {
  const pageTitle = titleElement.textContent.trim();
  chrome.runtime.sendMessage({ title: pageTitle });
} else {
  // Wait for the element dynamically if not immediately available
  waitForElement(titleSelector, (titleElement) => {
    const pageTitle = titleElement.textContent.trim();
    chrome.runtime.sendMessage({ title: pageTitle });
  });
}
