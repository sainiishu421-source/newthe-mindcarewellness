import React from 'react';

export default function HelpSupportView({ faqs, faqSearch, setFaqSearch, openFaqs, toggleFaq, setShowContactModal }) {
  const filteredFaqs = faqs.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.a.toLowerCase().includes(faqSearch.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-slide-up-fade">
      <div className="text-center space-y-4">
        <span className="px-3.5 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-extrabold uppercase tracking-wider border border-teal-200">
          Knowledge Base & Assistance
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Help & Support Center</h2>
        <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
          Find instant answers to common questions regarding session scheduling, clinical screeners, and HIPAA compliance.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto pt-2 group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">search</span>
          <input
            type="text"
            placeholder="Search help topics, FAQs..."
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-full border border-slate-200/80 bg-white shadow-md focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 outline-none text-sm transition-all font-semibold"
          />
        </div>
      </div>

      {/* FAQ Categories & Accordion */}
      <div className="space-y-6">
        {filteredFaqs.map((cat, catIdx) => (
          <div key={catIdx} className="glass-card rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-2.5 bg-teal-50 text-teal-700 rounded-2xl border border-teal-100">
                <span className="material-symbols-outlined text-xl">{cat.icon}</span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-800">{cat.category}</h3>
            </div>

            <div className="space-y-3">
              {cat.items.map((item, itemIdx) => {
                const faqKey = `${catIdx}-${itemIdx}`;
                const isOpen = !!openFaqs[faqKey];

                return (
                  <div key={itemIdx} className="border border-slate-200/80 rounded-2xl overflow-hidden transition-colors">
                    <button
                      onClick={() => toggleFaq(faqKey)}
                      className={`w-full p-4 text-left font-bold text-slate-800 flex justify-between items-center text-sm transition-colors ${
                        isOpen ? 'bg-teal-50/50 text-teal-900 font-extrabold' : 'bg-slate-50/60 hover:bg-slate-100/70'
                      }`}
                    >
                      <span>{item.q}</span>
                      <span className="material-symbols-outlined text-slate-400 transition-transform">
                        {isOpen ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white text-slate-600 text-sm border-t border-slate-100 leading-relaxed animate-slide-up-fade">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support Box */}
      <div className="glass-banner text-white rounded-3xl p-8 sm:p-10 shadow-xl text-center space-y-4 relative overflow-hidden border border-teal-600/30">
        <h3 className="text-2xl font-extrabold">Still need personalized assistance?</h3>
        <p className="text-teal-100 text-sm max-w-md mx-auto leading-relaxed">
          Our dedicated care team is available 24/7 to assist with technical queries or specialist matching.
        </p>
        <button 
          onClick={() => setShowContactModal(true)}
          className="bg-white text-teal-950 px-8 py-3.5 rounded-2xl font-extrabold text-sm hover:bg-teal-50 transition-all shadow-lg hover:scale-105"
        >
          Contact Care Team
        </button>
      </div>
    </div>
  );
}

