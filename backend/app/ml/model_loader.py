import os
import logging

logger = logging.getLogger(__name__)

class ModelLoader:
    _instance = None
    _model = None
    _preprocessor = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = ModelLoader()
        return cls._instance

    def __init__(self):
        self.model_path = os.getenv("MODEL_PATH", "backend/app/ml/models/fraud_model.pkl")
        self.is_loaded = False
        self._try_load_model()

    def _try_load_model(self):
        """
        Attempts to load model artifact if available.
        Otherwise keeps is_loaded = False so adapter can fallback gracefully.
        """
        if os.path.exists(self.model_path):
            try:
                import joblib
                self._model = joblib.load(self.model_path)
                self.is_loaded = True
                logger.info(f"Successfully loaded trained ML model from {self.model_path}")
            except Exception as e:
                logger.warning(f"Could not load ML model file: {e}")
        else:
            logger.info("ML model file not found yet. Operating with standard ML Adapter Interface.")

    def get_model(self):
        return self._model
