let timerDiv = null;

// ⏱️ format time
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// 🔄 update loop
setInterval(() => {
  try {
    chrome.runtime.sendMessage({ type: "getTime" }, (res) => {
      if (chrome.runtime.lastError) return;

      // ❌ If site not tracked → remove UI completely
      if (!res || res.remaining == null) {
        if (timerDiv) {
          timerDiv.remove();
          timerDiv = null;
        }
        return;
      }

      // ✅ Create ONLY when needed
      if (!timerDiv) {
        timerDiv = document.createElement("div");

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
      }

      timerDiv.textContent = `⏳ ${formatTime(res.remaining)}`;
    });
  } catch (e) {}
}, 1000);