/**
 * CAMPUS RELAY — In-Memory & LocalStorage Reactive State Store
 * Provides persistent simulated data, strict deduplication, referral attribution,
 * growth campaign metrics, and student authentication.
 */

const STORAGE_KEY = 'nxtwave_campus_relay_v2';
const USERS_KEY = 'nxtwave_campus_relay_users';
const SESSION_KEY = 'nxtwave_campus_relay_session';

export const INITIAL_USERS = [
  {
    id: 'user_admin_1',
    name: 'NxtWave Admin',
    email: 'admin@nxtwave.tech',
    password: 'Admin@1234',
    role: 'admin',
    college: 'NxtWave Growth Lab',
    department: 'Campaign Operations',
    createdAt: '2026-10-25T10:00:00.000Z'
  },
  {
    id: 'user_stu_1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@srm.edu',
    password: 'Student@1234',
    role: 'student',
    college: 'SRM University',
    branch: 'ECE',
    year: '2025',
    referralCode: 'RELAY-AARAV1',
    referrals: 28,
    createdAt: '2026-10-26T11:00:00.000Z'
  },
  {
    id: 'user_stu_2',
    name: 'Pooja Reddy',
    email: 'pooja.reddy@jntuh.ac.in',
    password: 'Student@1234',
    role: 'student',
    college: 'JNTU Hyderabad',
    branch: 'CSE',
    year: '2025',
    referralCode: 'RELAY-POOJA2',
    referrals: 24,
    createdAt: '2026-10-26T12:30:00.000Z'
  },
  {
    id: 'user_stu_3',
    name: 'Aditi Sengupta',
    email: 'aditi.s@vit.ac.in',
    password: 'Student@1234',
    role: 'student',
    college: 'VIT Vellore',
    branch: 'CSE',
    year: '2025',
    referralCode: 'RELAY-ADIT999',
    referrals: 3,
    createdAt: '2026-10-27T09:15:00.000Z'
  }
];

export const INITIAL_AMBASSADORS = [
  { id: 'amb_1', name: 'Aarav Sharma', college: 'SRM University', branch: 'ECE', role: 'Campus Captain', code: 'RELAY-AARAV1', referrals: 28, milestone: 'Campus Top Contributor', joinDay: 1 },
  { id: 'amb_2', name: 'Pooja Reddy', college: 'JNTU Hyderabad', branch: 'CSE', role: 'Student Club Rep', code: 'RELAY-POOJA2', referrals: 24, milestone: 'Campus Top Contributor', joinDay: 1 },
  { id: 'amb_3', name: 'Karthik Verma', college: 'Osmania University', branch: 'IT', role: 'Peer Ambassador', code: 'RELAY-KART3', referrals: 16, milestone: 'VIP Q&A Pass', joinDay: 2 },
  { id: 'amb_4', name: 'Sneha Iyer', college: 'VIT Vellore', branch: 'CSE', role: 'Student Club Rep', code: 'RELAY-SNEHA4', referrals: 15, milestone: 'VIP Q&A Pass', joinDay: 2 },
  { id: 'amb_5', name: 'Vikram Malhotra', college: 'RVCE Bengaluru', branch: 'AI/DS', role: 'Peer Ambassador', code: 'RELAY-VIK5', referrals: 12, milestone: 'VIP Q&A Pass', joinDay: 3 },
  { id: 'amb_6', name: 'Ananya Rao', college: 'VBIT Hyderabad', branch: 'CSE', role: 'Campus Captain', code: 'RELAY-ANAN6', referrals: 10, milestone: 'VIP Q&A Pass', joinDay: 3 },
  { id: 'amb_7', name: 'Devendra Patel', college: 'BITS Pilani (Hyd)', branch: 'ECE', role: 'Student Club Rep', code: 'RELAY-DEV7', referrals: 8, milestone: 'VIP Q&A Pass', joinDay: 4 },
  { id: 'amb_8', name: 'Meera Nambiar', college: 'MIT Manipal', branch: 'CSE', role: 'Peer Ambassador', code: 'RELAY-MEERA8', referrals: 6, milestone: 'VIP Q&A Pass', joinDay: 4 },
  { id: 'amb_9', name: 'Rohan Deshmukh', college: 'COEP Pune', branch: 'ME', role: 'Peer Ambassador', code: 'RELAY-ROHAN9', referrals: 4, milestone: 'Starter Blueprint', joinDay: 5 },
  { id: 'amb_10', name: 'Divya Sundaram', college: 'SSN Chennai', branch: 'EEE', role: 'Peer Ambassador', code: 'RELAY-DIV10', referrals: 2, milestone: 'Starter Blueprint', joinDay: 5 }
];

