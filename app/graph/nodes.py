from langgraph.types import interrupt
from app.graph.state import PRDState, PRD_SECTIONS
from app.graph.prompts import generation_prompt, refinement_prompt
from app.services.llm import llm


def generate_section(state: PRDState) -> PRDState:
    print(f"→ Generating section {state['current_section_index'] + 1}/{len(PRD_SECTIONS)}")
    section_name = PRD_SECTIONS[state["current_section_index"]]

    response = llm.invoke(generation_prompt(state))
    content = response.content.strip()

    print(f"  Generated: {section_name} ({len(content)} chars)")
    return {
        **state,
        "sections": { **state["sections"], section_name: content }
    }


def human_review(state: PRDState) -> PRDState:
    section_name = PRD_SECTIONS[state["current_section_index"]]
    content = state["sections"][section_name]

    human_response = interrupt({
        "section": section_name,
        "content": content,
        "message": "Please choose: approve | regenerate | feedback (provide text)"
    })

    return {
        **state,
        "action": human_response.get("action"),
        "feedback": human_response.get("feedback"),
    }


def refine_section(state: PRDState) -> PRDState:
    if not state.get("feedback"):
        return state

    section_name = PRD_SECTIONS[state["current_section_index"]]
    print(f"→ Refining: {section_name}")

    response = llm.invoke(refinement_prompt(state))
    return {
        **state,
        "sections": { **state["sections"], section_name: response.content.strip() },
        "feedback": None,
    }


def increment_section(state: PRDState) -> PRDState:
    old_index = state["current_section_index"]
    print(f"→ Advanced: {PRD_SECTIONS[old_index]} → next")
    return {
        **state,
        "current_section_index": old_index + 1,
        "action": None,
        "feedback": None,
    }