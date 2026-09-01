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
      <aside className="hidden md:flex flex-col py-8 px-4 h-screen w-64 fixed left-0 top-0 bg-white shadow-sm z-40 border-r border-slate-100 transition-all duration-300 ease-in-out">
        <div className="flex items-center gap-3 mb-10 px-4 cursor-pointer" onClick={() => handleNavigate('dashboard')}>
          <img 
            alt="Mind Care logo" 
            className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-emerald-500/20" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVO-aE9_a21aEW4sT-sPoi1rQ19hYVxT8BrkpBeuifi9bW-wyqKP0SMdApTB7AJ0UhF6SyCPlAHskvy_GYTdW2FGETXlEPbGvmlIhtce8XiXMC5aNJGMTu_WDkCEs5CDkGWauTYO8HIj9BnQPlMgWxh2qN133FvYMNVIRoxOj-gR8LXgqwGzgKqqmknR7tN-UsEhuR6_qimFLUJUX3rg5jmOzRaMKb5NuhA1vGVe36TlInLQR5wOXxwg"
          />
          <div>
            <h1 className="text-xl font-bold text-teal-900 tracking-tight">Mind Care</h1>
            <p className="text-xs text-teal-600 font-medium tracking-wider">Digital Sanctuary</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-left font-semibold ${
                activeTab === item.id 
                  ? 'text-teal-700 bg-teal-50 border-r-4 border-teal-600 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-teal-600'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="mt-auto pt-6 border-t border-slate-100">
          <button 
            onClick={() => { 
              if (setSelectedConsultant && initialConsultants) {
                setSelectedConsultant(initialConsultants[0]);
              }
              handleNavigate('consultations'); 
            }}
            className="w-full bg-teal-600 text-white py-3 px-4 rounded-full font-bold hover:bg-teal-700 transition-all duration-300 shadow-md shadow-teal-600/20 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">calendar_today</span>
            Book Session
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 px-2 py-1.5 flex justify-around items-center shadow-lg">
        {navItems.slice(0, 4).map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            className={`flex flex-col items-center py-1 px-3 rounded-lg text-xs font-medium ${
              activeTab === item.id ? 'text-teal-600 font-bold' : 'text-slate-500'
            }`}
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