export const INITIAL_REGISTRATIONS = [
  // 125 sample seeded registrations to represent ongoing Day 4 of the 7-day campaign
  { id: 'reg_101', name: 'Kavya S', email: 'kavya.s@srm.edu', college: 'SRM University', branch: 'ECE', year: '2025', refCode: 'RELAY-AARAV1', source: 'peer_ambassador', day: 1, isSimulation: true },
  { id: 'reg_102', name: 'Nikhil T', email: 'nikhil.t@jntuh.ac.in', college: 'JNTU Hyderabad', branch: 'CSE', year: '2025', refCode: 'RELAY-POOJA2', source: 'club_outreach', day: 1, isSimulation: true },
  { id: 'reg_103', name: 'Sai Krishna', email: 'sai.k@osmania.ac.in', college: 'Osmania University', branch: 'IT', year: '2025', refCode: 'RELAY-KART3', source: 'peer_ambassador', day: 2, isSimulation: true },
  { id: 'reg_104', name: 'Bhavna M', email: 'bhavna.m@vit.ac.in', college: 'VIT Vellore', branch: 'CSE', year: '2025', refCode: 'RELAY-SNEHA4', source: 'club_outreach', day: 2, isSimulation: true },
  { id: 'reg_105', name: 'Tanmay Joshi', email: 'tanmay.j@rvce.edu.in', college: 'RVCE Bengaluru', branch: 'AI/DS', year: '2025', refCode: 'RELAY-VIK5', source: 'peer_ambassador', day: 3, isSimulation: true },
  { id: 'reg_106', name: 'Arjun Sen', email: 'arjun.s@vbit.ac.in', college: 'VBIT Hyderabad', branch: 'CSE', year: '2025', refCode: 'RELAY-ANAN6', source: 'campus_captain', day: 3, isSimulation: true },
  { id: 'reg_107', name: 'Shreya Roy', email: 'shreya.roy@gmail.com', college: 'IIT Madras (Affil)', branch: 'CSE', year: '2025', refCode: null, source: 'direct_community', day: 1, isSimulation: true },
  { id: 'reg_108', name: 'Aditya K', email: 'aditya.k@gmail.com', college: 'COEP Pune', branch: 'ME', year: '2025', refCode: null, source: 'paid_experiment', day: 2, isSimulation: true }
];

export const CAMPAIGN_BUDGET = {
  total: 2000,
  allocated: {
    paidExperiment: 800,
    campusActivationCollateral: 500,
    outreachMaterials: 400,
    contingencyReserve: 300
  },
  currency: 'INR'
};

// Listeners for reactive updates
const listeners = new Set();

export function subscribeStore(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notifyListeners() {
  listeners.forEach(fn => fn());
}

export function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load store from localStorage', e);
  }
  const defaultState = {
    ambassadors: [...INITIAL_AMBASSADORS],
    registrations: [...INITIAL_REGISTRATIONS],
    myReferralCode: localStorage.getItem('nxtwave_my_code') || null,
    myReferralsCount: 0,
    activeAmbassadorId: 'amb_1'
  };
  saveStore(defaultState);
  return defaultState;
}

export function saveStore(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to persist store', e);
  }
  notifyListeners();
}

