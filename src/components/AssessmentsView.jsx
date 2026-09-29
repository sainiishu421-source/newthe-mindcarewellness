import React from 'react';

export default function AssessmentsView({
  activeAssessment,
  startQuiz,
  quizzes,
  quizStep,
  quizAnswers,
  handleSelectQuizOption,
  quizResult,
  handleSaveQuizResults,
  handleNavigate
}) {
  const currentQuiz = activeAssessment ? quizzes[activeAssessment] : null;

  const assessmentCards = [
    {
      id: 'anxiety',
      title: 'Anxiety Check (GAD-7)',
      subtitle: 'Clinical Screener',
      duration: '3 mins',
      questionsCount: '7 Questions',
      severityTag: 'Standardized',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Gold-standard 7-item questionnaire designed to screen for Generalized Anxiety Disorder and gauge symptom severity.',
      icon: 'psychology',
      iconBg: 'bg-teal-500/10 text-teal-600',
      isPrimary: true
    },
    {
      id: 'stress',
      title: 'Perceived Stress Scale',
      subtitle: 'Wellness Assessment',
      duration: '5 mins',
      questionsCount: '5 Questions',
      severityTag: 'Popular',
      tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      description: 'Widely used psychological instrument for measuring the perception of stress and feelings of overload.',
      icon: 'monitor_heart',
      iconBg: 'bg-indigo-500/10 text-indigo-600',
      isPrimary: false
    },
    {
      id: 'sleep',
      title: 'Sleep Quality Check',
      subtitle: 'Habit & Rest Monitor',
      duration: '2 mins',
      questionsCount: '4 Questions',
      severityTag: 'Daily',
      tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
      description: 'Assess night-time rest consistency, latency, and overall sleep hygiene effectiveness.',
      icon: 'bedtime',
      iconBg: 'bg-amber-500/10 text-amber-600',
      isPrimary: false
    }
  ];

  return (
    <div className="space-y-8 animate-slide-up-fade">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <span className="px-3 py-1 bg-teal-700/60 rounded-full text-xs font-bold uppercase tracking-wider text-teal-200 border border-teal-500/30">
            Clinical Insights
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight mt-2">Clinical Assessments</h2>
          <p className="text-teal-100 text-sm mt-1 max-w-xl leading-relaxed">
            Take scientifically validated screeners to track your mental health trajectory with end-to-end privacy.
          </p>
        </div>
      </div>

      {/* Main Content: Quiz Flow OR Card Grid */}
      {currentQuiz ? (
        <div className="glass-card rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto shadow-xl border border-teal-100">
          {!quizResult ? (
            <div className="space-y-8">
              {/* Header & Progress */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                    Question {quizStep + 1} of {currentQuiz.questions.length}
                  </span>
                  <button 
                    onClick={() => handleNavigate('assessments')}
                    className="text-slate-400 hover:text-slate-600 text-xs font-bold flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-base">close</span> Exit Test
                  </button>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${((quizStep + 1) / currentQuiz.questions.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-800 mt-6">{currentQuiz.title}</h3>
                <p className="text-slate-500 text-sm mt-1">{currentQuiz.subtitle}</p>
              </div>

              {/* Current Question */}
              <div className="bg-slate-50/80 p-6 sm:p-8 rounded-2xl border border-slate-200/80">
                <p className="text-lg font-bold text-slate-800 leading-snug">
                  "{currentQuiz.questions[quizStep]}"
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentQuiz.options.map((opt) => (
                  <button
                    key={opt.text}
                    onClick={() => handleSelectQuizOption(opt.score)}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-teal-600 hover:bg-teal-50/60 font-bold text-slate-700 text-left text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] flex items-center justify-between group"
                  >
                    <span>{opt.text}</span>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-teal-600 transition-colors">
                      radio_button_unchecked
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results Display */
            <div className="text-center space-y-6 animate-slide-up-fade py-4">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <span className="material-symbols-outlined text-4xl">verified</span>
              </div>

              <div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold uppercase tracking-wider">
                  Assessment Complete
                </span>
                <h3 className="text-3xl font-black text-slate-800 mt-3">Score: {quizResult.score} / {quizResult.maxScore}</h3>
                <p className="text-teal-700 font-bold text-lg mt-1">Status: {quizResult.severity}</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left max-w-xl mx-auto space-y-2">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-teal-600 text-lg">lightbulb</span>
                  Clinical Recommendation
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">{quizResult.recommendation}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <button
                  onClick={handleSaveQuizResults}
                  className="gradient-btn text-white py-3.5 px-8 rounded-2xl font-bold shadow-lg shadow-teal-500/20 text-sm"
                >
                  Save Result to Track Record
                </button>
                <button
                  onClick={() => startQuiz(activeAssessment)}
                  className="bg-slate-100 text-slate-700 hover:bg-slate-200 py-3.5 px-6 rounded-2xl font-bold text-sm transition-colors"
                >
                  Retake Test
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Assessment Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assessmentCards.map((card) => (
            <div key={card.id} className="glass-card glass-card-hover p-6 rounded-3xl flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.iconBg} border border-slate-200/50 group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-3xl">{card.icon}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${card.tagColor}`}>
                    {card.severityTag}
                  </span>
                </div>

                <p className="text-xs font-bold text-teal-600 uppercase tracking-wider">{card.subtitle}</p>
                <h3 className="text-xl font-extrabold text-slate-800 mt-1 mb-2 group-hover:text-teal-800 transition-colors">{card.title}</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">{card.description}</p>
              </div>

              <div>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    {card.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">help_outline</span>
                    {card.questionsCount}
                  </span>
                </div>

                <button
                  onClick={() => startQuiz(card.id)}
                  className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    card.isPrimary 
                      ? 'gradient-btn text-white shadow-md shadow-teal-500/20' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Start Assessment
                  <span className="material-symbols-outlined text-lg">play_arrow</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

