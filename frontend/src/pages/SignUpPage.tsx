import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CourtIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff7c1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15l4-4" />
    <path d="M12 21a9 9 0 0 0 9-9" />
    <path d="M20 9l-4 4" />
    <path d="M12 3a9 9 0 0 0-9 9" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const PlayerBasketballIcon = ({ selected }: { selected: boolean }) => (
  <svg className="w-10 h-10 mx-auto mb-1" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(90 24 24)">
      <circle cx="24" cy="24" r="20" fill={selected ? "#ff7c1a" : "#232a3a"} stroke="#ff7c1a" strokeWidth="2" />
      <path d="M24 4v40" stroke={selected ? "#181e2a" : "#ff7c1a"} strokeWidth="2.5" />
      <path d="M4 24h40" stroke={selected ? "#181e2a" : "#ff7c1a"} strokeWidth="2.5" />
      <path d="M11 11c10 8 16 8 26 0" stroke={selected ? "#181e2a" : "#ff7c1a"} strokeWidth="2.5" />
      <path d="M11 37c10-8 16-8 26 0" stroke={selected ? "#181e2a" : "#ff7c1a"} strokeWidth="2.5" />
    </g>
  </svg>
);

const CoachPlaybookIcon = ({ selected }: { selected: boolean }) => {
  const color = selected ? "#ff7c1a" : "#cbd5e1";
  return (
    <svg className="w-12 h-12 mx-auto -mt-1 mb-1" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Clipboard outline - make longer at the bottom */}
      <rect x="10" y="10" width="28" height="32" rx="4" fill={selected ? "#232a3a" : "none"} stroke={color} strokeWidth="3" />
      {/* Clipboard clip */}
      <rect x="20" y="6" width="8" height="6" rx="2" fill={color} />
      {/* X */}
      <line x1="16" y1="18" x2="20" y2="22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="18" x2="16" y2="22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* O */}
      <circle cx="32" cy="32" r="3" stroke={color} strokeWidth="2.5" fill="none" />
      {/* Arrow (play line) */}
      <path d="M18 28 Q28 20 32 29" stroke={color} strokeWidth="2.5" fill="none" />
      <polygon points="31,27 34,29 31,31" fill={color} />
    </svg>
  );
};

const roles = [
  { label: 'Player', icon: (selected: boolean) => <PlayerBasketballIcon selected={selected} /> },
  { label: 'Coach', icon: (selected: boolean) => <CoachPlaybookIcon selected={selected} /> },
];

export default function SignUpPage() {
  const [selectedRole, setSelectedRole] = useState('Player');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role: string) => setSelectedRole(role);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          first_name: form.firstName,
          last_name: form.lastName,
          role: selectedRole,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        // Optionally, auto-login after signup
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.password }),
        });
        const loginData = await loginRes.json();
        if (loginRes.ok) {
          sessionStorage.setItem('token', loginData.token);
          if (selectedRole === 'Coach') {
            navigate('/coach-dashboard');
          } else {
            navigate('/player-dashboard');
          }
        } else {
          setError('Account created, but login failed. Please try logging in.');
        }
      } else {
        setError(data.error || 'Sign up failed');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#13161c] to-[#20232b] px-4">
      <div className="flex items-center justify-center mt-14 mb-14">
        <CourtIcon className="h-10 w-10 text-white mr-3" />
        <h1 className="text-[2.75rem] font-extrabold text-white">CourtViz.io</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#232a3a] rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border border-[#2d3648] mb-16"
      >
        <div className="text-center mb-2">
          <h2 className="text-3xl font-bold text-white mb-1">Join CourtViz.io</h2>
          <p className="text-slate-400 text-base mt-6">Create your account to get started</p>
        </div>
        <div className="mb-2">
          <label className="block text-white mb-3">I am a:</label>
          <div className="flex gap-4">
            {roles.map((role) => (
              <button
                type="button"
                key={role.label}
                onClick={() => handleRoleSelect(role.label)}
                className={`flex-1 flex flex-col items-center py-4 rounded-xl border transition-all duration-150 font-semibold text-lg focus:outline-none
                  ${selectedRole === role.label
                    ? 'border-orange-500 bg-[#23232a] text-orange-400 shadow-lg'
                    : 'border-[#3a4256] bg-[#232a3a] text-slate-300 hover:border-orange-400 hover:text-orange-300'}
                `}
              >
                {role.icon(selectedRole === role.label)}
                <span className={role.label === 'Player' ? 'mt-2' : role.label === 'Coach' ? 'mt-1' : ''}>{role.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mb-2">
          <div className="flex-1">
            <label className="block text-white mb-2 text-base" htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="John"
              value={form.firstName}
              onChange={handleChange}
              className="w-full rounded-lg bg-[#232a3a] border border-[#2d3648] px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-white mb-2 text-base" htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Doe"
              value={form.lastName}
              onChange={handleChange}
              className="w-full rounded-lg bg-[#232a3a] border border-[#2d3648] px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
              required
            />
          </div>
        </div>
        <div className="mb-2">
          <label className="block text-white mb-2 text-base" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg bg-[#232a3a] border border-[#2d3648] px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-white mb-2 text-base" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-lg bg-[#232a3a] border border-[#2d3648] px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2 text-base" htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-lg bg-[#232a3a] border border-[#2d3648] px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
            required
          />
        </div>
        {error && <div className="text-red-500 text-center mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full py-3 mt-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shadow-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          Create Account
        </button>
        <hr className="my-6 border-slate-600" />
        <div className="text-center text-slate-400 text-base pb-2">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-400 hover:underline font-semibold">Sign In</Link>
        </div>
      </form>
    </div>
  );
}
