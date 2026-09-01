import React from 'react';

export default function DashboardView({
  streakDays,
  completedTestsCount,
  milestones,
  userMood,
  moodMessage,
  handleMoodSelect,
  handleNavigate,
  startQuiz,
  setSelectedConsultant,
  initialConsultants
}) {
  const moods = [
    { label: 'Calm', icon: 'sentiment_satisfied', color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
    { label: 'Anxious', icon: 'sentiment_dissatisfied', color: 'bg-amber-50 text-amber-700 hover:bg-amber-100' },
    { label: 'Tired', icon: 'bedtime', color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' },
    { label: 'Focused', icon: 'center_focus_strong', color: 'bg-teal-50 text-teal-700 hover:bg-teal-100' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Greeting & Mood Check-in Card */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-teal-700/50 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider text-teal-200 uppercase mb-2">
                Sanctuary Dashboard
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight">Good morning, Sarah</h2>
              <p className="text-teal-100 text-sm mt-1">{moodMessage}</p>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
              <div className="text-center px-3 border-r border-white/10">
                <span className="text-2xl font-black text-amber-300 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-amber-300">local_fire_department</span>
                  {streakDays}
                </span>
                <span className="text-[10px] text-teal-100 uppercase tracking-wider block font-medium">Day Streak</span>
              </div>
              <div className="text-center px-3">
                <span className="text-2xl font-black text-teal-200 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined">verified</span>
                  {completedTestsCount}
                </span>
                <span className="text-[10px] text-teal-100 uppercase tracking-wider block font-medium">Tests Done</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-teal-700/50">
            <p className="text-xs font-semibold text-teal-200 uppercase tracking-wider mb-3">Daily Mood Check-in</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {moods.map((m) => (
                <button
                  key={m.label}
                  onClick={() => handleMoodSelect(m.label)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-2xl transition-all duration-200 font-medium text-sm shadow-sm ${
                    userMood === m.label 
                      ? 'bg-white text-teal-900 ring-2 ring-white font-bold scale-105' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{m.icon}</span>
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-4">
              <span className="material-symbols-outlined text-2xl">quiz</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Take Clinical Screener</h3>
            <p className="text-slate-500 text-sm mb-4">Evaluate your current anxiety and stress levels with standardized tests.</p>
          </div>
          <button
            onClick={() => { startQuiz('anxiety'); handleNavigate('assessments'); }}
            className="w-full bg-teal-50 text-teal-700 py-2.5 rounded-xl font-bold hover:bg-teal-100 transition-colors text-sm flex items-center justify-center gap-2"
          >
            Start GAD-7 Test
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
              <span className="material-symbols-outlined text-2xl">groups</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Book Consultation</h3>
            <p className="text-slate-500 text-sm mb-4">Connect with licensed clinical psychologists for 1-on-1 therapy sessions.</p>
          </div>
          <button
            onClick={() => { setSelectedConsultant(initialConsultants[0]); handleNavigate('consultations'); }}
            className="w-full bg-indigo-50 text-indigo-700 py-2.5 rounded-xl font-bold hover:bg-indigo-100 transition-colors text-sm flex items-center justify-center gap-2"
          >
            Find a Therapist
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
              <span className="material-symbols-outlined text-2xl">insights</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Wellness Track Record</h3>
            <p className="text-slate-500 text-sm mb-4">Review your saved assessment milestones and session progress history.</p>
          </div>
          <button
            onClick={() => handleNavigate('track_record')}
            className="w-full bg-emerald-50 text-emerald-700 py-2.5 rounded-xl font-bold hover:bg-emerald-100 transition-colors text-sm flex items-center justify-center gap-2"
          >
            View Milestones
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Recent Milestones Timeline preview */}
      <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Recent Milestones</h3>
            <p className="text-slate-500 text-xs">Your latest wellness check-ins & completed activities</p>
          </div>
          <button
            onClick={() => handleNavigate('track_record')}
            className="text-teal-600 hover:text-teal-700 text-xs font-bold flex items-center gap-1"
          >
            View All
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

        <div className="space-y-4">
          {milestones.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className={`p-2.5 rounded-xl text-white ${item.isPrimary ? 'bg-teal-600' : 'bg-slate-500'}`}>
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                  <span className="text-xs text-slate-400 font-medium">{item.date}</span>
                </div>
                <p className="text-slate-600 text-xs mt-1">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
