![Next.js](https://img.shields.io/badge/Next.js-15.4.3-blue?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwindcss&logoColor=white)
![ShadCN UI](https://img.shields.io/badge/ShadCN_UI-Components-8B5CF6?logo=radixui&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.15.4-orange?logo=recharts&logoColor=white)
![react-globe.gl](https://img.shields.io/badge/3D_Globe-React_Globe.gl-00BFFF?logo=three.js&logoColor=white)
![License](https://img.shields.io/github/license/singhxayush/latency-topology-visualizer)
![Deployed](https://img.shields.io/badge/Live-Vercel-000000?logo=vercel)

# Latency Topology Visualizer

A powerful, real-time latency visualization dashboard that presents cloud provider network data in a **3D interactive globe** and detailed **analytics view**. Track, compare, and explore network health and latency trends effortlessly.

## Links

- **🌍 Live Demo**: [exchange-latency-visualizer-dashboard.vercel.app](https://exchange-latency-visualizer-dashboard.vercel.app/)
- **📽️ Video Walkthrough**: [YouTube Demo](https://www.youtube.com/watch?v=mq5Xte48zFA)
- **📁 GitHub Repo**: [github.com/singhxayush/latency-topology-visualizer](https://github.com/singhxayush/latency-topology-visualizer)

---

## Features

- 🌍 3D globe with animated arcs showing real-time latency paths.
- 📊 Analytics panel with interactive Recharts for latency trends.
- 🌓 Light/dark mode toggle with persistent theme.
- ⏱️ Time range filters and cloud provider filters.
- ✅ Clean, accessible UI powered by [ShadCN UI](https://ui.shadcn.com/).
- 📦 Fully responsive with Tailwind CSS + Jotai state management.

---

## Preview

![screenshot](https://user-images.githubusercontent.com/your-screenshot-link.jpg) <!-- Replace with your image link if you wish -->

---

## How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/singhxayush/latency-topology-visualizer.git
cd latency-topology-visualizer
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be running at: [http://localhost:3000](http://localhost:3000)

---

## Submission Requirements

- ✅ **Video walkthrough**: [Link to YouTube demo](https://www.youtube.com/watch?v=mq5Xte48zFA)
- ✅ **GitHub link**: [Repository](https://github.com/singhxayush/latency-topology-visualizer)
- ✅ **Instructions**: See section above for setup
- ✅ **Libraries used**: See tech stack section below

---

## Assumptions Made

- Simulated latency and status data is used; real-time API integrations can be added later.
- The charting and globe animation are optimized for visual clarity and responsiveness.
- The project assumes usage in a modern browser (desktop-focused).

---

## 📚 Library Overview

| Library                  | Purpose                             |
| ------------------------ | ----------------------------------- |
| `react-globe.gl`         | 3D globe rendering                  |
| `recharts`               | Line charts + analytics             |
| `jotai`                  | Lightweight React state             |
| `xlsx`                   | Spreadsheet import/export support   |

<!-- ## License

This project is under the [MIT License](LICENSE).

© 2025 Ayush Singh. All rights reserved.

This project is not open source and may not be copied, modified, distributed, or used in any form without explicit permission from the author. -->
