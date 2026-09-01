import React from 'react';

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
  handlePayConfirm,
  showVideoCall,
  setShowVideoCall,
  videoCallDuration
}) {
  const dates = ['Oct 12', 'Oct 13', 'Oct 14', 'Oct 15', 'Oct 16'];
  const times = ['10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'];
  const formats = ['Video call', 'Audio call', 'In-person clinic'];

  const basePrice = selectedConsultant ? selectedConsultant.cost : 150;
  const durationMultiplier = sessionDuration === 30 ? 0.6 : 1.0;
  const rawCost = basePrice * durationMultiplier;
  const finalCost = Math.round(rawCost * (1 - discountPercent / 100));

  if (showVideoCall) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
              <div>
                <h3 className="font-bold text-lg">Live Session: {selectedConsultant.name}</h3>
                <p className="text-xs text-slate-400">Encrypted 256-Bit HIPAA Compliant Call</p>
              </div>
            </div>
            <div className="bg-slate-800 px-3 py-1.5 rounded-full text-xs font-mono text-emerald-400">
              {videoCallDuration}
            </div>
          </div>

          <div className="relative aspect-video bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 flex items-center justify-center">
            <img 
              src={selectedConsultant.imageUrl} 
              alt={selectedConsultant.name}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            
            {/* Self Video overlay */}
            <div className="absolute bottom-4 right-4 w-36 h-24 bg-slate-700 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT4_acYkpaqwuyRb0zbDwjmnnic1Zy-rL6Ktz7kbVXyjk7Sfv9u8H0OGcG9O3W3ip0wdVz9wuCn7p9HPoUi-O2IJ_D6gBtBH-hsyq-tAhAE_GvNgTIAUeW3f4k0N2CxuVPL9obWitxKzUvApZ1uNNUwcmzxkLX4dsDH1L21gpQdO6Q1F5w0g6YFm6Z0biO6cMbM34Oo4P3m6PMvfFViPqBnbojDeBMNA8TsnErpaaYH8i1eFbNre8UEA" 
                alt="Sarah"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute bottom-4 left-4">
              <p className="text-sm font-bold">{selectedConsultant.name}</p>
              <p className="text-xs text-slate-300">{selectedConsultant.title}</p>
            </div>
          </div>

          {/* Call Controls */}
          <div className="flex justify-center items-center gap-4 py-2">
            <button className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center">
              <span className="material-symbols-outlined">mic</span>
            </button>
            <button className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center">
              <span className="material-symbols-outlined">videocam</span>
            </button>
            <button 
              onClick={() => setShowVideoCall(false)}
              className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg"
            >
              <span className="material-symbols-outlined text-2xl">call_end</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Therapists & Consultation Booking</h2>
        <p className="text-slate-500 text-sm mt-1">
          Schedule confidential 1-on-1 video sessions with board-certified clinical psychologists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Consultant Selector & Details */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-slate-800">1. Select Licensed Therapist</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {consultants.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedConsultant(c)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedConsultant.id === c.id 
                    ? 'border-teal-600 bg-teal-50/40 ring-2 ring-teal-600/20 shadow-md' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <img 
                  src={c.imageUrl} 
                  alt={c.name} 
                  className="w-full h-36 object-cover rounded-xl mb-3 shadow-sm"
                />
                <h4 className="font-bold text-slate-800 text-sm leading-tight">{c.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{c.title}</p>
                <div className="flex items-center gap-1 mt-2 text-xs font-bold text-amber-500">
                  <span className="material-symbols-outlined text-sm text-amber-500">star</span>
                  {c.rating} ({c.reviews})
                </div>
              </div>
            ))}
          </div>

          {/* Selected Therapist Bio */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-start gap-4">
              <img 
                src={selectedConsultant.imageUrl} 
                alt={selectedConsultant.name}
                className="w-16 h-16 rounded-2xl object-cover shadow-md" 
              />
              <div>
                <h3 className="text-lg font-bold text-slate-800">{selectedConsultant.name}</h3>
                <p className="text-xs text-teal-700 font-semibold">{selectedConsultant.title}</p>
                <p className="text-xs text-slate-400 mt-1">Languages: {selectedConsultant.languages} • Exp: {selectedConsultant.experience}</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{selectedConsultant.bio}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              {selectedConsultant.specialties.map((s) => (
                <span key={s} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Booking Options */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800">2. Customize Session Details</h3>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Select Date</label>
              <div className="flex flex-wrap gap-2">
                {dates.map((d) => (
                  <button
                    key={d}
                    onClick={() => setBookingDate(d)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
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

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Select Time</label>
              <div className="flex flex-wrap gap-2">
                {times.map((t) => (
                  <button
                    key={t}
                    onClick={() => setBookingTime(t)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
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

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Format</label>
              <div className="flex flex-wrap gap-2">
                {formats.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSessionFormat(f)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      sessionFormat === f 
                        ? 'bg-teal-600 text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Duration</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setSessionDuration(30)}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm border transition-all ${
                    sessionDuration === 30 ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  30 Mins (${Math.round(basePrice * 0.6)})
                </button>
                <button
                  onClick={() => setSessionDuration(60)}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm border transition-all ${
                    sessionDuration === 60 ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  60 Mins (${basePrice})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Checkout & Payment Confirmation */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-6 sticky top-28">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Session Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Therapist:</span>
                <span className="font-bold text-slate-800">{selectedConsultant.name}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Date & Time:</span>
                <span className="font-bold text-slate-800">{bookingDate}, {bookingTime}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Duration & Format:</span>
                <span className="font-bold text-slate-800">{sessionDuration} mins ({sessionFormat})</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Coupon Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. MINDCARE10"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-600 uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-900"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-xs text-red-500 mt-1">{promoError}</p>}
              {discountPercent > 0 && <p className="text-xs text-emerald-600 font-bold mt-1">10% Promo Discount Applied!</p>}
            </div>

            <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
              <span className="font-bold text-slate-800">Total Investment:</span>
              <span className="text-2xl font-black text-teal-700">${finalCost}</span>
            </div>

            {!paymentSuccess ? (
              <form onSubmit={handlePayConfirm} className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-800 text-sm">Payment Details</h4>
                <div>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={paymentCard.name}
                    onChange={(e) => setPaymentCard({ ...paymentCard, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-teal-600"
                  />
                  {paymentErrors.name && <p className="text-[10px] text-red-500 mt-0.5">{paymentErrors.name}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Card Number (16 digits)"
                    maxLength={16}
                    value={paymentCard.number}
                    onChange={(e) => setPaymentCard({ ...paymentCard, number: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-teal-600"
                  />
                  {paymentErrors.number && <p className="text-[10px] text-red-500 mt-0.5">{paymentErrors.number}</p>}
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={paymentCard.expiry}
                      onChange={(e) => setPaymentCard({ ...paymentCard, expiry: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-teal-600"
                    />
                    {paymentErrors.expiry && <p className="text-[10px] text-red-500 mt-0.5">{paymentErrors.expiry}</p>}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="CVV"
                      maxLength={4}
                      value={paymentCard.cvv}
                      onChange={(e) => setPaymentCard({ ...paymentCard, cvv: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-teal-600"
                    />
                    {paymentErrors.cvv && <p className="text-[10px] text-red-500 mt-0.5">{paymentErrors.cvv}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-3 rounded-full font-bold hover:bg-teal-700 transition-colors shadow-md shadow-teal-600/20 text-sm flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">lock</span>
                  Pay ${finalCost} & Confirm Session
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-center pt-2 animate-fade-in">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-2xl">check_circle</span>
                </div>
                <h4 className="font-bold text-slate-800 text-base">Booking Confirmed!</h4>
                <p className="text-xs text-slate-500">
                  Your appointment is saved to Python SQLite Database.
                </p>
                <button
                  onClick={() => setShowVideoCall(true)}
                  className="w-full bg-emerald-600 text-white py-3 rounded-full font-bold hover:bg-emerald-700 transition-colors text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <span className="material-symbols-outlined text-lg">videocam</span>
                  Launch Demo Video Call
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
