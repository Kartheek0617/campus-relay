import React, { useState } from 'react';
import { 
  Target, 
  Calendar, 
  IndianRupee, 
  TrendingUp, 
  Share2, 
  PieChart, 
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Search,
  Download,
  Trash2,
  Users,
  GraduationCap,
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { getCampaignMetrics, loadUsers, deleteStudentUser } from '../services/store';

export default function OperationsDashboard({ store, currentUser, onOpenAuth, onResetData }) {
  const metrics = getCampaignMetrics(store);
  const isAdmin = currentUser && currentUser.role === 'admin';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [userList, setUserList] = useState(loadUsers());

  const handleRefreshUsers = () => {
    setUserList(loadUsers());
  };

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete student account for ${userName}?`)) {
      deleteStudentUser(userId);
      handleRefreshUsers();
    }
  };

  // Combine student registrations with user accounts
  const registeredStudents = store.registrations.map(reg => {
    const matchingUser = userList.find(u => u.email.toLowerCase() === reg.email.toLowerCase());
    return {
      ...reg,
      userId: matchingUser ? matchingUser.id : null,
      hasAccount: !!matchingUser
    };
  });

  // Filter students based on search and branch
  const filteredStudents = registeredStudents.filter(s => {
    const matchSearch = searchTerm === '' || 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.generatedCode && s.generatedCode.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchBranch = selectedBranch === 'ALL' || s.branch === selectedBranch;

    return matchSearch && matchBranch;
  });

  const handleExportCsv = () => {
    const headers = ['ID', 'Name', 'Email', 'College', 'Branch', 'Graduation Year', 'Referral Code', 'Referred By', 'Source', 'Has Account'];
    const rows = filteredStudents.map(s => [
      `"${s.id}"`,
      `"${s.name}"`,
      `"${s.email}"`,
      `"${s.college}"`,
      `"${s.branch}"`,
      `"${s.year}"`,
      `"${s.generatedCode || ''}"`,
      `"${s.refCode || 'DIRECT'}"`,
      `"${s.source || ''}"`,
      s.hasAccount ? 'YES' : 'NO'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nxtwave_student_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const referralTotal = metrics.sourceBreakdown.club_outreach + 
                        metrics.sourceBreakdown.peer_ambassador + 
                        metrics.sourceBreakdown.campus_captain;
  const referralPct = ((referralTotal / Math.max(1, metrics.total)) * 100).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-indigo">Campaign Operator View</span>
            <span className="badge badge-cyan">Feature 5</span>
            <span className="simulation-pill">Simulated Telemetry</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
            Growth Operations Dashboard
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Tracking the 7-day acquisition campaign: 500 registration goal on a strict ₹2,000 budget.
          </p>
        </div>

        <button 
          className="btn btn-outline btn-sm"
          onClick={onResetData}
          style={{ gap: '6px' }}
        >
          <RotateCcw size={14} />
          Reset Demo State
        </button>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid-4">
        {/* Total Registrations */}
        <div className="stat-card">
          <div className="stat-header">
            <span>TOTAL REGISTRATIONS</span>
            <Target size={16} color="var(--accent-indigo)" />
          </div>
          <div className="stat-value" style={{ color: '#a5b4fc' }}>
            {metrics.total} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ 500</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden', margin: '4px 0' }}>
            <div style={{ width: `${Math.min(100, metrics.targetCompletionPct)}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #06b6d4)' }} />
          </div>
          <div className="stat-subtext">
            <strong>{metrics.targetCompletionPct}%</strong> of 500-seat milestone reached
          </div>
        </div>

        {/* Required Daily Pace */}
        <div className="stat-card">
          <div className="stat-header">
            <span>REQUIRED DAILY PACE</span>
            <TrendingUp size={16} color="var(--accent-cyan)" />
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-cyan)' }}>
            {metrics.requiredDailyPace}
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}> /day</span>
          </div>
          <div className="stat-subtext">
            {metrics.registrationsRequired} registrations needed across {metrics.daysRemaining} days left
          </div>
        </div>

        {/* Budget & Target Blended Ratio */}
        <div className="stat-card">
          <div className="stat-header">
            <span>BUDGET UTILIZATION</span>
            <IndianRupee size={16} color="#fbbf24" />
          </div>
          <div className="stat-value" style={{ color: '#fde047' }}>
            ₹{metrics.totalBudget}
          </div>
          <div className="stat-subtext">
            Target Blended Ratio: <strong>₹{metrics.blendedTargetCPA}</strong> / registration
          </div>
        </div>

        {/* Referral Contribution */}
        <div className="stat-card">
          <div className="stat-header">
            <span>CAMPUS REFERRAL SHARE</span>
            <Share2 size={16} color="var(--accent-emerald)" />
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-emerald)' }}>
            {referralPct}%
          </div>
          <div className="stat-subtext">
            {referralTotal} of {metrics.total} driven by peer & club referrals
          </div>
        </div>
      </div>

      {/* Main Grid: Channels Breakdown + 7-Day Cumulative Pace */}
      <div className="grid-2">
        {/* Source Breakdown */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
                Acquisition by Channel Source
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Attributed registrations across student networks
              </p>
            </div>
            <span className="badge badge-indigo">Attributed</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Student Club Outreach */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '4px' }}>
                <span style={{ color: '#fff', fontWeight: 600 }}>🏛️ Student Club Outreach (IEEE / GDSC / Coding)</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  {metrics.sourceBreakdown.club_outreach}
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(metrics.sourceBreakdown.club_outreach / Math.max(1, metrics.total)) * 100}%`, height: '100%', background: '#06b6d4' }} />
              </div>
            </div>

            {/* Peer Ambassadors */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '4px' }}>
                <span style={{ color: '#fff', fontWeight: 600 }}>🤝 Peer-to-Peer Ambassadors</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-indigo)', fontWeight: 700 }}>
                  {metrics.sourceBreakdown.peer_ambassador}
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(metrics.sourceBreakdown.peer_ambassador / Math.max(1, metrics.total)) * 100}%`, height: '100%', background: '#6366f1' }} />
              </div>
            </div>

            {/* Campus Captains */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '4px' }}>
                <span style={{ color: '#fff', fontWeight: 600 }}>⭐ Campus Captain Cohorts</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#a855f7', fontWeight: 700 }}>
                  {metrics.sourceBreakdown.campus_captain}
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(metrics.sourceBreakdown.campus_captain / Math.max(1, metrics.total)) * 100}%`, height: '100%', background: '#a855f7' }} />
              </div>
            </div>

            {/* Direct Student Communities */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '4px' }}>
                <span style={{ color: '#fff', fontWeight: 600 }}>🌐 Direct Placement & WhatsApp Circles</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#10b981', fontWeight: 700 }}>
                  {metrics.sourceBreakdown.direct_community}
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(metrics.sourceBreakdown.direct_community / Math.max(1, metrics.total)) * 100}%`, height: '100%', background: '#10b981' }} />
              </div>
            </div>

            {/* Paid Test */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '4px' }}>
                <span style={{ color: '#fff', fontWeight: 600 }}>🎯 Controlled Paid Distribution Test</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#f59e0b', fontWeight: 700 }}>
                  {metrics.sourceBreakdown.paid_experiment}
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(metrics.sourceBreakdown.paid_experiment / Math.max(1, metrics.total)) * 100}%`, height: '100%', background: '#f59e0b' }} />
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Cumulative Acquisition Run-Rate */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
                7-Day Cumulative Acquisition Pace
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Target: 500 registrations by Day 7
              </p>
            </div>
            <span className="badge badge-emerald">On Track</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {metrics.dailyTrend.map((d, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.84rem' }}>
                <span style={{ width: '90px', color: d.isProjection ? 'var(--text-muted)' : '#fff', fontWeight: 600 }}>
                  {d.day}
                </span>
                <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${(d.cumulative / 500) * 100}%`, 
                    height: '100%', 
                    background: d.isProjection ? 'rgba(99, 102, 241, 0.4)' : '#6366f1',
                    borderRadius: '4px' 
                  }} />
                </div>
                <span style={{ width: '70px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: d.isProjection ? 'var(--text-muted)' : '#a5b4fc' }}>
                  {d.cumulative} {d.isProjection && <span style={{ fontSize: '0.68rem' }}>(est)</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ₹2,000 Budget Allocation Breakdown */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IndianRupee size={18} color="#fbbf24" />
              Campaign Budget Architecture (₹2,000 Maximum)
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Transparent capital allocation. Blended target budget ratio: <strong>₹2,000 / 500 = ₹4.00 per registrant</strong>.
            </p>
          </div>
          <span className="badge badge-amber">100% Accounted</span>
        </div>

        <div className="grid-4">
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>PAID EXPERIMENT</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>₹800</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              40% — Micro-targeted Instagram/LinkedIn test to validate messaging.
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>CAMPUS ACTIVATION</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>₹500</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              25% — Digital poster kits, QR badges & club recognition incentives.
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>OUTREACH COLLATERAL</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a855f7', fontFamily: 'var(--font-mono)' }}>₹400</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              20% — Placement prep guides & project starter blueprints.
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>CONTINGENCY RESERVE</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>₹300</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              15% — Buffer reserved if paid channel underperforms.
            </div>
          </div>
        </div>
      </div>

      {/* Admin Registered Students & User Directory */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-indigo">
                {isAdmin ? '👑 Verified Admin Control' : 'Public Telemetry Mode'}
              </span>
              <span className="badge badge-cyan">{filteredStudents.length} Students Shown</span>
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} color="var(--accent-indigo)" />
              Registered Students & Account Directory
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Comprehensive lead attribution, college records, and student account management.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {isAdmin ? (
              <button 
                onClick={handleExportCsv}
                className="btn btn-primary btn-sm"
                style={{ gap: '6px' }}
              >
                <Download size={14} />
                Export CSV ({filteredStudents.length})
              </button>
            ) : (
              <button 
                onClick={() => onOpenAuth('login', 'admin')}
                className="btn btn-cyan btn-sm"
                style={{ gap: '6px' }}
              >
                <KeyRound size={14} />
                Sign In as Admin to Manage
              </button>
            )}
          </div>
        </div>

        {/* Admin Login Notice if not admin */}
        {!isAdmin && (
          <div style={{
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 16px',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} color="var(--accent-indigo)" />
              <span style={{ fontSize: '0.84rem', color: '#c7d2fe' }}>
                You are viewing student records in read-only telemetry mode. Log in as an Admin to delete records or export CSV.
              </span>
            </div>
            <button 
              onClick={() => onOpenAuth('login', 'admin')}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.78rem', padding: '4px 10px', color: '#fff', borderColor: 'var(--accent-indigo)' }}
            >
              Admin Sign In
            </button>
          </div>
        )}

        {/* Filters & Search */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '18px' }}>
          <div style={{ position: 'relative', flex: '1 1 240px' }}>
            <input 
              type="text" 
              placeholder="Search by student name, email, college, or referral code..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '36px', fontSize: '0.84rem' }}
            />
            <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          </div>

          <select 
            value={selectedBranch}
            onChange={e => setSelectedBranch(e.target.value)}
            className="form-select"
            style={{ width: '160px', fontSize: '0.84rem' }}
          >
            <option value="ALL">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="IT">IT</option>
            <option value="AI/DS">AI/DS</option>
            <option value="EEE">EEE</option>
            <option value="ME">Mechanical</option>
          </select>
        </div>

        {/* Students Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>College / Institute</th>
                <th>Branch & Year</th>
                <th>Referral Code</th>
                <th>Source Attribution</th>
                <th>Account</th>
                {isAdmin && <th>Admin Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 7 : 6} style={{ textAlign: 'center', padding: '28px', color: 'var(--text-muted)' }}>
                    No students match the current search or branch filter.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s, idx) => (
                  <tr key={s.id || idx}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(6, 182, 212, 0.4))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          color: '#fff'
                        }}>
                          {s.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: '#fff' }}>{s.name}</div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{s.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{s.college}</td>
                    <td>
                      <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>
                        {s.branch} • {s.year}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent-cyan)', fontSize: '0.8rem' }}>
                        {s.generatedCode || 'N/A'}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {s.refCode ? `Referred by: ${s.refCode}` : 'Direct registration'}
                      </span>
                    </td>
                    <td>
                      {s.hasAccount ? (
                        <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>
                          Verified
                        </span>
                      ) : (
                        <span className="badge" style={{ fontSize: '0.68rem', background: 'rgba(255,255,255,0.06)' }}>
                          Seat Only
                        </span>
                      )}
                    </td>
                    {isAdmin && (
                      <td>
                        {s.userId && (
                          <button 
                            onClick={() => handleDeleteUser(s.userId, s.name)}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '4px 8px', color: '#fb7185', borderColor: 'rgba(244,63,94,0.3)', fontSize: '0.72rem' }}
                            title="Delete Student Record"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
