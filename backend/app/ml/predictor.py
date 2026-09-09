import datetime
from typing import Dict, Any
from app.ml.model_loader import ModelLoader
from app.ml.preprocessing import FeaturePreprocessor

class FraudPredictor:
    """
    Core ML Adapter Interface.
    Integrates external trained ML model or provides rule-driven probabilistic risk scoring.
    """

    def __init__(self):
        self.loader = ModelLoader.get_instance()

    def predict(self, transaction_data: Dict[str, Any]) -> Dict[str, Any]:
        features = FeaturePreprocessor.preprocess_transaction(transaction_data)
        
        # Check if actual model is loaded in ModelLoader
        if self.loader.is_loaded and self.loader.get_model() is not None:
            model = self.loader.get_model()
            try:
                # Format features into array/dataframe expected by scikit-learn / XGBoost model
                feature_vector = [[
                    features["amount"],
                    features["velocity_24h"],
                    features["is_foreign"],
                    features["is_high_value"],
                    features["is_withdrawal"],
                    features["is_transfer"]
                ]]
                
                # Predict probability if supported
                if hasattr(model, "predict_proba"):
                    proba = float(model.predict_proba(feature_vector)[0][1])
                else:
                    pred_class = model.predict(feature_vector)[0]
                    proba = 0.95 if pred_class == 1 else 0.05
                    
                risk_score = int(proba * 100)
            except Exception as e:
                # Fallback in case feature shape differs
                proba, risk_score = self._compute_heuristic_probability(features)
        else:
            proba, risk_score = self._compute_heuristic_probability(features)

        # Risk level determination
        if risk_score >= 80:
            risk_level = "CRITICAL"
            prediction = "FRAUD"
        elif risk_score >= 60:
            risk_level = "HIGH"
            prediction = "FRAUD"
        elif risk_score >= 35:
            risk_level = "MEDIUM"
            prediction = "LEGITIMATE"
        else:
            risk_level = "LOW"
            prediction = "LEGITIMATE"

        txn_id = transaction_data.get("transaction_id", f"TXN-{int(datetime.datetime.utcnow().timestamp())}")

        return {
            "transaction_id": txn_id,
            "fraud_probability": round(proba * 100, 1),
            "risk_score": risk_score,
            "risk_level": risk_level,
            "prediction": prediction,
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "feature_contributions": {
                "amount_risk": "High" if features["is_high_value"] else "Normal",
                "velocity_flag": "High" if features["velocity_24h"] > 5 else "Normal",
                "foreign_ip": "Yes" if features["is_foreign"] else "No"
            }
        }

    def _compute_heuristic_probability(self, features: Dict[str, Any]):
        base_score = 5
        amount = features["amount"]
        
        if amount > 200000:
            base_score += 55
        elif amount > 50000:
            base_score += 30
        elif amount > 10000:
            base_score += 15
            
        if features["velocity_24h"] > 5:
            base_score += 25
        if features["is_foreign"]:
            base_score += 30
        if features["is_withdrawal"] and amount > 30000:
            base_score += 20
            
        risk_score = min(99, max(1, base_score))
        probability = risk_score / 100.0
        return probability, risk_score
