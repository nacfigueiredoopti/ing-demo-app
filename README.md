# ING Demo App - Optimizely A/B Testing

A demo banking application that mimics the ING interface, built to showcase Optimizely feature flags and A/B testing capabilities.

## Features

This demo app includes several pages with A/B testable features:

### Feature Flags Implemented

1. **Dashboard Layout** (`new_dashboard_layout`)
   - Variables: `layout` (two-column, three-column, sidebar)
   - Tests different dashboard grid layouts

2. **CTA Button Color** (`checkout_button_color`)
   - Variables: `color` (white, green, blue, purple)
   - Tests different call-to-action button colors

3. **Hero Banner Variant** (`hero_banner_variant`)
   - Variables: `variant` (default, gradient, dark), `size` (default, large)
   - Tests different hero banner styles and sizes

4. **Savings Goals** (`show_savings_goals`)
   - Boolean flag to show/hide savings goals feature
   - Tests new feature adoption

5. **Quick Transfer** (`enable_quick_transfer`)
   - Boolean flag to enable quick transfer button
   - Tests simplified transfer workflow

6. **Navigation Style** (`navigation_style`)
   - Variables: `style` (default, compact, bold)
   - Tests different navigation bar styles

### Events Tracked

- `dashboard_view` - When users view the dashboard
- `transfer_completed` - When users complete a transfer
- `savings_goal_created` - When users create a savings goal
- `cta_clicked` - When users click call-to-action buttons
- `page_view` - General page views

## Setup Instructions

### Prerequisites

- Node.js 14+ and npm
- An Optimizely account (free trial available at [optimizely.com](https://www.optimizely.com))

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd ~/Documents/ing-demo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Optimizely**

   a. Go to [Optimizely](https://app.optimizely.com/) and create a new project

   b. Create the following feature flags in your Optimizely project:

   - `new_dashboard_layout` with variable: `layout` (string)
   - `checkout_button_color` with variable: `color` (string)
   - `hero_banner_variant` with variables: `variant` (string), `size` (string)
   - `show_savings_goals` (boolean flag)
   - `enable_quick_transfer` (boolean flag)
   - `navigation_style` with variable: `style` (string)

   c. Create the following events:

   - `dashboard_view`
   - `transfer_completed`
   - `savings_goal_created`
   - `cta_clicked`
   - `page_view`

   d. Get your SDK Key from Settings → Environments → Development

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Optimizely SDK key:
   ```
   REACT_APP_OPTIMIZELY_SDK_KEY=your_actual_sdk_key_here
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000)

## Creating Experiments in Optimizely

### Example: Test Button Colors

1. Go to your Optimizely project
2. Create a new A/B test experiment
3. Select the `checkout_button_color` feature flag
4. Create variations:
   - **Control**: color = "white"
   - **Variation A**: color = "green"
   - **Variation B**: color = "blue"
5. Set your audience and traffic allocation
6. Add the `cta_clicked` event as your primary metric
7. Start the experiment

### Example: Test Dashboard Layout

1. Create a new experiment
2. Select `new_dashboard_layout` feature flag
3. Create variations:
   - **Control**: layout = "two-column"
   - **Variation A**: layout = "three-column"
   - **Variation B**: layout = "sidebar"
4. Add `dashboard_view` and other engagement metrics
5. Start the experiment

## Project Structure

```
ing-demo-app/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Navigation header with flag
│   │   ├── Dashboard.tsx       # Main dashboard with multiple flags
│   │   ├── Accounts.tsx        # Accounts overview page
│   │   ├── Transfer.tsx        # Transfer money page with tracking
│   │   └── Savings.tsx         # Savings products page with tracking
│   ├── styles/
│   │   ├── theme.ts           # ING-inspired color theme
│   │   └── GlobalStyles.ts    # Global CSS styles
│   ├── optimizely.config.ts   # Optimizely configuration
│   └── App.tsx                # Main app with Optimizely provider
├── .env.example               # Environment variables template
└── README.md                  # This file
```

## Using with Opal Custom Tools

This demo app can be integrated with your Opal custom tools for advanced experimentation analysis:

```bash
# Analyze experiment duration
curl -s -u admin:password -X POST http://localhost:3000/tools/experiment-duration-estimator \
  -H "Content-Type: application/json" \
  -d '{
    "dailyTraffic": 50000,
    "baselineConversionRate": 0.15,
    "minimumDetectableEffect": 0.05
  }'

# Check for experiment overlaps
curl -s -u admin:password -X POST http://localhost:3000/tools/experiment-overlap-checker \
  -H "Content-Type: application/json" \
  -d '{
    "experiments": "[{\"id\":\"exp1\",\"name\":\"Button Color Test\",\"audienceSize\":10000,\"trafficAllocation\":50,\"primaryMetric\":\"conversion\",\"affectedPages\":[\"dashboard\"]}]",
    "totalAudienceSize": 10000,
    "overlapTolerance": 20
  }'
```

## Pages Overview

### Home / Dashboard
- Hero banner with CTA button (testable colors)
- Account cards with balances
- Optional savings goals widget
- Optional quick transfer button
- Layout variations

### Accounts
- List of user accounts
- Recent transactions
- Account details

### Transfer
- Transfer money form
- Tracks transfer completion events
- Success feedback

### Savings
- Savings products showcase
- Create savings goals with tracking
- Interest rate information

## Technologies Used

- React 18 with TypeScript
- Optimizely Feature Experimentation SDK
- Optimizely React SDK
- Styled Components for styling
- React Router for navigation

## Demo User

The app uses a hardcoded demo user ID: `demo-user-123`

You can modify this in the components to test different user experiences or bucketing.

## Tips for Demoing

1. **Show Real-Time Flag Changes**: Toggle flags in Optimizely dashboard to see instant updates
2. **Multiple Browser Windows**: Open multiple windows to show different variations
3. **Event Tracking**: Open browser console to see events being sent
4. **Results Dashboard**: Show how metrics accumulate in Optimizely

## Troubleshooting

### App shows default values only
- Verify your SDK key is correct in `.env`
- Check that feature flags exist in Optimizely with matching names
- Ensure the app is running and has restarted after `.env` changes

### Events not tracking
- Check browser console for errors
- Verify events exist in Optimizely with matching names
- Ensure you're clicking on tracked elements

### Build errors
- Delete `node_modules` and run `npm install` again
- Clear npm cache: `npm cache clean --force`

## Next Steps

- Add more pages (loans, investments, credit cards)
- Implement user authentication for real bucketing
- Add more sophisticated tracking
- Integrate with Optimizely's Full Stack or Web SDK
- Deploy to production environment

## License

MIT - This is a demo application for educational purposes.
