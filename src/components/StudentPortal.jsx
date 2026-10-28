import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  Trophy, 
  Award, 
  Calendar, 
  Clock, 
  UserCheck, 
  ExternalLink, 
  Ticket, 
  LogOut, 
  Users, 
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

export default function StudentPortal({ 
  user, 
  store, 
  onLogout, 
  onNavigateLeaderboard,
  onOpenRegister 
}) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!user) return null;

  // Find user's code and referrals count
  const myCode = user.referralCode || store.myReferralCode || 'RELAY-STU101';
  
  // Calculate how many students registered using this user's code
  const referredStudents = store.registrations.filter(r => 
    r.refCode && r.refCode.toUpperCase() === myCode.toUpperCase()
  );
  
  // Also check if user matches any ambassador record
  const matchingAmbassador = store.ambassadors.find(a => 
    a.code.toUpperCase() === myCode.toUpperCase() || 
    a.name.toLowerCase() === user.name.toLowerCase()
  );

  const totalReferrals = Math.max(
    referredStudents.length, 
    matchingAmbassador ? matchingAmbassador.referrals : 0,
    user.referrals || 0
  );

  // Referral URL
  const referralLink = `${window.location.origin}/?ref=${encodeURIComponent(myCode)}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(myCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shareText = `Hey! I just claimed my free seat for NxtWave's live workshop: "Build Your First AI Project in 60 Minutes". Zero prerequisites, hands-on coding, live deployment! Claim your free seat here using my campus referral code ${myCode}: ${referralLink}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  // Milestone levels
  const milestones = [
    { level: 1, target: 1, title: 'Starter Blueprint', desc: 'AI Project Starter Blueprint & Python boilerplate templates', achieved: totalReferrals >= 1 },
    { level: 2, target: 10, title: 'VIP Q&A Pass', desc: 'Exclusive 30-min live Q&A with Senior AI Engineers + Resume Critique', achieved: totalReferrals >= 10 },
    { level: 3, target: 25, title: 'Top Contributor', desc: 'Official NxtWave Growth Ambassador Certificate + Swag Pack', achieved: totalReferrals >= 25 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Top Banner / Student Identity */}
      <div className="glass-panel" style={{ padding: '28px 32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '240px',
          height: '240px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge badge-emerald" style={{ gap: '6px' }}>
                <CheckCircle2 size={13} />
                Student Portal Active
              </span>
              <span className="badge badge-indigo">
                {user.college || 'Engineering College'}
              </span>
              <span className="badge badge-cyan">
                {user.branch || 'CSE'} • {user.year || '2025'}
              </span>
            </div>

            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
              Welcome back, {user.name}!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              College Email: <strong style={{ color: '#fff' }}>{user.email}</strong> • Your campus referral program is active.
            </p>
          </div>

          <button 
            onClick={onLogout}
            className="btn btn-outline btn-sm"
            style={{ gap: '6px', color: '#fb7185', borderColor: 'rgba(244, 63, 94, 0.3)' }}
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </div>

      {/* Workshop Seat Ticket */}
      <div className="glass-panel" style={{ 
        padding: '24px 28px', 
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.35)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px dashed var(--border-medium)', paddingBottom: '18px', marginBottom: '18px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Ticket size={18} color="var(--accent-cyan)" />
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                Verified Workshop Pass
              </span>
              <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>Confirmed</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              Build Your First AI Project in 60 Minutes
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
              Live build sprint with Senior AI Engineers. Deployment to production + placement portfolio asset.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Ticket ID</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
              NXW-AI-{myCode}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', fontSize: '0.82rem' }}>
          <div>
            <div style={{ color: 'var(--text-muted)' }}>Workshop Date</div>
            <div style={{ color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
              <Calendar size={14} color="var(--accent-indigo)" />
              Saturday, 6:00 PM IST
            </div>
          </div>

          <div>
            <div style={{ color: 'var(--text-muted)' }}>Format & Duration</div>
            <div style={{ color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
              <Clock size={14} color="var(--accent-cyan)" />
              60 Mins Hands-on Coding
            </div>
          </div>

          <div>
            <div style={{ color: 'var(--text-muted)' }}>Prerequisites</div>
            <div style={{ color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
              <UserCheck size={14} color="var(--accent-emerald)" />
              Zero — Beginners Welcome
            </div>
          </div>

          <div>
            <div style={{ color: 'var(--text-muted)' }}>Live Session Access</div>
            <a 
              href="#session-link" 
              onClick={(e) => { e.preventDefault(); alert('Session link is active and will open 15 minutes before the sprint starts on Saturday!'); }}
              style={{ color: 'var(--accent-cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px', textDecoration: 'none' }}
            >
              <ExternalLink size={14} />
              Open Live Stream Room
            </a>
          </div>
        </div>
      </div>

      {/* Referral Hub Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Referral Code & Share Card */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Share2 size={18} color="var(--accent-indigo)" />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
              Your Campus Referral Code
            </h4>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Share this code or link with college batchmates. When they register, you earn verified peer referrals.
          </p>

          {/* Big Code Box */}
          <div style={{ 
            background: 'rgba(99, 102, 241, 0.12)', 
            border: '1px solid rgba(99, 102, 241, 0.4)', 
            borderRadius: 'var(--radius-sm)', 
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--accent-indigo)', textTransform: 'uppercase', fontWeight: 600 }}>
                Unique Referral Code
              </div>
              <div style={{ fontSize: '1.35rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>
                {myCode}
              </div>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={handleCopyCode}
              style={{ gap: '6px' }}
            >
              {copiedCode ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
              {copiedCode ? 'Copied!' : 'Copy Code'}
            </button>
          </div>

          {/* Referral Link Box */}
          <div style={{ marginBottom: '16px' }}>
            <label className="form-label" style={{ fontSize: '0.78rem' }}>Direct Referral URL</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                readOnly 
                value={referralLink} 
                className="form-input" 
                style={{ fontSize: '0.8rem', padding: '8px 12px', background: 'rgba(0,0,0,0.3)' }}
              />
              <button 
                className="btn btn-outline btn-sm" 
                onClick={handleCopyLink}
                title="Copy full invite link"
              >
                {copiedLink ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          {/* WhatsApp Share CTA */}
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success"
            style={{ width: '100%', gap: '8px', padding: '12px' }}
          >
            <Share2 size={16} />
            Share to WhatsApp College Groups
          </a>
        </div>

        {/* Milestone Tracker Card */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trophy size={18} color="var(--accent-cyan)" />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                Ambassador Rewards
              </h4>
            </div>
            <span className="badge badge-indigo">
              {totalReferrals} {totalReferrals === 1 ? 'Referral' : 'Referrals'}
            </span>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Unlock exclusive career perks and placement assets as classmates join using your referral.
          </p>

          {/* Milestone List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {milestones.map(m => (
              <div 
                key={m.level}
                style={{
                  background: m.achieved ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${m.achieved ? 'rgba(16, 185, 129, 0.35)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: m.achieved ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {m.achieved ? (
                    <CheckCircle2 size={18} color="var(--accent-emerald)" />
                  ) : (
                    <Award size={18} color="var(--text-muted)" />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.86rem', color: m.achieved ? '#fff' : 'var(--text-secondary)' }}>
                      {m.title}
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: m.achieved ? 'var(--accent-emerald)' : 'var(--text-muted)', fontWeight: 600 }}>
                      {m.achieved ? 'UNLOCKED' : `${m.target} Referrals needed`}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {m.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              onClick={onNavigateLeaderboard}
              className="btn btn-outline btn-sm"
              style={{ gap: '6px' }}
            >
              <Trophy size={14} />
              View Campus Leaderboard
            </button>
          </div>
        </div>
      </div>

      {/* Referred Friends Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="var(--accent-indigo)" />
              Students Registered via Your Referral ({referredStudents.length})
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Real-time attribution log of classmates registered with code {myCode}.
            </p>
          </div>
        </div>

        {referredStudents.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '36px 20px', 
            background: 'rgba(255, 255, 255, 0.02)', 
            borderRadius: 'var(--radius-sm)',
            border: '1px dashed var(--border-subtle)'
          }}>
            <GraduationCap size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
            <h5 style={{ color: '#fff', fontSize: '0.98rem', marginBottom: '4px' }}>No peer registrations yet</h5>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', maxWidth: '420px', margin: '0 auto 16px auto' }}>
              Share your unique referral code or link in your college WhatsApp groups to start unlocking rewards.
            </p>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-cyan btn-sm"
              style={{ gap: '6px' }}
            >
              <Share2 size={14} />
              Share Link Now
            </a>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>College</th>
                  <th>Branch</th>
                  <th>Grad Year</th>
                  <th>Seat Status</th>
                </tr>
              </thead>
              <tbody>
                {referredStudents.map((stu, idx) => (
                  <tr key={stu.id || idx}>
                    <td style={{ fontWeight: 600, color: '#fff' }}>{stu.name}</td>
                    <td>{stu.college}</td>
                    <td><span className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>{stu.branch}</span></td>
                    <td>{stu.year}</td>
                    <td><span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>Verified</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
