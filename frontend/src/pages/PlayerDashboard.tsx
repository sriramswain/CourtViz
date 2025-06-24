import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Video, Brain, BarChart2, Settings, Sun, LogOut, Target, TrendingUp, BarChart3 } from 'lucide-react';

function decodeJWT(token: string) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

const navItems = [
  { label: 'Dashboard', icon: <Home className="w-5 h-5 mr-3" /> },
  { label: 'Raw Film Library', icon: <Video className="w-5 h-5 mr-3" /> },
  { label: 'AI Analyzed Film', icon: <Brain className="w-5 h-5 mr-3" /> },
  { label: 'Progress Tracking', icon: <TrendingUp className="w-5 h-5 mr-3" /> },
  { label: 'Personal Goals', icon: <Target className="w-5 h-5 mr-3" /> },
  { label: 'Performance Metrics', icon: <BarChart3 className="w-5 h-5 mr-3" /> },
  { label: 'Settings', icon: <Settings className="w-5 h-5 mr-3" /> },
];

const PlayerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dragging = useRef(false);
  const startX = useRef(0);
  const sidebarWidth = 256; // 64 * 4 (w-64)

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    document.body.style.userSelect = 'none';
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - startX.current;
    // If dragged left more than half the sidebar, close it
    if (dx < -sidebarWidth / 2) {
      setSidebarOpen(false);
      dragging.current = false;
      document.body.style.userSelect = '';
    }
    // If dragged right more than 40px and sidebar is closed, open it
    if (dx > 40 && !sidebarOpen) {
      setSidebarOpen(true);
      dragging.current = false;
      document.body.style.userSelect = '';
    }
  };
  const handleMouseUp = () => {
    dragging.current = false;
    document.body.style.userSelect = '';
  };
  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  });

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  // Get firstName from JWT
  let firstName = '';
  const token = sessionStorage.getItem('token');
  if (token) {
    const decoded = decodeJWT(token);
    firstName = decoded?.firstName || '';
  }

  return (
    <div className="flex min-h-screen bg-[#0a0e17] text-white">
      {/* Sidebar with slide animation */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 w-64 bg-[#232326] border-r border-[#232a3a] flex flex-col justify-between py-6 px-4 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ willChange: 'transform' }}
      >
        <div>
          <div className="flex items-center mb-10">
            <div className="mr-3 flex items-center justify-center">
              <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff7c1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 15l4-4" />
                <path d="M12 21a9 9 0 0 0 9-9" />
                <path d="M20 9l-4 4" />
                <path d="M12 3a9 9 0 0 0-9 9" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-lg text-white">CourtViz.io</div>
              <div className="text-sm text-slate-400">{firstName}'s Dashboard</div>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button key={item.label} className="flex items-center px-4 py-2 rounded-lg text-base text-slate-200 hover:bg-[#232a3a] transition font-medium">
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-between mt-10 px-2">
          <span className="text-white font-semibold text-[15.5px]">Welcome, {firstName}!</span>
          <div className="flex items-center gap-3">
            <Sun className="w-5 h-5 text-slate-400" />
            <button onClick={handleLogout} title="Logout">
              <LogOut className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>
        {/* Draggable handle */}
        <div
          onMouseDown={handleMouseDown}
          className="absolute top-0 right-0 h-full w-3 flex items-center justify-center cursor-ew-resize z-50"
          style={{ cursor: 'ew-resize' }}
        >
          <div className="w-2 h-16 bg-[#232a3a] rounded-full flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 3L12 9L6 15" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 3L6 9L12 15" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </aside>
      {/* Show open-sidebar button when sidebar is closed */}
      {!sidebarOpen && (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 w-8 h-16 flex items-center group">
          <button
            onClick={() => setSidebarOpen(true)}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#232326] border border-[#232a3a] rounded-full p-2 shadow-lg flex items-center justify-center hover:bg-[#232a3a] group-hover:translate-x-2"
            style={{ width: 40, height: 40 }}
            aria-label="Open sidebar"
          >
            {/* Chevron right icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
      {/* Main Content */}
      <main
        className={`flex-1 min-h-screen p-9 bg-[#0a0e17] flex flex-col gap-6 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
        style={{ minHeight: '100vh' }}
      >
        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4 mb-10 h-36">
          <div className="bg-[#151F32] rounded-xl p-7 flex flex-col justify-between border border-slate-800 h-full">
            <div className="text-white text-sm flex items-center gap-2 mb-5">Raw Film Archive <Video className="w-4 h-4" /></div>
            <div className="text-4xl font-bold">0</div>
            <div className="text-xs text-blue-400 mt-3.5">+0 from last week</div>
          </div>
          <div className="bg-[#151F32] rounded-xl p-7 flex flex-col justify-between border border-slate-800 h-full">
            <div className="text-white text-sm flex items-center gap-2 mb-5">Annotated Film <Brain className="w-4 h-4" /></div>
            <div className="text-4xl font-bold">0</div>
            <div className="text-xs text-blue-400 mt-3.5">+0 from last week</div>
          </div>
          <div className="bg-[#151F32] rounded-xl p-7 flex flex-col justify-between border border-slate-800 h-full">
            <div className="text-white text-sm flex items-center gap-2 mb-5">Performance Trends <TrendingUp className="w-4 h-4" /></div>
            <div className="text-4xl font-bold">0</div>
            <div className="text-xs text-blue-400 mt-3.5">No data yet</div>
          </div>
          <div className="bg-[#151F32] rounded-xl p-7 flex flex-col justify-between border border-slate-800 h-full">
            <div className="text-white text-sm flex items-center gap-2 mb-5">Milestone Tracker <Target className="w-4 h-4" /></div>
            <div className="text-4xl font-bold">0</div>
            <div className="text-xs text-blue-400 mt-3.5">No milestones yet</div>
          </div>
        </div>
        {/* Action Cards */}
        <div className="grid grid-cols-4 gap-6 mt-4 mb-16 h-64">
          {/* View Raw Film */}
          <div className="border-2 border-orange-500 rounded-2xl p-8 bg-[#101624] flex flex-col justify-between h-full">
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-3 text-orange-400 mb-5">
                <Video className="w-6 h-6" />
                <span className="font-bold text-xl">View Raw Film</span>
              </div>
              <div className="text-slate-200 mb-8 text-base">Browse through raw footage and game recordings</div>
            </div>
            <button className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shadow-xl transition-all duration-150 flex items-center justify-center gap-3 mt-2">
              <Video className="w-5 h-5" /> View Library
            </button>
          </div>
          {/* Review AI Analysis */}
          <div className="border-2 border-blue-500 rounded-2xl p-8 bg-[#101624] flex flex-col justify-between h-full">
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-3 text-blue-400 mb-5">
                <Brain className="w-6 h-6" />
                <span className="font-bold text-xl">Review CV Tags</span>
              </div>
              <div className="text-slate-200 mb-8 text-base">Review CV-tagged footage with personalized insights</div>
            </div>
            <button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-xl transition-all duration-150 flex items-center justify-center gap-3 mt-2">
              <Brain className="w-5 h-5" /> View Analysis
            </button>
          </div>
          {/* Personal Goals */}
          <div className="border-2 border-green-500 rounded-2xl p-8 bg-[#101624] flex flex-col justify-between h-full">
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-3 text-green-400 mb-5">
                <Target className="w-6 h-6" />
                <span className="font-bold text-xl">Personal Goals</span>
              </div>
              <div className="text-slate-200 mb-8 text-base">Set and view personal<br/>goals and milestones</div>
            </div>
            <button className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold text-lg shadow-xl transition-all duration-150 flex items-center justify-center gap-3 mt-2">
              <Target className="w-5 h-5" /> Manage Goals
            </button>
          </div>
          {/* Progress Tracking */}
          <div className="border-2 border-purple-500 rounded-2xl p-8 bg-[#101624] flex flex-col justify-between h-full">
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-3 text-purple-400 mb-5">
                <BarChart2 className="w-6 h-6" />
                <span className="font-bold text-xl">Progress Tracking</span>
              </div>
              <div className="text-slate-200 mb-8 text-base">Monitor your skill development and progress towards your goals</div>
            </div>
            <button className="w-full py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-bold text-lg shadow-xl transition-all duration-150 flex items-center justify-center gap-3 mt-2">
              <BarChart2 className="w-5 h-5" /> View Progress
            </button>
          </div>
        </div>
        {/* Recent Uploads & Performance Insights */}
        <div className={`grid grid-cols-2 gap-8 flex-1 min-h-0 ${!sidebarOpen ? '-mt-4' : ''}`} style={{height: '24vh'}}>
          <div className="bg-[#151F32] rounded-2xl p-10 border border-slate-800 flex flex-col justify-between h-full">
            <div>
              <div className="font-bold text-xl mb-4">Recent Uploads</div>
              <div className="text-slate-400 mb-2">Latest raw film uploads from your team</div>
            </div>
            <div className="flex flex-col gap-y-1 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white mb-2">No uploads yet</div>
                  <div className="text-xs text-slate-400">Your coach hasn't uploaded any film for you to view.</div>
                </div>
                <button className="bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-semibold opacity-50 cursor-not-allowed">View</button>
              </div>
            </div>
          </div>
          {/* Performance Insights */}
          <div className="bg-[#151F32] rounded-2xl p-10 border border-slate-800 flex flex-col justify-between h-full">
            <div>
              <div className="font-bold text-xl mb-4">Performance Insights</div>
              <div className="text-slate-400 mb-2">AI-powered insights about your game</div>
            </div>
            <div className="flex flex-col gap-y-1 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white mb-2">No performance insights yet</div>
                  <div className="text-xs text-slate-400">Performance insights will appear once your coach uploads film.</div>
                </div>
                <button className="bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-semibold opacity-50 cursor-not-allowed">Details</button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6" />
      </main>
  </div>
);
};

export default PlayerDashboard;

