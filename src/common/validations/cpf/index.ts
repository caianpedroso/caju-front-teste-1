export function validateCPF(cpf: string) {
	cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

	if (cpf.length !== 11) return false;
	if (/^(\d)\1{10}$/.test(cpf)) return false;
	const calcularDigito = (cpf: string, fator: number) => {
		let soma = 0;
		for (let i = 0; i < fator - 1; i++) {
			soma += parseInt(cpf[i]) * (fator - i);
		}
		const resto = (soma * 10) % 11;
		return resto === 10 || resto === 11 ? 0 : resto;
	};

	const digito1 = calcularDigito(cpf, 10);
	const digito2 = calcularDigito(cpf, 11);

	return digito1 === parseInt(cpf[9]) && digito2 === parseInt(cpf[10]);
}