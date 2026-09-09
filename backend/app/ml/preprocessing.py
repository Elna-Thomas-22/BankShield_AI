from typing import Dict, Any
import numpy as np

class FeaturePreprocessor:
    """
    Normalizes raw transaction data into feature vectors for ML inference.
    """
    
    @staticmethod
    def preprocess_transaction(data: Dict[str, Any]) -> Dict[str, Any]:
        amount = float(data.get("amount", 0.0))
        transaction_type = str(data.get("transaction_type", "Payment")).lower()
        velocity_24h = int(data.get("velocity_count_24h", 1))
        is_foreign = bool(data.get("is_foreign_transaction", False))
        
        # Derived features
        is_high_value = 1 if amount > 50000 else 0
        is_withdrawal = 1 if "withdraw" in transaction_type else 0
        is_transfer = 1 if "transfer" in transaction_type else 0
        
        processed_features = {
            "amount": amount,
            "velocity_24h": velocity_24h,
            "is_foreign": 1 if is_foreign else 0,
            "is_high_value": is_high_value,
            "is_withdrawal": is_withdrawal,
            "is_transfer": is_transfer
        }
        
        return processed_features
