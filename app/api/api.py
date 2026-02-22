from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from langgraph.types import Command
from uuid import uuid4

# from app.api.deps import get_db, get_current_user
# from app.models.db import User, PRD
# from app.models.schemas import StartPRDRequest, ResumeRequest, EmailSubmitRequest, PRDResponse
from app.graph.graph import prd_graph
from app.api.models import StartPRDRequest, ResumeRequest, SendPRDRequest
from app.services.email import send_prd_email

# router = APIRouter(prefix="/prd", tags=["prd"])
router = APIRouter()

def _format_result(thread_id: str, result: dict) -> dict:
    if "__interrupt__" in result:
        interrupt_data = result["__interrupt__"][0].value
        return {
            "thread_id": thread_id,
            "status": "waiting_review",
            "review": interrupt_data,
        }
    return {
        "thread_id": thread_id,
        "status": "completed",
        "prd": result.get("sections", {}),

    }


@router.post("/start")
def start_prd(
    request: StartPRDRequest,
    # user: User = Depends(get_current_user),
    # db: Session = Depends(get_db),
):
    thread_id = str(uuid4())

    # Save to DB
    # prd = PRD(user_id=user.id, thread_id=thread_id, idea=request.idea)
    # db.add(prd)
    # db.commit()

    initial_state = {
        "idea": request.idea,
        "target_users": request.target_users,
        "problem": request.problem,
        "sections": {},
        "current_section_index": 0,
        "feedback": None,
        "action": None,
        # "emails": None,
        # "email_status": None,
        # "error": None,
    }

    result = prd_graph.invoke(
        initial_state,
        config={"configurable": {"thread_id": thread_id}}
    )
    return _format_result(thread_id, result)


@router.post("/resume")
def resume_prd(
    request: ResumeRequest,
    # user: User = Depends(get_current_user),
):
    result = prd_graph.invoke(
        Command(resume={
            "action": request.action,
            "feedback": request.feedback if request.action == "feedback" else None,
        }),
        config={"configurable": {"thread_id": request.thread_id}}
    )

    formatted = _format_result(request.thread_id, result)

    return formatted


@router.post("/send-prd")
async def send_prd(request: SendPRDRequest):
    state = prd_graph.get_state(
        config={"configurable": {"thread_id": request.thread_id}}
    )

    if not state or not state.values.get("sections"):
        return {"status": "error", "message": "No completed PRD found for this thread_id"}

    sections = state.values["sections"]

    await send_prd_email(sections=sections, recipients=request.emails)

    return {
        "status": "sent",
        "recipients": request.emails,
        "sections_count": len(sections)
    }

# @router.get("/list", response_model=list[PRDResponse])
# def list_prds(
#     user: User = Depends(get_current_user),
#     db: Session = Depends(get_db),
# ):
#     return db.query(PRD).filter(PRD.user_id == user.id).order_by(PRD.created_at.desc()).all()


# @router.get("/{prd_id}", response_model=PRDResponse)
# def get_prd(
#     prd_id: str,
#     user: User = Depends(get_current_user),
#     db: Session = Depends(get_db),
# ):
#     prd = db.query(PRD).filter(PRD.id == prd_id, PRD.user_id == user.id).first()
#     if not prd:
#         raise HTTPException(status_code=404, detail="PRD not found")
#     state = prd_graph.get_state(config={"configurable": {"thread_id": prd.thread_id}})
#     sections = state.values.get("sections", {}) if state else {}
#     return PRDResponse(
#         id=prd.id,
#         thread_id=prd.thread_id,
#         idea=prd.idea,
#         status=prd.status,
#         created_at=prd.created_at,
#         sections=sections,
#     )