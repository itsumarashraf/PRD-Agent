from typing import Dict, Optional, TypedDict

# ────────────────────────────────────────────────
# PRD Sections
# ────────────────────────────────────────────────

PRD_SECTIONS = [
    "Executive Summary",
    "Problem Statement",
    "Goals and Non-Goals",
    "User Personas",
    "User Stories",
    "Functional Requirements",
    "Non-Functional Requirements",
    "Success Metrics",
    "Risks and Assumptions"
]

# ────────────────────────────────────────────────
# State Definition
# ────────────────────────────────────────────────

class PRDState(TypedDict):
    idea: str
    target_users: str
    problem: str
    sections: Dict[str, str]
    current_section_index: int
    feedback: Optional[str]
    action: Optional[str]