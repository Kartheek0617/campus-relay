import React from 'react';
import { 
  Sparkles, 
  Terminal, 
  Code2, 
  Rocket, 
  CheckCircle2, 
  Clock, 
  Users, 
  ShieldCheck, 
  ChevronRight,
  ArrowRight,
  HelpCircle,
  Tag,
  LogIn,
  Ticket
} from 'lucide-react';

export default function WorkshopLanding({ onOpenRegister, onOpenAuth, currentUser, activeReferralCode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Referral attribution banner if visiting via link */}
      {activeReferralCode && (
        <div style={{ 
          background: 'rgba(99, 102, 241, 0.15)', 
          border: '1px solid rgba(99, 102, 241, 0.35)', 
          borderRadius: 'var(--radius-sm)', 
          padding: '12px 18px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Tag size={18} color="var(--accent-indigo)" />
            <span style={{ fontSize: '0.9rem', color: '#e0e7ff' }}>
              Campus Referral Active: <strong style={{ color: '#fff', letterSpacing: '0.04em' }}>{activeReferralCode}</strong>
            </span>
          </div>
          <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
            Attribution Locked
          </span>
        </div>
      )}

      {/* Hero Section */}
      <section className="glass-panel" style={{ padding: '48px 36px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '820px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span className="badge badge-indigo">Free 60-Minute Workshop</span>
            <span className="badge badge-cyan">Final-Year Engineering Focus</span>
            <span className="badge badge-muted">Online Live Session</span>
          </div>

          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em' }}>
            Build Your First AI Project in <span className="gradient-text">60 Minutes</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '720px' }}>
            Cut through AI hype with a hands-on, live-coding sprint. Learn a repeatable prompt-to-prototype workflow, build a deployed AI micro-application, and gain a credible project to discuss in technical placement interviews.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', paddingTop: '8px' }}>
            <button 
              className="btn btn-primary btn-lg"
              onClick={onOpenRegister}
              style={{ gap: '10px' }}
            >
              Reserve Free Seat
              <ArrowRight size={18} />
            </button>

            {!currentUser ? (
              <button 
                className="btn btn-secondary btn-lg"
                onClick={() => onOpenAuth && onOpenAuth('login', 'student')}
                style={{ gap: '8px' }}
              >
                <LogIn size={18} />
                Student Sign In
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600 }}>
                <Ticket size={18} />
                <span>Pass Active for {currentUser.name}</span>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <Clock size={16} />
              <span>Exact 60 mins • Zero prerequisites • 100% Free</span>
            </div>
          </div>

          {/* Honest Value Badges */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '14px', 
            marginTop: '20px',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <CheckCircle2 size={18} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.88rem', color: '#fff', display: 'block' }}>Real Portfolio Asset</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Working GitHub repo to showcase in interviews.</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <CheckCircle2 size={18} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.88rem', color: '#fff', display: 'block' }}>Repeatable AI Workflow</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>From problem statement to deployed code fast.</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <CheckCircle2 size={18} color="var(--accent-amber)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.88rem', color: '#fff', display: 'block' }}>Zero False Promises</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>No fake job guarantees. Practical skills only.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Phase Curriculum */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div>
          <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>Curriculum Breakdown</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>
            What You Build in 60 Minutes
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Structured minute-by-minute hands-on sprint with zero filler.
          </p>
        </div>

        <div className="grid-4">
          <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-indigo">00 - 15 MIN</span>
              <Terminal size={18} color="var(--accent-indigo)" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>Phase 1: Architecture & API</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Choose a focused engineering problem. Understand LLM API parameters, structured JSON outputs, and state management.
            </p>
            <div style={{ fontSize: '0.76rem', color: 'var(--accent-cyan)', marginTop: 'auto' }}>
              Key Skill: Prompt Engineering & Schemas
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-cyan">15 - 40 MIN</span>
              <Code2 size={18} color="var(--accent-cyan)" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>Phase 2: Live Code AI App</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Build an interactive frontend connected to an AI model. Implement graceful fallbacks so the app never fails on API limits.
            </p>
            <div style={{ fontSize: '0.76rem', color: 'var(--accent-cyan)', marginTop: 'auto' }}>
              Key Skill: Full-Stack AI Integration
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-emerald">40 - 50 MIN</span>
              <Rocket size={18} color="var(--accent-emerald)" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>Phase 3: Public Deployment</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Ship your application live to a public URL (Vercel/HuggingFace) in under 10 minutes. Get a shareable link for recruiters.
            </p>
            <div style={{ fontSize: '0.76rem', color: 'var(--accent-emerald)', marginTop: 'auto' }}>
              Key Skill: Zero-Config Cloud CI/CD
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-purple">50 - 60 MIN</span>
              <ShieldCheck size={18} color="var(--accent-purple)" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>Phase 4: Interview Framing</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Document architecture, create a clean README, and learn how to answer technical questions in campus placement rounds.
            </p>
            <div style={{ fontSize: '0.76rem', color: 'var(--accent-purple)', marginTop: 'auto' }}>
              Key Skill: Technical Storytelling
            </div>
          </div>
        </div>
      </section>

      {/* Why Final-Year Engineering Students Care */}
      <section className="glass-panel" style={{ padding: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Why Final-Year Engineers Benefit Most
        </h2>
        <div className="grid-3">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--accent-indigo)', fontWeight: 700 }}>
              1. Standing Out in Placement Rounds
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Most college resumes list generic e-commerce clones. A working AI tool with live users and API logic gives interviewers an actual technical conversation topic.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
              2. Overcoming "Where Do I Start?" Paralysis
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              AI tutorials often spend hours on abstract theory. In 60 minutes, you see the complete build cycle end-to-end so you can create your own projects independently.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
              3. Zero Financial Risk (₹0)
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              No paid API credits required. We utilize free developer tiers and local fallbacks so every student can build without spending money.
            </p>
          </div>
        </div>
      </section>

      {/* Honest FAQ Addressing Student Hesitations */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff' }}>
          Frequently Asked Questions
        </h3>
        <div className="grid-2">
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
              Do I need advanced Python or ML experience?
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              No. Basic coding knowledge (any language or web basics) is sufficient. We focus on modern API integration and rapid application scaffolding.
            </p>
          </div>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
              Is there any hidden cost or mandatory upgrade?
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              None. The workshop is completely free. We do not require credit cards or paid subscriptions to participate.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section style={{ 
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.15) 100%)', 
        border: '1px solid rgba(99, 102, 241, 0.3)', 
        borderRadius: 'var(--radius-lg)', 
        padding: '36px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
            Ready to Build Your First AI Project?
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Join 500+ final-year engineering peers across campuses. Reserve your free spot in 30 seconds.
          </p>
        </div>
        <button 
          className="btn btn-primary btn-lg"
          onClick={onOpenRegister}
          style={{ gap: '8px' }}
        >
          Register for Workshop
          <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}
