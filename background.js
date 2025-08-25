chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "storyData") {
    chrome.storage.local.set({ storyData: msg.data });
    console.log("Captured raw story JSON:", msg.data);
  }
});