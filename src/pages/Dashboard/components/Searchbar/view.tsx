import { useQuery, useQueryClient } from 'react-query';
import { useState, useEffect, useCallback } from 'react';

// Dados simulados
const mockUsers = [
	{ id: 1, cpf: '123.456.789-00', name: 'João Silva' },
	{ id: 2, cpf: '987.654.321-00', name: 'Maria Souza' },
	{ id: 3, cpf: '111.222.333-44', name: 'Ana Oliveira' },
];

// Função que retorna os dados da "store"
const fetchUsersFromStore = async () => mockUsers;

export const CPFSearch = () => {
	const queryClient = useQueryClient(); // Acesso à store
	const [cpf, setCpf] = useState('');
	const [filteredData, setFilteredData] = useState(null);
	const [debounceTimer, setDebounceTimer] = useState(null); // Controla o debounce

	// Carrega os dados iniciais na store com React Query
	useQuery(['users'], fetchUsersFromStore, { staleTime: Infinity });

	// Função que filtra os dados localmente
	const filterData = useCallback(() => {
		const allUsers = queryClient.getQueryData(['users']);
		const result = allUsers?.filter((user) => user.cpf.includes(cpf));
		setFilteredData(result);
	}, [cpf, queryClient]);

	// Efeito para aplicar debounce no filtro
	useEffect(() => {
		if (debounceTimer) clearTimeout(debounceTimer); // Limpa o timer anterior

		const timer = setTimeout(() => {
			filterData(); // Aplica o filtro após o debounce
		}, 500); // Aguardar 500ms após a última digitação

		setDebounceTimer(timer);

		// Limpa o timer ao desmontar o componente ou alterar o input
		return () => clearTimeout(timer);
	}, [cpf, filterData]);

	return (
		<div style={{ padding: '20px' }}>
			<h1>Buscar Usuário por CPF</h1>

			<input
				type="text"
				placeholder="Digite o CPF"
				value={cpf}
				onChange={(e) => setCpf(e.target.value)}
				style={{ marginRight: '10px' }}
			/>

			{filteredData && (
				<div>
					<h2>Resultados:</h2>
					{filteredData.length > 0 ? (
						<ul>
							{filteredData.map((user) => (
								<li key={user.id}>
									{user.name} - CPF: {user.cpf}
								</li>
							))}
						</ul>
					) : (
						<p>Nenhum usuário encontrado com esse CPF.</p>
					)}
				</div>
			)}
		</div>
	);
};
