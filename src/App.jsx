import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import AssessmentsView from './components/AssessmentsView';
import TrackRecordView from './components/TrackRecordView';
import ConsultationsView from './components/ConsultationsView';
import HelpSupportView from './components/HelpSupportView';
import PrivacySecurityView from './components/PrivacySecurityView';

import {
  fetchHealth,
  fetchConsultants,
  fetchMilestones,
  submitAppointmentApi,
  submitAssessmentApi,
  postMoodApi
} from './services/api';

const initialConsultants = [
  {
    id: 'dr_ananya_sharma',
    name: 'Dr. Ananya Sharma',
    title: 'Clinical Psychologist, Ph.D.',
    specialties: ['Anxiety', 'Depression', 'Trauma'],
    rating: 4.9,
    reviews: '120+',
    experience: '10 Years',
    languages: 'English, Hindi',
    cost: 150,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtD0k7joFXApSUN5fqx1TQFqH_ELVGT8Ix_pL2oDRqbL1Lu68ExijA9UMnNxBx-POwkniXBNJM-GOsLmTsIZ49ClMgUPOquiAxjG0WlZF4_ZG_ysh01gIS9GmYARN85fLlZpa573opUQkAWp4aLgyycabwLJMAL4wR9PP59lZcypYVd6D2uKnwtzduXVviGuhkuyDEDBfVwVFFpckzjMFsLe3JAh_MlpOX4Joz_-53LyM3COQvSimi7Q',
    bio: 'Dr. Ananya Sharma is a compassionate Clinical Psychologist dedicated to helping individuals navigate life\'s complexities. With over a decade of experience, she specializes in evidence-based therapies like CBT and mindfulness-based interventions.'
  },
  {
    id: 'dr_james_wilson',
    name: 'Dr. James Wilson',
    title: 'Clinical Psychologist',
    specialties: ['Anxiety', 'Stress', 'Grief'],
    rating: 4.8,
    reviews: '95+',
    experience: '8 Years',
    languages: 'English',
    cost: 130,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuRxcVAxGftqvpsTjDX12nHycyMxUe7XSqmPJ10cIb5PO1vFkR2PT_qNnDa7F3jFUdXSkfwo0jTKj5SW9BUv9tMkZrZeTWTw59MDekcahjCiuIh3h7I1jR_OTV_7kLbbJ4fHRBZwOFm4d4NZ7w9jnUA9QTuXB_JV98Rh8XwXGakrW6Sn1WCR5z2tCXz5ZmFarQNCifPr6jG0JnREaQkSBIJG4-DGXD9jjuipngkhsgoCaEnrYHT4cAsg',
    bio: 'Dr. James Wilson specializes in cognitive behavioral therapy for anxiety disorders, daily stress management, and emotional support through difficult life transitions.'
  },
  {
    id: 'sarah_jenkins',
    name: 'Sarah Jenkins',
    title: 'Holistic Therapist',
    specialties: ['Mindfulness', 'Life Transitions', 'Self-Esteem'],
    rating: 4.7,
    reviews: '80+',
    experience: '6 Years',
    languages: 'English, Spanish',
    cost: 120,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANVfVPxapGQiQokkUlIkcH79oLI5Krm5Iz9BMFnn1D1LJa1QRWOCRgs88wCtHSqRojzs_u_ILrUVIC1co_oxF8bf5D4OG4oVqA18uROmwUIoFcWugmPFbQqF8tn6TSPKL2xc68t9ZVq4HAgZVAZYqr8n7RfW8LgfCH96rgo7yLpY1709vulfTgwNqHLw9MBXGwvvaK4XBN3-aCoaMrjnMmogxHiG3IkNMDEHuKz79-d9FrqW0JHNED9g',
    bio: 'Sarah Jenkins incorporates somatic and mindfulness-based therapies into her practice to help individuals reconnect with their bodies and find emotional alignment.'
  }
];

const initialMilestones = [
  {
    id: 1,
    title: 'Completed Anxiety Assessment',
    detail: 'Scores improved by 15% compared to last month.',
    date: 'Today',
    icon: 'emoji_events',
    isPrimary: true
  },
  {
    id: 2,
    title: 'Therapy Session',
    detail: 'Discussed coping mechanisms for daily stress.',
    date: 'Oct 24, 2026',
    icon: 'psychology',
    isPrimary: false
  },
  {
    id: 3,
    title: 'Completed Stress Check',
    detail: 'Identified workload and lack of sleep as main stressors.',
    date: 'Oct 15, 2026',
    icon: 'assignment',
    isPrimary: false
  }
];