export function resetStore() {
  const resetState = {
    ambassadors: [...INITIAL_AMBASSADORS],
    registrations: [...INITIAL_REGISTRATIONS],
    myReferralCode: null,
    myReferralsCount: 0,
    activeAmbassadorId: 'amb_1'
  };
  localStorage.removeItem('nxtwave_my_code');
  localStorage.removeItem('nxtwave_referred_by');
  saveStore(resetState);
  saveUsers(INITIAL_USERS);
  saveSession(null);
  return resetState;
}

/**
 * ---------------------------------------------------------------------
 * Student & Admin Authentication and User Management Engine
 * ---------------------------------------------------------------------
 */

export function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load users from localStorage', e);
  }
  saveUsers(INITIAL_USERS);
  return INITIAL_USERS;
}

export function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to persist users', e);
  }
  notifyListeners();
}

export function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load session', e);
  }
  return null;
}

export function saveSession(user) {
  try {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  } catch (e) {
    console.error('Failed to persist session', e);
  }
  notifyListeners();
}

/**
 * Log in student or admin with credentials
 */
export function loginUser({ email, password, role }) {
  if (!email?.trim()) throw new Error('Please enter your email address.');
  if (!password?.trim()) throw new Error('Please enter your password.');

  const cleanEmail = email.trim().toLowerCase();
  const users = loadUsers();
  const user = users.find(u => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    throw new Error('No account found with this email. If you are a new student, please create an account.');
  }

  if (user.password !== password) {
    throw new Error('Incorrect password. Please verify your credentials.');
  }

  // Role validation if user explicitly selected a role mode
  if (role && role !== 'all' && user.role !== role) {
    const expected = role === 'admin' ? 'Administrator' : 'Student';
    throw new Error(`This email belongs to a ${user.role}. Please log in under the ${expected} tab.`);
  }

  // Save session
  saveSession(user);

  // If student has a referral code, synchronize it into store
  if (user.referralCode) {
    localStorage.setItem('nxtwave_my_code', user.referralCode);
    const store = loadStore();
    store.myReferralCode = user.referralCode;
    saveStore(store);
  }

  return user;
}

/**
 * Register a new student account
 */
export function registerUser({ name, email, password, college, branch, year, referralCode }) {
  if (!name?.trim()) throw new Error('Please enter your full name.');
  if (!email?.trim()) throw new Error('Please enter your college email address.');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) throw new Error('Please enter a valid email format.');
  if (!password || password.length < 6) throw new Error('Password must be at least 6 characters long.');
  if (!college?.trim()) throw new Error('Please enter or select your college name.');
  if (!branch?.trim()) throw new Error('Please select your branch.');
  if (!year?.trim()) throw new Error('Please select your graduation year.');

  const cleanEmail = email.trim().toLowerCase();
  const users = loadUsers();

  // Check if user already exists
  if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
    throw new Error(`An account already exists for ${cleanEmail}. Please log in with your credentials.`);
  }

  // Also register the student in the workshop registration engine
  let registrationResult = null;
  const store = loadStore();
  const existingReg = store.registrations.find(r => r.email.toLowerCase() === cleanEmail);
  
  if (existingReg) {
    registrationResult = {
      registration: existingReg,
      generatedCode: existingReg.generatedCode || generateReferralCode(name, branch)
    };
  } else {
    try {
      registrationResult = registerStudent({
        name,
        email: cleanEmail,
        college,
        branch,
        year,
        referralCode
      });
    } catch (err) {
      throw err;
    }
  }

  const generatedCode = registrationResult?.generatedCode || generateReferralCode(name, branch);

  const newUser = {
    id: `user_stu_${Date.now()}`,
    name: name.trim(),
    email: cleanEmail,
    password,
    role: 'student',
    college: college.trim(),
    branch: branch.trim(),
    year: year.trim(),
    referralCode: generatedCode,
    referrals: 0,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  // Automatically log in the newly registered student
  saveSession(newUser);
  localStorage.setItem('nxtwave_my_code', generatedCode);

  return {
    user: newUser,
    registration: registrationResult?.registration,
    generatedCode
  };
}

