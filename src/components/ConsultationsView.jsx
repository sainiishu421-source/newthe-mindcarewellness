import React, { useState } from 'react';

export default function ConsultationsView({
  consultants,
  selectedConsultant,
  setSelectedConsultant,
  bookingDate,
  setBookingDate,
  bookingTime,
  setBookingTime,
  sessionFormat,
  setSessionFormat,
  sessionReason,
  setSessionReason,
  sessionDuration,
  setSessionDuration,
  promoCode,
  setPromoCode,
  discountPercent,
  promoError,
  handleApplyPromo,
  paymentCard,
  setPaymentCard,
  paymentErrors,
  paymentSuccess,
  setPaymentSuccess,
  handlePayConfirm,
  showVideoCall,
  setShowVideoCall,
  videoCallDuration
}) {
  const dates = ['Oct 12', 'Oct 13', 'Oct 14', 'Oct 15', 'Oct 16'];
  const times = ['10:00 AM', '1:00 PM', '3:00 PM', '5:30 PM'];

  // Video call controls state
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);

  const originalPrice = selectedConsultant ? selectedConsultant.cost : 150;
  const finalPrice = discountPercent > 0 ? (originalPrice * (1 - discountPercent / 100)).toFixed(2) : originalPrice.toFixed(2);

  return (
    <div className="space-y-8 animate-slide-up-fade">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <span className="px-3 py-1 bg-teal-700/60 rounded-full text-xs font-bold uppercase tracking-wider text-teal-200 border border-teal-500/30">
            Licensed Professionals
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight mt-2">Book Clinical Consultations</h2>
          <p className="text-teal-100 text-sm mt-1 max-w-xl leading-relaxed">
            Schedule 1-on-1 confidential therapy sessions with experienced clinical psychologists and specialists.
          </p>
        </div>

        <button 
          onClick={() => setShowVideoCall(true)}
          className="relative z-10 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-5 py-3 rounded-2xl font-bold text-sm backdrop-blur-md flex items-center gap-2.5 transition-all shadow-md"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Demo Video Session
        </button>
      </div>

      {/* Main Grid: Therapist Selection & Booking Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Therapist Selector Grid */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-teal-600">psychology</span>
            Select a Specialist
          </h3>

          <div className="grid grid-cols-1 gap-5">
            {consultants.map((c) => {
              const isSelected = selectedConsultant?.id === c.id;
              return (
                <div 
                  key={c.id}
                  onClick={() => setSelectedConsultant(c)}
                  className={`glass-card p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-5 items-start sm:items-center relative ${
                    isSelected 
                      ? 'border-teal-600 ring-2 ring-teal-500/20 shadow-lg bg-teal-50/30' 
                      : 'border-slate-200/80 hover:border-teal-500/40'
                  }`}
                >
                  <img 
                    src={c.imageUrl} 
                    alt={c.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-sm border-2 border-white flex-shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div>
                        <h4 className="text-lg font-extrabold text-slate-800">{c.name}</h4>
                        <p className="text-xs text-teal-700 font-bold">{c.title}</p>
                      </div>
                      <span className="text-lg font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-xl">
                        ${c.cost} <span className="text-xs text-slate-500 font-medium">/ hr</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {c.specialties.map(s => (
                        <span key={s} className="px-2.5 py-0.5 bg-teal-50 text-teal-800 text-[11px] font-bold rounded-full border border-teal-100">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500 pt-1">
                      <span className="flex items-center gap-1 text-amber-600">
                        <span className="material-symbols-outlined text-sm text-amber-500">star</span>
                        {c.rating} ({c.reviews})
                      </span>
                      <span>•</span>
                      <span>{c.experience} Exp</span>
                      <span>•</span>
                      <span>{c.languages}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Interactive Booking Panel */}
        <div className="space-y-6">
          <div className="glass-card p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xl space-y-6 sticky top-28">
            <h3 className="text-xl font-extrabold text-slate-800 border-b border-slate-100 pb-4 flex items-center justify-between">
              <span>Appointment Details</span>
              <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">Step 2 of 2</span>
            </h3>

            {/* Selected Therapist Summary */}
            {selectedConsultant && (
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <img src={selectedConsultant.imageUrl} alt="" className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <p className="text-xs font-extrabold text-slate-800">{selectedConsultant.name}</p>
                  <p className="text-[11px] text-teal-700 font-bold">{selectedConsultant.title}</p>
                </div>
              </div>
            )}

            {/* Date Selection */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Select Date</label>
              <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                {dates.map(d => (
                  <button
                    key={d}
                    onClick={() => setBookingDate(d)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                      bookingDate === d 
                        ? 'bg-teal-600 text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Select Time Slot</label>
              <div className="grid grid-cols-2 gap-2">
                {times.map(t => (
                  <button
                    key={t}
                    onClick={() => setBookingTime(t)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      bookingTime === t 
                        ? 'bg-teal-600 text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Format Selection */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Session Format</label>
              <div className="grid grid-cols-2 gap-2">
                {['Video call', 'In-person'].map(f => (
                  <button
                    key={f}
                    onClick={() => setSessionFormat(f)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      sessionFormat === f 
                        ? 'bg-teal-700 text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Try MINDCARE10"
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-teal-600 uppercase"
                />
                <button
                  onClick={handleApplyPromo}
                  className="bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-900 transition-colors"
                >
                  Apply
                </button>
              </div>
              {discountPercent > 0 && (
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  10% Coupon Applied!
                </p>
              )}
              {promoError && (
                <p className="text-xs text-rose-600 font-bold">{promoError}</p>
              )}
            </div>

            {/* Price Total */}
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-sm font-bold text-slate-600">Total Due:</span>
              <span className="text-2xl font-black text-slate-900">${finalPrice}</span>
            </div>

            {/* Payment Checkout Form / Confirm */}
            {!paymentSuccess ? (
              <form onSubmit={handlePayConfirm} className="space-y-3 pt-2">
                <div>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={paymentCard.name}
                    onChange={(e) => setPaymentCard({ ...paymentCard, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:border-teal-600 outline-none"
                  />
                  {paymentErrors.name && <p className="text-[10px] text-rose-600 font-bold mt-0.5">{paymentErrors.name}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Card Number (16 Digits)"
                    value={paymentCard.number}
                    onChange={(e) => setPaymentCard({ ...paymentCard, number: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:border-teal-600 outline-none"
                  />
                  {paymentErrors.number && <p className="text-[10px] text-rose-600 font-bold mt-0.5">{paymentErrors.number}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={paymentCard.expiry}
                      onChange={(e) => setPaymentCard({ ...paymentCard, expiry: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:border-teal-600 outline-none"
                    />
                    {paymentErrors.expiry && <p className="text-[10px] text-rose-600 font-bold mt-0.5">{paymentErrors.expiry}</p>}
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="CVV"
                      value={paymentCard.cvv}
                      onChange={(e) => setPaymentCard({ ...paymentCard, cvv: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:border-teal-600 outline-none"
                    />
                    {paymentErrors.cvv && <p className="text-[10px] text-rose-600 font-bold mt-0.5">{paymentErrors.cvv}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full gradient-btn text-white py-3.5 rounded-2xl font-bold text-sm shadow-md shadow-teal-500/20 mt-2"
                >
                  Confirm & Pay ${finalPrice}
                </button>
              </form>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center space-y-3 animate-slide-up-fade">
                <span className="material-symbols-outlined text-3xl text-emerald-600">check_circle</span>
                <p className="font-extrabold text-emerald-900 text-sm">Session Booked Successfully!</p>
                <p className="text-xs text-emerald-700">Confirmation sent to your email & recorded in your milestones trajectory.</p>
                <button
                  onClick={() => {
                    setPaymentSuccess(false);
                    setPaymentCard({ number: '', expiry: '', cvv: '', name: '' });
                  }}
                  className="w-full bg-emerald-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  Book Another Session
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mock Video Call Modal */}
      {showVideoCall && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-slide-up-fade">
          <div className="bg-slate-900 text-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-800 space-y-6 relative overflow-hidden">
            {/* Header info */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>
                <div>
                  <h4 className="font-bold text-sm">Active Session with Dr. Ananya Sharma</h4>
                  <p className="text-xs text-slate-400">Encrypted HD Video Connection</p>
                </div>
              </div>
              <span className="bg-slate-800 px-3 py-1 rounded-full text-xs font-mono font-bold text-teal-400">
                {videoCallDuration}
              </span>
            </div>

            {/* Video Viewport Mock */}
            <div className="relative h-72 sm:h-96 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtD0k7joFXApSUN5fqx1TQFqH_ELVGT8Ix_pL2oDRqbL1Lu68ExijA9UMnNxBx-POwkniXBNJM-GOsLmTsIZ49ClMgUPOquiAxjG0WlZF4_ZG_ysh01gIS9GmYARN85fLlZpa573opUQkAWp4aLgyycabwLJMAL4wR9PP59lZcypYVd6D2uKnwtzduXVviGuhkuyDEDBfVwVFFpckzjMFsLe3JAh_MlpOX4Joz_-53LyM3COQvSimi7Q" 
                alt="Therapist Video"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-700">
                Dr. Ananya Sharma (Clinical Psychologist)
              </div>
              
              {/* User PiP */}
              <div className="absolute top-4 right-4 w-28 h-36 bg-slate-800 rounded-xl overflow-hidden border-2 border-slate-700 shadow-lg relative">
                {!isCamOff ? (
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT4_acYkpaqwuyRb0zbDwjmnnic1Zy-rL6Ktz7kbVXyjk7Sfv9u8H0OGcG9O3W3ip0wdVz9wuCn7p9HPoUi-O2IJ_D6gBtBH-hsyq-tAhAE_GvNgTIAUeW3f4k0N2CxuVPL9obWitxKzUvApZ1uNNUwcmzxkLX4dsDH1L21gpQdO6Q1F5w0g6YFm6Z0biO6cMbM34Oo4P3m6PMvfFViPqBnbojDeBMNA8TsnErpaaYH8i1eFbNre8UEA" 
                    alt="You" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-500">
                    <span className="material-symbols-outlined text-3xl">videocam_off</span>
                  </div>
                )}
                {isMicMuted && (
                  <span className="absolute bottom-1 right-1 bg-rose-600 text-white p-1 rounded-full text-xs">
                    <span className="material-symbols-outlined text-xs">mic_off</span>
                  </span>
                )}
              </div>
            </div>

            {/* Video Controls */}
            <div className="flex justify-center items-center gap-4 pt-2">
              <button 
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`p-3.5 rounded-full text-white transition-all ${
                  isMicMuted ? 'bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-600/30' : 'bg-slate-800 hover:bg-slate-700'
                }`}
                title={isMicMuted ? 'Unmute Microphone' : 'Mute Microphone'}
              >
                <span className="material-symbols-outlined">{isMicMuted ? 'mic_off' : 'mic'}</span>
              </button>

              <button 
                onClick={() => setIsCamOff(!isCamOff)}
                className={`p-3.5 rounded-full text-white transition-all ${
                  isCamOff ? 'bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-600/30' : 'bg-slate-800 hover:bg-slate-700'
                }`}
                title={isCamOff ? 'Turn On Camera' : 'Turn Off Camera'}
              >
                <span className="material-symbols-outlined">{isCamOff ? 'videocam_off' : 'videocam'}</span>
              </button>

              <button 
                onClick={() => setShowVideoCall(false)}
                className="p-3.5 bg-rose-600 hover:bg-rose-700 rounded-full text-white transition-colors shadow-lg shadow-rose-600/30"
                title="End Video Call"
              >
                <span className="material-symbols-outlined">call_end</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

