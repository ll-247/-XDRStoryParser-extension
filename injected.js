(function() {
  function sendData(data) {
    window.dispatchEvent(new CustomEvent("storyDataCaptured", { detail: data }));
  }

  // Hook XHR to capture raw response
  const origOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    this._isStory = (typeof url === "string" &&
                     url.includes("/apiproxy/mtp/mdeAlertExperience/") &&
                     url.includes("/story"));
    return origOpen.call(this, method, url, ...rest);
  };

  const origSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function(...args) {
    if (this._isStory) {
      this.addEventListener("load", function() {
        try {
          const data = Json.parse(this.responseText); // raw JSON
          sendData(data);
        } catch (err) {
          console.warn("Story XHR parse error:", err);
        }
      });
    }
    return origSend.apply(this, args);
  };
})();