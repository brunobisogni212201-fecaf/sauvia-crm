from abc import ABC, abstractmethod


class AuthPort(ABC):
    @abstractmethod
    async def verify_token(self, token: str) -> dict: ...

    @abstractmethod
    async def create_user(self, email: str, password: str) -> str: ...

    @abstractmethod
    async def delete_user(self, auth_id: str) -> None: ...
