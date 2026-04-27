# 🛒 TechnoStore - Technolife-Inspired Tech Blog


This is a modern tech blog platform inspired by **Technolife** design. My main goal was to gain hands-on experience with **Data Fetching** patterns and **API mocking**.

> **Project Story:** This was my first experience with mock APIs. I intentionally kept it minimal to focus on understanding data fetching patterns. Later I realized the limitations of local-only APIs, so I rebuilt it using **MSW (Mock Service Worker)** .

## ✨ Features

- 🔍 **Advanced Search** - Search blog posts by keyword
- 📄 **Smart Pagination** - Easy navigation with clickable page numbers
- 🎯 **MSW API Mocking** - All network requests are handled by Mock Service Worker (no real backend needed)
- 📱 **Responsive Design** - Great user experience on all devices (mobile, tablet, desktop)

## 🛠️ Tech Stack

- **Framework:** Next.js 
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **API Mocking:** MSW (Mock Service Worker)
- **Code Quality:** ESLint, PostCSS
- **Dev Server:** Turbopack 

## 🚀 Installation & Running 

> **Prerequisites:** Node.js and pnpm must be installed on your system.


```bash
# 1. Clone the repository
git clone https://github.com/ansariahmadreza/techno-store.git

# 2. Navigate into project folder
cd techno-store

# 3. Install dependencies
pnpm install

# 4. Run development server with Turbopack
pnpm dev 
