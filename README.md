<div align="center">

# ✨ SnapCV

### Build a Resume That Gets You Hired

**Free, modern, privacy-first resume builder**

[🚀 Try It Live](https://snapcv-tawny.vercel.app) · [📸 Screenshots](#screenshots) · [💰 Pricing](#pricing)

![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Deploy](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)

</div>

---

## ⚡ Why SnapCV?

Every resume builder out there either:
- 🚫 Forces you to create an account before you can even **try** it
- 💸 Charges $20+ just to download **your own resume** as PDF
- 😬 Has templates that look like they were designed in 2005
- 🕵️ Collects and sells your personal data

**SnapCV is the opposite of all that.**

## ✅ Features

| Feature | Free | Pro ($7/mo) | Lifetime ($49) |
|---------|:----:|:-----------:|:--------------:|
| Real-time live preview | ✅ | ✅ | ✅ |
| PDF export | ✅ | ✅ | ✅ |
| Auto-save (localStorage) | ✅ | ✅ | ✅ |
| JSON export/import | ✅ | ✅ | ✅ |
| Privacy-first (no backend) | ✅ | ✅ | ✅ |
| Minimal template | ✅ | ✅ | ✅ |
| Modern template | ✅ | ✅ | ✅ |
| Developer template | ✅ | ✅ | ✅ |
| Executive template | 🔒 | ✅ | ✅ |
| Creative template | 🔒 | ✅ | ✅ |
| Elegant template | 🔒 | ✅ | ✅ |
| No watermark on PDF | ❌ | ✅ | ✅ |
| Color themes (8 options) | ✅ | ✅ | ✅ |
| Font pairings | ✅ | ✅ | ✅ |
| All future templates | ❌ | ❌ | ✅ |

## 🎨 Templates

| Minimal | Modern | Developer |
|---------|--------|-----------|
| Clean, ATS-friendly | Bold header with gradient | Dark mode, terminal-inspired |
| Best for corporate | Best for creative roles | Best for tech roles |

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite 8
- **Styling**: Vanilla CSS with CSS Variables (glassmorphism design system)
- **PDF Export**: html2canvas + jsPDF
- **Routing**: react-router-dom (HashRouter)
- **Storage**: localStorage (zero backend)
- **Payments**: Lemon Squeezy
- **Hosting**: Vercel

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/duclong2108/snapcv.git
cd snapcv

# Install
npm install

# Run
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation
│   ├── Footer.jsx          # Footer
│   ├── ResumePreview.jsx   # Resume rendering (6 templates)
│   └── ProModal.jsx        # Upgrade modal
├── pages/
│   ├── Landing.jsx         # Homepage
│   ├── Gallery.jsx         # Template browser
│   └── Editor.jsx          # Resume editor
├── data/
│   ├── defaultResume.js    # Sample resume data
│   └── templates.js        # Template configs
├── utils/
│   ├── storage.js          # localStorage helpers
│   └── monetization.js     # Payment config
└── index.css               # Design system
```

## 🤝 Contributing

PRs welcome! Feel free to:
- Add new templates
- Improve mobile responsiveness
- Add new features
- Fix bugs

## 📄 License

MIT — use it however you want.

---

<div align="center">

**[🚀 Try SnapCV Now →](https://snapcv-tawny.vercel.app)**

Made with ❤️ by [duclong2108](https://github.com/duclong2108)

</div>
