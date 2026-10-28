import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Building, 
  GraduationCap, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  KeyRound
} from 'lucide-react';
import { loginUser, registerUser } from '../services/store';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  initialMode = 'login', // 'login' or 'signup'
  defaultRole = 'student', // 'student' or 'admin'
  initialRefCode = '',
  onAuthSuccess 
}) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [role, setRole] = useState(defaultRole); // 'student' | 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign up form state
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    branch: 'CSE',
    year: '2025',
    referralCode: initialRefCode || ''
  });

  useEffect(() => {
    setMode(initialMode);
    setError(null);
    setSuccessMsg(null);
  }, [initialMode, isOpen]);

  useEffect(() => {
    if (defaultRole) setRole(defaultRole);
  }, [defaultRole, isOpen]);

  useEffect(() => {
    if (initialRefCode) {
      setSignupForm(prev => ({ ...prev, referralCode: initialRefCode }));
    }
  }, [initialRefCode]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Fill quick demo credentials
  const fillDemoAdmin = () => {
    setRole('admin');
    setLoginEmail('admin@nxtwave.tech');
    setLoginPassword('Admin@1234');
    setError(null);
  };

  const fillDemoStudent = () => {
    setRole('student');
    setLoginEmail('aarav.sharma@srm.edu');
    setLoginPassword('Student@1234');
    setError(null);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError(null);
    try {
      const user = loginUser({
        email: loginEmail,
        password: loginPassword,
        role: role
      });
      setSuccessMsg(`Welcome back, ${user.name}!`);
      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess(user);
        onClose();
      }, 700);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = registerUser(signupForm);
      setSuccessMsg(`Account created! Your unique code: ${res.generatedCode}`);
      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess(res.user);
        onClose();
      }, 900);
    } catch (err) {
      setError(err.message || 'Registration failed. Please check inputs.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 10000 }}>
      <div 
        className="modal-content" 
        style={{ maxWidth: mode === 'signup' ? '540px' : '460px', padding: '28px 32px' }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '4px'
          }}
          title="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '22px' }}>
          <button 
            type="button"
            className={`btn btn-sm ${mode === 'login' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => { setMode('login'); setError(null); }}
            style={{ flex: 1, padding: '10px' }}
          >
            <KeyRound size={16} />
            Sign In
          </button>
          <button 
            type="button"
            className={`btn btn-sm ${mode === 'signup' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => { setMode('signup'); setError(null); }}
            style={{ flex: 1, padding: '10px' }}
          >
            <Sparkles size={16} />
            Create Student Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.35)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '18px',
            color: '#fecdd3',
            fontSize: '0.84rem'
          }}>
            <AlertTriangle size={18} color="#fb7185" style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '18px',
            color: '#a7f3d0',
            fontSize: '0.84rem'
          }}>
            <CheckCircle2 size={18} color="#34d399" style={{ flexShrink: 0 }} />
            <span>{successMsg}</span>
          </div>
        )}

        {mode === 'login' ? (
          /* ======================== LOGIN VIEW ======================== */
          <div>
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge badge-indigo">
                  {role === 'admin' ? 'Administrator Login' : 'Student Login'}
                </span>
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                Sign In to Campus Relay
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Access your workshop pass, referral rewards, or admin operations.
              </p>
            </div>

            {/* Role Switcher Pill */}
            <div style={{ 
              display: 'flex', 
              background: 'rgba(255, 255, 255, 0.04)', 
              borderRadius: 'var(--radius-xs)', 
              padding: '4px', 
              marginBottom: '18px',
              border: '1px solid var(--border-subtle)'
            }}>
              <button 
                type="button"
                onClick={() => setRole('student')}
                style={{
                  flex: 1,
                  padding: '7px 12px',
                  borderRadius: '4px',
                  border: 'none',
                  background: role === 'student' ? 'var(--accent-indigo)' : 'transparent',
                  color: role === 'student' ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
              >
                <GraduationCap size={15} />
                Student
              </button>
              <button 
                type="button"
                onClick={() => setRole('admin')}
                style={{
                  flex: 1,
                  padding: '7px 12px',
                  borderRadius: '4px',
                  border: 'none',
                  background: role === 'admin' ? 'var(--accent-primary)' : 'transparent',
                  color: role === 'admin' ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
              >
                <ShieldCheck size={15} />
                Admin
              </button>
            </div>

            {/* Quick Demo Credentials Autofill */}
            <div style={{ 
              background: 'rgba(99, 102, 241, 0.08)', 
              border: '1px dashed rgba(99, 102, 241, 0.3)', 
              borderRadius: 'var(--radius-xs)', 
              padding: '10px 12px', 
              marginBottom: '18px'
            }}>
              <div style={{ fontSize: '0.73rem', color: 'var(--text-secondary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={12} color="var(--accent-cyan)" />
                <strong>Quick Demo Fill:</strong> Click to fill evaluator credentials
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={fillDemoAdmin}
                  style={{ flex: 1, fontSize: '0.74rem', padding: '5px 8px' }}
                >
                  👑 Admin Demo
                </button>
                <button 
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={fillDemoStudent}
                  style={{ flex: 1, fontSize: '0.74rem', padding: '5px 8px' }}
                >
                  🎓 Student Demo
                </button>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit}>
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="email"
                    className="form-input"
                    placeholder={role === 'admin' ? 'admin@nxtwave.tech' : 'student@college.edu'}
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    required
                    style={{ paddingLeft: '38px' }}
                  />
                  <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Enter password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    required
                    style={{ paddingLeft: '38px', paddingRight: '38px' }}
                  />
                  <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '10px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '0.96rem', gap: '8px' }}
              >
                Sign In
                <ArrowRight size={17} />
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={() => { setMode('signup'); setError(null); }}
                style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
              >
                Create a student account
              </button>
            </div>
          </div>
        ) : (
          /* ======================== SIGNUP VIEW ======================== */
          <div>
            <div style={{ marginBottom: '18px' }}>
              <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>
                New Student Registration
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                Create Student Account
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Sign up to claim your free AI workshop seat and generate your campus referral link.
              </p>
            </div>

            <form onSubmit={handleSignupSubmit}>
              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label">Full Name *</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text"
                    className="form-input"
                    placeholder="e.g. Rahul Sharma"
                    value={signupForm.name}
                    onChange={e => setSignupForm({ ...signupForm, name: e.target.value })}
                    required
                    style={{ paddingLeft: '38px' }}
                  />
                  <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label">College Email Address *</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="email"
                    className="form-input"
                    placeholder="e.g. rahul.s@college.edu"
                    value={signupForm.email}
                    onChange={e => setSignupForm({ ...signupForm, email: e.target.value })}
                    required
                    style={{ paddingLeft: '38px' }}
                  />
                  <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label">Create Password * (min 6 characters)</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="At least 6 characters"
                    value={signupForm.password}
                    onChange={e => setSignupForm({ ...signupForm, password: e.target.value })}
                    required
                    minLength={6}
                    style={{ paddingLeft: '38px', paddingRight: '38px' }}
                  />
                  <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '10px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label">College / University *</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text"
                    className="form-input"
                    placeholder="e.g. SRM University, JNTU, VIT"
                    value={signupForm.college}
                    onChange={e => setSignupForm({ ...signupForm, college: e.target.value })}
                    required
                    style={{ paddingLeft: '38px' }}
                  />
                  <Building size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Branch *</label>
                  <select 
                    className="form-select"
                    value={signupForm.branch}
                    onChange={e => setSignupForm({ ...signupForm, branch: e.target.value })}
                  >
                    <option value="CSE">CSE / Software</option>
                    <option value="ECE">ECE / Electronics</option>
                    <option value="IT">Information Tech</option>
                    <option value="AI/DS">AI & Data Science</option>
                    <option value="EEE">EEE / Electrical</option>
                    <option value="ME">Mechanical</option>
                    <option value="CE">Civil</option>
                    <option value="Other">Other Branch</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Grad Year *</label>
                  <select 
                    className="form-select"
                    value={signupForm.year}
                    onChange={e => setSignupForm({ ...signupForm, year: e.target.value })}
                  >
                    <option value="2025">2025 (Final Year)</option>
                    <option value="2026">2026 (Pre-final)</option>
                    <option value="2027">2027</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label className="form-label">Campus Referral Code (Optional)</label>
                <input 
                  type="text"
                  className="form-input"
                  placeholder="e.g. RELAY-AARAV1"
                  value={signupForm.referralCode}
                  onChange={e => setSignupForm({ ...signupForm, referralCode: e.target.value.toUpperCase() })}
                  style={{ textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '0.96rem', gap: '8px' }}
              >
                Create Account & Claim Seat
                <ArrowRight size={17} />
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Already registered?{' '}
              <button 
                type="button" 
                onClick={() => { setMode('login'); setError(null); }}
                style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
              >
                Sign In to existing account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
