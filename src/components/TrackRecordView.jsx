import React from 'react';

export default function TrackRecordView({ milestones, handleNavigate }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Wellness Track Record</h2>
          <p className="text-slate-500 text-sm mt-1">
            Historical progression timeline of your clinical assessments, therapy check-ins, and milestones.
          </p>
        </div>
        <button
          onClick={() => handleNavigate('assessments')}
          className="bg-teal-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-teal-700 transition-colors shadow-md shadow-teal-600/20 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          New Check-in
        </button>
      </div>

      {/* Overview Analytics Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">trending_up</span>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Overall Progress</p>
            <h3 className="text-2xl font-black text-slate-800">+15% Improvement</h3>
            <p className="text-xs text-emerald-600 font-semibold mt-0.5">Based on last 30 days GAD-7</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">verified</span>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Check-ins</p>
            <h3 className="text-2xl font-black text-slate-800">{milestones.length} Recorded</h3>
            <p className="text-xs text-indigo-600 font-semibold mt-0.5">Persistent Python Database</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">workspace_premium</span>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Consistency Status</p>
            <h3 className="text-2xl font-black text-slate-800">14-Day Streak</h3>
            <p className="text-xs text-amber-600 font-semibold mt-0.5">Active Sanctuary Practice</p>
          </div>
        </div>
      </div>

      {/* Timeline List */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Milestones & History</h3>

        <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pl-6">
          {milestones.map((m) => (
            <div key={m.id} className="relative group">
              <div className={`absolute -left-[35px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-white ring-4 ring-white ${
                m.isPrimary ? 'bg-teal-600 shadow-md' : 'bg-slate-400'
              }`}>
                <span className="material-symbols-outlined text-sm">{m.icon}</span>
              </div>

              <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100 hover:border-teal-200 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mb-2">
                  <h4 className="font-bold text-slate-800 text-base">{m.title}</h4>
                  <span className="text-xs font-semibold text-slate-400 bg-white px-2.5 py-1 rounded-full border border-slate-100">
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
