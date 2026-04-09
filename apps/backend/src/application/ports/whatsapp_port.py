from abc import ABC, abstractmethod


class WhatsAppPort(ABC):
    @abstractmethod
    async def send_message(self, phone: str, message: str) -> str: ...

    @abstractmethod
    async def send_template(
        self, phone: str, template: str, params: dict
    ) -> str: ...
