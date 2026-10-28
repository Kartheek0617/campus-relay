import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  Copy, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  Mail, 
  BookOpen, 
  Briefcase, 
  UserCheck, 
  Edit3,
  ExternalLink
} from 'lucide-react';

export default function AmbassadorToolkit({ store, onSelectAmbassador }) {
  const activeAmbassador = store.ambassadors.find(a => a.id === store.activeAmbassadorId) || store.ambassadors[0];

  const [activeRole, setActiveRole] = useState(activeAmbassador.role);
  const [selectedVariant, setSelectedVariant] = useState('portfolio');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const referralCode = activeAmbassador.code;
  const shareLink = `${window.location.origin}/?ref=${encodeURIComponent(referralCode)}`;

  // Default templates for 3 variants
  const defaultMessages = {
    portfolio: `Hey team! 🚀
Found this super practical, 100% free online workshop by NxtWave: "Build Your First AI Project in 60 Minutes".
Instead of just theory, we'll actually build and deploy an AI micro-app to showcase on GitHub and resume for campus placements.
Takes only 1 hour. Grab a free seat with my campus pass here:
${shareLink}`,

    placement: `Attention 2025/2026 Batch! 💼
If you're gearing up for campus placement technical interviews, knowing how to explain a real AI workflow is becoming a huge differentiator.
NxtWave is conducting a free 60-min hands-on sprint where you build a working AI project from scratch.
Zero cost, high intent. Join using my referral link:
${shareLink}`,

    classmates: `Hey friends! 👋
A few of us from ${activeAmbassador.college} are attending this free 60-min workshop this weekend: "Build Your First AI Project in 60 Minutes".
Let's join together so we can collaborate on our final-year capstone ideas.
Register your free spot here:
${shareLink}`
  };

  const [customMessage, setCustomMessage] = useState(defaultMessages.portfolio);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setCustomMessage(defaultMessages[variant]);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(customMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(customMessage)}`;

  // Milestone logic
  const milestones = [
    { target: 1, title: 'AI Starter Blueprint', desc: 'Architecture templates & prompt libraries', unlocked: activeAmbassador.referrals >= 1 },
    { target: 10, title: 'VIP Q&A Placement Pass', desc: 'Direct 1-on-1 resume review in post-workshop session', unlocked: activeAmbassador.referrals >= 10 },
    { target: 25, title: 'Campus Top Contributor', desc: 'Official leadership recognition & coordinator spotlight', unlocked: activeAmbassador.referrals >= 25 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-indigo">Campus Growth Engine</span>
            <span className="badge badge-cyan">Feature 3</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
            Campus Ambassador & Referral Hub
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Equipping campus captains, technical clubs, and peer ambassadors with attribution links and non-spammy outreach assets.
          </p>
        </div>

        {/* Persona Switcher */}
        <div className="glass-panel" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Persona:</span>
          <select 
            className="form-select" 
            style={{ padding: '6px 10px', fontSize: '0.84rem', width: 'auto' }}
            value={activeAmbassador.id}
            onChange={(e) => onSelectAmbassador(e.target.value)}
          >
            {store.ambassadors.map(amb => (
              <option key={amb.id} value={amb.id}>
                {amb.name} ({amb.role} • {amb.college})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3 Campus Roles Selector */}
      <div className="grid-3">
        <div 
          className={`glass-panel ${activeAmbassador.role === 'Campus Captain' ? 'glass-panel-elevated' : ''}`}
          style={{ 
            padding: '20px', 
            cursor: 'pointer',
            borderColor: activeAmbassador.role === 'Campus Captain' ? 'var(--accent-indigo)' : 'var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="badge badge-indigo">Role 1</span>
            <Award size={18} color="var(--accent-indigo)" />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Campus Captain</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            Leads campus-wide outreach across departments. Coordinates with placement cell coordinators and WhatsApp cohorts.
          </p>
          <div style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', marginTop: '12px' }}>
            Target: 30+ Registrations
          </div>
        </div>

        <div 
          className={`glass-panel ${activeAmbassador.role === 'Student Club Rep' ? 'glass-panel-elevated' : ''}`}
          style={{ 
            padding: '20px', 
            cursor: 'pointer',
            borderColor: activeAmbassador.role === 'Student Club Rep' ? 'var(--accent-cyan)' : 'var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="badge badge-cyan">Role 2</span>
            <Users size={18} color="var(--accent-cyan)" />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Student Club Rep</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            Represents technical societies (IEEE, GDSC, Coding Club). Circulates official workshop briefs in sanctioned club groups.
          </p>
          <div style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', marginTop: '12px' }}>
            Target: 25+ Registrations
          </div>
        </div>

        <div 
          className={`glass-panel ${activeAmbassador.role === 'Peer Ambassador' ? 'glass-panel-elevated' : ''}`}
          style={{ 
            padding: '20px', 
            cursor: 'pointer',
            borderColor: activeAmbassador.role === 'Peer Ambassador' ? 'var(--accent-purple)' : 'var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="badge badge-purple">Role 3</span>
            <UserCheck size={18} color="var(--accent-purple)" />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Peer Ambassador</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            Batchmate-to-batchmate referral. Shares with lab partners, project teams, and close engineering circles.
          </p>
          <div style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', marginTop: '12px' }}>
            Target: 8-15 Registrations
          </div>
        </div>
      </div>

      {/* Ambassador Performance & Referral Code Card */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Ambassador Profile
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>
              {activeAmbassador.name} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 400 }}>• {activeAmbassador.college} ({activeAmbassador.branch})</span>
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Verified Referrals</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                {activeAmbassador.referrals}
              </div>
            </div>
          </div>
        </div>

        {/* Shareable Link Bar */}
        <div style={{ 
          background: 'rgba(10, 15, 28, 0.8)', 
          border: '1px solid var(--border-medium)', 
          borderRadius: 'var(--radius-sm)', 
          padding: '14px 18px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Your Referral Code & Tracking Link
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '2px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#a5b4fc', fontSize: '1.1rem' }}>
                {referralCode}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>|</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {shareLink}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={handleCopyLink}
              style={{ gap: '6px' }}
            >
              <Copy size={14} />
              {copiedLink ? 'Copied Link!' : 'Copy Link'}
            </button>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-cyan btn-sm"
              style={{ gap: '6px', textDecoration: 'none' }}
            >
              <Send size={14} />
              Share to WhatsApp
            </a>
          </div>
        </div>

        {/* Referral Milestones Progress */}
        <div style={{ marginTop: '24px' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Referral Milestone Unlocks:
          </div>
          <div className="grid-3">
            {milestones.map((m, idx) => (
              <div 
                key={idx}
                style={{
                  background: m.unlocked ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid ${m.unlocked ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.74rem', color: m.unlocked ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                    {m.target} {m.target === 1 ? 'Referral' : 'Referrals'}
                  </span>
                  {m.unlocked ? (
                    <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>Unlocked</span>
                  ) : (
                    <span className="badge badge-muted" style={{ fontSize: '0.68rem' }}>Locked</span>
                  )}
                </div>
                <strong style={{ fontSize: '0.9rem', color: m.unlocked ? '#fff' : 'var(--text-secondary)' }}>
                  {m.title}
                </strong>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  {m.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sharing Messaging Suite */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '4px' }}>Outreach Messaging Toolkit</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
              Ready-to-Share Invitation Variants
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Non-spammy, student-centric messages. Edit the text below before copying or sending.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className={`btn btn-sm ${selectedVariant === 'portfolio' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleVariantChange('portfolio')}
              style={{ gap: '6px' }}
            >
              <BookOpen size={14} />
              Portfolio Focus
            </button>
            <button 
              className={`btn btn-sm ${selectedVariant === 'placement' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleVariantChange('placement')}
              style={{ gap: '6px' }}
            >
              <Briefcase size={14} />
              Placement Prep
            </button>
            <button 
              className={`btn btn-sm ${selectedVariant === 'classmates' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleVariantChange('classmates')}
              style={{ gap: '6px' }}
            >
              <Users size={14} />
              Classmate Group
            </button>
          </div>
        </div>

        {/* Live Editable Text Area */}
        <div style={{ position: 'relative' }}>
          <textarea 
            className="form-textarea"
            rows={7}
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.86rem', 
              lineHeight: 1.5,
              padding: '14px',
              background: 'rgba(11, 16, 28, 0.95)'
            }}
          />
          <div style={{ 
            position: 'absolute', 
            bottom: '12px', 
            right: '14px', 
            fontSize: '0.72rem', 
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Edit3 size={12} /> Editable before sending
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '14px' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={handleCopyMessage}
            style={{ gap: '6px' }}
          >
            <Copy size={14} />
            {copiedMessage ? 'Message Copied!' : 'Copy Message'}
          </button>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-cyan btn-sm"
            style={{ gap: '6px', textDecoration: 'none' }}
          >
            <Send size={14} />
            Open in WhatsApp
          </a>
        </div>
      </div>

      {/* College Club Outreach Template */}
      <div className="glass-panel" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Mail size={18} color="var(--accent-indigo)" />
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
            Official Student Club / Department Circular Template
          </h4>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          For Student Club Representatives requesting permission from Faculty Mentors or Club Presidents:
        </p>
        <pre style={{ 
          background: 'rgba(8, 12, 22, 0.8)', 
          padding: '14px', 
          borderRadius: 'var(--radius-sm)', 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.78rem', 
          color: '#cbd5e1', 
          whiteSpace: 'pre-wrap',
          border: '1px solid var(--border-subtle)'
        }}>
{`Subject: Technical Workshop Opportunity for Final-Year Students — "Build Your First AI Project in 60 Mins"

Respected Club Faculty / Coordinator,

As part of our student initiatives to prepare peers for upcoming campus placement rounds, we are coordinating student participation in a free, hands-on workshop: "Build Your First AI Project in 60 Minutes" organized by NxtWave.

Highlights:
- 100% Free hands-on session focusing on practical AI architecture and deployment.
- Zero commercial pitching or false job guarantees; students finish with a working GitHub project.
- Scheduled for 60 minutes this weekend.

We request permission to share the workshop details and free registration link with our members:
${shareLink}

Thank you,
${activeAmbassador.name}
${activeAmbassador.role}, ${activeAmbassador.college}`}
        </pre>
      </div>
    </div>
  );
}
