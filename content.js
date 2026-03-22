const timerDiv = document.createElement("div");

timerDiv.style.position = "fixed";
timerDiv.style.top = "10px";
timerDiv.style.right = "10px";
timerDiv.style.zIndex = "999999";
timerDiv.style.background = "black";
timerDiv.style.color = "white";
timerDiv.style.padding = "6px 10px";
timerDiv.style.borderRadius = "8px";
timerDiv.style.fontSize = "13px";

document.body.appendChild(timerDiv);

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

setInterval(() => {
  try {
    chrome.runtime.sendMessage({ type: "getTime" }, (res) => {
      // ❌ if extension reloaded → ignore safely
      if (chrome.runtime.lastError) return;

      if (!res || res.remaining == null) {
        timerDiv.style.display = "none";
        return;
      }

      timerDiv.style.display = "block";
      timerDiv.textContent = `⏳ ${formatTime(res.remaining)}`;
    });
  } catch (e) {
    // fail silently (prevents crash)
  }
}, 1000);