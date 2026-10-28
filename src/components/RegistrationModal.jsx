import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Copy, 
  Share2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
  Send,
  ExternalLink
} from 'lucide-react';
import { registerStudent } from '../services/store';

export default function RegistrationModal({ isOpen, onClose, initialRefCode, onRegisteredSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    branch: 'CSE',
    year: '2025',
    referralCode: initialRefCode || ''
  });

  const [error, setError] = useState(null);
  const [successResult, setSuccessResult] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialRefCode) {
      setFormData(prev => ({ ...prev, referralCode: initialRefCode }));
    }
  }, [initialRefCode]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    try {
      const result = registerStudent(formData);
      setSuccessResult(result);
      if (onRegisteredSuccess) {
        onRegisteredSuccess(result);
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please check inputs.');
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareUrl = successResult 
    ? `${window.location.origin}/?ref=${encodeURIComponent(successResult.generatedCode)}`
    : '';

  const whatsappText = successResult
    ? `Hey! I just registered for NxtWave's free hands-on workshop "Build Your First AI Project in 60 Minutes". We'll build and deploy a live AI project for placements. Join with my campus referral link: ${shareUrl}`
    : '';

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
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
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {!successResult ? (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <span className="badge badge-indigo" style={{ marginBottom: '8px' }}>
                Workshop Registration
              </span>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                Build Your First AI Project in 60 Mins
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Free live session for engineering students. Zero prerequisites.
              </p>
            </div>

            {error && (
              <div style={{
                background: 'rgba(244, 63, 94, 0.15)',
                border: '1px solid rgba(244, 63, 94, 0.35)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
                color: '#fecdd3',
                fontSize: '0.84rem'
              }}>
                <AlertTriangle size={18} color="#fb7185" style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="e.g. Rohan Varma"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">College Email Address *</label>
                <input 
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="e.g. rohan.v@college.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Email deduplication active. One seat per verified student.
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">College / Institute *</label>
                <input 
                  type="text"
                  name="college"
                  className="form-input"
                  placeholder="e.g. SRM University, JNTU, VIT, etc."
                  value={formData.college}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Branch *</label>
                  <select 
                    name="branch"
                    className="form-select"
                    value={formData.branch}
                    onChange={handleChange}
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
                  <label className="form-label">Graduation Year *</label>
                  <select 
                    name="year"
                    className="form-select"
                    value={formData.year}
                    onChange={handleChange}
                  >
                    <option value="2025">2025 (Final Year)</option>
                    <option value="2026">2026 (Pre-final)</option>
                    <option value="2027">2027</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Campus Referral Code (Optional)
                </label>
                <input 
                  type="text"
                  name="referralCode"
                  className="form-input"
                  placeholder="e.g. RELAY-AARAV1"
                  value={formData.referralCode}
                  onChange={handleChange}
                  style={{ textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  If you received an invite from a club rep or classmate, paste it here.
                </span>
              </div>

              <div style={{ 
                margin: '18px 0', 
                fontSize: '0.74rem', 
                color: 'var(--text-muted)',
                lineHeight: 1.4,
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '12px'
              }}>
                ℹ️ <strong>Challenge Simulation Disclosure:</strong> This registration creates a simulated student record within the local challenge state. No external emails or spam are sent.
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '1rem', gap: '8px' }}
              >
                Confirm Free Seat
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div style={{ textAlign: 'center', padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}>
              <CheckCircle2 size={32} color="var(--accent-emerald)" />
            </div>

            <div>
              <span className="badge badge-emerald" style={{ marginBottom: '8px' }}>
                Seat Confirmed
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>
                You're In, {successResult.registration.name.split(' ')[0]}!
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                Workshop: <strong>"Build Your First AI Project in 60 Minutes"</strong>
              </p>
              {successResult.attributedTo && (
                <div style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>
                  ✓ Referral attributed to: <strong>{successResult.attributedTo}</strong>
                </div>
              )}
            </div>

            {/* Unique Referral Code Box */}
            <div className="glass-panel" style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.95)', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  YOUR UNIQUE REFERRAL CODE
                </span>
                <span className="badge badge-indigo">Peer Ambassador</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(0, 0, 0, 0.35)',
                border: '1px dashed var(--accent-indigo)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                marginBottom: '10px'
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, color: '#a5b4fc', letterSpacing: '0.05em' }}>
                  {successResult.generatedCode}
                </span>
                <button 
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleCopy(successResult.generatedCode)}
                  style={{ gap: '6px' }}
                >
                  <Copy size={14} />
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                Share with classmates. 1 referral unlocks the <em>AI Project Starter Blueprint</em>.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleCopy(shareUrl)}
                  style={{ gap: '6px' }}
                >
                  <Copy size={14} />
                  Copy Invite Link
                </button>
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-cyan btn-sm"
                  style={{ gap: '6px', textDecoration: 'none' }}
                >
                  <Send size={14} />
                  Share on WhatsApp
                </a>
              </div>
            </div>

            <button 
              className="btn btn-outline"
              onClick={onClose}
              style={{ width: '100%', marginTop: '4px' }}
            >
              Done & Return to Workshop
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
