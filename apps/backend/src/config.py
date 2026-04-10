from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")

    # App
    app_env: str = "development"
    app_host: str = "0.0.0.0"
    app_port: int = 8000

    # CORS
    cors_origins: str = "http://localhost:3000,https://sauvia-app.vercel.app"

    # Database
    database_url: str = "postgresql+asyncpg://user:password@localhost:5432/sauvia"

    # Security
    secret_key: str = "change-me-in-production"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7

    # Redis
    redis_url: str = "redis://localhost:6379/0"

    # AWS Cognito
    cognito_user_pool_id: str = "us-east-1_Zftb4N8wn"
    cognito_region: str = "us-east-1"
    cognito_client_id: str = "2fs7g0dd2c7rp3n4aas53c18p0"
    cognito_client_secret: str = ""
    cognito_domain: str = ""

    # AWS Credentials
    aws_access_key_id: str = ""
    aws_secret_access_key: str = ""
    aws_region: str = "us-east-1"

    # Email
    from_email: str = "noreply@sauvia.com.br"

    # WhatsApp
    evolute_api_url: str = "http://localhost:8080"
    evolute_api_key: str = ""
    evolute_instance: str = ""


settings = Settings()
