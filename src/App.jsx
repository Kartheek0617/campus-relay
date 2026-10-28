import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WorkshopLanding from './components/WorkshopLanding';
import RegistrationModal from './components/RegistrationModal';
import AmbassadorToolkit from './components/AmbassadorToolkit';
import LeaderboardView from './components/LeaderboardView';
import OperationsDashboard from './components/OperationsDashboard';
import GrowthSimulator from './components/GrowthSimulator';
import ReviewerDemoModal from './components/ReviewerDemoModal';
import AuthModal from './components/AuthModal';
import StudentPortal from './components/StudentPortal';
import { loadStore, subscribeStore, resetStore, loadSession, logoutUser } from './services/store';

export default function App() {
  const [store, setStore] = useState(loadStore());
  const [currentUser, setCurrentUser] = useState(loadSession());
  const [activeTab, setActiveTab] = useState('workshop');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authRole, setAuthRole] = useState('student'); // 'student' | 'admin'
  const [activeReferralCode, setActiveReferralCode] = useState(null);
  const [notification, setNotification] = useState(null);

  // Subscribe to reactive store and session changes
  useEffect(() => {
    const unsubscribe = subscribeStore(() => {
      setStore({ ...loadStore() });
      setCurrentUser(loadSession());
    });
    return () => unsubscribe();
  }, []);

  // Check URL query parameters for referral attribution (?ref=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref) {
        const clean = ref.trim().toUpperCase();
        setActiveReferralCode(clean);
        localStorage.setItem('nxtwave_referred_by', clean);
        showNotification(`Campus referral link recognized: ${clean}`);
      }
    } catch (e) {
      console.warn('Could not read URL params', e);
    }
  }, []);

  const showNotification = (msg, type = 'info') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleOpenAuth = (mode = 'login', role = 'student') => {
    setAuthMode(mode);
    setAuthRole(role);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    showNotification(`Welcome, ${user.name}! (${user.role === 'admin' ? 'Admin Access Granted' : 'Student Access Granted'})`, 'success');
    if (user.role === 'admin') {
      setActiveTab('operations');
    } else {
      setActiveTab('student-portal');
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    showNotification('You have logged out successfully.', 'info');
    if (activeTab === 'student-portal') {
      setActiveTab('workshop');
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo registrations, accounts, and restore initial campaign state?')) {
      resetStore();
      setCurrentUser(null);
      showNotification('Demo state and accounts reset to initial seed values.', 'success');
    }
  };

  const handleSelectAmbassador = (id) => {
    const updated = { ...store, activeAmbassadorId: id };
    setStore(updated);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 99999,
          background: notification.type === 'success' ? '#065f46' : 'rgba(30, 41, 59, 0.95)',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 18px',
          boxShadow: 'var(--shadow-md)',
          fontSize: '0.86rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'slideUp 0.2s ease'
        }}>
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenDemoGuide={() => setIsDemoGuideOpen(true)}
        onResetData={handleResetData}
      />

      {/* Main Content Area */}
      <main className="app-container" style={{ flex: 1, padding: '24px 20px' }}>
        {activeTab === 'workshop' && (
          <WorkshopLanding 
            onOpenRegister={() => setIsRegisterOpen(true)}
            onOpenAuth={handleOpenAuth}
            currentUser={currentUser}
            activeReferralCode={activeReferralCode}
          />
        )}

        {activeTab === 'student-portal' && (
          currentUser ? (
            <StudentPortal 
              user={currentUser}
              store={store}
              onLogout={handleLogout}
              onNavigateLeaderboard={() => setActiveTab('leaderboard')}
              onOpenRegister={() => setIsRegisterOpen(true)}
            />
          ) : (
            <div className="glass-panel" style={{ padding: '48px 32px', textAlign: 'center', maxWidth: '600px', margin: '40px auto' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
                Student Login Required
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                Please log in with your student credentials or create a new student account to access your personalized workshop pass and referral hub.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button 
                  onClick={() => handleOpenAuth('login', 'student')}
                  className="btn btn-secondary"
                >
                  Student Sign In
                </button>
                <button 
                  onClick={() => handleOpenAuth('signup', 'student')}
                  className="btn btn-primary"
                >
                  Create Student Account
                </button>
              </div>
            </div>
          )
        )}

        {activeTab === 'ambassador' && (
          <AmbassadorToolkit 
            store={store}
            onSelectAmbassador={handleSelectAmbassador}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardView store={store} />
        )}

        {activeTab === 'operations' && (
          <OperationsDashboard 
            store={store}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
            onResetData={handleResetData}
          />
        )}

        {activeTab === 'simulator' && (
          <GrowthSimulator />
        )}
      </main>

      {/* Workshop Registration Modal */}
      <RegistrationModal 
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialRefCode={activeReferralCode}
        onRegisteredSuccess={(res) => {
          showNotification(`Registration successful! Your code: ${res.generatedCode}`, 'success');
        }}
      />

      {/* Reviewer Demo Modal */}
      <ReviewerDemoModal 
        isOpen={isDemoGuideOpen}
        onClose={() => setIsDemoGuideOpen(false)}
        setActiveTab={setActiveTab}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onResetData={handleResetData}
        store={store}
      />

      {/* Authentication Modal (Login & Sign Up) */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        defaultRole={authRole}
        initialRefCode={activeReferralCode}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Footer */}
      <footer style={{ 
        borderTop: '1px solid var(--border-subtle)', 
        padding: '28px 20px', 
        background: 'rgba(5, 8, 15, 0.9)',
        marginTop: 'auto'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '16px',
          fontSize: '0.82rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            <strong style={{ color: '#fff' }}>CAMPUS RELAY</strong> — NxtWave Growth Lab Rebuild
            <div style={{ marginTop: '2px' }}>
              Target: 500 Registrations • 7 Days • ₹2,000 Budget • Student & Admin Authentication
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {currentUser ? (
              <span style={{ color: 'var(--accent-cyan)' }}>
                Logged in as <strong>{currentUser.name}</strong> ({currentUser.role})
              </span>
            ) : (
              <button 
                onClick={() => handleOpenAuth('login')}
                style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', fontSize: '0.82rem' }}
              >
                Sign In / Register
              </button>
            )}
            <span>•</span>
            <button 
              onClick={() => setIsDemoGuideOpen(true)}
              style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', fontSize: '0.82rem' }}
            >
              Interactive Reviewer Demo
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
