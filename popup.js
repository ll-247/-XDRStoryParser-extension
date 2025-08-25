document.getElementById("download").addEventListener("click", () => {
  chrome.storage.local.get("storyData", (res) => {
    const data = res.storyData;
    if (!data) {
      alert("No story data collected yet.");
      return;
    }

    // Raw JSON, pretty-printed as JSONC
//    const jsoncContent = `// Raw story JSON\n${JSON.stringify(data, null, 2)}`;
    const jsoncContent = `${data}`;

    const blob = new Blob([jsoncContent], { type: "application/jsonc" });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download({
      url: url,
      filename: "story-export.jsonc"
    });
  });
});