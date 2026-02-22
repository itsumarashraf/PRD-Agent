from langchain_ollama import ChatOllama
from app.config import settings

llm = ChatOllama(
    model=settings.LLM_MODEL,
    temperature=settings.LLM_TEMPERATURE,
    base_url=settings.OLLAMA_BASE_URL
)