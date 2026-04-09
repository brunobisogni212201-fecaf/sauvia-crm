from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")

    app_env: str = "development"
    app_host: str = "0.0.0.0"
    app_port: int = 8000

    database_url: str = "postgresql+asyncpg://user:password@localhost:5432/sauvia"

    secret_key: str = "change-me-in-production"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7

    redis_url: str = "redis://localhost:6379/0"

    gcp_project_id: str = ""
    gcp_client_id: str = ""
    gcp_client_secret: str = ""

    sendgrid_api_key: str = ""
    from_email: str = "noreply@sauvia.com.br"

    evolute_api_url: str = "http://localhost:8080"
    evolute_api_key: str = ""
    evolute_instance: str = ""


settings = Settings()