/**
 * Log out current session
 */
export function logoutUser() {
  saveSession(null);
}

/**
 * Delete a student user (Admin capability)
 */
export function deleteStudentUser(userId) {
  const users = loadUsers();
  const targetUser = users.find(u => u.id === userId);
  if (!targetUser) return false;

  const updatedUsers = users.filter(u => u.id !== userId);
  saveUsers(updatedUsers);

  // Also remove from registrations
  const store = loadStore();
  store.registrations = store.registrations.filter(r => r.email.toLowerCase() !== targetUser.email.toLowerCase());
  saveStore(store);

  // If deleted user was the logged-in user, clear session
  const current = loadSession();
  if (current && current.id === userId) {
    saveSession(null);
  }

  return true;
}

/**
 * Generate unique referral code for a new registrant
 */
export function generateReferralCode(name, branch) {
  const cleanName = (name || 'STU').replace(/[^a-zA-Z]/g, '').substring(0, 4).toUpperCase();
  const cleanBranch = (branch || 'ENG').substring(0, 3).toUpperCase();
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `RELAY-${cleanName}${randomNum}`;
}

/**
 * Register a student
 */
export function registerStudent({ name, email, college, branch, year, referralCode }) {
  const store = loadStore();

  // 1. Validation
  if (!name?.trim()) throw new Error('Please enter your full name.');
  if (!email?.trim()) throw new Error('Please enter your email address.');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) throw new Error('Please enter a valid email address.');
  if (!college?.trim()) throw new Error('Please enter or select your college name.');
  if (!branch?.trim()) throw new Error('Please select your engineering branch.');
  if (!year?.trim()) throw new Error('Please select your graduation year.');

  const cleanEmail = email.trim().toLowerCase();

  // 2. Strict Deduplication
  const existing = store.registrations.find(r => r.email.toLowerCase() === cleanEmail);
  if (existing) {
    throw new Error(`This email (${cleanEmail}) has already been registered! Duplicate entries are rejected.`);
  }

  // 3. Referral attribution checks
  const cleanRef = referralCode ? referralCode.trim().toUpperCase() : null;
  let attributedAmbassador = null;
  let source = 'direct_community';

  if (cleanRef) {
    // Check self-referral
    if (store.myReferralCode && store.myReferralCode.toUpperCase() === cleanRef) {
      throw new Error('Self-referral is not allowed! You cannot use your own referral code.');
    }

    // Find ambassador or existing registrant with this code
    attributedAmbassador = store.ambassadors.find(a => a.code.toUpperCase() === cleanRef);
    if (attributedAmbassador) {
      attributedAmbassador.referrals += 1;
      // Update milestone
      if (attributedAmbassador.referrals >= 25) {
        attributedAmbassador.milestone = 'Campus Top Contributor';
      } else if (attributedAmbassador.referrals >= 10) {
        attributedAmbassador.milestone = 'VIP Q&A Pass';
      } else if (attributedAmbassador.referrals >= 1) {
        attributedAmbassador.milestone = 'Starter Blueprint';
      }
      source = attributedAmbassador.role === 'Student Club Rep' ? 'club_outreach' : 
               attributedAmbassador.role === 'Campus Captain' ? 'campus_captain' : 'peer_ambassador';
    } else {
      // Check if another registrant generated this code
      const regReferrer = store.registrations.find(r => r.generatedCode && r.generatedCode.toUpperCase() === cleanRef);
      if (regReferrer) {
        source = 'peer_ambassador';
        // If it was the user's current session
        if (store.myReferralCode === cleanRef) {
          store.myReferralsCount = (store.myReferralsCount || 0) + 1;
        }
      }
      // If code was not found anywhere, we still register the student, but mark invalid referral gracefully
    }
  }

  // 4. Generate unique referral code for this student
  const newCode = generateReferralCode(name, branch);

  const newRegistration = {
    id: `reg_${Date.now()}`,
    name: name.trim(),
    email: cleanEmail,
    college: college.trim(),
    branch: branch.trim(),
    year: year.trim(),
    refCode: cleanRef,
    generatedCode: newCode,
    source,
    day: 4, // Current simulated campaign day
    isSimulation: true,
    timestamp: new Date().toISOString()
  };

  store.registrations.unshift(newRegistration);
  store.myReferralCode = newCode;
  localStorage.setItem('nxtwave_my_code', newCode);

  saveStore(store);

  // Ensure user account is also synchronized
  try {
    const users = loadUsers();
    if (!users.some(u => u.email.toLowerCase() === cleanEmail)) {
      const newUser = {
        id: `user_stu_${Date.now()}`,
        name: name.trim(),
        email: cleanEmail,
        password: 'Student@1234',
        role: 'student',
        college: college.trim(),
        branch: branch.trim(),
        year: year.trim(),
        referralCode: newCode,
        referrals: 0,
        createdAt: new Date().toISOString()
      };
      users.push(newUser);
      saveUsers(users);
    }
  } catch (e) {
    console.warn('Could not auto-sync user account', e);
  }

  return {
    registration: newRegistration,
    generatedCode: newCode,
    attributedTo: attributedAmbassador ? attributedAmbassador.name : null
  };
}

