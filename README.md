# Thync Student Portal (React Migration)

This project is a React-based rebuild of the Thync Student Portal, migrating from a vanilla HTML/CSS/JS approach to a modern, professional React + TypeScript architecture.

## 🚀 Quick Start

To run this project locally, follow these steps:

1.  **Install Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2.  **Install Dependencies**: Open your terminal in the project root and run:
    ```bash
    npm install
    ```
3.  **Start Development Server**: Run the following command to start the local development server:
    ```bash
    npm run dev
    ```
4.  **Open in Browser**: The terminal will provide a local URL (usually `http://localhost:5173`). Open this URL in your browser to view the application.

## ⚠️ Important: Why the page might appear blank

If you attempt to open the `index.html` file directly in your browser (using the `file://` protocol), the page will appear **blank** and show console errors.

**Reason:** Modern web applications use ES Modules (ESM). For security reasons, browsers do not allow loading modules over the `file://` protocol (CORS policy). You **must** serve the project using a local development server (like Vite, which is included) to see the content.

## 🛠️ Features & Improvements

-   **React + TypeScript**: Fully typed codebase for better maintainability and developer experience.
-   **Modular Component Architecture**: Separated into reusable components (`CoursesDashboard`, `ScheduleSection`, `Sidebar`, etc.).
-   **Performance Optimized**: Used `React.memo` and efficient state management for smooth interactions.
-   **Enhanced Responsiveness**: Refined CSS with modern Flexbox/Grid and media queries while maintaining the original visual identity.
-   **Professional Data Structure**: Centralized mock data in `src/data/mockData.ts` for easy updates.

## 📜 Available Scripts

-   `npm run dev`: Starts the Vite development server.
-   `npm run build`: Compiles the project for production.
-   `npm run test`: Runs the test suite using Vitest.
-   `npm run lint`: Checks for code quality issues.
-   `npm run preview`: Locally previews the production build.

## 🧪 Testing

The project includes unit tests for key functionalities (tab switching, schedule overlays). Run them with:
```bash
npm run test
```
