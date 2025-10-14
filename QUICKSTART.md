# Quick Start Guide - ING Demo App

Get the ING Demo App running in 5 minutes!

## Prerequisites Check

```bash
# Check Node.js is installed (need 14+)
node --version

# Check npm is installed
npm --version
```

If you don't have Node.js, download it from [nodejs.org](https://nodejs.org/)

## 3-Step Setup

### Step 1: Install Dependencies (2 min)

```bash
cd ~/Documents/ing-demo-app
npm install
```

### Step 2: Configure Optimizely (2 min)

**Option A: Use Default (app will work but flags won't change)**
```bash
npm start
```

**Option B: Connect to Optimizely (recommended for demos)**

1. Get a free Optimizely account at [optimizely.com](https://www.optimizely.com/)
2. Copy your SDK key from Settings → Environments → Development
3. Create `.env` file:
   ```bash
   echo "REACT_APP_OPTIMIZELY_SDK_KEY=your_sdk_key_here" > .env
   ```
4. Start the app:
   ```bash
   npm start
   ```

### Step 3: Open and Explore (1 min)

The app will automatically open at [http://localhost:3000](http://localhost:3000)

Explore these pages:
- **Home** - Dashboard with hero banner and account cards
- **Accounts** - View account details and transactions
- **Transfer** - Transfer money form
- **Savings** - Savings products and goals

## What's Testable?

### Without Optimizely Setup
The app works perfectly and shows default states for all features.

### With Optimizely Setup
You can A/B test:

1. **Button Colors** - White, green, blue, purple CTA buttons
2. **Dashboard Layouts** - 2-column, 3-column, or sidebar layouts
3. **Hero Banners** - Default, gradient, or dark variants
4. **Feature Flags** - Show/hide savings goals and quick transfer
5. **Navigation Styles** - Default, compact, or bold nav bars

## Next Steps

Want to create experiments? Follow the detailed setup:
- [OPTIMIZELY_SETUP.md](OPTIMIZELY_SETUP.md) - Complete Optimizely configuration
- [README.md](README.md) - Full documentation

## Common Issues

**Port 3000 already in use?**
```bash
# Use a different port
PORT=3001 npm start
```

**Module not found errors?**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Changes not showing?**
```bash
# Hard refresh in browser
# Mac: Cmd + Shift + R
# Windows/Linux: Ctrl + Shift + R
```

That's it! You're ready to demo Optimizely experiments!
