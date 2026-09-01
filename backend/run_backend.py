import os
import sys
from pathlib import Path

backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

from main import run_standalone_server, HAS_FASTAPI

if __name__ == "__main__":
    print("=" * 60)
    print("  Mind Care Wellness Platform - Python Backend Launcher")
    print("=" * 60)
    if HAS_FASTAPI:
        import uvicorn
        print("Starting FastAPI Uvicorn Server on http://127.0.0.1:8000...")
        uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
    else:
        print("FastAPI / Uvicorn not installed. Starting built-in HTTP API Server on http://127.0.0.1:8000...")
        run_standalone_server(8000)
