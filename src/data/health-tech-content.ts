/* ------------------------------------------------------------------ */
/*  Health Tech case study content — markdown-based, editable          */
/* ------------------------------------------------------------------ */

import { splitSections } from './presentation-content';

const STORAGE_KEY = 'ht-presentation-content';

/* ------------------------------------------------------------------ */
/*  Default markdown                                                    */
/* ------------------------------------------------------------------ */

export const healthTechDefaultMarkdown = `---ht-title---
# The 73% Problem
## Data-Driven Growth Strategy for Senior Healthcare AI
A case study in analytics-driven product strategy
Don Hogan | Principal PM, Growth | November 2025

---ht-situation---
# The Situation
A Medicare-focused AI health coaching app for patients 65+ was struggling with engagement. The app paired an AI health coach with care plans to help seniors manage chronic conditions, but users weren't sticking around.
- **DAU/MAU: 2.3%**: Only 84 of 3,695 monthly users returned daily. The Q4 target was 13% (a 5.7x improvement needed).
- **D1 Retention: 10-15%**: 85-90% of new users never came back after Day 1. Industry benchmark for health apps is 28% at the 50th percentile.
- **Plan Adoption: 16.5%**: Only 196 of 1,190 app opens resulted in a care plan, the product's core value.
> The app wasn't habit-forming because it wasn't onboarding users. There was no answer for "Why should I come back tomorrow?"

---ht-funnel---
# The Activation Funnel
16.5% total activation rate. 83.5% of users lost before experiencing core value.
| 1,190 | App Opens |
| 645 | Logins (54.2%) |
| 537 | Threads Created |
| 433 | Messages Sent |
| 196 | Plans Created (16.5%) |
- **45.8% drop-off at login**: Registration friction for 65+ users unfamiliar with account creation. Median time to login: 79 seconds.
- **54.7% drop-off at plan creation**: Of users who messaged, only 45% created a plan. Median time to plan: 5+ minutes of effort.
- **The hard truth**: The direction had been "get a plan made, build a checklist" and that's it. Users were left to figure out what's next.

---ht-releases---
# Feature Releases & Metric Correlation
Not all product changes helped. Some actively hurt retention.
- **Oct 14: View Plan button moved to top right**: D1 retention likely decreased. Visibility matters; don't hide the core value prop.
- **Sep 16: New navigation default**: Positive uptick in DAU metrics after removing feature flag.
- **Oct 28: Mobile tab bar updates**: Positive impact on engagement after improving navigation.
- **Registration optimization (A/B tests)**: Zero impact on D1 retention. Problem wasn't registration, it was value delivery speed.
> Highlighting which releases correlated with metric changes turned "what happened?" into actionable product intelligence.

---ht-foundation---
# Building the Analytics Foundation
The product had data, but no insights. I built the instrumentation layer from scratch.
- **72 PostHog insights**: Created in 12 days, spanning acquisition funnels, retention cohorts, and engagement depth.
- **6+ SQL queries**: Custom analysis for time-to-value latency, bimodal distribution detection, and funnel step correlation.
- **8 cohort definitions**: Segmenting users by plan creation, message behavior, activity completion, and notification status.
- **4 custom funnels**: Mapping the full journey from app open to retained user.
| 72 | PostHog Insights |
| 12 | Days to Build |
| 6+ | SQL Queries |
| 8 | User Cohorts |

---ht-signal---
# The 97.5% Signal
Deep in the retention data, one cohort stood out with near-perfect retention.
Plan creation wasn't just a feature. It was the entire product.
- **Plan creators: 97.5% D1-D7 retention**: Users who created a plan almost always came back. Compared to 15-25% for the general population.
- **Messagers only: 89% D1-D7 retention**: Engaged but not activated. The plan was the activation threshold.
- **General population: 10-15% D1 retention**: Without the plan, users had no reason to return.
> Plan creation was the activation event. Every percentage point of plan adoption directly drove retention and revenue.

---ht-time-to-value---
# Time-to-Value Analysis
The data revealed two distinct user segments hiding in the averages.
- **Fast movers (median: 8 min)**: Got to a plan quickly, retained at high rates. They "got it" immediately.
- **Strugglers (average: 47 min)**: Getting lost in the flow, not failing. 6.1x gap between median and average time from message to plan.
- **The bimodal reality**: Averages masked two very different experiences. Fast movers needed nothing; strugglers needed guided paths.
| 8 min | Median (fast movers) |
| 47 min | Average (strugglers) |
| 6.1x | Gap ratio |
> The problem wasn't that the app was broken. It was that struggling users had no guardrails to guide them to value.

---ht-mental-models---
# Five Mental Models Blocking Adoption
User research and data analysis revealed why 65+ users weren't completing plans.
- **"I'm just browsing" (30%)**: Users wanted to evaluate before committing. Solution: show value before asking for commitment.
- **"I need doctor permission" (25%)**: Seniors defer to physicians on health tools. Solution: reinforce the provider referral and trust signals.
- **"I'll fail again" (20%)**: Prior app failures created learned helplessness. Solution: start with micro-goals and celebrate early wins.
- **"What does this do?" (15%)**: Plan vs. chat distinction was unclear. Solution: preview the plan before creating it.
- **"Too much to think about" (10%)**: Cognitive overload for complex health decisions. Solution: reduce choices, increase progressive disclosure.
> Understanding "I need doctor permission" beats A/B testing button colors. Mental models reveal the real barriers.

---ht-framework---
# The Strategic Framework
Structured the analysis using Desires, Goals, Problems, Solutions, Impact to create a clear chain from business outcomes to tactical execution.
- **Desires**: Nail long-term retention for doctors (APCM adoption), investors (PMF proof), and board (high-value logos).
- **Goals**: DAU/MAU to 13%, D1 retention to 25%+, plan adoption to 50%, daily use case for 40% of users.
- **Problems**: Poor D1 retention (root cause), low plan adoption (gate), no daily use case (Medicare is episodic).
- **Solutions**: Four-component activation journey targeting Day 0 to Day 1 transition.
> Retention unlocks everything: investor confidence, enterprise logos, market leadership. Everything else is secondary.

---ht-initiatives---
# P0 Initiatives
Four components designed to work together as a Day 0 to Day 1 activation journey.
- **Chat-First Onboarding**: Let users experience value before registration. "Spend 3 minutes with me, I'll make you a health plan." Expected: activation rate 16.5% to 30%.
- **Instant Plan Preview**: Pre-built templates for common conditions. Show value in first 3 messages. One-tap acceptance vs. complex builder. Expected: plan creation 45% to 75%.
- **7 Days of Healthy Email**: Daily educational emails bridging the intention-action gap. Day 0: Welcome. Day 4: "Questions you can ask Healthy you can't ask your doctor." Expected: 40% open rate.
- **Agent-Prompted Notifications**: Ask for notification permission at peak commitment (right after plan creation). "Would you like me to remind you tomorrow?" Expected: 70% permission grant rate.

---ht-not-build---
# What NOT to Build
Prioritization discipline means saying no to good ideas at the wrong time.
- **Registration optimization**: Already A/B tested, zero impact on D1 retention. The problem was value delivery speed, not registration friction.
- **Programs feature**: Great concept, but without baseline retention, an unknown feature won't move the needle. Revisit after DAU/MAU exceeds 13%.
- **Weekly Wins**: Sounds compelling but no data to support impact. A hunch isn't a strategy.
- **Plan quality improvements**: Not enough data to evaluate what makes a plan qualitatively good beyond anecdotal feedback. Volume first, then quality.
> "Better to ship 1 high-impact solution than 5 low-impact features." Fast Track to Value at 12 engineer-weeks beats activity tweaks at 2 engineer-weeks.

---ht-waterfall---
# The Impact Model
Cumulative impact projection using conservative estimates for each initiative.
| 2.3% | Baseline DAU/MAU |
| 5.5% | + Chat-First Onboarding |
| 8.3% | + Live Plan Preview |
| 12.5% | + Daily Check-in Habit |
| 15.0% | + Guided Conversations |
- **6.5x improvement**: From 2.3% to projected 15% DAU/MAU through compounding effects.
- **Conservative assumptions**: Each initiative modeled independently with 50-70% confidence levels, then validated against industry benchmarks.
- **Phased execution**: Quick wins first (guided conversations, plan preview), then activation optimization, then retention loops.

---ht-business---
# Business Impact
Every percentage point of retention translates directly to revenue and enterprise sales.
- **Revenue projection**: From ~$4K/month (80 engaged users) to $28K/month (555 engaged users at $50/patient APCM reimbursement).
- **For physicians**: "60% of patients integrate Healthy into daily life" is the pitch that closes enterprise deals.
- **For investors**: 40% D1 retention demonstrates product-market fit. The current 10-15% is a red flag; the target turns it into a funding story.
- **Unit economics**: 3x longer retention equals 3x lifetime value equals positive payback period.
| $4K | Current Monthly Revenue |
| $28K | Projected Monthly Revenue |
| 7x | Revenue Multiplier |
| $50 | APCM Per Patient/Month |

---ht-deliverables---
# What I Delivered
One-month contract engagement as Principal PM for Growth.
- **Analytics infrastructure**: 72 PostHog insights, SQL query library, 8 cohort definitions, 4 custom funnels built from scratch.
- **Strategic framework**: Desires to Goals to Problems to Solutions to Impact analysis, connecting metrics to business outcomes.
- **16 product briefs**: Each with hypothesis, implementation spec, expected impact projection, and success metrics.
- **Growth model**: 6.5x DAU/MAU improvement roadmap (2.3% to 15%) with phased execution plan and resource estimates.
- **Retention playbook**: Root cause analysis, feature release correlation, "what not to build" recommendations.
| 72 | PostHog Insights |
| 16 | Product Briefs |
| 6.5x | Projected Improvement |
| 1 | Month |

---ht-learnings---
# Key Learnings
Three principles that emerged from the data.
- **Find your 97.5% cohort**: Near-perfect retention exists somewhere in your data. Find it, understand it, grow it. Plan creators were our hidden signal.
- **Mental models beat features**: Understanding "I need doctor permission" reveals more than A/B testing button colors. User psychology drives adoption, not UI polish.
- **Design for reality**: 76% of 65+ users have smartphones, 32% have tablets. Competitors designed for tablets. I designed for phones, 48pt touch targets, and 6th-grade reading level.
> Speed to value beats feature richness. The app wasn't broken. Users just couldn't find the value fast enough.

---ht-closing---
This case study was built with the same tools used to build this portfolio.
Analytics drove the strategy. Strategy shaped the roadmap. The data told the story.
Don Hogan | donhogan.com | Principal PM, Growth
`;

/* ------------------------------------------------------------------ */
/*  localStorage read/write                                             */
/* ------------------------------------------------------------------ */

export function getHealthTechMarkdown(): string {
  if (typeof window === 'undefined') return healthTechDefaultMarkdown;
  return localStorage.getItem(STORAGE_KEY) || healthTechDefaultMarkdown;
}

export function setHealthTechMarkdown(markdown: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, markdown);
}

export function clearHealthTechMarkdown(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getHealthTechSections(): Record<string, string> {
  return splitSections(getHealthTechMarkdown());
}