/**
 * Compute key campaign analytics
 */
export function getCampaignMetrics(store) {
  const total = store.registrations.length;
  const target = 500;
  const campaignDays = 7;
  const currentDay = 4;
  const daysRemaining = campaignDays - currentDay;

  const targetCompletionPct = ((total / target) * 100).toFixed(1);
  const registrationsRequired = Math.max(0, target - total);
  const requiredDailyPace = daysRemaining > 0 ? (registrationsRequired / daysRemaining).toFixed(1) : 0;
  const currentRunRate = (total / currentDay).toFixed(1);

  // Group by source
  const sourceBreakdown = {
    club_outreach: 0,
    peer_ambassador: 0,
    campus_captain: 0,
    direct_community: 0,
    paid_experiment: 0
  };

  store.registrations.forEach(r => {
    if (sourceBreakdown[r.source] !== undefined) {
      sourceBreakdown[r.source]++;
    } else {
      sourceBreakdown.direct_community++;
    }
  });

  // Group by college
  const collegeCounts = {};
  store.registrations.forEach(r => {
    collegeCounts[r.college] = (collegeCounts[r.college] || 0) + 1;
  });

  const topColleges = Object.entries(collegeCounts)
    .map(([college, count]) => ({ college, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // Daily acquisition trend
  const dailyTrend = [
    { day: 'Day 1', count: 18, cumulative: 18, label: 'Club kickoff & Captain activation' },
    { day: 'Day 2', count: 32, cumulative: 50, label: 'WhatsApp circles & IEEE club circulars' },
    { day: 'Day 3', count: 44, cumulative: 94, label: 'Peer referral sharing & placement groups' },
    { day: 'Day 4 (Today)', count: 31 + (store.registrations.length - INITIAL_REGISTRATIONS.length), cumulative: total, label: 'Mid-campaign momentum' },
    { day: 'Day 5 (Proj)', count: 125, cumulative: total + 125, isProjection: true },
    { day: 'Day 6 (Proj)', count: 140, cumulative: total + 265, isProjection: true },
    { day: 'Day 7 (Proj)', count: 110, cumulative: 500, isProjection: true }
  ];

  // Budget calculations
  const totalBudget = CAMPAIGN_BUDGET.total; // ₹2,000
  const blendedTargetCPA = (totalBudget / target).toFixed(2); // ₹4.00
  const effectiveSimulatedCPA = (totalBudget / Math.max(1, total)).toFixed(2);

  return {
    total,
    target,
    campaignDays,
    currentDay,
    daysRemaining,
    targetCompletionPct,
    registrationsRequired,
    requiredDailyPace,
    currentRunRate,
    sourceBreakdown,
    topColleges,
    dailyTrend,
    totalBudget,
    blendedTargetCPA,
    effectiveSimulatedCPA
  };
}
