import re


class CPF:
    """Value object for Brazilian CPF validation."""

    def __init__(self, value: str):
        cleaned = re.sub(r"\D", "", value)
        if not self._is_valid(cleaned):
            raise ValueError(f"Invalid CPF: {value}")
        self._value = cleaned

    @staticmethod
    def _is_valid(cpf: str) -> bool:
        if len(cpf) != 11:
            return False
        if cpf == cpf[0] * 11:
            return False

        # First digit
        total = sum(int(cpf[i]) * (10 - i) for i in range(9))
        remainder = total % 11
        first_digit = 0 if remainder < 2 else 11 - remainder
        if int(cpf[9]) != first_digit:
            return False

        # Second digit
        total = sum(int(cpf[i]) * (11 - i) for i in range(10))
        remainder = total % 11
        second_digit = 0 if remainder < 2 else 11 - remainder
        return int(cpf[10]) == second_digit

    @property
    def value(self) -> str:
        return self._value

    def formatted(self) -> str:
        c = self._value
        return f"{c[:3]}.{c[3:6]}.{c[6:9]}-{c[9:]}"

    def __eq__(self, other: object) -> bool:
        if isinstance(other, CPF):
            return self._value == other._value
        return False

    def __hash__(self) -> int:
        return hash(self._value)

    def __str__(self) -> str:
        return self._value

    def __repr__(self) -> str:
        return f"CPF({self._value})"
