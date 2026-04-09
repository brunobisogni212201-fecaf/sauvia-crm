class DomainError(Exception):
    """Base domain error."""


class EntityNotFoundError(DomainError):
    def __init__(self, entity: str, entity_id: str):
        super().__init__(f"{entity} with id '{entity_id}' not found")
        self.entity = entity
        self.entity_id = entity_id


class ValidationError(DomainError):
    def __init__(self, message: str):
        super().__init__(message)


class AuthenticationError(DomainError):
    def __init__(self, message: str = "Authentication failed"):
        super().__init__(message)


class AuthorizationError(DomainError):
    def __init__(self, message: str = "Access denied"):
        super().__init__(message)


class ConflictError(DomainError):
    def __init__(self, message: str):
        super().__init__(message)
