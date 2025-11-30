# Quick Start Guide - Marine Analytics Frontend

## 📍 Where to Run

Navigate to the project directory:
```bash
cd "/Users/reguveeran/Chatbot/infosys proj/INFOSYS-PROJECT/marine-proj"
```

## 🚀 How to Run

### Step 1: Install Dependencies (First Time Only)
If you haven't installed dependencies yet, run:
```bash
npm install
```

This will install all required packages including React, React Router, etc.

### Step 2: Start the Development Server
```bash
npm start
```

The application will automatically open in your browser at:
**http://localhost:3000**

If it doesn't open automatically, manually navigate to that URL.

## 📱 Using the Application

1. **First Time**: You'll be redirected to the Login page
2. **Login**: Use any email and password (demo mode - no real authentication)
   - For admin access, use an email containing "admin" (e.g., `admin@example.com`)
3. **Navigate**: Use the navigation bar to access different pages:
   - Dashboard - Analytics and overview
   - Map - Interactive vessel map
   - Vessels - Search and view vessels
   - Voyage Replay - Historical voyage playback
   - Ports - Port congestion dashboard
   - Admin - Admin panel (admin users only)
   - Profile - User profile management

## 🛠️ Other Commands

- **Build for Production**: `npm run build`
- **Run Tests**: `npm test`
- **Stop Server**: Press `Ctrl + C` in the terminal

## ⚠️ Troubleshooting

- **Port 3000 already in use?** The app will automatically try port 3001, 3002, etc.
- **Dependencies not installing?** Try deleting `node_modules` and `package-lock.json`, then run `npm install` again
- **Module not found errors?** Make sure you're in the correct directory and dependencies are installed

## 📂 Project Structure

```
marine-proj/
├── src/
│   ├── components/     # Reusable components (Navbar)
│   ├── context/       # React Context (UserContext)
│   ├── pages/         # All page components
│   ├── App.js         # Main app with routing
│   └── index.js       # Entry point
├── public/            # Static files
└── package.json       # Dependencies and scripts
```

