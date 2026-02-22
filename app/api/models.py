from pydantic import BaseModel, EmailStr
from typing import List, Optional
# ────────────────────────────────────────────────
# API Models
# ────────────────────────────────────────────────

class StartPRDRequest(BaseModel):
    idea: str
    target_users: str
    problem: str


class ResumeRequest(BaseModel):
    thread_id: str
    action: str                    # "approve" | "regenerate" | "feedback"
    feedback: Optional[str] = None

class SendPRDRequest(BaseModel):
    thread_id: str
    emails: List[EmailStr]
