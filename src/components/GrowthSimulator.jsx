import React, { useState } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  IndianRupee, 
  Zap, 
  ShieldCheck,
  Calculator
} from 'lucide-react';

export default function GrowthSimulator() {
  // Preset scenarios
  const presets = {
    base: {
      name: 'Base Scenario (Target 500)',
      activeClubs: 20,
      regsPerClub: 12,
      activeAmbassadors: 20,
      refsPerAmbassador: 8,
      directCommunities: 100,
      budgetSpend: 2000
    },
    conservative: {
      name: 'Conservative Scenario (320)',
      activeClubs: 15,
      regsPerClub: 8, // 120
      activeAmbassadors: 15,
      refsPerAmbassador: 6, // 90
      directCommunities: 60, // 60
      budgetSpend: 2000
    },
    aggressive: {
      name: 'High-Yield Scenario (680)',
      activeClubs: 25,
      regsPerClub: 14, // 350
      activeAmbassadors: 25,
      refsPerAmbassador: 10, // 250
      directCommunities: 80, // 80
      budgetSpend: 2000
    }
  };

  const [params, setParams] = useState(presets.base);
  const [activePreset, setActivePreset] = useState('base');

  const handlePreset = (key) => {
    setActivePreset(key);
    setParams(presets[key]);
  };

  const handleChange = (key, val) => {
    setParams(prev => ({ ...prev, [key]: Number(val) }));
    setActivePreset('custom');
  };

  // Mathematically consistent formula:
  // Club Registrations = Clubs × RegsPerClub
  // Ambassador Registrations = Ambassadors × RefsPerAmbassador
  // Total = Clubs + Ambassadors + DirectCommunities
  const clubTotal = params.activeClubs * params.regsPerClub;
  const ambassadorTotal = params.activeAmbassadors * params.refsPerAmbassador;
  const directTotal = params.directCommunities;
  const grandTotal = clubTotal + ambassadorTotal + directTotal;

  const target = 500;
  const variance = grandTotal - target;
  const blendedCPA = (params.budgetSpend / Math.max(1, grandTotal)).toFixed(2);
  const requiredPace = (grandTotal / 7).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-indigo">Interactive Modeling</span>
            <span className="badge badge-cyan">Feature 6</span>
            <span className="simulation-pill">Mathematical Model</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
            Interactive Growth Simulator
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Adjust operational acquisition assumptions to test channel sensitivity and forecast outcomes against the 500-student target.
          </p>
        </div>

        {/* Preset Selector */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            className={`btn btn-sm ${activePreset === 'base' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handlePreset('base')}
          >
            Base (500 Goal)
          </button>
          <button 
            className={`btn btn-sm ${activePreset === 'conservative' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handlePreset('conservative')}
          >
            Conservative (320)
          </button>
          <button 
            className={`btn btn-sm ${activePreset === 'aggressive' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handlePreset('aggressive')}
          >
            High-Yield (680)
          </button>
        </div>
      </div>

      {/* Forecast Output Banner */}
      <div className="glass-panel" style={{ 
        padding: '24px', 
        background: variance >= 0 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)',
        borderColor: variance >= 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              PROJECTED REGISTRATIONS
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: variance >= 0 ? 'var(--accent-emerald)' : '#fb7185' }}>
              {grandTotal} <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/ 500</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {variance >= 0 ? (
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  ✓ Target Achieved (+{variance} surplus)
                </span>
              ) : (
                <span style={{ color: '#fb7185', fontWeight: 600 }}>
                  ⚠️ Gap of {Math.abs(variance)} registrations to target
                </span>
              )}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              BLENDED BUDGET COST PER SEAT
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#fbbf24' }}>
              ₹{blendedCPA}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Total Campaign Budget: ₹{params.budgetSpend}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              REQUIRED RUN-RATE
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
              {requiredPace} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/day</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Over 7-day sprint execution
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Mathematical Breakdown */}
      <div className="grid-2">
        {/* Controls */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={18} color="var(--accent-indigo)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
              Acquisition Lever Adjustments
            </h3>
          </div>

          {/* Slider 1: Active Clubs */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', marginBottom: '6px' }}>
              <span style={{ color: '#fff', fontWeight: 600 }}>Active College Clubs</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                {params.activeClubs} clubs
              </span>
            </div>
            <input 
              type="range"
              min={5}
              max={40}
              value={params.activeClubs}
              onChange={(e) => handleChange('activeClubs', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
            />
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              College technical chapters (IEEE, GDSC, Coding Clubs) with approved coordinator access.
            </div>
          </div>

          {/* Slider 2: Registrations per Club */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', marginBottom: '6px' }}>
              <span style={{ color: '#fff', fontWeight: 600 }}>Avg Registrations per Club</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                {params.regsPerClub} students / club
              </span>
            </div>
            <input 
              type="range"
              min={4}
              max={25}
              value={params.regsPerClub}
              onChange={(e) => handleChange('regsPerClub', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
            />
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Expected verified student registrations per mobilized club circular.
            </div>
          </div>

          {/* Slider 3: Active Ambassadors */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', marginBottom: '6px' }}>
              <span style={{ color: '#fff', fontWeight: 600 }}>Active Student Ambassadors</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-indigo)', fontWeight: 700 }}>
                {params.activeAmbassadors} ambassadors
              </span>
            </div>
            <input 
              type="range"
              min={5}
              max={40}
              value={params.activeAmbassadors}
              onChange={(e) => handleChange('activeAmbassadors', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-indigo)' }}
            />
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Campus captains & motivated final-year student leaders with personal codes.
            </div>
          </div>

          {/* Slider 4: Referrals per Ambassador */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', marginBottom: '6px' }}>
              <span style={{ color: '#fff', fontWeight: 600 }}>Avg Referrals per Ambassador</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-indigo)', fontWeight: 700 }}>
                {params.refsPerAmbassador} referrals / person
              </span>
            </div>
            <input 
              type="range"
              min={2}
              max={20}
              value={params.refsPerAmbassador}
              onChange={(e) => handleChange('refsPerAmbassador', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-indigo)' }}
            />
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Batchmate referrals per active student ambassador.
            </div>
          </div>

          {/* Slider 5: Direct Community Registrations */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', marginBottom: '6px' }}>
              <span style={{ color: '#fff', fontWeight: 600 }}>Direct Placement Groups & Circles</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                {params.directCommunities} students
              </span>
            </div>
            <input 
              type="range"
              min={20}
              max={200}
              value={params.directCommunities}
              onChange={(e) => handleChange('directCommunities', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-emerald)' }}
            />
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Direct registrations from opted-in technical discord servers and placement circles.
            </div>
          </div>
        </div>

        {/* Mathematical Model Reconciliation */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calculator size={18} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
              Channel Contribution & Math Verification
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.88rem' }}>
                  1. College Clubs Channel
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  {clubTotal} seats ({((clubTotal / grandTotal) * 100).toFixed(0)}%)
                </span>
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Formula: {params.activeClubs} clubs × {params.regsPerClub} regs = <strong>{clubTotal}</strong>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.88rem' }}>
                  2. Student Ambassadors & Peer Referrals
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-indigo)', fontWeight: 700 }}>
                  {ambassadorTotal} seats ({((ambassadorTotal / grandTotal) * 100).toFixed(0)}%)
                </span>
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Formula: {params.activeAmbassadors} ambassadors × {params.refsPerAmbassador} refs = <strong>{ambassadorTotal}</strong>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.88rem' }}>
                  3. Direct Student Placement Communities
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  {directTotal} seats ({((directTotal / grandTotal) * 100).toFixed(0)}%)
                </span>
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Organic placement group discovery + paid experiment sample = <strong>{directTotal}</strong>
              </div>
            </div>

            <div style={{ 
              background: 'rgba(99, 102, 241, 0.1)', 
              padding: '14px', 
              borderRadius: 'var(--radius-sm)', 
              border: '1px solid rgba(99, 102, 241, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.92rem' }}>
                Total Forecast Sum
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', color: '#a5b4fc', fontWeight: 800, fontSize: '1.1rem' }}>
                {grandTotal} Registrations
              </span>
            </div>
          </div>

          {/* Double-counting mitigation */}
          <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.5, borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
            <strong>🛡️ Double-Counting Mitigation:</strong> Each registrant's email is uniquely deduplicated in the database. When a student receives links from both a club circular and a friend, the First Valid Touchpoint retains attribution.
          </div>
        </div>
      </div>
    </div>
  );
}
