import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "BankShield AI API"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "bankshield_ai_super_secret_jwt_key_2026_secure_bank_guard")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./bankshield.db")

    class Config:
        case_sensitive = True

settings = Settings()
