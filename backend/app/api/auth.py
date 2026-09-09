from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_password, create_access_token, get_password_hash
from app.models.models import User, UserRole, Customer, KYCStatus
from app.schemas.schemas import UserLogin, TokenResponse, UserResponse
from app.api.deps import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=TokenResponse)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    if not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    # Check portal matching if specified
    if credentials.portal == "employee" and user.role == UserRole.CUSTOMER:
        raise HTTPException(status_code=403, detail="Customer credentials cannot access Employee portal")
        
    access_token = create_access_token(subject=user.id, role=user.role.value)
    
    return TokenResponse(
        access_token=access_token,
        user_id=user.id,
        email=user.email,
        full_name=user.full_name,
        role=user.role.value
    )

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
