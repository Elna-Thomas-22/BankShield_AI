import io
import pandas as pd
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.api.deps import get_current_user
from app.ml.predictor import FraudPredictor
from app.schemas.schemas import FraudPredictionRequest, FraudPredictionResponse
from app.models.models import User, Transaction, FraudPrediction, FraudAlert, RiskLevel, PredictionResult, AlertStatus

router = APIRouter(prefix="/fraud", tags=["Fraud Detection System"])
predictor = FraudPredictor()

@router.post("/predict", response_model=FraudPredictionResponse)
def run_fraud_prediction(
    payload: FraudPredictionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Run prediction via ML Adapter interface
    input_data = payload.dict()
    result = predictor.predict(input_data)
    
    # Save transaction & prediction to database if account_number is provided
    # or record in system
    return FraudPredictionResponse(
        transaction_id=result["transaction_id"],
        fraud_probability=result["fraud_probability"],
        risk_score=result["risk_score"],
        risk_level=result["risk_level"],
        prediction=result["prediction"],
        timestamp=result["timestamp"],
        feature_contributions=result["feature_contributions"]
    )

@router.post("/dataset/upload")
def upload_dataset_for_fraud_analysis(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are supported for dataset analysis")
        
    try:
        contents = file.file.read()
        df = pd.read_csv(io.BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse CSV file: {str(e)}")
        
    required_cols = ['amount']
    # Flexible column check
    has_amount = any(col.lower() in [c.lower() for c in df.columns] for col in required_cols)
    if not has_amount:
        raise HTTPException(status_code=400, detail="CSV file must contain an 'amount' column")
        
    total_records = len(df)
    results = []
    fraud_count = 0
    high_risk_count = 0
    
    for idx, row in df.head(100).iterrows(): # Process first 100 rows for analysis preview
        row_dict = row.to_dict()
        amount_val = row_dict.get('amount') or row_dict.get('Amount') or 100.0
        txn_type = row_dict.get('transaction_type') or row_dict.get('type') or 'Payment'
        
        pred = predictor.predict({
            "transaction_id": f"CSV-TXN-{idx+1001}",
            "amount": float(amount_val),
            "transaction_type": str(txn_type)
        })
        
        if pred["prediction"] == "FRAUD":
            fraud_count += 1
        if pred["risk_level"] in ["HIGH", "CRITICAL"]:
            high_risk_count += 1
            
        results.append(pred)

    return {
        "filename": file.filename,
        "total_records_processed": total_records,
        "analyzed_sample_count": len(results),
        "detected_fraud_count": fraud_count,
        "high_risk_count": high_risk_count,
        "fraud_rate_percentage": round((fraud_count / max(len(results), 1)) * 100, 1),
        "sample_predictions": results[:15]
    }
