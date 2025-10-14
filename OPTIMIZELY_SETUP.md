# Optimizely Setup Guide for ING Demo App

This guide will walk you through setting up Optimizely for the ING Demo App step by step.

## Step 1: Create an Optimizely Account

1. Go to [https://www.optimizely.com/](https://www.optimizely.com/)
2. Sign up for a free trial account
3. Choose "Feature Experimentation" as your product

## Step 2: Create a New Project

1. After logging in, click "Create New Project"
2. Name it "ING Demo App"
3. Select "Feature Experimentation"
4. Click "Create Project"

## Step 3: Create Feature Flags

Navigate to "Flags" in the left sidebar and create the following feature flags:

### Flag 1: new_dashboard_layout
- **Flag Key**: `new_dashboard_layout`
- **Name**: Dashboard Layout
- **Description**: Tests different dashboard grid layouts
- **Variables**:
  - Key: `layout`
  - Type: String
  - Default Value: `two-column`

### Flag 2: checkout_button_color
- **Flag Key**: `checkout_button_color`
- **Name**: CTA Button Color
- **Description**: Tests different call-to-action button colors
- **Variables**:
  - Key: `color`
  - Type: String
  - Default Value: `white`

### Flag 3: hero_banner_variant
- **Flag Key**: `hero_banner_variant`
- **Name**: Hero Banner Variant
- **Description**: Tests different hero banner styles
- **Variables**:
  - Key: `variant`, Type: String, Default: `default`
  - Key: `size`, Type: String, Default: `default`

### Flag 4: show_savings_goals
- **Flag Key**: `show_savings_goals`
- **Name**: Show Savings Goals
- **Description**: Shows or hides the savings goals feature
- **Type**: Boolean flag (no variables needed)

### Flag 5: enable_quick_transfer
- **Flag Key**: `enable_quick_transfer`
- **Name**: Enable Quick Transfer
- **Description**: Enables quick transfer button on account cards
- **Type**: Boolean flag (no variables needed)

### Flag 6: navigation_style
- **Flag Key**: `navigation_style`
- **Name**: Navigation Style
- **Description**: Tests different navigation bar styles
- **Variables**:
  - Key: `style`
  - Type: String
  - Default Value: `default`

## Step 4: Create Events

Navigate to "Events" in the left sidebar and create these events:

1. **dashboard_view**
   - Event Key: `dashboard_view`
   - Description: When users view the dashboard

2. **transfer_completed**
   - Event Key: `transfer_completed`
   - Description: When users complete a transfer

3. **savings_goal_created**
   - Event Key: `savings_goal_created`
   - Description: When users create a savings goal

4. **cta_clicked**
   - Event Key: `cta_clicked`
   - Description: When users click call-to-action buttons

5. **page_view**
   - Event Key: `page_view`
   - Description: General page views

## Step 5: Get Your SDK Key

1. Go to "Settings" → "Environments"
2. Select "Development" environment
3. Copy the SDK Key (it will look like: `ABC123xyz...`)
4. Keep this handy for the next step

## Step 6: Configure the App

1. In your terminal, navigate to the project:
   ```bash
   cd ~/Documents/ing-demo-app
   ```

2. Copy the environment example file:
   ```bash
   cp .env.example .env
   ```

3. Open `.env` in your editor and paste your SDK key:
   ```
   REACT_APP_OPTIMIZELY_SDK_KEY=YOUR_SDK_KEY_HERE
   ```

4. Save the file

## Step 7: Create Your First Experiment

Let's create a simple button color test:

1. In Optimizely, go to "Experiments"
2. Click "Create New" → "A/B Test"
3. Name: "CTA Button Color Test"
4. Select the `checkout_button_color` flag
5. Create variations:
   - **Control**:
     - Variable `color` = `white`
   - **Green Button**:
     - Variable `color` = `green`
   - **Blue Button**:
     - Variable `color` = `blue`

6. **Traffic Allocation**: 100% (for demo purposes)
7. **Audience**: Everyone (default)
8. **Primary Metric**: `cta_clicked` event
9. Click "Start Experiment"

## Step 8: Test the App

1. Start the development server:
   ```bash
   npm start
   ```

2. The app will open at [http://localhost:3000](http://localhost:3000)

3. Click the "Get Started" button on the dashboard - the color should match your experiment variation

4. Open the browser console (F12) to see Optimizely events being tracked

5. Go to Optimizely dashboard and check "Results" to see the events coming in

## Step 9: Create More Experiments

### Dashboard Layout Test

1. Create new experiment: "Dashboard Layout Test"
2. Use `new_dashboard_layout` flag
3. Variations:
   - Control: `layout` = `two-column`
   - Variation A: `layout` = `three-column`
   - Variation B: `layout` = `sidebar`
4. Primary metric: `dashboard_view`

### Hero Banner Test

1. Create new experiment: "Hero Banner Variant Test"
2. Use `hero_banner_variant` flag
3. Variations:
   - Control: `variant` = `default`, `size` = `default`
   - Gradient: `variant` = `gradient`, `size` = `large`
   - Dark: `variant` = `dark`, `size` = `default`
4. Primary metric: `cta_clicked`

### Feature Rollout: Savings Goals

1. Create a "Feature Rollout"
2. Select `show_savings_goals` flag
3. Start with 10% of users
4. Gradually increase to 100% based on metrics

## Testing Tips

### Test Different Users
To simulate different users seeing different variations:

1. Open multiple incognito/private browser windows
2. Or clear cookies between tests
3. Or modify the user ID in [App.tsx:23](/Users/nunofigueiredo/Documents/ing-demo-app/src/App.tsx#L23):
   ```typescript
   user={{ id: 'user-001' }} // Change this ID
   ```

### Real-Time Flag Changes
1. Toggle flags on/off in Optimizely dashboard
2. Refresh your app to see changes instantly
3. Great for live demos!

### Monitor Events
1. Open browser DevTools (F12)
2. Go to Network tab
3. Filter by "optimizely"
4. Watch events being sent as you interact with the app

## Advanced Setup (Optional)

### Custom Audiences
Create audiences in Optimizely to target specific users:
- Geographic location
- Device type (mobile vs desktop)
- Custom attributes
- Behavioral targeting

### Mutual Exclusion Groups
Prevent users from being in multiple experiments:
1. Create a Mutual Exclusion Group
2. Add related experiments to the group
3. Users will only see one experiment from the group

### QA Mode
Force yourself into a specific variation for testing:
1. Add `?optimizely_x=VARIATION_ID` to URL
2. Or use Optimizely browser extension

## Troubleshooting

### Flag not working
- Check SDK key is correct in `.env`
- Verify flag name matches exactly (case-sensitive)
- Ensure experiment is "Running" in Optimizely
- Check browser console for errors

### Events not tracking
- Verify event names match exactly
- Check network tab for failed requests
- Ensure user ID is set correctly
- Look for JavaScript errors in console

### Changes not reflecting
- Restart the development server after changing `.env`
- Clear browser cache
- Check Optimizely datafile is loading (Network tab)

## Resources

- [Optimizely React SDK Docs](https://docs.developers.optimizely.com/feature-experimentation/docs/react-sdk)
- [Feature Flag Best Practices](https://docs.developers.optimizely.com/feature-experimentation/docs/feature-flags)
- [A/B Test Design Guide](https://www.optimizely.com/optimization-glossary/ab-testing/)

## Support

If you encounter issues:
1. Check the [README.md](README.md) troubleshooting section
2. Review Optimizely documentation
3. Check browser console for errors
4. Verify all configuration steps were completed

---

Happy experimenting!
