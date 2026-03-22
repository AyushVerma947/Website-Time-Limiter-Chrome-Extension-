# ⏳ Website Time Limiter (Chrome Extension)

A lightweight and effective Chrome extension that helps you stay focused by limiting time spent on distracting websites like Instagram, Facebook, and Twitter.

---

## 🚀 Features

* ⏱️ Set **daily time limits** for each website
* 🌐 Support for **multiple websites**
* 📊 **Real-time countdown timer** overlay (top-right corner)
* 🔄 **Automatic daily reset** of usage
* ➕ Add **custom websites/domains**
* ❌ Easily remove tracked websites
* ⚡ Tracks time only when the tab is **active**

---

## 🧠 How It Works

1. The extension tracks time only when a website tab is active
2. Each website has its own configurable daily limit
3. Once the time limit is reached:

   * The site is **blocked automatically**
   * User is redirected to a **blocked page**
4. All timers reset automatically every day

---

## 📦 Project Structure

```
website-limiter/
│── manifest.json      # Extension configuration
│── background.js      # Handles time tracking & logic
│── content.js         # Injects timer overlay into pages
│── popup.html         # Extension UI
│── popup.js           # UI logic & interactions
│── blocked.html       # Page shown after limit is reached
```

---

## 🛠️ Installation (Local Setup)

1. Clone the repository:

```bash
git clone https://github.com/your-username/website-time-limiter.git
```

2. Open Chrome and navigate to:

```
chrome://extensions/
```

3. Enable **Developer Mode** (top-right corner)

4. Click **Load unpacked**

5. Select the `website-limiter` folder

---

## 🧪 Usage Guide

1. Click the extension icon in Chrome
2. Add websites you want to limit
3. Set daily time limits (in minutes)
4. Browse normally
5. The timer will:

   * Start when the tab is active
   * Pause when inactive
6. Once time is exhausted → the site gets blocked

---

## ⚠️ Important Notes

* Works per **Chrome profile only**
* Time tracking is limited to **active tabs**
* Requires a **manual refresh** after extension reload
* Data is stored locally (no cloud sync yet)

---

## 🔮 Future Improvements

* 🔄 Sync limits across devices
* 📊 Detailed usage analytics dashboard
* 🔒 Strict mode (prevent disabling extension)
* 🌍 Publish on Chrome Web Store
* 📱 Mobile browser support (if feasible)

---

## 📸 Preview

![Extension UI](image.png)

---

## 🧑‍💻 Tech Stack

* JavaScript (Vanilla)
* Chrome Extension APIs (Manifest V3)
* HTML & CSS

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
