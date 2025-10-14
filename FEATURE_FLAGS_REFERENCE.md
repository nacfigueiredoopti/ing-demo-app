# Feature Flags Quick Reference

Use this as a cheat sheet when setting up experiments in Optimizely.

## Flag Definitions

### 1. new_dashboard_layout

**Description**: Tests different dashboard grid layouts

**Type**: Feature flag with variables

**Variables**:
- `layout` (string)
  - `"two-column"` - Default, 2 account cards side by side
  - `"three-column"` - 3 cards with investment account
  - `"sidebar"` - Sidebar layout with main content area

**Where it appears**: Dashboard page

**Use case**: Optimize for user engagement and account visibility

---

### 2. checkout_button_color

**Description**: Tests different CTA button colors

**Type**: Feature flag with variables

**Variables**:
- `color` (string)
  - `"white"` - Default white button with orange text
  - `"green"` - Green button (#00A755)
  - `"blue"` - Blue button (#1976D2)
  - `"purple"` - Purple button (#7B1FA2)

**Where it appears**: Dashboard hero banner "Get Started" button

**Use case**: Optimize for click-through rate

**Tracked event**: `cta_clicked`

---

### 3. hero_banner_variant

**Description**: Tests different hero banner styles and sizes

**Type**: Feature flag with multiple variables

**Variables**:
- `variant` (string)
  - `"default"` - Solid ING orange background
  - `"gradient"` - Orange gradient background
  - `"dark"` - Dark blue/gray background

- `size` (string)
  - `"default"` - 32px title, 48px padding
  - `"large"` - 42px title, 48px padding
  - `"compact"` - 32px title, 32px padding

**Where it appears**: Dashboard hero section

**Use case**: Test visual impact on engagement

**Tracked event**: `cta_clicked`

---

### 4. show_savings_goals

**Description**: Shows or hides the savings goals feature

**Type**: Boolean feature flag

**Values**:
- `true` - Show savings goals widget
- `false` - Hide savings goals widget

**Where it appears**: Dashboard page, below account cards

**Use case**: Feature rollout, measure adoption

**Tracked event**: `savings_goal_created`

---

### 5. enable_quick_transfer

**Description**: Enables quick transfer button on account cards

**Type**: Boolean feature flag

**Values**:
- `true` - Show "Quick Transfer" button on checking account
- `false` - Hide quick transfer button

**Where it appears**: Dashboard page, checking account card

**Use case**: Test simplified transfer flow

---

### 6. navigation_style

**Description**: Tests different navigation bar styles

**Type**: Feature flag with variables

**Variables**:
- `style` (string)
  - `"default"` - Standard spacing and font weight
  - `"compact"` - Tighter spacing, smaller font
  - `"bold"` - Bold font weight, default spacing

**Where it appears**: Header navigation on all pages

**Use case**: Optimize for navigation clarity and usability

---

## Events Reference

### dashboard_view
- **When**: User lands on dashboard page
- **Auto-tracked**: Yes, on page load
- **Use for**: Engagement metrics, experiment exposure

### transfer_completed
- **When**: User successfully submits transfer form
- **Attributes**: `amount`, `fromAccount`, `toAccount`
- **Use for**: Conversion metrics, feature usage

### savings_goal_created
- **When**: User creates a new savings goal
- **Attributes**: `goalName`, `targetAmount`
- **Use for**: Feature adoption, engagement

### cta_clicked
- **When**: User clicks "Get Started" button
- **Attributes**: `buttonColor`, `location`
- **Use for**: Primary conversion metric for button tests

### page_view
- **When**: Navigation between pages
- **Use for**: General engagement metrics

---

## Quick Setup Checklist

In Optimizely, create:

- [ ] Flag: `new_dashboard_layout` with variable `layout` (string)
- [ ] Flag: `checkout_button_color` with variable `color` (string)
- [ ] Flag: `hero_banner_variant` with variables `variant` and `size` (strings)
- [ ] Flag: `show_savings_goals` (boolean)
- [ ] Flag: `enable_quick_transfer` (boolean)
- [ ] Flag: `navigation_style` with variable `style` (string)
- [ ] Event: `dashboard_view`
- [ ] Event: `transfer_completed`
- [ ] Event: `savings_goal_created`
- [ ] Event: `cta_clicked`
- [ ] Event: `page_view`

---

## Example Experiments

### Button Color Test
```
Flag: checkout_button_color
Variations:
  - Control: color = "white"
  - Treatment A: color = "green"
  - Treatment B: color = "blue"
Primary Metric: cta_clicked
Hypothesis: Green button will increase clicks by 10%
```

### Layout Optimization
```
Flag: new_dashboard_layout
Variations:
  - Control: layout = "two-column"
  - Treatment: layout = "three-column"
Primary Metric: dashboard_view (time on page)
Secondary Metric: Account card interactions
Hypothesis: Three-column layout increases engagement
```

### Feature Rollout
```
Flag: show_savings_goals
Type: Rollout
Start: 10% of users
Increment: +10% per day if metrics positive
Primary Metric: savings_goal_created
Secondary Metric: Time on dashboard
Hypothesis: Feature adds value without hurting core metrics
```

---

## Testing Tips

### Force Variations (for QA)
Add to URL: `?optimizely_x=VARIATION_ID`

### Different User Buckets
Change user ID in [App.tsx:23](/Users/nunofigueiredo/Documents/ing-demo-app/src/App.tsx#L23):
```typescript
user={{ id: 'test-user-001' }} // Different users see different variations
```

### View Events in Console
Open DevTools → Network tab → Filter by "optimizely"

### Reset User State
Clear cookies or use incognito mode for fresh bucketing

---

## Variable Value Options Summary

| Flag | Variable | Valid Values |
|------|----------|--------------|
| new_dashboard_layout | layout | "two-column", "three-column", "sidebar" |
| checkout_button_color | color | "white", "green", "blue", "purple" |
| hero_banner_variant | variant | "default", "gradient", "dark" |
| hero_banner_variant | size | "default", "large", "compact" |
| show_savings_goals | (boolean) | true, false |
| enable_quick_transfer | (boolean) | true, false |
| navigation_style | style | "default", "compact", "bold" |

---

**Tip**: Start with simple boolean flags or single-variable tests before combining multiple variables.

**Tip**: Always set up events BEFORE starting experiments so you don't lose data.

**Tip**: Use meaningful variation names in Optimizely (not just "Variation A") for easier reporting.
