const defaultSites = {
  "instagram.com": 600,
  "facebook.com": 600,
  "twitter.com": 600
};

const list = document.getElementById("list");

// 🧠 Normalize domain (important)
function normalize(site) {
  return site.replace("https://", "")
             .replace("http://", "")
             .replace("www.", "")
             .trim();
}

// init defaults
async function init() {
  const data = await chrome.storage.local.get("sites");
  let sites = data.sites || {};

  let changed = false;

  for (let s in defaultSites) {
    if (!sites[s]) {
      sites[s] = { limit: defaultSites[s], time: 0 };
      changed = true;
    }
  }

  if (changed) {
    await chrome.storage.local.set({ sites });
  }

  load();
}

// load UI
async function load() {
  const data = await chrome.storage.local.get(["sites"]);
  const sites = data.sites || {};

  list.innerHTML = "";

  for (let s in sites) {
  const row = document.createElement("div");
  row.className = "row";

  const name = document.createElement("span");
  name.className = "site";
  name.textContent = s;

  const box = document.createElement("div");
  box.className = "input-box";

  const input = document.createElement("input");
  input.type = "number";
  input.value = Math.floor(sites[s].limit / 60);

  const unit = document.createElement("span");
  unit.className = "unit";
  unit.textContent = "min";

  // ⏱️ Update limit
  input.onchange = async () => {
    sites[s].limit = parseInt(input.value || 0) * 60;
    await chrome.storage.local.set({ sites });
  };

  // ❌ DELETE BUTTON
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✕";
  removeBtn.style.marginLeft = "6px";
  removeBtn.style.background = "transparent";
  removeBtn.style.border = "none";
  removeBtn.style.cursor = "pointer";
  removeBtn.style.color = "#ef4444";
  removeBtn.style.fontSize = "16px";

  removeBtn.onclick = async () => {
    delete sites[s];
    await chrome.storage.local.set({ sites });
    load(); // refresh UI
  };

  box.appendChild(input);
  box.appendChild(unit);
  box.appendChild(removeBtn);

  row.appendChild(name);
  row.appendChild(box);
  list.appendChild(row);
}
}

// ➕ add site
document.getElementById("add").onclick = async () => {
  let site = document.getElementById("site").value;
  let limit = document.getElementById("limit").value;

  if (!site || !limit) return;

  site = normalize(site);
  limit = parseInt(limit);

  if (!limit || limit <= 0) return;

  const data = await chrome.storage.local.get("sites");
  const sites = data.sites || {};

  // reset time if re-added
  sites[site] = { limit: limit * 60, time: 0 };

  await chrome.storage.local.set({ sites });

  // clear inputs (nice UX)
  document.getElementById("site").value = "";
  document.getElementById("limit").value = "";

  load();
};

init();