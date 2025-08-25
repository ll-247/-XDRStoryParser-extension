const script = document.createElement('script');
script.src = chrome.runtime.getURL('injected.js');
(document.head || document.documentElement).appendChild(script);
script.remove();

window.addEventListener("storyDataCaptured", (event) => {
  if (event.detail) {
    chrome.runtime.sendMessage({ type: "storyData", data: event.detail });
  }
});