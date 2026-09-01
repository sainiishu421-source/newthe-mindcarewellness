"""
Database management module for Mind Care Wellness Platform.
Uses SQLite for zero-config persistence of consultants, appointments, assessment results, milestones, and mood logs.
"""
import sqlite3
import json
import os
from pathlib import Path

DB_PATH = Path(__file__).parent / "mind_care.db"

INITIAL_CONSULTANTS = [
    {
        "id": "dr_ananya_sharma",
        "name": "Dr. Ananya Sharma",
        "title": "Clinical Psychologist, Ph.D.",
        "specialties": ["Anxiety", "Depression", "Trauma"],
        "rating": 4.9,
        "reviews": "120+",
        "experience": "10 Years",
        "languages": "English, Hindi",
        "cost": 150,
        "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuAtD0k7joFXApSUN5fqx1TQFqH_ELVGT8Ix_pL2oDRqbL1Lu68ExijA9UMnNxBx-POwkniXBNJM-GOsLmTsIZ49ClMgUPOquiAxjG0WlZF4_ZG_ysh01gIS9GmYARN85fLlZpa573opUQkAWp4aLgyycabwLJMAL4wR9PP59lZcypYVd6D2uKnwtzduXVviGuhkuyDEDBfVwVFFpckzjMFsLe3JAh_MlpOX4Joz_-53LyM3COQvSimi7Q",
        "bio": "Dr. Ananya Sharma is a compassionate Clinical Psychologist dedicated to helping individuals navigate life's complexities. With over a decade of experience, she specializes in evidence-based therapies like CBT and mindfulness-based interventions."
    },
    {
        "id": "dr_james_wilson",
        "name": "Dr. James Wilson",
        "title": "Clinical Psychologist",
        "specialties": ["Anxiety", "Stress", "Grief"],
        "rating": 4.8,
        "reviews": "95+",
        "experience": "8 Years",
        "languages": "English",
        "cost": 130,
        "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDuRxcVAxGftqvpsTjDX12nHycyMxUe7XSqmPJ10cIb5PO1vFkR2PT_qNnDa7F3jFUdXSkfwo0jTKj5SW9BUv9tMkZrZeTWTw59MDekcahjCiuIh3h7I1jR_OTV_7kLbbJ4fHRBZwOFm4d4NZ7w9jnUA9QTuXB_JV98Rh8XwXGakrW6Sn1WCR5z2tCXz5ZmFarQNCifPr6jG0JnREaQkSBIJG4-DGXD9jjuipngkhsgoCaEnrYHT4cAsg",
        "bio": "Dr. James Wilson specializes in cognitive behavioral therapy for anxiety disorders, daily stress management, and emotional support through difficult life transitions."
    },
    {
        "id": "sarah_jenkins",
        "name": "Sarah Jenkins",
        "title": "Holistic Therapist",
        "specialties": ["Mindfulness", "Life Transitions", "Self-Esteem"],
        "rating": 4.7,
        "reviews": "80+",
        "experience": "6 Years",
        "languages": "English, Spanish",
        "cost": 120,
        "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuANVfVPxapGQiQokkUlIkcH79oLI5Krm5Iz9BMFnn1D1LJa1QRWOCRgs88wCtHSqRojzs_u_ILrUVIC1co_oxF8bf5D4OG4oVqA18uROmwUIoFcWugmPFbQqF8tn6TSPKL2xc68t9ZVq4HAgZVAZYqr8n7RfW8LgfCH96rgo7yLpY1709vulfTgwNqHLw9MBXGwvvaK4XBN3-aCoaMrjnMmogxHiG3IkNMDEHuKz79-d9FrqW0JHNED9g",
        "bio": "Sarah Jenkins incorporates somatic and mindfulness-based therapies into her practice to help individuals reconnect with their bodies and find emotional alignment."
    }
]

INITIAL_MILESTONES = [
    {
        "id": 1,
        "title": "Completed Anxiety Assessment",
        "detail": "Scores improved by 15% compared to last month.",
        "date": "Today",
        "icon": "emoji_events",
        "isPrimary": True
    },
    {
        "id": 2,
        "title": "Therapy Session",
        "detail": "Discussed coping mechanisms for daily stress.",
        "date": "Oct 24, 2026",
        "icon": "psychology",
        "isPrimary": False
    },
    {
        "id": 3,
        "title": "Completed Stress Check",
        "detail": "Identified workload and lack of sleep as main stressors.",
        "date": "Oct 15, 2026",
        "icon": "assignment",
        "isPrimary": False
    }
]

