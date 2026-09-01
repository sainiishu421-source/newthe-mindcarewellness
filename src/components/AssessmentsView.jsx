import React from 'react';

export default function AssessmentsView({
  activeAssessment,
  startQuiz,
  anxietyQuiz,
  quizStep,
  quizAnswers,
  handleSelectQuizOption,
  quizResult,
  handleSaveQuizResults,
  handleNavigate
}) {
  const availableAssessments = [
    {
      id: 'anxiety',
      title: 'Anxiety Check (GAD-7)',
      description: 'Clinically validated 7-question assessment for measuring generalized anxiety symptoms.',
      duration: '3 mins',
      questionsCount: 7,
      category: 'Clinical Screener',
      icon: 'psychology',
      badgeColor: 'bg-teal-50 text-teal-700'
    },
    {
      id: 'stress',
      title: 'Daily Stress Check',
      description: 'Quick evaluation of daily mental load, workplace pressures, and physical tension levels.',
      duration: '2 mins',
      questionsCount: 5,
      category: 'Lifestyle Screener',
      icon: 'speed',
      badgeColor: 'bg-indigo-50 text-indigo-700'
    },
    {
      id: 'sleep',
      title: 'Sleep & Energy Quality',
      description: 'Assess restorative sleep patterns, nighttime anxiety, and morning energy reserves.',
      duration: '4 mins',
      questionsCount: 6,
      category: 'Wellness Screener',
      icon: 'bedtime',
      badgeColor: 'bg-emerald-50 text-emerald-700'
    }
  ];

  if (activeAssessment === 'anxiety') {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        {!quizResult ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold">
                  Step {quizStep + 1} of {anxietyQuiz.questions.length}
                </span>
                <h2 className="text-xl font-bold text-slate-800 mt-2">{anxietyQuiz.title}</h2>
              </div>
              <button 
                onClick={() => handleNavigate('assessments')} 
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-sm text-slate-500 font-medium">{anxietyQuiz.subtitle}</p>

            <div className="py-4">
              <h3 className="text-lg font-bold text-slate-800 mb-6">
                "{anxietyQuiz.questions[quizStep]}"
              </h3>

              <div className="space-y-3">
                {anxietyQuiz.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuizOption(opt.score)}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-teal-600 hover:bg-teal-50/50 transition-all font-semibold text-slate-700 hover:text-teal-900 flex justify-between items-center group"
                  >
                    <span>{opt.text}</span>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-teal-600">
                      arrow_forward_ios
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-teal-600 h-full transition-all duration-300"
                style={{ width: `${((quizStep + 1) / anxietyQuiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6 text-center animate-fade-in">
            <div className="w-16 h-16 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>

            <div>
              <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-bold uppercase tracking-wider">
                Assessment Complete
              </span>
              <h2 className="text-2xl font-black text-slate-800 mt-2">GAD-7 Score: {quizResult.score}/21</h2>
              <p className="text-lg font-bold text-teal-600 mt-1">Severity: {quizResult.severity} Anxiety</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left">
              <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-600">recommend</span>
                Clinical Recommendation
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">{quizResult.recommendation}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleSaveQuizResults}
                className="flex-1 bg-teal-600 text-white py-3 rounded-full font-bold hover:bg-teal-700 transition-colors shadow-md shadow-teal-600/20"
              >
                Save Result to Milestones & Backend
              </button>
              <button
                onClick={() => handleNavigate('consultations')}
                className="flex-1 bg-indigo-50 text-indigo-700 py-3 rounded-full font-bold hover:bg-indigo-100 transition-colors"
              >
                Book Consultation
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Available Clinical Screeners</h2>
        <p className="text-slate-500 text-sm mt-1">
          Standardized digital health assessments designed to track emotional health over time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {availableAssessments.map((test) => (
          <div 
            key={test.id} 
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${test.badgeColor}`}>
                  <span className="material-symbols-outlined text-2xl">{test.icon}</span>
                </div>
                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                  {test.duration}
                </span>
              </div>
              <span className="text-xs font-bold text-teal-600 tracking-wider uppercase block mb-1">
                {test.category}
              </span>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{test.title}</h3>
              <p className="text-slate-500 text-sm mb-4 leading-relaxed">{test.description}</p>
            </div>

            <button
              onClick={() => startQuiz(test.id)}
              className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-sm text-sm flex items-center justify-center gap-2"
            >
              Start Screener
              <span className="material-symbols-outlined text-base">play_arrow</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
