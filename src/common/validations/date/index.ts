export const validateData = (data: string) => {
	const [ano, mes, dia] = data.split("-").map(Number);

	// Verifica se o ano, mês e dia são números válidos
	if (!ano || !mes || !dia) {
		return false;
	}

	// Verifica se o mês está entre 1 e 12
	if (mes < 1 || mes > 12) {
		return false;
	}

	// Verifica se o dia é válido para o mês
	const ultimoDiaDoMes = new Date(ano, mes, 0).getDate();
	if (dia < 1 || dia > ultimoDiaDoMes) {
		return false;
	}

	return true;
};