import datetime
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.core.security import get_password_hash
from app.models.models import (
    User, UserRole, Customer, Account, Application, ApplicationStatus,
    KYCDocument, Transaction, FraudPrediction, FraudAlert, FraudCase,
    AuditLog, RiskLevel, PredictionResult, AlertStatus, CaseStatus, KYCStatus
)

def seed_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db: Session = SessionLocal()

    try:
        print("[INFO] Seeding BankShield AI Database...")


        # 1. Create Users
        customer_user1 = User(
            email="example@gmail.com",
            hashed_password=get_password_hash("password123"),
            full_name="Rajesh Kumar",
            role=UserRole.CUSTOMER
        )
        customer_user2 = User(
            email="customer@example.com",
            hashed_password=get_password_hash("password123"),
            full_name="Priya Sharma",
            role=UserRole.CUSTOMER
        )
        employee_user = User(
            email="employee@bankshield.com",
            hashed_password=get_password_hash("admin123"),
            full_name="Vikram Verma (Fraud Analyst)",
            role=UserRole.EMPLOYEE
        )
        admin_user = User(
            email="admin@bankshield.com",
            hashed_password=get_password_hash("admin123"),
            full_name="Sarah Jenkins (Admin Risk Officer)",
            role=UserRole.ADMIN
        )

        db.add_all([customer_user1, customer_user2, employee_user, admin_user])
        db.commit()
        db.refresh(customer_user1)
        db.refresh(customer_user2)
        db.refresh(employee_user)

        # 2. Create Customer Profiles
        cust1 = Customer(
            user_id=customer_user1.id,
            phone="+91 98765 43210",
            address="402 Green Meadows, Bandra West",
            city="Mumbai",
            state="Maharashtra",
            zip_code="400050",
            kyc_status=KYCStatus.PENDING
        )
        cust2 = Customer(
            user_id=customer_user2.id,
            phone="+91 91234 56789",
            address="12 Connaught Place",
            city="New Delhi",
            state="Delhi",
            zip_code="110001",
            kyc_status=KYCStatus.VERIFIED
        )
        db.add_all([cust1, cust2])
        db.commit()
        db.refresh(cust1)
        db.refresh(cust2)

        # 3. Create Accounts matching Figma Prototype
        acc1 = Account(
            customer_id=cust1.id,
            account_number="5010 1234 5678",
            account_type="Savings Account",
            is_primary=True,
            balance=125430.50,
            currency="INR",
            status="Active"
        )
        acc2 = Account(
            customer_id=cust1.id,
            account_number="6010 9876 5432",
            account_type="Current Account",
            is_primary=False,
            balance=75320.00,
            currency="INR",
            status="Active"
        )
        acc3 = Account(
            customer_id=cust1.id,
            account_number="7010 2468 1357",
            account_type="Fixed Deposit",
            is_primary=False,
            balance=100000.00,
            currency="INR",
            status="Active",
            maturity_date="31 May 2026"
        )
        acc4 = Account(
            customer_id=cust1.id,
            account_number="8010 1122 3344",
            account_type="NRI Account",
            is_primary=False,
            balance=47000.00,
            currency="INR",
            status="Active"
        )

        db.add_all([acc1, acc2, acc3, acc4])
        db.commit()
        db.refresh(acc1)

        # 4. Create Applications
        app1 = Application(
            reference_no="BSAI-ACC-2025-05-31-000123",
            customer_id=cust1.id,
            account_type="Savings Account",
            status=ApplicationStatus.KYC_PENDING,
            submitted_on=datetime.datetime(2025, 5, 31, 10, 45),
            personal_info={"full_name": "Rajesh Kumar", "dob": "1990-08-15", "pan": "ABCDE1234F"},
            address_info={"city": "Mumbai", "zip": "400050"}
        )
        app2 = Application(
            reference_no="BSAI-ACC-2025-05-30-000089",
            customer_id=cust2.id,
            account_type="Current Account",
            status=ApplicationStatus.UNDER_REVIEW,
            submitted_on=datetime.datetime(2025, 5, 30, 14, 20),
            personal_info={"full_name": "Priya Sharma", "dob": "1994-03-22", "pan": "XYZPK9876Q"},
            address_info={"city": "New Delhi", "zip": "110001"}
        )
        db.add_all([app1, app2])
        db.commit()
        db.refresh(app1)
        db.refresh(app2)

        # 5. Create KYC Documents matching Figma Upload KYC card
        kyc1 = KYCDocument(
            customer_id=cust1.id,
            application_id=app1.id,
            document_type="Identity Proof",
            document_name="Aadhaar_Card.pdf",
            file_url="/uploads/Aadhaar_Card.pdf",
            status="Uploaded"
        )
        kyc2 = KYCDocument(
            customer_id=cust1.id,
            application_id=app1.id,
            document_type="Address Proof",
            document_name="Aadhaar_Card.pdf",
            file_url="/uploads/Aadhaar_Card.pdf",
            status="Uploaded"
        )
        kyc3 = KYCDocument(
            customer_id=cust1.id,
            application_id=app1.id,
            document_type="PAN Card",
            document_name="PAN_Card.pdf",
            file_url="/uploads/PAN_Card.pdf",
            status="Uploaded"
        )
        kyc4 = KYCDocument(
            customer_id=cust1.id,
            application_id=app1.id,
            document_type="Selfie",
            document_name="Selfie.jpg",
            file_url="/uploads/Selfie.jpg",
            status="Uploaded"
        )
        db.add_all([kyc1, kyc2, kyc3, kyc4])
        db.commit()

        # 6. Create Transactions
        txn1 = Transaction(
            transaction_id="TXN-90001",
            account_id=acc1.id,
            customer_id=cust1.id,
            amount=4500.0,
            transaction_type="Online Purchase",
            counterparty="Amazon India",
            location="Mumbai, IN",
            device_info="Chrome / Windows",
            ip_address="103.22.45.12",
            risk_score=12,
            fraud_probability=12.0,
            risk_level=RiskLevel.LOW,
            is_fraud_predicted=False
        )
        txn2 = Transaction(
            transaction_id="TXN-90002",
            account_id=acc1.id,
            customer_id=cust1.id,
            amount=185000.0,
            transaction_type="Wire Transfer",
            counterparty="Unknown Overseas Merchant",
            location="Lagos, NG",
            device_info="Android / Unknown IP",
            ip_address="197.210.12.99",
            risk_score=96,
            fraud_probability=96.2,
            risk_level=RiskLevel.CRITICAL,
            is_fraud_predicted=True
        )
        db.add_all([txn1, txn2])
        db.commit()
        db.refresh(txn2)

        # 7. Create Fraud Predictions, Alerts & Cases
        pred2 = FraudPrediction(
            transaction_id=txn2.id,
            risk_score=96,
            fraud_probability=96.2,
            risk_level=RiskLevel.CRITICAL,
            prediction=PredictionResult.FRAUD,
            features_json={"amount": 185000.0, "is_foreign": True, "velocity": 8}
        )
        alert1 = FraudAlert(
            alert_code="ALT-9081",
            transaction_id=txn2.id,
            customer_name="Rajesh Kumar",
            account_number="5010 1234 5678",
            risk_level=RiskLevel.CRITICAL,
            fraud_probability=96.2,
            alert_type="High-Amount Foreign IP Velocity",
            status=AlertStatus.NEW,
            assigned_employee="Vikram Verma"
        )
        case1 = FraudCase(
            case_number="CASE-101",
            title="Suspicious International Transfer & Device Anomaly",
            customer_id=cust1.id,
            account_number="5010 1234 5678",
            risk_level=RiskLevel.CRITICAL,
            status=CaseStatus.UNDER_INVESTIGATION,
            assigned_employee="Vikram Verma (Fraud Analyst)",
            notes="Transaction originated from unverified IP range. Account placed on temporary hold pending customer verification call.",
            evidence_details="IP Location: Lagos, NG. Foreign POS merchant code mismatch."
        )
        db.add_all([pred2, alert1, case1])

        # 8. Create Audit Logs
        audit1 = AuditLog(
            user_id=employee_user.id,
            user_email=employee_user.email,
            user_role="EMPLOYEE",
            action="System Initialization & Fraud Monitoring Active",
            resource="BankShield Engine",
            details="Seeded baseline rules and automated monitoring active."
        )
        db.add(audit1)
        db.commit()

        print("[SUCCESS] Database seeding completed successfully!")
    except Exception as e:
        db.rollback()
        print(f"[ERROR] Error seeding database: {e}")

    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
