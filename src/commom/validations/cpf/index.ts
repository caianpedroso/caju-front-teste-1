export function validateCpf(cpf: string): boolean {
	const cleanCpf = cpf.replace(/\D/g, "");

	if (cleanCpf.length !== 11 || /^(\d)\1+$/.test(cleanCpf)) {
		return false;
	}

	const calculateDigit = (slice: number): number => {
		let sum = 0;
		for (let i = 0; i < slice; i++) {
			sum += parseInt(cleanCpf.charAt(i)) * (slice + 1 - i);
		}
		const remainder = (sum * 10) % 11;
		return remainder === 10 ? 0 : remainder;
	};

	const digit1 = calculateDigit(9);
	const digit2 = calculateDigit(10);

	return (
		digit1 === parseInt(cleanCpf.charAt(9)) &&
		digit2 === parseInt(cleanCpf.charAt(10))
	);
}