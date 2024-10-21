import {Columns} from "./components/Columns";
import * as S from "./styles";
import {SearchBar} from "./components/Searchbar";
import {useRegistration} from "~/pages/Dashboard/viewModel.ts";
import {useQueryClient, useQuery} from "react-query";

export const DashboardPage = () => {
	const { registrations, status } = useRegistration();

	const fetchFilteredUsers = async (cpf) => {
		if (!cpf) return registrations;
		return registrations.filter((user) => user.cpf.includes(cpf));
	};

	const queryClient = useQueryClient();

	const cpf = queryClient.getQueryData({queryKey: ["registrations"]}); // Acessa o CPF filtrado

	const { data: users, isLoading } = useQuery(
		['registrations', cpf],
		() => fetchFilteredUsers(cpf), // Filtra os usuários localmente
		{ enabled: !!cpf } // Só executa a query se CPF não estiver vazio
	);

	console.log('users ', queryClient.getQueryData(['filteredCpf']));

  return (
    <S.Container>
      <SearchBar/>
      <Columns registrations={registrations} status={status} />
    </S.Container>
  );
};
