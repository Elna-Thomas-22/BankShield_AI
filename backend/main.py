from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.api import auth, customer, employee, fraud, analytics, audit

# Create database tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="BankShield AI - Bank Account Fraud Detection & Management Platform REST API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(customer.router, prefix=settings.API_V1_STR)
app.include_router(employee.router, prefix=settings.API_V1_STR)
app.include_router(fraud.router, prefix=settings.API_V1_STR)
app.include_router(analytics.router, prefix=settings.API_V1_STR)
app.include_router(audit.router, prefix=settings.API_V1_STR)

@app.get("/")
def root_status():
    return {
        "status": "online",
        "app": "BankShield AI Platform Backend",
        "docs": "/docs",
        "version": "1.0.0"
    }
