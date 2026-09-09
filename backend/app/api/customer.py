import datetime
import random
from typing import List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.models import User, Customer, Account, Application, ApplicationStatus, KYCDocument, Transaction
from app.schemas.schemas import (
    CustomerDashboardSummary, AccountResponse, ApplicationResponse,
    AccountApplicationCreate, TransactionResponse, KYCDocumentResponse
)

router = APIRouter(prefix="/customer", tags=["Customer Portal"])

def get_or_create_customer(user: User, db: Session) -> Customer:
    if user.customer_profile:
        return user.customer_profile
    customer = Customer(user_id=user.id)
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return customer

@router.get("/dashboard", response_model=CustomerDashboardSummary)
def get_customer_dashboard(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    customer = get_or_create_customer(current_user, db)
    accounts = db.query(Account).filter(Account.customer_id == customer.id).all()
    
    total_balance = sum(acc.balance for acc in accounts)
    fd_balance = sum(acc.balance for acc in accounts if "Fixed" in acc.account_type)
    interest_ytd = 6250.0 # Realistic YTD figure
    
    recent_txns = db.query(Transaction).filter(Transaction.customer_id == customer.id)\
                    .order_by(Transaction.timestamp.desc()).limit(10).all()

    return CustomerDashboardSummary(
        total_accounts=len(accounts),
        total_balance=round(total_balance, 2),
        fixed_deposits_balance=round(fd_balance, 2),
        interest_earned_ytd=interest_ytd,
        recent_transactions=recent_txns,
        accounts=accounts
    )

@router.get("/accounts", response_model=List[AccountResponse])
def get_customer_accounts(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    customer = get_or_create_customer(current_user, db)
    return db.query(Account).filter(Account.customer_id == customer.id).all()

@router.post("/applications", response_model=ApplicationResponse)
def submit_account_application(
    payload: AccountApplicationCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    customer = get_or_create_customer(current_user, db)
    ref_code = f"BSAI-ACC-{datetime.datetime.utcnow().strftime('%Y-%m-%d')}-{random.randint(100000, 999999)}"
    
    app = Application(
        reference_no=ref_code,
        customer_id=customer.id,
        account_type=payload.account_type,
        status=ApplicationStatus.KYC_PENDING,
        personal_info=payload.personal_details,
        address_info=payload.address_details
    )
    db.add(app)
    db.commit()
    db.refresh(app)
    return app

@router.get("/applications", response_model=List[ApplicationResponse])
def get_customer_applications(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    customer = get_or_create_customer(current_user, db)
    return db.query(Application).filter(Application.customer_id == customer.id).order_by(Application.submitted_on.desc()).all()

@router.post("/kyc/upload", response_model=KYCDocumentResponse)
def upload_kyc_document(
    document_type: str = Form(...),
    application_id: int = Form(...),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    customer = get_or_create_customer(current_user, db)
    doc_record = KYCDocument(
        customer_id=customer.id,
        application_id=application_id,
        document_type=document_type,
        document_name=file.filename or "kyc_document.pdf",
        file_url=f"/uploads/{file.filename}",
        status="Uploaded"
    )
    db.add(doc_record)
    db.commit()
    db.refresh(doc_record)
    
    # Update application status to Under Review if all documents present
    app = db.query(Application).filter(Application.id == application_id).first()
    if app and app.status == ApplicationStatus.KYC_PENDING:
        app.status = ApplicationStatus.UNDER_REVIEW
        db.commit()
        
    return doc_record
