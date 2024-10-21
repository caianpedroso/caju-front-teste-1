export const maskCpf = (cpf: string) => {
	let value = cpf.replace(/\D/g, ""); // Remove tudo que não for dígito

	if (value.length > 3) {
		value = value.replace(/(\d{3})(\d)/, "$1.$2");
	}
	if (value.length > 6) {
		value = value.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
	}
	if (value.length > 9) {
		value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
	}

	return value;
};


export function unmaskCpf(value: string): string {
	return value.replace(/\D/g, "");
}