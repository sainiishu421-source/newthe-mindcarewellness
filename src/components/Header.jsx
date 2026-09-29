import React from 'react';

export default function Header({ 
  activeTab, 
  handleNavigate, 
  apiStatus,
  searchQuery,
  setSearchQuery,
  showNotifications,
  setShowNotifications,
  notificationsList,
  markAllNotificationsRead,
  clearNotification,
  showProfileModal,
  setShowProfileModal,
  userProfile,
  setUserProfile,
  consultants,
  setSelectedConsultant,
  startQuiz
}) {
  const unreadCount = notificationsList ? notificationsList.filter(n => n.unread).length : 0;

  // Search Results filtering
  const matchingTherapists = searchQuery.trim() ? consultants.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];

  const matchingScreeners = searchQuery.trim() ? [
    { id: 'anxiety', name: 'Anxiety Check (GAD-7)', type: 'Clinical Screener' },
    { id: 'stress', name: 'Perceived Stress Scale', type: 'Wellness Test' },
    { id: 'sleep', name: 'Sleep Quality Check', type: 'Habit Monitor' }
  ].filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex justify-between items-center px-8 h-20 fixed top-0 right-0 w-[calc(100%-16rem)] z-30 glass-header shadow-sm transition-all duration-300">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-extrabold text-slate-800 capitalize tracking-tight flex items-center gap-2">
            <span>{activeTab.replace('_', ' ')}</span>
          </h2>
          {apiStatus && (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-all ${
              apiStatus.status === 'online' 
                ? 'bg-emerald-50/90 text-emerald-700 border border-emerald-200/80 shadow-emerald-500/10' 
                : 'bg-amber-50/90 text-amber-700 border border-amber-200/80'
            }`}>
              <span className={`w-2 h-2 rounded-full ${apiStatus.status === 'online' ? 'bg-emerald-500 animate-pulse-glow' : 'bg-amber-500'}`}></span>
              Python API: {apiStatus.status === 'online' ? 'Connected' : 'Offline Mode'}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-6">
          {/* Interactive Search Bar */}
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors text-lg">search</span>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-full border border-slate-200/80 bg-slate-50/80 focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-300 text-sm w-72 text-slate-700 shadow-inner" 
              placeholder="Search screeners, therapists..." 
              type="text"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-sm">cancel</span>
              </button>
            )}

            {/* Live Search Results Dropdown Overlay */}
            {searchQuery.trim() !== '' && (
              <div className="absolute left-0 right-0 top-12 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 space-y-3 animate-slide-up-fade max-h-80 overflow-y-auto">
                {matchingScreeners.length > 0 && (
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-teal-600 px-2 mb-1">Screeners</p>
                    {matchingScreeners.map(s => (
                      <div 
                        key={s.id}
                        onClick={() => {
                          startQuiz(s.id);
                          handleNavigate('assessments');
                          setSearchQuery('');
                        }}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-teal-50 cursor-pointer text-xs font-bold text-slate-800"
                      >
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-teal-600 text-base">quiz</span>
                          {s.name}
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">{s.type}</span>
                      </div>
                    ))}
                  </div>
                )}

                {matchingTherapists.length > 0 && (
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-teal-600 px-2 mb-1">Therapists</p>
                    {matchingTherapists.map(c => (
                      <div 
                        key={c.id}
                        onClick={() => {
                          setSelectedConsultant(c);
                          handleNavigate('consultations');
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-teal-50 cursor-pointer text-xs font-bold text-slate-800"
                      >
                        <img src={c.imageUrl} alt="" className="w-7 h-7 rounded-lg object-cover" />
                        <div>
                          <p>{c.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{c.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {matchingScreeners.length === 0 && matchingTherapists.length === 0 && (
                  <p className="text-xs text-slate-500 text-center py-4">No matching results found</p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 relative">
            {/* Notifications Button & Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-slate-500 hover:text-teal-600 transition-all p-2.5 hover:bg-teal-50/60 rounded-full group"
              >
                <span className="material-symbols-outlined text-xl">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-teal-500 ring-2 ring-white"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200 p-4 z-50 space-y-3 animate-slide-up-fade">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                    <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-teal-600 text-lg">notifications</span>
                      Notifications
                    </h4>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllNotificationsRead}
                        className="text-[11px] font-bold text-teal-600 hover:text-teal-800"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {notificationsList.length > 0 ? (
                      notificationsList.map(n => (
                        <div 
                          key={n.id}
                          className={`p-2.5 rounded-2xl border flex items-start justify-between gap-2 text-xs transition-colors ${
                            n.unread ? 'bg-teal-50/70 border-teal-100 font-bold' : 'bg-slate-50/50 border-slate-100 text-slate-600'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-teal-600 text-base mt-0.5">{n.icon}</span>
                            <div>
                              <p className="leading-snug">{n.title}</p>
                              <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => clearNotification(n.id)}
                            className="text-slate-300 hover:text-slate-500 p-0.5"
                          >
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 text-center py-4">No notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => handleNavigate('help_support')} className="text-slate-500 hover:text-teal-600 transition-all p-2.5 hover:bg-teal-50/60 rounded-full">
              <span className="material-symbols-outlined text-xl">help</span>
            </button>
            
            <div className="h-6 w-px bg-slate-200/80 mx-1"></div>
            
            {/* User Profile Card Button */}
            <div 
              onClick={() => setShowProfileModal(true)}
              className="flex items-center gap-3 cursor-pointer p-1.5 rounded-full hover:bg-slate-100/70 transition-all duration-200 group"
            >
              <div className="relative">
                <img 
                  className="w-10 h-10 rounded-full border-2 border-teal-500/30 object-cover shadow-sm group-hover:scale-105 transition-transform" 
                  src={userProfile.avatar}
                  alt={userProfile.name}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
              </div>
              <div className="pr-2">
                <p className="text-xs font-extrabold text-slate-800 leading-tight group-hover:text-teal-700 transition-colors">{userProfile.name}</p>
                <p className="text-[11px] text-teal-600 font-semibold">{userProfile.membership}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* User Profile Edit Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-slide-up-fade">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative space-y-6">
            <button 
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
            
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
              <img src={userProfile.avatar} alt="" className="w-16 h-16 rounded-2xl object-cover ring-4 ring-teal-500/20 shadow-md" />
              <div>
                <h3 className="text-lg font-extrabold text-slate-800">{userProfile.name}</h3>
                <p className="text-xs text-teal-600 font-bold">{userProfile.membership}</p>
                <span className="text-[11px] text-slate-400 font-medium">{userProfile.email}</span>
              </div>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert("Profile settings updated successfully!");
              setShowProfileModal(false);
            }} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={userProfile.name} 
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-teal-600 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={userProfile.email} 
                  onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-teal-600 outline-none"
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full gradient-btn text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-teal-500/20">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center px-4 h-16 bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 w-full shadow-sm">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleNavigate('dashboard')}>
          <img 
            alt="Mind Care logo" 
            className="w-9 h-9 rounded-full object-cover ring-2 ring-teal-500/30 shadow-sm" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVO-aE9_a21aEW4sT-sPoi1rQ19hYVxT8BrkpBeuifi9bW-wyqKP0SMdApTB7AJ0UhF6SyCPlAHskvy_GYTdW2FGETXlEPbGvmlIhtce8XiXMC5aNJGMTu_WDkCEs5CDkGWauTYO8HIj9BnQPlMgWxh2qN133FvYMNVIRoxOj-gR8LXgqwGzgKqqmknR7tN-UsEhuR6_qimFLUJUX3rg5jmOzRaMKb5NuhA1vGVe36TlInLQR5wOXxwg"
          />
          <span className="font-extrabold text-teal-900 text-lg tracking-tight">Mind Care</span>
        </div>
        <div className="flex items-center gap-3">
          {apiStatus && (
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse-glow" title="API Online"></span>
          )}
          <button onClick={() => handleNavigate('help_support')} className="text-slate-600 p-2 hover:bg-slate-100 rounded-full">
            <span className="material-symbols-outlined">help</span>
          </button>
          <img 
            onClick={() => setShowProfileModal(true)}
            className="w-9 h-9 rounded-full object-cover border-2 border-teal-500/30 cursor-pointer" 
            src={userProfile.avatar}
            alt={userProfile.name}
          />
        </div>
      </header>
    </>
  );
}

