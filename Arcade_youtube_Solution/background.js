// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.title) {
        console.log("Received title from content.js:", message.title);
        // Do something with the title, e.g., open a YouTube search page
        const youtubeSearchURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(message.title)}`;
        chrome.tabs.create({ url: youtubeSearchURL });
    }
});

