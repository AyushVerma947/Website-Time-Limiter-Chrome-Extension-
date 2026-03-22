const INTERVAL = 1;

// 📅 Daily reset key
function getTodayKey() {
  return new Date().toDateString();
}

// 🌐 Extract domain safely
function getDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return null;
  }
}

// ⏱️ Main tracking logic
async function updateTime() {
  // 🔍 Always get active tab (NO stale IDs)
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs[0];

    if (!tab || !tab.url) return;

    const domain = getDomain(tab.url);
    if (!domain) return;

    const data = await chrome.storage.local.get(["sites", "date"]);
    const sites = data.sites || {};
    let date = data.date;

    const today = getTodayKey();

    // 🔄 Reset daily
    if (date !== today) {
      for (let s in sites) {
        sites[s].time = 0;
      }
      await chrome.storage.local.set({ sites, date: today });
    }

    // ❌ Ignore sites not tracked
    if (!sites[domain]) return;

    // ⏱️ Increment time
    sites[domain].time += 1;

    // 🚫 Block if limit reached
    if (sites[domain].time >= sites[domain].limit) {
      chrome.tabs.update(tab.id, {
        url: chrome.runtime.getURL("blocked.html")
      }, () => {
        if (chrome.runtime.lastError) {}
      });
      return;
    }

    await chrome.storage.local.set({ sites });
  });
}

// 🔁 Run every second
setInterval(updateTime, 1000);

// 📡 Send remaining time to content script
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "getTime") {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tab = tabs[0];

      if (!tab || !tab.url) {
        sendResponse({ remaining: null });
        return;
      }

      const domain = getDomain(tab.url);

      const data = await chrome.storage.local.get(["sites"]);
      const sites = data.sites || {};
      const site = sites[domain];

      if (!site) {
        sendResponse({ remaining: null });
        return;
      }

      sendResponse({
        remaining: Math.max(0, site.limit - site.time)
      });
    });

    return true;
  }
});