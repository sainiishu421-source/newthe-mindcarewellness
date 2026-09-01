import React from 'react';

export default function HelpSupportView({ faqs, faqSearch, setFaqSearch, openFaqs, toggleFaq }) {
  const filteredFaqs = faqs.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.a.toLowerCase().includes(faqSearch.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Help & Support Center</h2>
        <p className="text-slate-500 text-sm max-w-lg mx-auto">
          Find instant answers to common questions regarding session scheduling, assessment screeners, and privacy.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto pt-2">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input
            type="text"
            placeholder="Search help topics, FAQs..."
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 bg-white shadow-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-sm"
          />
        </div>
      </div>

      {/* FAQ Categories & Accordion */}
      <div className="space-y-6">
        {filteredFaqs.map((cat, catIdx) => (
          <div key={catIdx} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-2 bg-teal-50 text-teal-700 rounded-xl">
                <span className="material-symbols-outlined text-xl">{cat.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">{cat.category}</h3>
            </div>

            <div className="space-y-3">
              {cat.items.map((item, itemIdx) => {
                const faqKey = `${catIdx}-${itemIdx}`;
                const isOpen = !!openFaqs[faqKey];

                return (
                  <div key={itemIdx} className="border border-slate-100 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => toggleFaq(faqKey)}
                      className="w-full p-4 text-left font-bold text-slate-800 flex justify-between items-center bg-slate-50/50 hover:bg-slate-50 text-sm"
                    >
                      <span>{item.q}</span>
                      <span className="material-symbols-outlined text-slate-400">
                        {isOpen ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white text-slate-600 text-sm border-t border-slate-100 leading-relaxed">
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
      <div className="bg-gradient-to-r from-teal-800 to-slate-900 text-white rounded-3xl p-8 shadow-lg text-center space-y-4">
        <h3 className="text-xl font-bold">Still need support?</h3>
        <p className="text-teal-100 text-sm max-w-md mx-auto">
          Our dedicated care team is available 24/7 to assist with technical queries or care coordinator matching.
        </p>
        <button 
          onClick={() => alert("Contact request sent! A care specialist will email support@mindcare.org shortly.")}
          className="bg-white text-teal-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-teal-50 transition-colors shadow-md"
        >
          Contact Care Team
        </button>
      </div>
    </div>
  );
}
