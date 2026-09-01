import React from 'react';

export default function Header({ activeTab, handleNavigate, apiStatus }) {
  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex justify-between items-center px-8 h-20 fixed top-0 right-0 w-[calc(100%-16rem)] z-30 bg-white/80 backdrop-blur-md transition-opacity duration-200 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-slate-800 capitalize tracking-tight">
            {activeTab.replace('_', ' ')}
          </h2>
          {apiStatus && (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              apiStatus.status === 'online' 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${apiStatus.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
              Python API: {apiStatus.status === 'online' ? 'Connected' : 'Offline Mode'}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
            <input 
              className="pl-9 pr-4 py-2 rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none transition-all text-sm w-64 text-slate-700" 
              placeholder="Search features, assessments..." 
              type="text"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-teal-600 transition-colors p-2 hover:bg-slate-100 rounded-full">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button onClick={() => handleNavigate('help_support')} className="text-slate-500 hover:text-teal-600 transition-colors p-2 hover:bg-slate-100 rounded-full">
              <span className="material-symbols-outlined">help</span>
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <img 
                className="w-10 h-10 rounded-full border border-slate-200 object-cover shadow-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT4_acYkpaqwuyRb0zbDwjmnnic1Zy-rL6Ktz7kbVXyjk7Sfv9u8H0OGcG9O3W3ip0wdVz9wuCn7p9HPoUi-O2IJ_D6gBtBH-hsyq-tAhAE_GvNgTIAUeW3f4k0N2CxuVPL9obWitxKzUvApZ1uNNUwcmzxkLX4dsDH1L21gpQdO6Q1F5w0g6YFm6Z0biO6cMbM34Oo4P3m6PMvfFViPqBnbojDeBMNA8TsnErpaaYH8i1eFbNre8UEA" 
                alt="Sarah"
              />
              <div>
                <p className="text-sm font-bold text-slate-800 leading-tight">Sarah Jenkins</p>
                <p className="text-xs text-slate-500">Premium Member</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center px-4 h-16 bg-white border-b border-slate-100 sticky top-0 z-40 w-full shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('dashboard')}>
          <img 
            alt="Mind Care logo" 
            className="w-8 h-8 rounded-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVO-aE9_a21aEW4sT-sPoi1rQ19hYVxT8BrkpBeuifi9bW-wyqKP0SMdApTB7AJ0UhF6SyCPlAHskvy_GYTdW2FGETXlEPbGvmlIhtce8XiXMC5aNJGMTu_WDkCEs5CDkGWauTYO8HIj9BnQPlMgWxh2qN133FvYMNVIRoxOj-gR8LXgqwGzgKqqmknR7tN-UsEhuR6_qimFLUJUX3rg5jmOzRaMKb5NuhA1vGVe36TlInLQR5wOXxwg"
          />
          <span className="font-bold text-teal-800 text-lg">Mind Care</span>
        </div>
        <div className="flex items-center gap-3">
          {apiStatus && (
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="API Online"></span>
          )}
          <button onClick={() => handleNavigate('help_support')} className="text-slate-600 p-1.5 hover:bg-slate-100 rounded-full">
            <span className="material-symbols-outlined">help</span>
          </button>
          <img 
            className="w-8 h-8 rounded-full object-cover border border-slate-200" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT4_acYkpaqwuyRb0zbDwjmnnic1Zy-rL6Ktz7kbVXyjk7Sfv9u8H0OGcG9O3W3ip0wdVz9wuCn7p9HPoUi-O2IJ_D6gBtBH-hsyq-tAhAE_GvNgTIAUeW3f4k0N2CxuVPL9obWitxKzUvApZ1uNNUwcmzxkLX4dsDH1L21gpQdO6Q1F5w0g6YFm6Z0biO6cMbM34Oo4P3m6PMvfFViPqBnbojDeBMNA8TsnErpaaYH8i1eFbNre8UEA" 
            alt="Sarah"
          />
        </div>
      </header>
    </>
  );
}
