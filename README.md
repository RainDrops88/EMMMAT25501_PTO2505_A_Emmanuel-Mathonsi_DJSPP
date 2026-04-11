# Podcast App (React)

A polished podcast discovery and listening app built with **React**, **Vite**, and **React Router**. The app allows users to browse shows from a public podcast API, explore show details, play episodes globally, save favorites, and switch between light and dark themes.

---

## 🌐 Live Demo

🔗 [View the deployed app](https://emmmat-25501-pto-2505-a-emmanuel-ma-kappa.vercel.app/)

---

## 📖 Overview

This project extends the podcast app developed during the DJS course and focuses on building a more production-ready experience.

It includes:
- a searchable and filterable home page
- a dynamic show detail view
- a global audio player that stays available across routes
- persistent favorites using `localStorage`
- light/dark theme support
- Vercel deployment with SPA route handling

---

## 🎯 Objectives

- Implement a global audio player with full playback control
- Add support for favoriting episodes with persistent storage
- Introduce a recommended shows carousel on the landing page
- Support theme toggling for light and dark mode
- Ensure robust routing and professional deployment on Vercel
- Improve the user experience with responsive and accessible UI patterns

---

## ✨ Features

### 🔎 Discover Podcasts
- Search podcasts by title with a debounced search input
- Filter results by genre
- Sort podcasts by title or last updated date
- Browse results using pagination
- View a recommended shows carousel on the home page

### 📄 Podcast Details
- Open individual show pages via dynamic routes: `/show/:id`
- View podcast artwork, metadata, seasons, and episodes
- Toggle between seasons to explore episode lists
- Start audio playback directly from episode entries
- Favorite or unfavorite episodes from the detail view

### 🔊 Global Audio Player
- Persistent audio player available across the app
- Native audio controls with autoplay support
- Previous and next episode navigation
- Ability to close the player at any time
- Reload/close confirmation prompt while audio is playing

### ⭐ Favorites
- Save favorite episodes with one click
- Favorites count shown in the header
- Dedicated `/favorites` page for saved episodes
- Episodes grouped by podcast for easier browsing
- Date and time added are stored and displayed
- Favorites are persisted in `localStorage`

### 🎨 UI / UX Enhancements
- Light and dark theme toggle
- Theme preference saved in `localStorage`
- Responsive layout for different screen sizes
- Loading and error states for better feedback
- Reusable components styled with CSS Modules

---

## 🛠 Tech Stack

![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-1572B6?logo=css3&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

---

## 📡 Live Data Source

This project consumes the following public API endpoints:

- `https://podcast-api.netlify.app/shows`
- `https://podcast-api.netlify.app/id/:showId`
- `https://podcast-api.netlify.app/genre/:genreId`

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- `Node.js`
- `npm`

### Installation

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

Then open the local URL provided by Vite in your browser.

---

## 🧭 Routes

| Route | Description |
|---|---|
| `/` | Home page with search, filters, carousel, and podcast grid |
| `/show/:id` | Detail page for a selected podcast |
| `/favorites` | Page showing all saved favorite episodes |

---

## 📁 Project Structure

```text
src/
├── api/           # Fetch helpers for podcast and genre data
├── assets/        # Static assets
├── components/
│   ├── Filters/   # Search, sort, genre, and favorites UI
│   ├── Podcasts/  # Podcast cards, grid, and detail components
│   └── UI/        # Header, carousel, audio player, loading, error, pagination
├── context/       # Global podcast and audio player state
├── pages/         # Route-level page components
└── utils/         # Utility helpers such as date formatting
```

---

## 💾 State Management & Persistence

The app uses React Context for shared state:

- `PodcastContext` manages podcast data, filters, sorting, pagination, and favorites
- `AudioPlayerContext` manages global playback, episode queueing, and the leave-page warning while audio is active

Persistent browser storage is used for:
- saved theme preference
- favorite episodes

---

## ☁️ Deployment

The application is deployed on **Vercel**.

Because the app uses `BrowserRouter`, SPA routing fallback is required so direct visits to dynamic routes continue to work after deployment. This is handled in `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 👤 Author

**Emmanuel Mathonsi**

### 🌐 Socials

[![Portfolio](https://img.shields.io/badge/-Portfolio-000000?style=flat&logo=vercel&logoColor=white)](https://emmanuel-mathonsi.netlify.app/)  
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/emmanuel-mathonsi-300b33308/)  
📧 Email: [07942jerry@gmail.com]

---

## 📌 Notes

This project was built as part of the **DJS React coursework**, with a focus on clean component structure, state management, deployment readiness, and user experience improvements.
