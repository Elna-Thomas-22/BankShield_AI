export type UserRole = 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN';

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_id: number;
  email: string;
  full_name: string;
  role: UserRole;
}

export interface Account {
  id: number;
  account_number: string;
  account_type: string;
  is_primary: boolean;
  balance: number;
  currency: string;
  status: string;
  maturity_date?: string;
  created_at: string;
}

export interface KYCDocument {
  id: number;
  document_type: string;
  document_name: string;
  file_url: string;
  status: string;
  uploaded_at: string;
}

export interface Application {
  id: number;
  reference_no: string;
  account_type: string;
  status: 'Pending' | 'KYC Pending' | 'Under Review' | 'Approved' | 'Rejected';
  submitted_on: string;
  notes?: string;
  personal_info?: any;
  address_info?: any;
  documents: KYCDocument[];
}

export interface Transaction {
  id: number;
  transaction_id: string;
  account_id: number;
  customer_id: number;
  amount: number;
  currency: string;
  transaction_type: string;
  counterparty?: string;
  location?: string;
  device_info?: string;
  ip_address?: string;
  timestamp: string;
  risk_score: number;
  fraud_probability: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  is_fraud_predicted: boolean;
}

export interface FraudPrediction {
  transaction_id: string;
  fraud_probability: number;
  risk_score: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  prediction: 'LEGITIMATE' | 'FRAUD';
  timestamp: string;
  feature_contributions?: Record<string, string>;
}

export interface FraudAlert {
  id: number;
  alert_code: string;
  transaction_id: number;
  customer_name: string;
  account_number: string;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  fraud_probability: number;
  alert_type: string;
  status: 'New' | 'Reviewing' | 'Confirmed Fraud' | 'False Positive' | 'Resolved';
  assigned_employee: string;
  created_at: string;
}

export interface FraudCase {
  id: number;
  case_number: string;
  title: string;
  customer_id: number;
  account_number: string;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'Open' | 'Under Investigation' | 'Resolved Fraud' | 'Resolved Cleared' | 'Closed';
  assigned_employee: string;
  notes?: string;
  evidence_details?: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeeDashboardKPIs {
  total_customers: number;
  new_applications: number;
  pending_applications: number;
  approved_applications: number;
  rejected_applications: number;
  suspicious_accounts: number;
  fraud_alerts: number;
  fraud_cases: number;
  high_risk_accounts: number;
  total_detected_fraud_amount: number;
}

export interface CustomerDashboardSummary {
  total_accounts: number;
  total_balance: number;
  fixed_deposits_balance: number;
  interest_earned_ytd: number;
  recent_transactions: Transaction[];
  accounts: Account[];
}

export interface AuditLog {
  id: number;
  user_email: string;
  user_role: string;
  action: string;
  resource: string;
  details?: string;
  ip_address?: string;
  timestamp: string;
}
