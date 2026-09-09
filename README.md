# 🛡️ BankShield AI - Bank Account Fraud Detection & Management Platform

BankShield AI is a full-stack Bank Account Fraud Detection and Management Platform based on the provided Figma design specification. It features dual user portals (**Customer** & **Employee**), automated KYC document verification, application review workflows, transaction risk scoring, ML prediction architecture, fraud risk alert lifecycle management, case investigations, dynamic analytics reports, and security audit logs.

---

## 🎨 Figma Design Fidelity & Visual Theme

The application strictly implements the Figma design specification (`#0A192F` dark navy, `#1E40AF` primary blue, `#0D9488` emerald teal) across all portals:
- **Portal Selection Landing Page** (`node-id=25-52`): Dual selection cards for Customer & Employee portals.
- **Role Authentication Login Screen** (`node-id=9-61`): Cyber tech background with glowing shield and floating lock badge.
- **Account Application Stepper** (`node-id=26-250`): 4-step process with product selection cards for Savings, Current, Fixed Deposit, and NRI accounts.
- **Upload KYC Verification** (`node-id=197-653`): Reference header bar (`BSAI-ACC-2025-05-31-000123`) + 4 required document cards (Identity Proof, Address Proof, PAN Card, Selfie).
- **My Accounts Portfolio** (`node-id=197-654`): 4 metric cards (Total Accounts = 4, Total Balance = ₹ 2,48,750.50, Fixed Deposits = ₹ 1,00,000.00, YTD Interest = ₹ 6,250.00) + Portfolio Table.
- **Employee Fraud Center**: AI Fraud Scan, CSV dataset upload, Risk level scoring (LOW/CRITICAL), Fraud Alerts, Fraud Cases, and Recharts Analytics.

---

## 🚀 Quick Setup & Local Execution

### 1. Backend Setup (FastAPI & Python)
```bash
cd backend
python -m pip install -r requirements.txt
python seed.py
python -m uvicorn main:app --reload --port 8000
```
- API Documentation: `http://localhost:8000/docs`

### 2. Frontend Setup (React, TypeScript & Vite)
```bash
cd frontend
npm install
npm run dev
```
- App UI: `http://localhost:5173`

---

## 🔐 Credentials & Demo Accounts

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Customer** | `example@gmail.com` | `password123` | Customer Portal (Accounts, Applications, KYC) |
| **Customer** | `customer@example.com` | `password123` | Customer Portal |
| **Employee** | `employee@bankshield.com` | `admin123` | Employee Portal (Approve/Reject, AI Scan, Alerts, Cases) |
| **Admin** | `admin@bankshield.com` | `admin123` | Full System & Security Audit Logs |

---

## 🤖 ML Prediction Model Integration (Phase 11 Ready)

Per requirement #17, the application features a clean, modular ML Service interface (`backend/app/ml/`):
- `model_loader.py`: ModelLoader singleton that automatically detects and loads `fraud_model.pkl`.
- `preprocessing.py`: Feature preprocessor that transforms incoming transaction data into normalized feature vectors.
- `predictor.py`: `predict(transaction_data)` adapter interface returning `fraud_probability`, `risk_score` (0-100), `risk_level` (LOW/MEDIUM/HIGH/CRITICAL), and `prediction` (LEGITIMATE/FRAUD).
- **Plugging in your model**: Simply place your trained `.pkl` / `.joblib` model inside `backend/app/ml/models/fraud_model.pkl` and set `MODEL_PATH`. The application seamlessly uses your trained model without changing core logic.
