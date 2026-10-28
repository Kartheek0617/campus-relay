import React from 'react';
import { 
  Sparkles, 
  Share2, 
  Trophy, 
  BarChart3, 
  Sliders, 
  PlayCircle, 
  RotateCcw,
  LogIn,
  LogOut,
  UserPlus,
  ShieldCheck,
  GraduationCap,
  Ticket
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  onOpenAuth, 
  onLogout, 
  onOpenDemoGuide, 
  onResetData 
}) {
  return (
    <header className="navbar" style={{ flexWrap: 'wrap', gap: '12px', padding: '12px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ 
          width: '38px', 
          height: '38px', 
          borderRadius: '10px', 
          background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
        }}>
          <Sparkles size={20} color="#fff" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
              CAMPUS RELAY
            </span>
            <span className="badge badge-indigo" style={{ fontSize: '0.68rem' }}>Growth Lab</span>
            <span className="simulation-pill" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
              <span className="pulse-dot" /> Sim Campaign
            </span>
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
            NxtWave 60-Min AI Workshop Acquisition Engine
          </div>
        </div>
      </div>

      <nav className="nav-links">
        <button 
          className={`nav-btn ${activeTab === 'workshop' ? 'active' : ''}`}
          onClick={() => setActiveTab('workshop')}
        >
          <Sparkles size={16} />
          Workshop Page
        </button>

        {currentUser && currentUser.role === 'student' && (
          <button 
            className={`nav-btn ${activeTab === 'student-portal' ? 'active' : ''}`}
            onClick={() => setActiveTab('student-portal')}
            style={{ 
              borderColor: activeTab === 'student-portal' ? 'var(--accent-indigo)' : 'rgba(99, 102, 241, 0.35)',
              background: activeTab === 'student-portal' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.08)'
            }}
          >
            <Ticket size={16} color="var(--accent-cyan)" />
            My Workshop Pass
          </button>
        )}

        <button 
          className={`nav-btn ${activeTab === 'ambassador' ? 'active' : ''}`}
          onClick={() => setActiveTab('ambassador')}
        >
          <Share2 size={16} />
          Ambassador Hub
        </button>

        <button 
          className={`nav-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          <Trophy size={16} />
          Leaderboard
        </button>

        <button 
          className={`nav-btn ${activeTab === 'operations' ? 'active' : ''}`}
          onClick={() => setActiveTab('operations')}
        >
          <BarChart3 size={16} />
          Campaign Ops
          {currentUser && currentUser.role === 'admin' && (
            <span style={{ 
              fontSize: '0.65rem', 
              background: 'rgba(99, 102, 241, 0.4)', 
              color: '#c7d2fe', 
              padding: '1px 6px', 
              borderRadius: '4px',
              marginLeft: '4px'
            }}>Admin</span>
          )}
        </button>

        <button 
          className={`nav-btn ${activeTab === 'simulator' ? 'active' : ''}`}
          onClick={() => setActiveTab('simulator')}
        >
          <Sliders size={16} />
          Growth Simulator
        </button>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {currentUser ? (
          /* Logged In User Pill & Logout */
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div 
              onClick={() => {
                if (currentUser.role === 'student') setActiveTab('student-portal');
                else setActiveTab('operations');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                background: currentUser.role === 'admin' ? 'rgba(99, 102, 241, 0.18)' : 'rgba(6, 182, 212, 0.18)',
                border: `1px solid ${currentUser.role === 'admin' ? 'rgba(99, 102, 241, 0.4)' : 'rgba(6, 182, 212, 0.4)'}`,
                cursor: 'pointer'
              }}
              title={`Logged in as ${currentUser.name} (${currentUser.role}). Click to view dashboard.`}
            >
              {currentUser.role === 'admin' ? (
                <ShieldCheck size={16} color="var(--accent-indigo)" />
              ) : (
                <GraduationCap size={16} color="var(--accent-cyan)" />
              )}
              <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: '0.68rem', color: currentUser.role === 'admin' ? '#a5b4fc' : '#67e8f9', textTransform: 'capitalize' }}>
                  {currentUser.role === 'admin' ? '👑 Admin' : '🎓 Student'}
                </div>
              </div>
            </div>

            <button 
              className="btn btn-outline btn-sm"
              onClick={onLogout}
              style={{ gap: '5px', padding: '6px 10px', color: '#fb7185', borderColor: 'rgba(244, 63, 94, 0.3)' }}
              title="Sign Out"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        ) : (
          /* Logged Out: Sign In & Create Account Buttons */
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => onOpenAuth('login', 'student')}
              style={{ gap: '6px' }}
            >
              <LogIn size={14} />
              Sign In
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => onOpenAuth('signup', 'student')}
              style={{ gap: '6px' }}
            >
              <UserPlus size={14} />
              Create Account
            </button>
          </div>
        )}

        <button 
          className="btn btn-cyan btn-sm"
          onClick={onOpenDemoGuide}
          style={{ gap: '6px' }}
          title="Interactive Reviewer Walkthrough"
        >
          <PlayCircle size={15} />
          Reviewer Demo
        </button>

        <button 
          className="btn btn-outline btn-sm"
          onClick={onResetData}
          style={{ gap: '6px' }}
          title="Reset to default simulated state"
        >
          <RotateCcw size={14} />
          Reset Demo
        </button>
      </div>
    </header>
  );
}
