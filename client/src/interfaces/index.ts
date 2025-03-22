// User interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Authentication interfaces
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Credit report interfaces
export interface CreditFactor {
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

export interface CreditAccount {
  id: string;
  name: string;
  type: string;
  balance: number;
  creditLimit?: number;
  paymentStatus: string;
  lastReported: string;
}

export interface CreditProfile {
  id: string;
  userId: string;
  bureau: string;
  score: number;
  lastUpdated: string;
}

export interface CreditReport extends CreditProfile {
  factors: CreditFactor[];
  accounts: CreditAccount[];
}

export interface CreditHistoryPoint {
  date: string;
  score: number;
}

export interface CreditHistory {
  bureau: string;
  history: CreditHistoryPoint[];
}

// Recommendation interfaces
export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'utilization' | 'payment' | 'accounts' | 'inquiries' | 'other';
  actionItems: string[];
}

// Dispute interfaces
export interface Dispute {
  id: string;
  userId: string;
  reportId: string;
  itemId: string;
  reason: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  submittedDate: string;
  resolutionDate?: string;
  resolutionDetails?: string;
}

// Notification interfaces
export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  pushNotifications: boolean;
  scoreChanges: boolean;
  reportUpdates: boolean;
  promotionalOffers: boolean;
}

// Security interfaces
export interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  passwordExpiryDays: number;
  loginAttempts: number;
  lastLoginIp: string;
  lastLoginTimestamp: string;
}

// Activity Log interfaces
export interface ActivityLogEntry {
  id: string;
  userId: string;
  action: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Bureau connection interfaces
export interface BureauConnection {
  bureau: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  error?: string;
}

// API response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Component prop interfaces
export interface CreditScoreCardProps {
  bureau: string;
  score: number;
  lastUpdated: string;
  onClick?: () => void;
}

export interface DetailedReportProps {
  report: CreditReport;
}

export interface ProfileFormProps {
  onUpdateSuccess?: () => void;
}

export interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export interface RegisterFormProps {
  onRegisterSuccess?: () => void;
} 