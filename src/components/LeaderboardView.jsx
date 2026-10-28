import React, { useState } from 'react';
import { Trophy, Medal, Award, Users, Filter, Search, CheckCircle, Flame } from 'lucide-react';

export default function LeaderboardView({ store }) {
  const [filterRole, setFilterRole] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Sort ambassadors by referrals descending
  const sortedAmbassadors = [...store.ambassadors].sort((a, b) => b.referrals - a.referrals);

  const filtered = sortedAmbassadors.filter(a => {
    const matchesRole = filterRole === 'ALL' || a.role === filterRole;
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.college.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  // Calculate college totals
  const collegeMap = {};
  store.registrations.forEach(r => {
    collegeMap[r.college] = (collegeMap[r.college] || 0) + 1;
  });

  const collegeRanking = Object.entries(collegeMap)
    .map(([college, count]) => ({ college, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-indigo">Attribution Engine</span>
            <span className="badge badge-amber">Feature 4</span>
            <span className="simulation-pill">Simulated Data Model</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
            Campus Leaderboard & Referral Attribution
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Real-time attribution tracking across campus captains, student clubs, and peer ambassadors.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text"
              placeholder="Search ambassador or college..."
              className="form-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '32px', fontSize: '0.84rem', width: '230px' }}
            />
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '12px' }} />
          </div>

          <select 
            className="form-select"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{ fontSize: '0.84rem', width: 'auto' }}
          >
            <option value="ALL">All Roles</option>
            <option value="Campus Captain">Campus Captains</option>
            <option value="Student Club Rep">Club Representatives</option>
            <option value="Peer Ambassador">Peer Ambassadors</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Top Ambassadors Table + College Ranking */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Ambassador Table */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trophy size={18} color="#fbbf24" />
              Top Campus Ambassadors
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Showing {filtered.length} active ambassadors
            </span>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>Rank</th>
                  <th>Ambassador</th>
                  <th>College & Branch</th>
                  <th>Role</th>
                  <th style={{ textAlign: 'center' }}>Referrals</th>
                  <th>Milestone Tier</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((amb, index) => {
                  const rank = sortedAmbassadors.findIndex(a => a.id === amb.id) + 1;
                  return (
                    <tr key={amb.id}>
                      <td style={{ fontWeight: 700, color: rank === 1 ? '#fbbf24' : rank === 2 ? '#94a3b8' : rank === 3 ? '#b45309' : 'var(--text-muted)' }}>
                        {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
                      </td>
                      <td>
                        <strong style={{ color: '#fff', display: 'block' }}>{amb.name}</strong>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#a5b4fc' }}>
                          {amb.code}
                        </span>
                      </td>
                      <td>
                        <div style={{ color: 'var(--text-primary)', fontSize: '0.84rem' }}>{amb.college}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{amb.branch}</div>
                      </td>
                      <td>
                        <span className={`badge ${
                          amb.role === 'Campus Captain' ? 'badge-indigo' : 
                          amb.role === 'Student Club Rep' ? 'badge-cyan' : 'badge-purple'
                        }`}>
                          {amb.role}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ 
                          fontFamily: 'var(--font-mono)', 
                          fontWeight: 800, 
                          fontSize: '1.05rem', 
                          color: amb.referrals > 15 ? 'var(--accent-cyan)' : '#fff' 
                        }}>
                          {amb.referrals}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>
                          {amb.milestone}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* College Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={18} color="#f97316" />
              College Registrations
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {collegeRanking.slice(0, 6).map((item, idx) => {
                const maxCount = collegeRanking[0]?.count || 1;
                const pct = Math.round((item.count / maxCount) * 100);
                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                      <span style={{ color: '#fff', fontWeight: 600 }}>{item.college}</span>
                      <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        {item.count}
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #06b6d4)', borderRadius: '3px' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Attribution Integrity Guardrails Card */}
          <div className="glass-panel" style={{ padding: '18px' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
              Attribution Safeguards
            </h4>
            <ul style={{ paddingLeft: '18px', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <li><strong>Self-Referrals Blocked:</strong> Users cannot refer themselves.</li>
              <li><strong>Email Deduplication:</strong> One registration per email address.</li>
              <li><strong>First-Touch Policy:</strong> Attribution locks to first valid code applied.</li>
              <li><strong>Graceful Fallback:</strong> Unrecognized codes register without crashing.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
