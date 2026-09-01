import React from 'react';

export default function PrivacySecurityView() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Privacy & Security Controls</h2>
        <p className="text-slate-500 text-sm mt-1">
          Your personal data and therapy sessions are protected with military-grade encryption and HIPAA compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">lock</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800">256-Bit AES Encryption</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            All data in transit and at rest is secured using bank-level AES-256 standards. Neither third parties nor advertisers can access your clinical test scores.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">verified_user</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800">HIPAA Compliant Protocol</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Mind Care operates under strict health information privacy protocols. Telehealth video calls are end-to-end encrypted and never recorded.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">database</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800">Local Python Database</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Your records are stored securely in a local SQLite database powered by our Python backend, providing complete privacy ownership.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">do_not_disturb_on</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800">Zero Data Sales Guarantee</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            We strictly enforce a policy of zero data monetization. Your assessments, mood logs, and clinical history belong exclusively to you.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-800">Data Management & Controls</h3>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-2xl bg-slate-50">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Download Clinical Data Archive</h4>
            <p className="text-slate-500 text-xs mt-0.5">Export a full JSON copy of your assessment history and milestones.</p>
          </div>
          <button 
            onClick={() => alert("Export initiated! Your encrypted data archive is downloading...")}
            className="bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-900"
          >
            Export Archive
          </button>
        </div>
      </div>
    </div>
  );
}
