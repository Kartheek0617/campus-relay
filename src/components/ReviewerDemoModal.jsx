import React, { useState } from 'react';
import { 
  X, 
  PlayCircle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Users, 
  Share2, 
  BarChart3, 
  Sliders, 
  RotateCcw,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  GraduationCap,
  LogIn,
  LogOut,
  UserPlus
} from 'lucide-react';
import { registerStudent, loginUser } from '../services/store';

export default function ReviewerDemoModal({ 
  isOpen, 
  onClose, 
  setActiveTab, 
  onOpenRegister,
  onOpenAuth,
  onLogout,
  onResetData,
  store 
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [demoLog, setDemoLog] = useState([]);

  if (!isOpen) return null;

  const addLog = (msg) => {
    setDemoLog(prev => [msg, ...prev.slice(0, 4)]);
  };

  // Quick Action 1: Register Student 1 (Aditi Sengupta)
  const handleQuickRegister1 = () => {
    try {
      const res = registerStudent({
        name: 'Aditi Sengupta',
        email: `aditi.demo.${Date.now()}@srm.edu`,
        college: 'SRM University',
        branch: 'CSE',
        year: '2025',
        referralCode: ''
      });
      addLog(`✓ Registered Aditi Sengupta! Code generated: ${res.generatedCode}`);
      setCurrentStep(3);
    } catch (e) {
      addLog(`⚠️ ${e.message}`);
    }
  };

  // Quick Action 2: Register Student 2 (Rahul Mehra) using Aarav's code
  const handleQuickRegister2 = () => {
    try {
      const aarav = store.ambassadors.find(a => a.name.includes('Aarav')) || store.ambassadors[0];
      const res = registerStudent({
        name: 'Rahul Mehra',
        email: `rahul.demo.${Date.now()}@jntu.edu`,
        college: 'JNTU Hyderabad',
        branch: 'ECE',
        year: '2025',
        referralCode: aarav.code
      });
      addLog(`✓ Registered Rahul Mehra with referral code ${aarav.code}! Attributed to ${aarav.name}.`);
      setCurrentStep(5);
    } catch (e) {
      addLog(`⚠️ ${e.message}`);
    }
  };

  // Quick Action: Instant Admin Login
  const handleQuickAdminLogin = () => {
    try {
      const user = loginUser({
        email: 'admin@nxtwave.tech',
        password: 'Admin@1234'
      });
      addLog(`👑 Logged in as Admin (${user.name})! Opening Campaign Ops...`);
      setActiveTab('operations');
    } catch (e) {
      addLog(`⚠️ ${e.message}`);
    }
  };

  // Quick Action: Instant Student Login
  const handleQuickStudentLogin = () => {
    try {
      const user = loginUser({
        email: 'aarav.sharma@srm.edu',
        password: 'Student@1234'
      });
      addLog(`🎓 Logged in as Student (${user.name})! Opening Student Portal...`);
      setActiveTab('student-portal');
    } catch (e) {
      addLog(`⚠️ ${e.message}`);
    }
  };

  const steps = [
    {
      num: 1,
      title: 'Inspect Workshop Value Proposition',
      desc: 'Verify honest student messaging for "Build Your First AI Project in 60 Mins" without false placement guarantees.',
      action: () => {
        setActiveTab('workshop');
        setCurrentStep(2);
      },
      actionText: 'View Workshop Landing'
    },
    {
      num: 2,
      title: 'Test Registration & Deduplication',
      desc: 'Fill registration form or use quick registration to test validation, deduplication, and code generation.',
      action: handleQuickRegister1,
      actionText: '⚡ Quick-Register Student 1'
    },
    {
      num: 3,
      title: 'Explore Campus Ambassador Toolkit',
      desc: 'Switch between Campus Captain, Club Rep, and Peer Ambassador roles. Test live editable WhatsApp variants.',
      action: () => {
        setActiveTab('ambassador');
        setCurrentStep(4);
      },
      actionText: 'Open Ambassador Toolkit'
    },
    {
      num: 4,
      title: 'Test Referral Attribution Engine',
      desc: 'Register Student 2 using an existing ambassador referral code. Watch their referral count increment dynamically.',
      action: handleQuickRegister2,
      actionText: '⚡ Quick-Register with Referral Code'
    },
    {
      num: 5,
      title: 'Inspect Real-time Leaderboard',
      desc: 'Observe verified referral rankings and college breakdown with strict simulation labeling.',
      action: () => {
        setActiveTab('leaderboard');
        setCurrentStep(6);
      },
      actionText: 'View Leaderboard'
    },
    {
      num: 6,
      title: 'Test Student & Admin Authentication',
      desc: 'Log in as Admin to manage student directories, or log in as Student to view their personal workshop pass & rewards.',
      action: handleQuickAdminLogin,
      actionText: '👑 Quick-Login as Admin'
    },
    {
      num: 7,
      title: 'Review Campaign Ops Dashboard',
      desc: 'Verify the 500-student goal, required daily pace, ₹2,000 budget allocation, and student management directory.',
      action: () => {
        setActiveTab('operations');
        setCurrentStep(8);
      },
      actionText: 'Open Ops Dashboard'
    },
    {
      num: 8,
      title: 'Interactive Growth Simulator',
      desc: 'Experiment with clubs, ambassadors, and conversion rates. Check mathematically consistent forecasts.',
      action: () => {
        setActiveTab('simulator');
        setCurrentStep(9);
      },
      actionText: 'Open Growth Simulator'
    },
    {
      num: 9,
      title: 'Reset Demo State',
      desc: 'Restore application back to initial state anytime with zero data loss.',
      action: () => {
        onResetData();
        addLog('✓ Demo state and accounts reset successfully.');
        setCurrentStep(1);
      },
      actionText: 'Reset Application State'
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 10001 }}>
      <div className="modal-content" style={{ maxWidth: '720px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-cyan">Evaluator Walkthrough</span>
              <span className="badge badge-indigo">Feature 7</span>
              <span className="badge badge-emerald">Auth Suite Enabled</span>
            </div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff' }}>
              Reviewer Demo Mode (60-Second Tour)
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              Follow these guided steps to verify every user journey, referral attribution, and authentication role.
            </p>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* 1-Click Auth Test Bar */}
        <div style={{
          background: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.35)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 14px',
          marginBottom: '16px'
        }}>
          <div style={{ fontSize: '0.74rem', color: '#c7d2fe', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            ⚡ Instant Auth Test Shortcuts:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={handleQuickAdminLogin}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.76rem', padding: '6px 10px' }}
            >
              <ShieldCheck size={14} />
              1-Click Admin Login
            </button>
            <button 
              onClick={handleQuickStudentLogin}
              className="btn btn-cyan btn-sm"
              style={{ fontSize: '0.76rem', padding: '6px 10px' }}
            >
              <GraduationCap size={14} />
              1-Click Student Login
            </button>
            <button 
              onClick={() => { onClose(); onOpenAuth('signup', 'student'); }}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.76rem', padding: '6px 10px' }}
            >
              <UserPlus size={14} />
              Open Sign Up Form
            </button>
            <button 
              onClick={() => { onLogout(); addLog('✓ Logged out successfully.'); }}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.76rem', padding: '6px 10px', color: '#fb7185', borderColor: 'rgba(244,63,94,0.3)' }}
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>

        {/* Live Feedback Log if actions triggered */}
        {demoLog.length > 0 && (
          <div style={{ 
            background: 'rgba(6, 182, 212, 0.1)', 
            border: '1px solid rgba(6, 182, 212, 0.3)', 
            borderRadius: 'var(--radius-sm)', 
            padding: '10px 14px', 
            marginBottom: '16px',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono)',
            color: '#a5f3fc'
          }}>
            {demoLog.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        )}

        {/* Steps List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '48vh', overflowY: 'auto', paddingRight: '4px' }}>
          {steps.map(step => (
            <div 
              key={step.num}
              style={{
                background: currentStep === step.num ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${currentStep === step.num ? 'rgba(99, 102, 241, 0.4)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  background: currentStep > step.num ? 'var(--accent-emerald)' : currentStep === step.num ? 'var(--accent-indigo)' : 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  {currentStep > step.num ? '✓' : step.num}
                </span>

                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
                    {step.title}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {step.desc}
                  </p>
                </div>
              </div>

              <button 
                className={`btn btn-sm ${currentStep === step.num ? 'btn-primary' : 'btn-outline'}`}
                onClick={step.action}
                style={{ flexShrink: 0, fontSize: '0.76rem', padding: '6px 12px' }}
              >
                {step.actionText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
