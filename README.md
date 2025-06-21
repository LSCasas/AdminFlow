# AdminFlow

A consumables management application that allows users to record and track consumable usage. Users can log details such as areas, quantities, and responsible signatures. The app generates Excel reports, enabling users to download and manage data efficiently. Designed for streamlined resource tracking in organizational environments.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Usage](#how-to-use-this-project)
- [Requirements](#requirements)
- [Deployment](#deployment)
- [Learn More](#learn-more)

---

## Project Structure

```
AdminFlow/
├── README.md              # Project documentation
├── api/                   # API routes (Next.js API routes)
├── components/            # Reusable React components
├── hooks/                 # Custom React hooks
├── pages/                 # Application pages and routing
├── public/                # Static assets
├── styles/                # Global CSS and Tailwind styles
├── utils/                 # Utility functions
├── next.config.mjs        # Next.js configuration
├── tailwind.config.mjs    # Tailwind CSS configuration
├── postcss.config.mjs     # PostCSS configuration
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Dependency lock file

```

---

## Features

- User login and authentication
- Admin user registration
- Consumable tracking and movement logs
- Offline-first support with IndexedDB and background sync
- Automatic synchronization when reconnected to the internet
- Record history for audit and review
- Responsive and mobile-friendly design
- Data export to PDF and Excel (XLSX)
- Charts and data visualization with Chart.js

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/LSCasas/AdminFlow.git
   cd AdminFlow
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   npm run start
   ```

---

## How to Use This Project

Once the server is running, open [http://localhost:3000](http://localhost:3000) in your browser to access the app.

- Register an admin user.
- Log in to the application.
- Navigate to record sections to register and manage consumables.
- Use the offline mode to capture records without connectivity.
- Reconnect to sync all pending data.

---

## Requirements

- Node.js >= 18.x
- npm
- Modern web browser
- Optional: Vercel account for deployment

---

## Deployment

You can deploy this app using **Vercel** or any platform that supports Next.js:

```bash
vercel deploy
```

Ensure environment variables and PWA configurations are correctly set in `next.config.mjs` for production.

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [react-hook-form Documentation](https://react-hook-form.com/get-started)
- [jsPDF Documentation](https://github.com/parallax/jsPDF)
- [XLSX (SheetJS) Documentation](https://docs.sheetjs.com/)
- [idb (IndexedDB) Library](https://www.npmjs.com/package/idb)

---

Your feedback and contributions to this project are welcome!
