from pydantic_settings import BaseSettings
from functools import lru_cache
from pathlib import Path

# This resolves to PRD_AGENT/ regardless of where you run from
BASE_DIR = Path(__file__).resolve().parent.parent

print(f"Looking for .env at: {BASE_DIR / 'app/.env'}")
print(f"File exists: {(BASE_DIR / 'app/.env').exists()}")

class Settings(BaseSettings):
    # App
    APP_NAME: str = "PRD Studio"
    DEBUG: bool = False
    SECRET_KEY: str
    # ACCESS_TOKEN_EXPIRE_HOURS: int = 24

    # Database
    # DATABASE_URL: str

    # LLM
    LLM_MODEL: str = "ministral-3:3b"
    LLM_TEMPERATURE: float = 0.2
    OLLAMA_BASE_URL: str

    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: str
    MAIL_PORT: int = 587
    MAIL_SERVER: str = "smtp.gmail.com"

    # CORS
    ALLOWED_ORIGINS: list[str] = ["http://localhost:5173","*"]

    class Config:
        env_file = str(BASE_DIR / "app/.env")
        env_file_encoding = "utf-8"

@lru_cache
def get_settings() -> Settings:
    return Settings()

settings = get_settings()