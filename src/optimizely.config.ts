// Optimizely Configuration
// Replace with your actual Optimizely SDK key

export const optimizelyConfig = {
  sdkKey: process.env.REACT_APP_OPTIMIZELY_SDK_KEY || 'YOUR_OPTIMIZELY_SDK_KEY',
  // Optional: Add datafile URL for faster initialization
  // datafileOptions: {
  //   urlTemplate: 'https://cdn.optimizely.com/datafiles/%s.json',
  //   autoUpdate: true,
  //   updateInterval: 5000
  // }
};

// Feature flags used in the demo
export const FeatureFlags = {
  NEW_DASHBOARD_LAYOUT: 'new_dashboard_layout',
  CHECKOUT_BUTTON_COLOR: 'checkout_button_color',
  SHOW_SAVINGS_GOALS: 'show_savings_goals',
  ENABLE_QUICK_TRANSFER: 'enable_quick_transfer',
  HERO_BANNER_VARIANT: 'hero_banner_variant',
  NAVIGATION_STYLE: 'navigation_style',
} as const;

// Experiment events
export const Events = {
  DASHBOARD_VIEW: 'dashboard_view',
  TRANSFER_COMPLETED: 'transfer_completed',
  SAVINGS_GOAL_CREATED: 'savings_goal_created',
  CTA_CLICKED: 'cta_clicked',
  PAGE_VIEW: 'page_view',
} as const;
