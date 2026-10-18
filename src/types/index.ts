export type Language = 'hi' | 'en';

export type TabType = 'home' | 'earning-path' | 'business-ideas' | 'wfh-guide' | 'expense-tracker' | 'action-plan' | 'scam-alert';

export interface UserProfile {
  age: string;
  state: string;
  areaType: 'rural' | 'semi-urban' | 'urban';
  education: string;
  skills: string[];
  customSkills?: string;
  budget: string;
  hoursPerDay: string;
  equipment: string[];
  preferredMode: string;
}

export interface ActionPlanItem {
  day: number;
  title: string;
  description: string;
  type: 'learning' | 'earning';
  completed?: boolean;
}

export interface EarningOpportunity {
  id: string;
  title: string;
  category: string;
  summary: string;
  realisticMonthlyRange: string;
  startupCost: string;
  requiredSkills: string[];
  stepByStep: string[];
  potentialChallenges: string[];
  verificationTips: string;
  sevenDayActionPlan: ActionPlanItem[];
}

export interface CostBreakdownItem {
  item: string;
  cost: string;
}

export interface BusinessIdea {
  id: string;
  name: string;
  tag: string;
  investmentRange: string;
  profitMargin: string;
  category: 'food' | 'service' | 'craft' | 'agri' | 'digital';
  locationSuitability: ('rural' | 'semi-urban' | 'urban')[];
  breakdownOfCosts: CostBreakdownItem[];
  requiredResources: string[];
  demandValidation: string;
  businessRisks: string[];
  licenseNeeded: string;
  firstMonthRoadmap: string[];
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  note: string;
}

export interface SavingsGoal {
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
}

export interface PersonalTask {
  id: string;
  opportunityTitle?: string;
  dayNumber?: number;
  title: string;
  description: string;
  type: 'learning' | 'earning';
  isCompleted: boolean;
  dateAdded: string;
}

export interface ScamCheckResult {
  riskLevel: 'Safe' | 'Moderate Risk' | 'High Risk (Scam Alert)' | string;
  isLikelyScam: boolean;
  explanation: string;
  redFlags: string[];
  recommendedAction: string;
  goldenRule?: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  loginMethod: 'mobile' | 'google';
  identifier: string; // Phone number or Google email
  avatarUrl?: string;
  state?: string;
  createdAt: string;
}