const faqsData = [
  {
    category: 'Getting Started',
    icon: 'rocket_launch',
    items: [
      { q: 'What is Mind Care?', a: 'Mind Care is a digital sanctuary that provides access to clinical-grade mental health assessments, wellness progress tracking, and professional consultation with certified therapists.' },
      { q: 'How do I start an assessment?', a: 'Simply head to the "Assessments" page, choose a test that fits your current focus area (such as Stress Check or Anxiety Check), and click "Start Test".' }
    ]
  },
  {
    category: 'Sessions & Booking',
    icon: 'calendar_month',
    items: [
      { q: 'How do I book a consultation session?', a: 'You can go to the "Consultations" page, select a therapist, pick a date and time slot that fits your schedule, fill out the consultation details, and complete the secure payment.' },
      { q: 'Can I cancel or reschedule my session?', a: 'Yes. You can reschedule or cancel a session up to 24 hours prior to the scheduled start time from your Dashboard or History tab.' }
    ]
  },
  {
    category: 'Privacy & Security',
    icon: 'shield',
    items: [
      { q: 'Is my personal information secure?', a: 'Absolutely. We utilize enterprise-grade 256-bit AES encryption to secure your data both in transit and at rest. Your sessions are private and HIPAA-compliant.' },
      { q: 'Who has access to my assessment results?', a: 'Only you and any healthcare providers you explicitly choose to share them with can access your results. We never sell your data.' }
    ]
  },
  {
    category: 'Assessments',
    icon: 'quiz',
    items: [
      { q: 'Are these assessments clinically validated?', a: 'Yes. Our tests are modeled on gold-standard clinical screeners, such as the GAD-7 for anxiety tracking, ensuring high-quality insights.' },
      { q: 'How often should I take an assessment?', a: 'We recommend taking checking assessments once a week or biweekly to monitor changes in your emotional wellbeing over time.' }
    ]
  }
];

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState('dashboard');
  const [apiStatus, setApiStatus] = useState(null);

  // App Stats / Data States
  const [consultants, setConsultants] = useState(initialConsultants);
  const [streakDays, setStreakDays] = useState(14);
  const [completedTestsCount, setCompletedTestsCount] = useState(8);
  const [milestones, setMilestones] = useState(initialMilestones);

  // User Interactive Mood Check-in
  const [userMood, setUserMood] = useState(null);
  const [moodMessage, setMoodMessage] = useState('How are you feeling today?');

  // Booking Flow States
  const [selectedConsultant, setSelectedConsultant] = useState(initialConsultants[0]);
  const [bookingDate, setBookingDate] = useState('Oct 12');
  const [bookingTime, setBookingTime] = useState('3:00 PM');
  const [sessionFormat, setSessionFormat] = useState('Video call');
  const [sessionReason, setSessionReason] = useState('');
  const [sessionDuration, setSessionDuration] = useState(60);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [paymentCard, setPaymentCard] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [paymentErrors, setPaymentErrors] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Active Assessment State & Quizzes
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  // Search & Global Overlay States
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, title: 'Weekly Assessment Reminder', time: '10m ago', unread: true, icon: 'quiz' },
    { id: 2, title: 'Appointment Confirmed with Dr. Ananya Sharma', time: '2h ago', unread: true, icon: 'check_circle' },
    { id: 3, title: '14-Day Streak Badge Unlocked!', time: '1d ago', unread: false, icon: 'local_fire_department' }
  ]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@mindcare.io',
    membership: 'Premium Member',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT4_acYkpaqwuyRb0zbDwjmnnic1Zy-rL6Ktz7kbVXyjk7Sfv9u8H0OGcG9O3W3ip0wdVz9wuCn7p9HPoUi-O2IJ_D6gBtBH-hsyq-tAhAE_GvNgTIAUeW3f4k0N2CxuVPL9obWitxKzUvApZ1uNNUwcmzxkLX4dsDH1L21gpQdO6Q1F5w0g6YFm6Z0biO6cMbM34Oo4P3m6PMvfFViPqBnbojDeBMNA8TsnErpaaYH8i1eFbNre8UEA'
  });

  // Contact Care Team Modal State
  const [showContactModal, setShowContactModal] = useState(false);

  // Mock Video Call State
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [videoCallDuration, setVideoCallDuration] = useState('45:00');

  // FAQ Search
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqs, setOpenFaqs] = useState({});

  // Check Python API Backend on startup
  useEffect(() => {
    fetchHealth().then(status => setApiStatus(status));
    fetchConsultants().then(data => {
      if (data && Array.isArray(data) && data.length > 0) {
        setConsultants(data);
        setSelectedConsultant(data[0]);
      }
    });
    fetchMilestones().then(data => {
      if (data && Array.isArray(data) && data.length > 0) {
        setMilestones(data);
      }
    });
  }, []);

  // Navigation handlers
  const handleNavigate = (tab) => {
    setActiveTab(tab);
    setPaymentSuccess(false);
    setActiveAssessment(null);
    setQuizResult(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMoodSelect = (mood) => {
    setUserMood(mood);
    let msg = 'How are you feeling today?';
    if (mood === 'Calm') msg = "We're glad you feel calm in your sanctuary today.";
    if (mood === 'Anxious') msg = 'Take a deep breath. You are in a safe space.';
    if (mood === 'Tired') msg = 'Remember to give yourself permission to rest.';
    if (mood === 'Focused') msg = 'Fostering clarity. What would you like to achieve?';
    setMoodMessage(msg);
    postMoodApi(mood, msg);
  };

  // Assessment Quizzes dictionary
  const quizzes = {
    anxiety: {
      id: 'anxiety',
      title: 'Anxiety Check (GAD-7)',
      subtitle: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
      questions: [
        'Feeling nervous, anxious or on edge',
        'Not being able to stop or control worrying',
        'Worrying too much about different things',
        'Trouble relaxing',
        'Being so restless that it is hard to sit still',
        'Becoming easily annoyed or irritable',
        'Feeling afraid as if something awful might happen'
      ],
      options: [
        { text: 'Not at all', score: 0 },
        { text: 'Several days', score: 1 },
        { text: 'More than half the days', score: 2 },
        { text: 'Nearly every day', score: 3 }
      ],
      maxScore: 21,
      calculateSeverity: (score) => {
        if (score <= 4) return { severity: 'Minimal', rec: 'Your anxiety levels are currently minimal. Keep practicing daily mindfulness to maintain your wellbeing.' };
        if (score <= 9) return { severity: 'Mild', rec: 'You have mild anxiety symptoms. We recommend reviewing stress management articles and engaging in deep breathing.' };
        if (score <= 14) return { severity: 'Moderate', rec: 'You are experiencing moderate anxiety symptoms. Regularly scheduling therapy check-ins can provide effective coping tools.' };
        return { severity: 'Severe', rec: 'Your anxiety level indicates severe symptoms. We strongly suggest booking a video session with a clinical psychologist for targeted support.' };
      }
    },
    stress: {
      id: 'stress',
      title: 'Perceived Stress Scale (PSS)',
      subtitle: 'In the last month, how often have you experienced the following feelings of stress?',
      questions: [
        'Felt unable to control the important things in your life',
        'Felt confident about your ability to handle personal problems',
        'Felt that things were going your way',
        'Felt difficulties were piling up so high that you could not overcome them',
        'Felt nervous or stressed by workload and daily responsibilities'
      ],
      options: [
        { text: 'Never', score: 0 },
        { text: 'Almost Never', score: 1 },
        { text: 'Sometimes', score: 2 },
        { text: 'Fairly Often', score: 3 }
      ],
      maxScore: 15,
      calculateSeverity: (score) => {
        if (score <= 5) return { severity: 'Low Stress', rec: 'Your perceived stress level is low. Continue maintaining work-life balance and resting regularly.' };
        if (score <= 10) return { severity: 'Moderate Stress', rec: 'You are experiencing moderate stress. Consider trying deep breathing exercises and scheduling a consultation.' };
        return { severity: 'High Stress', rec: 'Your stress level is elevated. We recommend taking time off to recharge and consulting with a specialist.' };
      }
    },
    sleep: {
      id: 'sleep',
      title: 'Sleep Quality Check',
      subtitle: 'During the past month, evaluate your typical night-time rest pattern and sleep hygiene:',
      questions: [
        'How long does it typically take you to fall asleep each night?',
        'How often do you wake up during the middle of the night?',
        'How would you rate your overall sleep quality when waking up?',
        'How often do you feel fatigued or sluggish during daytime activities?'
      ],
      options: [
        { text: 'Very Good / Under 15 mins', score: 0 },
        { text: 'Fair / 15-30 mins', score: 1 },
        { text: 'Poor / 30-60 mins', score: 2 },
        { text: 'Very Poor / Over 60 mins', score: 3 }
      ],
      maxScore: 12,
      calculateSeverity: (score) => {
        if (score <= 3) return { severity: 'Optimal Rest', rec: 'Your sleep quality is excellent. Keep your sleep schedule consistent!' };
        if (score <= 7) return { severity: 'Mild Disruption', rec: 'You have mild sleep disruption. Try avoiding screen light 1 hour before bedtime.' };
        return { severity: 'Significant Sleep Debt', rec: 'Your sleep hygiene needs attention. We recommend setting a fixed sleep routine and relaxing exercises.' };
      }
    }
  };

  const startQuiz = (type) => {
    const quizKey = quizzes[type] ? type : 'anxiety';
    setActiveAssessment(quizKey);
    setQuizStep(0);
    setQuizAnswers({});
    setQuizResult(null);
  };

  const handleSelectQuizOption = (optionScore) => {
    const currentQuiz = quizzes[activeAssessment] || quizzes.anxiety;
    const nextAnswers = { ...quizAnswers, [quizStep]: optionScore };
    setQuizAnswers(nextAnswers);

    if (quizStep < currentQuiz.questions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const totalScore = Object.values(nextAnswers).reduce((sum, s) => sum + s, 0);
      const { severity, rec } = currentQuiz.calculateSeverity(totalScore);

      setQuizResult({
        score: totalScore,
        maxScore: currentQuiz.maxScore,
        severity,
        recommendation: rec
      });
    }
  };

  const handleSaveQuizResults = async () => {
    const currentQuiz = quizzes[activeAssessment] || quizzes.anxiety;
    const newMilestone = {
      id: Date.now(),
      title: `${currentQuiz.title} Result: ${quizResult.severity}`,
      detail: `Scored ${quizResult.score}/${quizResult.maxScore}. ${quizResult.recommendation.split('.')[0]}.`,
      date: 'Today',
      icon: 'verified',
      isPrimary: true
    };
    setMilestones([newMilestone, ...milestones]);
    setCompletedTestsCount(completedTestsCount + 1);
    
    // Save to Python Backend
    await submitAssessmentApi({
      test_type: currentQuiz.title,
      score: quizResult.score,
      severity: quizResult.severity,
      recommendation: quizResult.recommendation
    });

    setActiveAssessment(null);
    setQuizResult(null);
    setActiveTab('track_record');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyPromo = () => {
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'MINDCARE10') {
      setDiscountPercent(10);
    } else {
      setPromoError('Invalid coupon code. Try MINDCARE10');
      setDiscountPercent(0);
    }
  };

  const handlePayConfirm = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!paymentCard.number || paymentCard.number.length < 16) errors.number = 'Please enter a valid 16-digit card number';
    if (!paymentCard.expiry || !paymentCard.expiry.includes('/')) errors.expiry = 'Please enter expiry date (MM/YY)';
    if (!paymentCard.cvv || paymentCard.cvv.length < 3) errors.cvv = 'Please enter a valid CVV';
    if (!paymentCard.name) errors.name = 'Please enter the cardholder name';

    if (Object.keys(errors).length > 0) {
      setPaymentErrors(errors);
    } else {
      setPaymentErrors({});
      setPaymentSuccess(true);
      
      const newMilestone = {
        id: Date.now(),
        title: `Booked Session with ${selectedConsultant.name}`,
        detail: `Scheduled for ${bookingDate} at ${bookingTime} via ${sessionFormat}.`,
        date: 'Today',
        icon: 'check_circle',
        isPrimary: true
      };
      setMilestones([newMilestone, ...milestones]);

      // Save to Python Backend
      await submitAppointmentApi({
        consultant_id: selectedConsultant.id,
        consultant_name: selectedConsultant.name,
        booking_date: bookingDate,
        booking_time: bookingTime,
        session_format: sessionFormat,
        session_reason: sessionReason,
        session_duration: sessionDuration,
        promo_code: promoCode
      });
    }
  };

  const toggleFaq = (key) => {
    setOpenFaqs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const markAllNotificationsRead = () => {
    setNotificationsList(notificationsList.map(n => ({ ...n, unread: false })));
  };

  const clearNotification = (id) => {
    setNotificationsList(notificationsList.filter(n => n.id !== id));
  };

  return (
    <div className="bg-slate-50 text-slate-900 antialiased flex flex-col md:flex-row min-h-screen relative font-sans">
      <Sidebar 
        activeTab={activeTab} 
        handleNavigate={handleNavigate} 
        setSelectedConsultant={setSelectedConsultant}
        initialConsultants={consultants}
      />

      <Header 
        activeTab={activeTab} 
        handleNavigate={handleNavigate} 
        apiStatus={apiStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        notificationsList={notificationsList}
        markAllNotificationsRead={markAllNotificationsRead}
        clearNotification={clearNotification}
        showProfileModal={showProfileModal}
        setShowProfileModal={setShowProfileModal}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        consultants={consultants}
        setSelectedConsultant={setSelectedConsultant}
        startQuiz={startQuiz}
      />

      <main className="flex-1 w-full md:ml-64 pt-6 md:pt-28 px-4 md:px-8 pb-24 md:pb-16 max-w-7xl mx-auto">
        {activeTab === 'dashboard' && (
          <DashboardView
            streakDays={streakDays}
            completedTestsCount={completedTestsCount}
            milestones={milestones}
            userMood={userMood}
            moodMessage={moodMessage}
            handleMoodSelect={handleMoodSelect}
            handleNavigate={handleNavigate}
            startQuiz={startQuiz}
            setSelectedConsultant={setSelectedConsultant}
            initialConsultants={consultants}
          />
        )}

        {activeTab === 'assessments' && (
          <AssessmentsView
            activeAssessment={activeAssessment}
            startQuiz={startQuiz}
            quizzes={quizzes}
            quizStep={quizStep}
            quizAnswers={quizAnswers}
            handleSelectQuizOption={handleSelectQuizOption}
            quizResult={quizResult}
            handleSaveQuizResults={handleSaveQuizResults}
            handleNavigate={handleNavigate}
          />
        )}

        {activeTab === 'track_record' && (
          <TrackRecordView
            milestones={milestones}
            handleNavigate={handleNavigate}
          />
        )}

        {activeTab === 'consultations' && (
          <ConsultationsView
            consultants={consultants}
            selectedConsultant={selectedConsultant}
            setSelectedConsultant={setSelectedConsultant}
            bookingDate={bookingDate}
            setBookingDate={setBookingDate}
            bookingTime={bookingTime}
            setBookingTime={setBookingTime}
            sessionFormat={sessionFormat}
            setSessionFormat={setSessionFormat}
            sessionReason={sessionReason}
            setSessionReason={setSessionReason}
            sessionDuration={sessionDuration}
            setSessionDuration={setSessionDuration}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            discountPercent={discountPercent}
            promoError={promoError}
            handleApplyPromo={handleApplyPromo}
            paymentCard={paymentCard}
            setPaymentCard={setPaymentCard}
            paymentErrors={paymentErrors}
            paymentSuccess={paymentSuccess}
            setPaymentSuccess={setPaymentSuccess}
            handlePayConfirm={handlePayConfirm}
            showVideoCall={showVideoCall}
            setShowVideoCall={setShowVideoCall}
            videoCallDuration={videoCallDuration}
          />
        )}

        {activeTab === 'help_support' && (
          <HelpSupportView
            faqs={faqsData}
            faqSearch={faqSearch}
            setFaqSearch={setFaqSearch}
            openFaqs={openFaqs}
            toggleFaq={toggleFaq}
            setShowContactModal={setShowContactModal}
          />
        )}

        {activeTab === 'privacy_security' && (
          <PrivacySecurityView milestones={milestones} userProfile={userProfile} />
        )}
      </main>

      {/* Contact Support Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-slide-up-fade">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button 
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-2xl flex items-center justify-center border border-teal-100 font-extrabold">
                <span className="material-symbols-outlined text-2xl">support_agent</span>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-800">Contact Care Team</h3>
                <p className="text-xs text-teal-600 font-bold">24/7 Priority Support</p>
              </div>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert("Your message has been sent to our Care Team! We will reply via email shortly.");
              setShowContactModal(false);
            }} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Subject</label>
                <input required type="text" placeholder="e.g. Question about appointment" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-teal-600 outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Message</label>
                <textarea required rows={4} placeholder="Describe your request..." className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-teal-600 outline-none resize-none"></textarea>
              </div>
              <button type="submit" className="w-full gradient-btn text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-teal-500/20">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

