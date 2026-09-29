import React, { useState } from 'react';

export default function PrivacySecurityView({ milestones, userProfile }) {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true,
    endToEndBackup: true,
    hipaaLogs: true,
    anonymousAnalytics: false
  });

  const toggleSetting = (key) => {
    setSecuritySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExportArchive = () => {
    const archiveData = {
      user: userProfile || { name: 'Sarah Jenkins', email: 'sarah.jenkins@mindcare.io' },
      exportDate: new Date().toISOString(),
      securitySettings,
      milestones: milestones || []
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(archiveData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "mind_care_wellness_archive.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-slide-up-fade">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <span className="px-3 py-1 bg-teal-700/60 rounded-full text-xs font-bold uppercase tracking-wider text-teal-200 border border-teal-500/30">
            Enterprise Security & Governance
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight mt-2">Privacy & Security Controls</h2>
          <p className="text-teal-100 text-sm mt-1 max-w-xl leading-relaxed">
            Your personal data and therapy sessions are protected with military-grade 256-bit AES encryption and HIPAA compliance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card glass-card-hover p-6.5 rounded-3xl space-y-3">
          <div className="w-13 h-13 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-500/20">
            <span className="material-symbols-outlined text-2xl">lock</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-800">256-Bit AES Encryption</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            All data in transit and at rest is secured using bank-level AES-256 standards. Neither third parties nor advertisers can access your clinical test scores.
          </p>
        </div>

        <div className="glass-card glass-card-hover p-6.5 rounded-3xl space-y-3">
          <div className="w-13 h-13 bg-teal-500/10 text-teal-600 rounded-2xl flex items-center justify-center border border-teal-500/20">
            <span className="material-symbols-outlined text-2xl">verified_user</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-800">HIPAA Compliant Protocol</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Mind Care operates under strict health information privacy protocols. Telehealth video calls are end-to-end encrypted and never recorded.
          </p>
        </div>

        <div className="glass-card glass-card-hover p-6.5 rounded-3xl space-y-3">
          <div className="w-13 h-13 bg-indigo-500/10 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-500/20">
            <span className="material-symbols-outlined text-2xl">database</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-800">Local Python Database</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Your records are stored securely in a local SQLite database powered by our Python backend, providing complete privacy ownership.
          </p>
        </div>

        <div className="glass-card glass-card-hover p-6.5 rounded-3xl space-y-3">
          <div className="w-13 h-13 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-500/20">
            <span className="material-symbols-outlined text-2xl">do_not_disturb_on</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-800">Zero Data Sales Guarantee</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            We strictly enforce a policy of zero data monetization. Your assessments, mood logs, and clinical history belong exclusively to you.
          </p>
        </div>
      </div>

      {/* Interactive Controls & Governance Toggles */}
      <div className="glass-card rounded-3xl p-7 border border-slate-200/80 shadow-sm space-y-5">
        <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-teal-600">tune</span>
          Security Preference Toggles
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div>
              <p className="font-extrabold text-slate-800 text-sm">Two-Factor Authentication (2FA)</p>
              <p className="text-slate-500 text-xs mt-0.5">Require TOTP authentication code when logging into your sanctuary.</p>
            </div>
            <button 
              onClick={() => toggleSetting('twoFactor')}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                securitySettings.twoFactor ? 'bg-teal-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                securitySettings.twoFactor ? 'translate-x-6' : 'translate-x-0'
              }`}></div>
            </button>
          </div>

          <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div>
              <p className="font-extrabold text-slate-800 text-sm">End-to-End Encrypted Cloud Sync</p>
              <p className="text-slate-500 text-xs mt-0.5">Encrypt milestone backups before syncing to server storage.</p>
            </div>
            <button 
              onClick={() => toggleSetting('endToEndBackup')}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                securitySettings.endToEndBackup ? 'bg-teal-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                securitySettings.endToEndBackup ? 'translate-x-6' : 'translate-x-0'
              }`}></div>
            </button>
          </div>

          <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div>
              <p className="font-extrabold text-slate-800 text-sm">HIPAA Access Audit Logging</p>
              <p className="text-slate-500 text-xs mt-0.5">Record access log history whenever clinical records are viewed.</p>
            </div>
            <button 
              onClick={() => toggleSetting('hipaaLogs')}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                securitySettings.hipaaLogs ? 'bg-teal-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                securitySettings.hipaaLogs ? 'translate-x-6' : 'translate-x-0'
              }`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Data Export Box */}
      <div className="glass-card rounded-3xl p-7 border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-teal-600">download_for_offline</span>
          Data Management & Sovereignty
        </h3>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/70">
          <div>
            <h4 className="font-extrabold text-slate-800 text-sm">Download Clinical Data Archive</h4>
            <p className="text-slate-500 text-xs mt-0.5">Export a full JSON copy of your assessment history, notes, and milestones.</p>
          </div>
          <button 
            onClick={handleExportArchive}
            className="gradient-btn text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-teal-500/20 hover:scale-105 transition-transform flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">download</span>
            Export Archive (.json)
          </button>
        </div>
      </div>
    </div>
  );
}

