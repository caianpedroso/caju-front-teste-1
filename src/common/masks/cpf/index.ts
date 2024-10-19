export const maskCpf = (e: React.ChangeEvent<HTMLInputElement>) => {
	let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for dígito

	// Aplica a máscara de CPF (999.999.999-99)
	if (value.length > 3) {
		value = value.replace(/(\d{3})(\d)/, "$1.$2");
	}
	if (value.length > 6) {
		value = value.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
	}
	if (value.length > 9) {
		value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
	}

	// Atualiza o valor no próprio input
	e.target.value = value;
};


export function unmaskCpf(value: string): string {
	return value.replace(/\D/g, "");
}