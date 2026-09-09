import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import { PortalSelectionPage } from './pages/PortalSelectionPage';
import { CustomerLoginPage } from './pages/CustomerLoginPage';
import { EmployeeLoginPage } from './pages/EmployeeLoginPage';

// Customer Pages
import { CustomerDashboardPage } from './pages/customer/CustomerDashboardPage';
import { OpenAccountPage } from './pages/customer/OpenAccountPage';
import { UploadKYCPage } from './pages/customer/UploadKYCPage';
import { MyAccountsPage } from './pages/customer/MyAccountsPage';
import { TrackApplicationsPage } from './pages/customer/TrackApplicationsPage';
import { CustomerSupportPage } from './pages/customer/CustomerSupportPage';

// Employee Pages
import { EmployeeDashboardPage } from './pages/employee/EmployeeDashboardPage';
import { ApplicationReviewPage } from './pages/employee/ApplicationReviewPage';
import { FraudDetectionPage } from './pages/employee/FraudDetectionPage';
import { FraudAlertsPage } from './pages/employee/FraudAlertsPage';
import { FraudCasesPage } from './pages/employee/FraudCasesPage';
import { ReportsAnalyticsPage } from './pages/employee/ReportsAnalyticsPage';
import { AuditLogsPage } from './pages/employee/AuditLogsPage';

const queryClient = new QueryClient();

// Protected Route Guard Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({
  children,
  allowedRoles
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy-900 text-white flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-400 font-semibold">Authenticating BankShield Session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/customer/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Landing & Login Routes */}
            <Route path="/" element={<PortalSelectionPage />} />
            <Route path="/customer/login" element={<CustomerLoginPage />} />
            <Route path="/employee/login" element={<EmployeeLoginPage />} />

            {/* Customer Portal Protected Routes */}
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER', 'EMPLOYEE', 'ADMIN']}>
                  <CustomerDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/open-account"
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER', 'EMPLOYEE', 'ADMIN']}>
                  <OpenAccountPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/upload-kyc"
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER', 'EMPLOYEE', 'ADMIN']}>
                  <UploadKYCPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/my-accounts"
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER', 'EMPLOYEE', 'ADMIN']}>
                  <MyAccountsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/applications"
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER', 'EMPLOYEE', 'ADMIN']}>
                  <TrackApplicationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/support"
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER', 'EMPLOYEE', 'ADMIN']}>
                  <CustomerSupportPage />
                </ProtectedRoute>
              }
            />

            {/* Employee Portal Protected Routes */}
            <Route
              path="/employee/dashboard"
              element={
                <ProtectedRoute allowedRoles={['EMPLOYEE', 'ADMIN']}>
                  <EmployeeDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/applications"
              element={
                <ProtectedRoute allowedRoles={['EMPLOYEE', 'ADMIN']}>
                  <ApplicationReviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/fraud-detection"
              element={
                <ProtectedRoute allowedRoles={['EMPLOYEE', 'ADMIN']}>
                  <FraudDetectionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/alerts"
              element={
                <ProtectedRoute allowedRoles={['EMPLOYEE', 'ADMIN']}>
                  <FraudAlertsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/cases"
              element={
                <ProtectedRoute allowedRoles={['EMPLOYEE', 'ADMIN']}>
                  <FraudCasesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/analytics"
              element={
                <ProtectedRoute allowedRoles={['EMPLOYEE', 'ADMIN']}>
                  <ReportsAnalyticsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/audit-logs"
              element={
                <ProtectedRoute allowedRoles={['EMPLOYEE', 'ADMIN']}>
                  <AuditLogsPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
