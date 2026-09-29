import React from 'react';

export default function TrackRecordView({ milestones, handleNavigate }) {
  return (
    <div className="space-y-8 animate-slide-up-fade">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <span className="px-3 py-1 bg-teal-700/60 rounded-full text-xs font-bold uppercase tracking-wider text-teal-200 border border-teal-500/30">
            Historical Trajectory
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight mt-2">Wellness Track Record</h2>
          <p className="text-teal-100 text-sm mt-1 max-w-xl leading-relaxed">
            Historical progression timeline of your clinical assessments, therapy check-ins, and milestones.
          </p>
        </div>

        <button
          onClick={() => handleNavigate('assessments')}
          className="relative z-10 gradient-btn glow-button text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-teal-500/20 flex items-center gap-2.5"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          New Check-in
        </button>
      </div>

      {/* Overview Analytics Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card glass-card-hover p-6 rounded-3xl flex items-center gap-4">
          <div className="w-14 h-14 bg-teal-500/10 text-teal-600 rounded-2xl flex items-center justify-center border border-teal-500/20">
            <span className="material-symbols-outlined text-3xl">trending_up</span>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Overall Progress</p>
            <h3 className="text-2xl font-black text-slate-800 mt-0.5">+15% Improvement</h3>
            <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">arrow_upward</span>
              Based on GAD-7 screeners
            </p>
          </div>
        </div>

        <div className="glass-card glass-card-hover p-6 rounded-3xl flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-500/10 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-500/20">
            <span className="material-symbols-outlined text-3xl">verified</span>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Total Check-ins</p>
            <h3 className="text-2xl font-black text-slate-800 mt-0.5">{milestones.length} Recorded</h3>
            <p className="text-xs text-indigo-600 font-bold mt-1">Synced to Python API Backend</p>
          </div>
        </div>

        <div className="glass-card glass-card-hover p-6 rounded-3xl flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-500/20">
            <span className="material-symbols-outlined text-3xl">workspace_premium</span>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Consistency Status</p>
            <h3 className="text-2xl font-black text-slate-800 mt-0.5">14-Day Streak</h3>
            <p className="text-xs text-amber-600 font-bold mt-1">Active Sanctuary Practice</p>
          </div>
        </div>
      </div>

      {/* Timeline List */}
      <div className="glass-card rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
        <h3 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-teal-600">timeline</span>
          Milestones & Activity History
        </h3>

        <div className="relative border-l-2 border-teal-500/20 ml-4 space-y-8 pl-8">
          {milestones.map((m) => (
            <div key={m.id} className="relative group">
              <div className={`absolute -left-[45px] top-0 w-9 h-9 rounded-full flex items-center justify-center text-white ring-4 ring-white shadow-md transition-transform group-hover:scale-110 ${
                m.isPrimary ? 'bg-gradient-to-br from-teal-600 to-emerald-600' : 'bg-slate-500'
              }`}>
                <span className="material-symbols-outlined text-base">{m.icon}</span>
              </div>

              <div className="bg-white/80 p-6 rounded-2xl border border-slate-200/80 hover:border-teal-500/40 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                  <h4 className="font-extrabold text-slate-800 text-base group-hover:text-teal-800 transition-colors">{m.title}</h4>
                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                    {m.date}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{m.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
