from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver

from app.graph.state import PRDState
from app.graph.nodes import generate_section, human_review, refine_section, increment_section
from app.graph.router import router


def build_graph():
    workflow = StateGraph(PRDState)

    workflow.add_node("generate_section",  generate_section)
    workflow.add_node("human_review",      human_review)
    workflow.add_node("refine_section",    refine_section)
    workflow.add_node("increment_section", increment_section)

    workflow.set_entry_point("generate_section")

    workflow.add_edge("generate_section", "human_review")
    workflow.add_edge("increment_section", "generate_section")
    workflow.add_edge("refine_section",    "human_review")

    workflow.add_conditional_edges(
        "human_review",
        router,
        {
            "increment_section": "increment_section",
            "generate_section":  "generate_section",
            "refine_section":    "refine_section",
            END:                 END,
        }
    )

    checkpointer = MemorySaver()
    return workflow.compile(checkpointer=checkpointer)


prd_graph = build_graph()