# ING Demo App - Project Summary

## Overview

A fully functional demo banking application that mimics ING's interface, built specifically to showcase Optimizely's feature flag and A/B testing capabilities.

**Location**: `~/Documents/ing-demo-app`

## What's Been Built

### Core Application
- **React 18 + TypeScript** - Modern, type-safe web application
- **Styled Components** - ING-branded styling with orange theme
- **React Router** - Multi-page navigation
- **Optimizely React SDK 3.3.0** - Full feature flag integration

### Pages Implemented

1. **Dashboard (Home)** - `/`
   - Hero banner with CTA button
   - Account balance cards
   - Savings goals widget (toggleable)
   - Quick transfer button (toggleable)

2. **Accounts** - `/accounts`
   - Account overview
   - Recent transactions list
   - Interest rate information

3. **Transfer** - `/transfer`
   - Money transfer form
   - Event tracking on completion

4. **Savings** - `/savings`
   - Savings product cards
   - Create savings goal modal
   - Event tracking on goal creation

### Feature Flags Ready for Testing

| Flag Key | Type | Variables | Purpose |
|----------|------|-----------|---------|
| `new_dashboard_layout` | String Variable | `layout`: two-column, three-column, sidebar | Test different dashboard layouts |
| `checkout_button_color` | String Variable | `color`: white, green, blue, purple | Test CTA button colors |
| `hero_banner_variant` | Multiple Variables | `variant`: default, gradient, dark<br>`size`: default, large | Test hero banner styles |
| `show_savings_goals` | Boolean | N/A | Show/hide savings goals feature |
| `enable_quick_transfer` | Boolean | N/A | Enable quick transfer button |
| `navigation_style` | String Variable | `style`: default, compact, bold | Test navigation bar styles |

### Event Tracking

All these events are tracked and ready for experimentation metrics:

- `dashboard_view` - Dashboard page views
- `transfer_completed` - Successful transfers
- `savings_goal_created` - New savings goals
- `cta_clicked` - Call-to-action button clicks
- `page_view` - General page navigation

## Project Structure

```
ing-demo-app/
├── public/                      # Static files
├── src/
│   ├── components/              # React components
│   │   ├── Header.tsx          # Navigation (uses navigation_style flag)
│   │   ├── Dashboard.tsx       # Home page (uses 5 different flags)
│   │   ├── Accounts.tsx        # Account overview
│   │   ├── Transfer.tsx        # Transfer form (tracks events)
│   │   └── Savings.tsx         # Savings products (tracks events)
│   ├── styles/
│   │   ├── theme.ts            # ING color scheme & design tokens
│   │   └── GlobalStyles.ts     # Global CSS
│   ├── optimizely.config.ts    # Feature flag & event definitions
│   ├── styled.d.ts             # TypeScript declarations
│   └── App.tsx                 # Main app with Optimizely provider
├── .env.example                # Environment template
├── QUICKSTART.md               # 5-minute setup guide
├── OPTIMIZELY_SETUP.md         # Detailed Optimizely configuration
├── README.md                   # Full documentation
├── PROJECT_SUMMARY.md          # This file
└── package.json                # Dependencies
```

## Quick Start

```bash
cd ~/Documents/ing-demo-app
npm install
npm start
```

App opens at [http://localhost:3000](http://localhost:3000)

## Integration with Your Opal Tools

The demo app is designed to work alongside your Opal custom tools. Example workflow:

1. **Plan Experiment** using your custom tools:
   ```bash
   curl -X POST http://localhost:3000/tools/experiment-duration-estimator \
     -d '{"dailyTraffic": 50000, "baselineConversionRate": 0.15, "minimumDetectableEffect": 0.05}'
   ```

2. **Check for Conflicts**:
   ```bash
   curl -X POST http://localhost:3000/tools/experiment-overlap-checker \
     -d '{"experiments": "[...]", "totalAudienceSize": 10000}'
   ```

3. **Run the Experiment** in Optimizely with the ING demo app

4. **Monitor Results** in Optimizely dashboard

## Demo Scenarios

### Scenario 1: Button Color Optimization
**Goal**: Increase CTA clicks by 10%

1. Create experiment with `checkout_button_color` flag
2. Test variations: white, green, blue
3. Track `cta_clicked` events
4. Measure impact on engagement

### Scenario 2: Dashboard Layout
**Goal**: Improve user experience and account visibility

1. Create experiment with `new_dashboard_layout` flag
2. Test: 2-column vs 3-column vs sidebar
3. Track `dashboard_view` and time on page
4. Measure engagement with accounts

### Scenario 3: Feature Rollout
**Goal**: Gradually roll out savings goals feature

1. Use `show_savings_goals` feature flag
2. Start at 10% of users
3. Monitor `savings_goal_created` events
4. Increase to 100% if metrics are positive

### Scenario 4: Hero Banner Impact
**Goal**: Test which hero style drives more engagement

1. Create experiment with `hero_banner_variant`
2. Test: default vs gradient vs dark
3. Track `cta_clicked` from hero banner
4. Measure conversion impact

## Technical Highlights

- **Type-Safe**: Full TypeScript coverage
- **Component-Based**: Reusable, maintainable React components
- **Styled System**: Theme-based design system
- **SDK Integration**: Proper Optimizely React hooks (v3)
- **Event Tracking**: Comprehensive tracking on key actions
- **Responsive**: Mobile-friendly design
- **Production Ready**: Successfully builds for deployment

## Build Status

✅ Development server runs successfully
✅ Production build compiles without errors
✅ TypeScript type checking passes
✅ All dependencies installed correctly

## Next Steps for Demos

1. **Get Optimizely SDK Key**:
   - Sign up at optimizely.com
   - Create project
   - Copy SDK key

2. **Configure Flags**:
   - Follow [OPTIMIZELY_SETUP.md](OPTIMIZELY_SETUP.md)
   - Create 6 feature flags
   - Create 5 events

3. **Run Demo**:
   - Add SDK key to `.env`
   - Start app: `npm start`
   - Create experiments in Optimizely
   - Show live flag changes

4. **Integration**:
   - Use Opal custom tools for analysis
   - Show experiment planning workflow
   - Demonstrate complete experimentation lifecycle

## Technologies Used

- React 18.3.1
- TypeScript 4.x
- Optimizely React SDK 3.3.0
- Optimizely SDK 5.4.1
- Styled Components 6.1.13
- React Router DOM 6.28.0

## Support Files

- **QUICKSTART.md** - Get running in 5 minutes
- **OPTIMIZELY_SETUP.md** - Step-by-step Optimizely configuration
- **README.md** - Complete documentation
- **.env.example** - Environment variable template

## Success Criteria

✅ Professional ING-branded interface
✅ Multiple pages with realistic banking features
✅ 6 configurable feature flags
✅ 5 tracked events
✅ Full Optimizely integration
✅ TypeScript type safety
✅ Production-ready build
✅ Comprehensive documentation
✅ Integration with Opal custom tools

## Deployment Options

The built app can be deployed to:
- Netlify (drag & drop `build/` folder)
- Vercel (connect GitHub repo)
- AWS S3 + CloudFront
- Any static hosting service

To build for production:
```bash
npm run build
```

Output in `build/` directory is ready to deploy.

---

**Project Status**: ✅ Complete and ready for demos

**Created**: October 2025
**Build Verified**: Yes
**Documentation**: Complete
**Demo Ready**: Yes
