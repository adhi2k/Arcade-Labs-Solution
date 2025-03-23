const API_KEY = "AIzaSyAz6kCkGRQnuiXHkzgxhql8ncxtxvwyClg"; // Replace with your API Key



// Receive the page title from the content script
chrome.runtime.onMessage.addListener((message) => {
  const titleInput = document.getElementById("searchInput");
  if (message.title) {
    titleInput.value = message.title; // Auto-fill the input with the page title
    fetchYouTubeResults(message.title); // Auto-trigger the search
  }
});

document.getElementById("searchButton").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim();
  if (query) {
    fetchYouTubeResults(query);
  }
});

async function fetchYouTubeResults(query) {
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}&maxResults=5&type=video`;

  try {
    const response = await fetch(searchUrl);
    const data = await response.json();
    displayResults(data.items);
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
  }
}

function displayResults(videos) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Clear previous results

  videos.forEach((video) => {
    const { title, channelTitle, thumbnails } = video.snippet;
    const videoId = video.id.videoId;

    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
      <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" style="text-decoration: none; color: black;">
        <img src="${thumbnails.default.url}" alt="Thumbnail" style="width: 120px; height: 90px;">
        <div>
          <b>${title}</b><br>
          <small>${channelTitle}</small>
        </div>
      </a>
    `;
    resultsDiv.appendChild(videoDiv);
  });
}

