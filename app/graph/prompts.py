from .state import PRDState, PRD_SECTIONS

def generation_prompt(state: PRDState) -> str:
    section_name = PRD_SECTIONS[state["current_section_index"]]
    return f"""You are a senior product manager.
    Generate a professional, clear, structured and concise PRD section.

    Section: {section_name}

    Product Idea:
    {state["idea"]}

    Target Users:
    {state["target_users"]}

    Problem to Solve:
    {state["problem"]}

    Focus on quality and clarity — no fluff."""


def refinement_prompt(state: PRDState) -> str:
    section_name = PRD_SECTIONS[state["current_section_index"]]
    current_content = state["sections"][section_name]
    return f"""You are a senior product manager editing a PRD section.

    The user has requested a SPECIFIC change. Make ONLY that change and leave everything else exactly as-is.

    Current section ({section_name}):
    {current_content}

    Requested change:
    {state["feedback"]}

    Rules:
    - Do NOT rewrite or rephrase parts not mentioned in the feedback
    - Do NOT change structure, formatting, or tone of unchanged parts
    - Do NOT add new content unless explicitly asked
    - ONLY modify the specific part(s) the user pointed to
    - Return the complete section with just that targeted edit applied

    Return the full section text."""