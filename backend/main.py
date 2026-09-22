"""
Mind Care Wellness Platform Backend REST API.
Provides APIs for consultants, assessment testing, appointment booking, mood logging, and milestones.
Supports both FastAPI (if installed) and standard library http.server for universal execution.
"""

import sys
import json
import urllib.parse
from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path

# Add backend directory to sys.path
sys.path.append(str(Path(__file__).parent))

import database

# Check for FastAPI availability
try:
    from fastapi import FastAPI, HTTPException
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel
    HAS_FASTAPI = True
except ImportError:
    HAS_FASTAPI = False

if HAS_FASTAPI:
    app = FastAPI(
        title="Mind Care Wellness Platform API",
        description="Backend API for clinical assessments, consultant booking, and wellness tracking",
        version="1.0.0"
    )

    # Enable CORS for React frontend (Vite default port 5173 / localhost)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    class AppointmentRequest(BaseModel):
        consultant_id: str
        consultant_name: str
        booking_date: str
        booking_time: str
        session_format: str
        session_reason: str = ""
        session_duration: int = 60
        promo_code: str = ""

    class AssessmentRequest(BaseModel):
        test_type: str
        score: int
        severity: str
        recommendation: str

    class MoodRequest(BaseModel):
        mood: str
        message: str

    class MilestoneRequest(BaseModel):
        title: str
        detail: str
        date: str = "Today"
        icon: str = "verified"
        is_primary: bool = True

    @app.get("/")
    @app.get("/api/health")
    def health_check():
        return {
            "status": "online",
            "app": "Mind Care Wellness Platform API",
            "version": "1.0.0",
            "framework": "FastAPI"
        }

    @app.get("/api/consultants")
    def list_consultants():
        return database.get_consultants()

    @app.get("/api/consultants/{consultant_id}")
    def get_consultant(consultant_id: str):
        consultants = database.get_consultants()
        for c in consultants:
            if c["id"] == consultant_id:
                return c
        raise HTTPException(status_code=404, detail="Consultant not found")

    @app.get("/api/milestones")
    def list_milestones():
        return database.get_milestones()

    @app.post("/api/milestones")
    def create_milestone(req: MilestoneRequest):
        return database.add_milestone(
            title=req.title,
            detail=req.detail,
            date=req.date,
            icon=req.icon,
            is_primary=req.is_primary
        )

    @app.post("/api/appointments")
    def book_appointment(req: AppointmentRequest):
        consultants = database.get_consultants()
        selected = next((c for c in consultants if c["id"] == req.consultant_id), None)
        base_cost = selected["cost"] if selected else 150
        
        # Apply promo discount if valid
        discount = 0.10 if req.promo_code.strip().upper() == "MINDCARE10" else 0.0
        final_cost = base_cost * (1 - discount)

        res = database.save_appointment(
            consultant_id=req.consultant_id,
            consultant_name=req.consultant_name,
            booking_date=req.booking_date,
            booking_time=req.booking_time,
            session_format=req.session_format,
            session_reason=req.session_reason,
            session_duration=req.session_duration,
            final_cost=final_cost
        )
        return {**res, "final_cost": final_cost, "message": "Appointment confirmed successfully!"}

    @app.post("/api/assessments/submit")
    def submit_assessment(req: AssessmentRequest):
        return database.save_assessment_result(
            test_type=req.test_type,
            score=req.score,
            severity=req.severity,
            recommendation=req.recommendation
        )

    @app.post("/api/mood")
    def log_mood(req: MoodRequest):
        return database.save_mood(req.mood, req.message)

    @app.get("/api/faqs")
    def get_faqs():
        return database.INITIAL_FAQS


# Pure Python Standard Library HTTP Handler fallback
class MindCareHTTPRequestHandler(BaseHTTPRequestHandler):
    def _send_response_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path

        if path in ["/", "/api/health"]:
            self._send_response_json({
                "status": "online",
                "app": "Mind Care Wellness Platform API",
                "version": "1.0.0",
                "framework": "http.server (fallback)"
            })
        elif path == "/api/consultants":
            self._send_response_json(database.get_consultants())
        elif path.startswith("/api/consultants/"):
            cid = path.split("/")[-1]
            consultants = database.get_consultants()
            match = next((c for c in consultants if c["id"] == cid), None)
            if match:
                self._send_response_json(match)
            else:
                self._send_response_json({"error": "Consultant not found"}, 404)
        elif path == "/api/milestones":
            self._send_response_json(database.get_milestones())
        elif path == "/api/faqs":
            self._send_response_json(database.INITIAL_FAQS)
        else:
            self._send_response_json({"error": "Endpoint not found"}, 404)

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length) if content_length > 0 else b'{}'
        data = json.loads(body.decode('utf-8') or '{}')

        if path == "/api/appointments":
            res = database.save_appointment(
                consultant_id=data.get('consultant_id', 'dr_ananya_sharma'),
                consultant_name=data.get('consultant_name', 'Dr. Ananya Sharma'),
                booking_date=data.get('booking_date', 'Oct 12'),
                booking_time=data.get('booking_time', '3:00 PM'),
                session_format=data.get('session_format', 'Video call'),
                session_reason=data.get('session_reason', ''),
                session_duration=data.get('session_duration', 60),
                final_cost=data.get('final_cost', 150)
            )
            self._send_response_json({**res, "message": "Appointment confirmed successfully!"})
        elif path == "/api/assessments/submit":
            res = database.save_assessment_result(
                test_type=data.get('test_type', 'Anxiety Check'),
                score=data.get('score', 0),
                severity=data.get('severity', 'Minimal'),
                recommendation=data.get('recommendation', '')
            )
            self._send_response_json(res)
        elif path == "/api/mood":
            res = database.save_mood(data.get('mood', 'Calm'), data.get('message', ''))
            self._send_response_json(res)
        elif path == "/api/milestones":
            res = database.add_milestone(
                title=data.get('title', 'New Milestone'),
                detail=data.get('detail', ''),
                date=data.get('date', 'Today'),
                icon=data.get('icon', 'verified'),
                is_primary=data.get('is_primary', True)
            )
            self._send_response_json(res)
        else:
            self._send_response_json({"error": "Endpoint not found"}, 404)


def run_standalone_server(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, MindCareHTTPRequestHandler)
    print(f"Mind Care Python API running on http://localhost:{port}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 8000))
    host = os.environ.get("HOST", "0.0.0.0")
    if HAS_FASTAPI:
        import uvicorn
        print(f"Starting FastAPI server on http://{host}:{port}...")
        uvicorn.run("main:app", host=host, port=port)
    else:
        print(f"FastAPI not detected, running standard Python HTTP server on http://{host}:{port}...")
        run_standalone_server(port)
