import pytest

from src.domain.value_objects.cpf import CPF


class TestCPF:
    def test_valid_cpf(self):
        cpf = CPF("529.982.247-25")
        assert cpf.value == "52998224725"

    def test_valid_cpf_without_formatting(self):
        cpf = CPF("52998224725")
        assert cpf.value == "52998224725"

    def test_formatted_output(self):
        cpf = CPF("52998224725")
        assert cpf.formatted() == "529.982.247-25"

    def test_invalid_cpf_raises(self):
        with pytest.raises(ValueError, match="Invalid CPF"):
            CPF("11111111111")

    def test_invalid_cpf_wrong_digits(self):
        with pytest.raises(ValueError, match="Invalid CPF"):
            CPF("12345678901")

    def test_invalid_cpf_too_short(self):
        with pytest.raises(ValueError, match="Invalid CPF"):
            CPF("1234")

    def test_equality(self):
        cpf1 = CPF("52998224725")
        cpf2 = CPF("529.982.247-25")
        assert cpf1 == cpf2

    def test_string_representation(self):
        cpf = CPF("52998224725")
        assert str(cpf) == "52998224725"
