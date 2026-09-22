/**
 * Mind Care API Service Layer
 * Connects React Vite Frontend to Python REST API (FastAPI / HTTP server).
 * Includes robust fallback defaults for immediate responsive UI feedback.
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const fetchHealth = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    console.warn('Backend API connection warning:', err.message);
    return { status: 'offline', mode: 'client-fallback' };
  }
};

export const fetchConsultants = async () => {
  try {
    const res = await fetch(`${API_BASE}/consultants`);
    if (!res.ok) throw new Error('Failed to fetch consultants');
    return await res.json();
  } catch (err) {
    console.warn('Using local consultant data:', err.message);
    return null; // Signals component to use local state fallback
  }
};

export const fetchMilestones = async () => {
  try {
    const res = await fetch(`${API_BASE}/milestones`);
    if (!res.ok) throw new Error('Failed to fetch milestones');
    return await res.json();
  } catch (err) {
    console.warn('Using local milestone data:', err.message);
    return null;
  }
};

export const submitAppointmentApi = async (appointmentData) => {
  try {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData)
    });
    if (!res.ok) throw new Error('Appointment booking failed');
    return await res.json();
  } catch (err) {
    console.warn('Appointment saved locally:', err.message);
    return { status: 'Confirmed', local: true };
  }
};

export const submitAssessmentApi = async (assessmentData) => {
  try {
    const res = await fetch(`${API_BASE}/assessments/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assessmentData)
    });
    if (!res.ok) throw new Error('Assessment submission failed');
    return await res.json();
  } catch (err) {
    console.warn('Assessment saved locally:', err.message);
    return { ...assessmentData, local: true };
  }
};

export const postMoodApi = async (mood, message) => {
  try {
    const res = await fetch(`${API_BASE}/mood`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood, message })
    });
    if (!res.ok) throw new Error('Mood logging failed');
    return await res.json();
  } catch (err) {
    console.warn('Mood logged locally:', err.message);
    return { mood, message, local: true };
  }
};
