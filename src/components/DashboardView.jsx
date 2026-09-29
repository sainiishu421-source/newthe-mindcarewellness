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
    { label: 'Calm', icon: 'sentiment_satisfied', color: 'bg-emerald-500/20 border-emerald-400/30 text-emerald-100 hover:bg-emerald-500/30' },
    { label: 'Anxious', icon: 'sentiment_dissatisfied', color: 'bg-amber-500/20 border-amber-400/30 text-amber-100 hover:bg-amber-500/30' },
    { label: 'Tired', icon: 'bedtime', color: 'bg-indigo-500/20 border-indigo-400/30 text-indigo-100 hover:bg-indigo-500/30' },
    { label: 'Focused', icon: 'center_focus_strong', color: 'bg-teal-500/20 border-teal-400/30 text-teal-100 hover:bg-teal-500/30' }
  ];

  return (
    <div className="space-y-8 animate-slide-up-fade">
      {/* Greeting & Mood Check-in Card */}
      <section className="glass-banner text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-2xl border border-teal-600/30">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-teal-800/60 backdrop-blur-md rounded-full text-xs font-bold tracking-widest text-teal-200 uppercase mb-3 border border-teal-600/40 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Sanctuary Dashboard
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Good morning, <span className="text-teal-200">Sarah</span>
              </h2>
              <p className="text-teal-100/90 text-base mt-1.5 font-medium max-w-xl">{moodMessage}</p>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 shadow-lg">
              <div className="text-center px-4 border-r border-white/15">
                <span className="text-2xl sm:text-3xl font-black text-amber-300 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-amber-300 text-2xl animate-bounce">local_fire_department</span>
                  {streakDays}
                </span>
                <span className="text-[11px] text-teal-100 uppercase tracking-wider block font-bold mt-0.5">Day Streak</span>
              </div>
              <div className="text-center px-4">
                <span className="text-2xl sm:text-3xl font-black text-teal-200 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-emerald-400 text-2xl">verified</span>
                  {completedTestsCount}
                </span>
                <span className="text-[11px] text-teal-100 uppercase tracking-wider block font-bold mt-0.5">Tests Done</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-teal-700/50">
            <p className="text-xs font-extrabold text-teal-200 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">mood</span>
              Daily Mood Check-in
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {moods.map((m) => {
                const isSelected = userMood === m.label;
                return (
                  <button
                    key={m.label}
                    onClick={() => handleMoodSelect(m.label)}
                    className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border transition-all duration-300 font-bold text-sm shadow-sm ${
                      isSelected 
                        ? 'bg-white text-teal-950 border-white ring-4 ring-teal-400/40 font-extrabold scale-105 shadow-xl' 
                        : `${m.color} backdrop-blur-sm`
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">{m.icon}</span>
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card glass-card-hover p-6 rounded-3xl flex flex-col justify-between group">
          <div>
            <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-600 mb-5 group-hover:scale-110 transition-transform duration-300 border border-teal-500/20">
              <span className="material-symbols-outlined text-3xl">quiz</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-teal-700 transition-colors">Take Screener</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">Evaluate your current anxiety and stress levels with gold-standard clinical tests.</p>
          </div>
          <button
            onClick={() => { startQuiz('anxiety'); handleNavigate('assessments'); }}
            className="w-full bg-teal-50 text-teal-700 py-3 rounded-xl font-bold hover:bg-teal-600 hover:text-white transition-all duration-300 text-sm flex items-center justify-center gap-2 group-hover:shadow-md shadow-teal-500/10"
          >
            Start GAD-7 Test
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>

        <div className="glass-card glass-card-hover p-6 rounded-3xl flex flex-col justify-between group">
          <div>
            <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 mb-5 group-hover:scale-110 transition-transform duration-300 border border-indigo-500/20">
              <span className="material-symbols-outlined text-3xl">groups</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-700 transition-colors">Book Consultation</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">Connect with licensed clinical psychologists for 1-on-1 personalized therapy.</p>
          </div>
          <button
            onClick={() => { setSelectedConsultant(initialConsultants[0]); handleNavigate('consultations'); }}
            className="w-full bg-indigo-50 text-indigo-700 py-3 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all duration-300 text-sm flex items-center justify-center gap-2 group-hover:shadow-md shadow-indigo-500/10"
          >
            Find a Therapist
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>

        <div className="glass-card glass-card-hover p-6 rounded-3xl flex flex-col justify-between group">
          <div>
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600 mb-5 group-hover:scale-110 transition-transform duration-300 border border-emerald-500/20">
              <span className="material-symbols-outlined text-3xl">insights</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">Track Record</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">Review your saved assessment milestones, emotional trajectory, and session history.</p>
          </div>
          <button
            onClick={() => handleNavigate('track_record')}
            className="w-full bg-emerald-50 text-emerald-700 py-3 rounded-xl font-bold hover:bg-emerald-600 hover:text-white transition-all duration-300 text-sm flex items-center justify-center gap-2 group-hover:shadow-md shadow-emerald-500/10"
          >
            View Milestones
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Recent Milestones Timeline preview */}
      <section className="glass-card rounded-3xl p-7 border border-slate-200/80 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-800">Recent Milestones</h3>
            <p className="text-slate-500 text-xs font-medium mt-0.5">Your latest wellness check-ins & completed activities</p>
          </div>
          <button
            onClick={() => handleNavigate('track_record')}
            className="text-teal-700 hover:text-teal-800 text-xs font-extrabold flex items-center gap-1 hover:gap-1.5 transition-all p-2 hover:bg-teal-50 rounded-xl"
          >
            View All
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </button>
        </div>

        <div className="space-y-3.5">
          {milestones.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-start gap-4 p-4.5 rounded-2xl bg-white/80 border border-slate-200/70 hover:border-teal-500/30 transition-all hover:shadow-md group">
              <div className={`p-3 rounded-xl text-white shadow-sm transition-transform group-hover:scale-105 ${item.isPrimary ? 'bg-gradient-to-br from-teal-600 to-emerald-600' : 'bg-slate-600'}`}>
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-teal-800 transition-colors">{item.title}</h4>
                  <span className="text-[11px] text-teal-700 bg-teal-50 font-bold px-2.5 py-0.5 rounded-full border border-teal-100">{item.date}</span>
                </div>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
