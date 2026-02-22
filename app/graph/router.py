from langgraph.graph import END
from .state import PRDState, PRD_SECTIONS

def router(state: PRDState) -> str:
    action = state.get("action")

    if action == "approve":
        if state["current_section_index"] + 1 >= len(PRD_SECTIONS):
            return END
        return "increment_section"

    if action == "regenerate":
        return "generate_section"

    if action == "feedback":
        return "refine_section"

    return END


