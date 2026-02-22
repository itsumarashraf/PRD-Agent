from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from typing import Dict
from app.config import settings

mail_config = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=False,
)

fastmail = FastMail(mail_config)


def format_prd_as_html(sections: Dict[str, str]) -> str:
    html = "<h1>Product Requirements Document</h1><hr>"
    for section, content in sections.items():
        html += f"<h2>{section}</h2>"
        formatted = content.replace("\n\n", "</p><p>").replace("\n", "<br>")
        html += f"<p>{formatted}</p><hr>"
    return html


async def send_prd_email(sections: Dict[str, str], recipients: list[str]):
    html_body = format_prd_as_html(sections)
    message = MessageSchema(
        subject="Your Product Requirements Document",
        recipients=recipients,
        body=html_body,
        subtype="html"
    )
    await fastmail.send_message(message)