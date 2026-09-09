import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Enum, ForeignKey, Text, Boolean, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base

class UserRole(str, enum.Enum):
    CUSTOMER = "CUSTOMER"
    EMPLOYEE = "EMPLOYEE"
    ADMIN = "ADMIN"

class AccountType(str, enum.Enum):
    SAVINGS = "Savings Account"
    CURRENT = "Current Account"
    FIXED_DEPOSIT = "Fixed Deposit"
    NRI = "NRI Account"

class ApplicationStatus(str, enum.Enum):
    PENDING = "Pending"
    KYC_PENDING = "KYC Pending"
    UNDER_REVIEW = "Under Review"
    APPROVED = "Approved"
    REJECTED = "Rejected"

class KYCStatus(str, enum.Enum):
    NOT_SUBMITTED = "Not Submitted"
    PENDING = "Pending"
    VERIFIED = "Verified"
    REJECTED = "Rejected"

class RiskLevel(str, enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class PredictionResult(str, enum.Enum):
    LEGITIMATE = "LEGITIMATE"
    FRAUD = "FRAUD"

class AlertStatus(str, enum.Enum):
    NEW = "New"
    REVIEWING = "Reviewing"
    CONFIRMED_FRAUD = "Confirmed Fraud"
    FALSE_POSITIVE = "False Positive"
    RESOLVED = "Resolved"

class CaseStatus(str, enum.Enum):
    OPEN = "Open"
    UNDER_INVESTIGATION = "Under Investigation"
    RESOLVED_FRAUD = "Resolved Fraud"
    RESOLVED_CLEARED = "Resolved Cleared"
    CLOSED = "Closed"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.CUSTOMER, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    customer_profile = relationship("Customer", back_populates="user", uselist=False)
    audit_logs = relationship("AuditLog", back_populates="user")

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True)
    phone = Column(String, nullable=True)
    address = Column(Text, nullable=True)
    city = Column(String, nullable=True)
    state = Column(String, nullable=True)
    zip_code = Column(String, nullable=True)
    kyc_status = Column(Enum(KYCStatus), default=KYCStatus.PENDING)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="customer_profile")
    accounts = relationship("Account", back_populates="customer")
    applications = relationship("Application", back_populates="customer")

class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    account_number = Column(String, unique=True, index=True, nullable=False)
    account_type = Column(String, nullable=False)  # Savings Account, Current Account, etc.
    is_primary = Column(Boolean, default=False)
    balance = Column(Float, default=0.0)
    currency = Column(String, default="INR")
    status = Column(String, default="Active")
    maturity_date = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    customer = relationship("Customer", back_populates="accounts")
    transactions = relationship("Transaction", back_populates="account")

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    reference_no = Column(String, unique=True, index=True, nullable=False) # e.g. BSAI-ACC-2025-05-31-000123
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    account_type = Column(String, nullable=False)
    status = Column(Enum(ApplicationStatus), default=ApplicationStatus.KYC_PENDING)
    submitted_on = Column(DateTime, default=datetime.utcnow)
    notes = Column(Text, nullable=True)
    
    # Form step data stored as JSON or fields
    personal_info = Column(JSON, nullable=True)
    address_info = Column(JSON, nullable=True)

    customer = relationship("Customer", back_populates="applications")
    documents = relationship("KYCDocument", back_populates="application")

class KYCDocument(Base):
    __tablename__ = "kyc_documents"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=True)
    document_type = Column(String, nullable=False) # Identity Proof, Address Proof, PAN Card, Selfie
    document_name = Column(String, nullable=False) # e.g. Aadhaar_Card.pdf
    file_url = Column(String, nullable=False)
    status = Column(String, default="Uploaded")
    uploaded_at = Column(DateTime, default=datetime.utcnow)

    application = relationship("Application", back_populates="documents")

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    transaction_id = Column(String, unique=True, index=True, nullable=False)
    account_id = Column(Integer, ForeignKey("accounts.id"), nullable=False)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(String, default="INR")
    transaction_type = Column(String, nullable=False) # Transfer, Withdrawal, Online Purchase, Payment
    counterparty = Column(String, nullable=True)
    location = Column(String, nullable=True)
    device_info = Column(String, nullable=True)
    ip_address = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    risk_score = Column(Integer, default=0) # 0 to 100
    fraud_probability = Column(Float, default=0.0) # 0.0 to 1.0
    risk_level = Column(Enum(RiskLevel), default=RiskLevel.LOW)
    is_fraud_predicted = Column(Boolean, default=False)

    account = relationship("Account", back_populates="transactions")
    prediction = relationship("FraudPrediction", back_populates="transaction", uselist=False)
    alert = relationship("FraudAlert", back_populates="transaction", uselist=False)

class FraudPrediction(Base):
    __tablename__ = "fraud_predictions"

    id = Column(Integer, primary_key=True, index=True)
    transaction_id = Column(Integer, ForeignKey("transactions.id"), nullable=False, unique=True)
    risk_score = Column(Integer, nullable=False)
    fraud_probability = Column(Float, nullable=False)
    risk_level = Column(Enum(RiskLevel), nullable=False)
    prediction = Column(Enum(PredictionResult), nullable=False)
    features_json = Column(JSON, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

    transaction = relationship("Transaction", back_populates="prediction")

class FraudAlert(Base):
    __tablename__ = "fraud_alerts"

    id = Column(Integer, primary_key=True, index=True)
    alert_code = Column(String, unique=True, index=True, nullable=False)
    transaction_id = Column(Integer, ForeignKey("transactions.id"), nullable=False, unique=True)
    customer_name = Column(String, nullable=False)
    account_number = Column(String, nullable=False)
    risk_level = Column(Enum(RiskLevel), nullable=False)
    fraud_probability = Column(Float, nullable=False)
    alert_type = Column(String, nullable=False) # High Amount Velocity, Suspicious IP, Device Anomaly
    status = Column(Enum(AlertStatus), default=AlertStatus.NEW)
    assigned_employee = Column(String, default="Unassigned")
    created_at = Column(DateTime, default=datetime.utcnow)

    transaction = relationship("Transaction", back_populates="alert")

class FraudCase(Base):
    __tablename__ = "fraud_cases"

    id = Column(Integer, primary_key=True, index=True)
    case_number = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    account_number = Column(String, nullable=False)
    risk_level = Column(Enum(RiskLevel), nullable=False)
    status = Column(Enum(CaseStatus), default=CaseStatus.OPEN)
    assigned_employee = Column(String, default="Admin Security")
    notes = Column(Text, nullable=True)
    evidence_details = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user_email = Column(String, nullable=False)
    user_role = Column(String, nullable=False)
    action = Column(String, nullable=False)
    resource = Column(String, nullable=False)
    details = Column(Text, nullable=True)
    ip_address = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="audit_logs")
