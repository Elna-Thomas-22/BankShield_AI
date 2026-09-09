from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.deps import require_role
from app.models.models import UserRole, AuditLog
from app.schemas.schemas import AuditLogResponse

router = APIRouter(prefix="/audit-logs", tags=["Audit Logging"])

@router.get("", response_model=List[AuditLogResponse])
def get_audit_logs(
    current_user = Depends(require_role([UserRole.EMPLOYEE, UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    return db.query(AuditLog).order_by(AuditLog.timestamp.desc()).limit(100).all()
