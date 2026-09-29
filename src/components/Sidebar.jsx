import React from 'react';

export default function Sidebar({ activeTab, handleNavigate, setSelectedConsultant, initialConsultants }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'assessments', label: 'Assessments', icon: 'quiz' },
    { id: 'track_record', label: 'Track Record', icon: 'insights' },
    { id: 'consultations', label: 'Consultations', icon: 'groups' },
    { id: 'help_support', label: 'Help & Support', icon: 'help' },
    { id: 'privacy_security', label: 'Privacy & Security', icon: 'shield_lock' },
  ];

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex flex-col py-8 px-4 h-screen w-64 fixed left-0 top-0 bg-white/95 backdrop-blur-md shadow-sm z-40 border-r border-slate-200/70 transition-all duration-300 ease-in-out">
        <div className="flex items-center gap-3 mb-10 px-3 cursor-pointer group" onClick={() => handleNavigate('dashboard')}>
          <div className="relative">
            <img 
              alt="Mind Care logo" 
              className="w-11 h-11 rounded-full object-cover shadow-md ring-4 ring-teal-500/20 group-hover:scale-105 transition-transform duration-300" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVO-aE9_a21aEW4sT-sPoi1rQ19hYVxT8BrkpBeuifi9bW-wyqKP0SMdApTB7AJ0UhF6SyCPlAHskvy_GYTdW2FGETXlEPbGvmlIhtce8XiXMC5aNJGMTu_WDkCEs5CDkGWauTYO8HIj9BnQPlMgWxh2qN133FvYMNVIRoxOj-gR8LXgqwGzgKqqmknR7tN-UsEhuR6_qimFLUJUX3rg5jmOzRaMKb5NuhA1vGVe36TlInLQR5wOXxwg"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></span>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-teal-950 tracking-tight leading-tight">Mind Care</h1>
            <p className="text-[11px] text-teal-600 font-bold uppercase tracking-wider">Digital Sanctuary</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button 
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-200 text-left font-bold text-sm relative group ${
                  isActive 
                    ? 'text-teal-900 bg-teal-50/90 shadow-sm border border-teal-100' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-teal-700'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1.5 bg-teal-600 rounded-r-full shadow-sm"></span>
                )}
                <span className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${isActive ? 'text-teal-600 font-extrabold' : 'text-slate-400 group-hover:text-teal-600'}`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>
        
        <div className="mt-auto pt-6 border-t border-slate-100">
          <button 
            onClick={() => { 
              if (setSelectedConsultant && initialConsultants) {
                setSelectedConsultant(initialConsultants[0]);
              }
              handleNavigate('consultations'); 
            }}
            className="w-full gradient-btn glow-button text-white py-3.5 px-5 rounded-2xl font-bold hover:shadow-teal-500/30 transition-all duration-300 flex items-center justify-center gap-2.5 text-sm"
          >
            <span className="material-symbols-outlined text-xl">calendar_today</span>
            Book Session
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 z-50 px-3 py-2 flex justify-around items-center shadow-2xl">
        {navItems.slice(0, 4).map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            className={`flex flex-col items-center py-1 px-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === item.id ? 'text-teal-700 scale-105 bg-teal-50/70' : 'text-slate-500 hover:text-teal-600'
            }`}
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <span className="mt-0.5">{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
