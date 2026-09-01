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

  // Active Assessment State
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

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

  // Assessment Quiz definition
  const anxietyQuiz = {
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
    ]
  };

  const startQuiz = (type) => {
    setActiveAssessment(type);
    setQuizStep(0);
    setQuizAnswers({});
    setQuizResult(null);
  };

  const handleSelectQuizOption = (optionScore) => {
    const nextAnswers = { ...quizAnswers, [quizStep]: optionScore };
    setQuizAnswers(nextAnswers);

    if (quizStep < anxietyQuiz.questions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const totalScore = Object.values(nextAnswers).reduce((sum, s) => sum + s, 0);
      let severity = 'Minimal';
      let recommendation = 'Your anxiety levels are currently minimal. Keep practicing daily mindfulness to maintain your wellbeing.';

      if (totalScore >= 5 && totalScore <= 9) {
        severity = 'Mild';
        recommendation = 'You have mild anxiety symptoms. We recommend reviewing stress management articles, tracking your daily moods, and engaging in deep breathing exercises.';
      } else if (totalScore >= 10 && totalScore <= 14) {
        severity = 'Moderate';
        recommendation = 'You are experiencing moderate anxiety symptoms. Regularly scheduling 30-min therapy check-ins can provide effective coping tools.';
      } else if (totalScore >= 15) {
        severity = 'Severe';
        recommendation = 'Your anxiety level indicates severe symptoms. We strongly suggest booking a comprehensive video session with a clinical psychologist for targeted support.';
      }

      setQuizResult({
        score: totalScore,
        severity,
        recommendation
      });
    }
  };

  const handleSaveQuizResults = async () => {
    const newMilestone = {
      id: Date.now(),
      title: `Anxiety Check Result: ${quizResult.severity}`,
      detail: `Scored ${quizResult.score}/21. ${quizResult.recommendation.split('.')[0]}.`,
      date: 'Today',
      icon: 'verified',
      isPrimary: true
    };
    setMilestones([newMilestone, ...milestones]);
    setCompletedTestsCount(completedTestsCount + 1);
    
    // Save to Python Backend
    await submitAssessmentApi({
      test_type: 'Anxiety Check (GAD-7)',
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
        title: `Booked Consultation with ${selectedConsultant.name}`,
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
            anxietyQuiz={anxietyQuiz}
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
          />
        )}

        {activeTab === 'privacy_security' && (
          <PrivacySecurityView />
        )}
      </main>
    </div>
  );
}