INITIAL_FAQS = [
    {
        "category": "Getting Started",
        "icon": "rocket_launch",
        "items": [
            { "q": "What is Mind Care?", "a": "Mind Care is a digital sanctuary that provides access to clinical-grade mental health assessments, wellness progress tracking, and professional consultation with certified therapists." },
            { "q": "How do I start an assessment?", "a": "Simply head to the 'Assessments' page, choose a test that fits your current focus area (such as Stress Check or Anxiety Check), and click 'Start Test'." }
        ]
    },
    {
        "category": "Sessions & Booking",
        "icon": "calendar_month",
        "items": [
            { "q": "How do I book a consultation session?", "a": "You can go to the 'Consultations' page, select a therapist, pick a date and time slot that fits your schedule, fill out the consultation details, and complete the secure payment." },
            { "q": "Can I cancel or reschedule my session?", "a": "Yes. You can reschedule or cancel a session up to 24 hours prior to the scheduled start time from your Dashboard or History tab." }
        ]
    },
    {
        "category": "Privacy & Security",
        "icon": "shield",
        "items": [
            { "q": "Is my personal information secure?", "a": "Absolutely. We utilize enterprise-grade 256-bit AES encryption to secure your data both in transit and at rest. Your sessions are private and HIPAA-compliant." },
            { "q": "Who has access to my assessment results?", "a": "Only you and any healthcare providers you explicitly choose to share them with can access your results. We never sell your data." }
        ]
    },
    {
        "category": "Assessments",
        "icon": "quiz",
        "items": [
            { "q": "Are these assessments clinically validated?", "a": "Yes. Our tests are modeled on gold-standard clinical screeners, such as the GAD-7 for anxiety tracking, ensuring high-quality insights." },
            { "q": "How often should I take an assessment?", "a": "We recommend taking checking assessments once a week or biweekly to monitor changes in your emotional wellbeing over time." }
        ]
    }
]

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Consultants Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS consultants (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            title TEXT NOT NULL,
            specialties TEXT NOT NULL,
            rating REAL,
            reviews TEXT,
            experience TEXT,
            languages TEXT,
            cost INTEGER,
            imageUrl TEXT,
            bio TEXT
        )
    ''')

    # Milestones Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS milestones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            detail TEXT NOT NULL,
            date TEXT NOT NULL,
            icon TEXT NOT NULL,
            isPrimary INTEGER DEFAULT 0
        )
    ''')

    # Appointments Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            consultant_id TEXT NOT NULL,
            consultant_name TEXT NOT NULL,
            booking_date TEXT NOT NULL,
            booking_time TEXT NOT NULL,
            session_format TEXT NOT NULL,
            session_reason TEXT,
            session_duration INTEGER,
            final_cost REAL,
            status TEXT DEFAULT 'Confirmed',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Mood Logs Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS mood_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mood TEXT NOT NULL,
            message TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Assessment Results Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS assessment_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            test_type TEXT NOT NULL,
            score INTEGER NOT NULL,
            severity TEXT NOT NULL,
            recommendation TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Seed consultants if empty
    cursor.execute('SELECT COUNT(*) FROM consultants')
    if cursor.fetchone()[0] == 0:
        for c in INITIAL_CONSULTANTS:
            cursor.execute('''
                INSERT INTO consultants (id, name, title, specialties, rating, reviews, experience, languages, cost, imageUrl, bio)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (c['id'], c['name'], c['title'], json.dumps(c['specialties']), c['rating'], c['reviews'], c['experience'], c['languages'], c['cost'], c['imageUrl'], c['bio']))

    # Seed milestones if empty
    cursor.execute('SELECT COUNT(*) FROM milestones')
    if cursor.fetchone()[0] == 0:
        for m in INITIAL_MILESTONES:
            cursor.execute('''
                INSERT INTO milestones (title, detail, date, icon, isPrimary)
                VALUES (?, ?, ?, ?, ?)
            ''', (m['title'], m['detail'], m['date'], m['icon'], 1 if m['isPrimary'] else 0))

    conn.commit()
    conn.close()

def get_consultants():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM consultants')
    rows = cursor.fetchall()
    conn.close()
    
    result = []
    for r in rows:
        item = dict(r)
        item['specialties'] = json.loads(item['specialties'])
        result.append(item)
    return result

def get_milestones():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM milestones ORDER BY id DESC')
    rows = cursor.fetchall()
    conn.close()
    return [{**dict(r), 'isPrimary': bool(r['isPrimary'])} for r in rows]

def add_milestone(title, detail, date='Today', icon='verified', is_primary=True):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO milestones (title, detail, date, icon, isPrimary)
        VALUES (?, ?, ?, ?, ?)
    ''', (title, detail, date, icon, 1 if is_primary else 0))
    milestone_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return {"id": milestone_id, "title": title, "detail": detail, "date": date, "icon": icon, "isPrimary": is_primary}

def save_appointment(consultant_id, consultant_name, booking_date, booking_time, session_format, session_reason, session_duration, final_cost):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO appointments (consultant_id, consultant_name, booking_date, booking_time, session_format, session_reason, session_duration, final_cost)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (consultant_id, consultant_name, booking_date, booking_time, session_format, session_reason, session_duration, final_cost))
    appt_id = cursor.lastrowid
    conn.commit()
    conn.close()

    # Also record milestone
    add_milestone(
        title=f"Booked Session with {consultant_name}",
        detail=f"Scheduled for {booking_date} at {booking_time} via {session_format}.",
        date="Today",
        icon="check_circle",
        is_primary=True
    )
    return {"id": appt_id, "status": "Confirmed"}

def save_assessment_result(test_type, score, severity, recommendation):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO assessment_results (test_type, score, severity, recommendation)
        VALUES (?, ?, ?, ?)
    ''', (test_type, score, severity, recommendation))
    res_id = cursor.lastrowid
    conn.commit()
    conn.close()

    # Also record milestone
    add_milestone(
        title=f"{test_type} Result: {severity}",
        detail=f"Scored {score}. {recommendation.split('.')[0]}.",
        date="Today",
        icon="verified",
        is_primary=True
    )
    return {"id": res_id, "test_type": test_type, "score": score, "severity": severity, "recommendation": recommendation}

def save_mood(mood, message):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO mood_logs (mood, message) VALUES (?, ?)
    ''', (mood, message))
    conn.commit()
    conn.close()
    return {"mood": mood, "message": message}

# Initialize DB when module loads
init_db()
