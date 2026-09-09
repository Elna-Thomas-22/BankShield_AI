from datetime import datetime
from typing import List, Optional, Any, Dict
from pydantic import BaseModel, EmailStr

# Auth Schemas
class UserLogin(BaseModel):
    email: EmailStr
    password: str
    portal: Optional[str] = "customer" # "customer" or "employee"

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    email: str
    full_name: str
    role: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    created_at: datetime

    class Config:
        from_attributes = True

# Account Schemas
class AccountResponse(BaseModel):
    id: int
    account_number: str
    account_type: str
    is_primary: bool
    balance: float
    currency: str
    status: str
    maturity_date: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# KYC Document Schemas
class KYCDocumentResponse(BaseModel):
    id: int
    document_type: str
    document_name: str
    file_url: str
    status: str
    uploaded_at: datetime

    class Config:
        from_attributes = True

# Application Schemas
class AccountApplicationCreate(BaseModel):
    account_type: str
    personal_details: Dict[str, Any]
    address_details: Dict[str, Any]

class ApplicationResponse(BaseModel):
    id: int
    reference_no: str
    account_type: str
    status: str
    submitted_on: datetime
    notes: Optional[str] = None
    personal_info: Optional[Dict[str, Any]] = None
    address_info: Optional[Dict[str, Any]] = None
    documents: List[KYCDocumentResponse] = []

    class Config:
        from_attributes = True

# Transaction Schemas
class TransactionResponse(BaseModel):
    id: int
    transaction_id: str
    account_id: int
    customer_id: int
    amount: float
    currency: str
    transaction_type: str
    counterparty: Optional[str] = None
    location: Optional[str] = None
    device_info: Optional[str] = None
    ip_address: Optional[str] = None
    timestamp: datetime
    risk_score: int
    fraud_probability: float
    risk_level: str
    is_fraud_predicted: bool

    class Config:
        from_attributes = True

class FraudPredictionRequest(BaseModel):
    transaction_id: Optional[str] = None
    account_number: Optional[str] = None
    amount: float
    transaction_type: str
    location: Optional[str] = "Mumbai, IN"
    device_info: Optional[str] = "Mobile App (iOS)"
    ip_address: Optional[str] = "182.72.11.45"
    velocity_count_24h: Optional[int] = 3
    is_foreign_transaction: Optional[bool] = False

class FraudPredictionResponse(BaseModel):
    transaction_id: str
    fraud_probability: float
    risk_score: int
    risk_level: str
    prediction: str
    timestamp: datetime
    feature_contributions: Optional[Dict[str, Any]] = None

# Fraud Alert Schemas
class FraudAlertResponse(BaseModel):
    id: int
    alert_code: str
    transaction_id: int
    customer_name: str
    account_number: str
    risk_level: str
    fraud_probability: float
    alert_type: str
    status: str
    assigned_employee: str
    created_at: datetime

    class Config:
        from_attributes = True

class FraudAlertUpdateStatus(BaseModel):
    status: str
    assigned_employee: Optional[str] = None

# Fraud Case Schemas
class FraudCaseCreate(BaseModel):
    title: str
    customer_id: int
    account_number: str
    risk_level: str
    assigned_employee: Optional[str] = "Admin Security"
    notes: Optional[str] = None
    evidence_details: Optional[str] = None

class FraudCaseResponse(BaseModel):
    id: int
    case_number: str
    title: str
    customer_id: int
    account_number: str
    risk_level: str
    status: str
    assigned_employee: str
    notes: Optional[str] = None
    evidence_details: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class FraudCaseUpdateStatus(BaseModel):
    status: str
    notes: Optional[str] = None

# Dashboard KPIs
class EmployeeDashboardKPIs(BaseModel):
    total_customers: int
    new_applications: int
    pending_applications: int
    approved_applications: int
    rejected_applications: int
    suspicious_accounts: int
    fraud_alerts: int
    fraud_cases: int
    high_risk_accounts: int
    total_detected_fraud_amount: float

class CustomerDashboardSummary(BaseModel):
    total_accounts: int
    total_balance: float
    fixed_deposits_balance: float
    interest_earned_ytd: float
    recent_transactions: List[TransactionResponse] = []
    accounts: List[AccountResponse] = []

# Audit Log Schemas
class AuditLogResponse(BaseModel):
    id: int
    user_email: str
    user_role: str
    action: str
    resource: str
    details: Optional[str] = None
    ip_address: Optional[str] = None
    timestamp: datetime

    class Config:
        from_attributes = True
