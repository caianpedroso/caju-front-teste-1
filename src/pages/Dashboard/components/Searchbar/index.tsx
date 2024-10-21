import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
// import { IconButton } from "~/components/Buttons/IconButton";
import { ButtonDefault, TextField } from "~/components";
import routes from "~/router/routes";
import * as S from "./styles";
import { useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import {maskCpf} from "~/common/masks";
import {useQueryRegistrations} from "~/pages/Dashboard/viewModel.ts";

export const SearchBar = () => {
	const { refetch, isLoading } = useQueryRegistrations()
  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

	const queryClient = useQueryClient(); // Acesso à store
	const [cpf, setCpf] = useState('');
	const [filteredData, setFilteredData] = useState(null);
	const [debounceTimer, setDebounceTimer] = useState(null); // Controla o debounce

	useEffect(() => {
		if (debounceTimer) clearTimeout(debounceTimer); // Limpa o timer anterior

		const timer = setTimeout(() => {
			queryClient.setQueryData(['filteredCpf'], cpf)
		}, 500); // Aguardar 500ms após a última digitação

		setDebounceTimer(timer);

		// Limpa o timer ao desmontar o componente ou alterar o input
		return () => clearTimeout(timer);
	}, [cpf]);

console.log('filteredData ', queryClient.getQueryData('filteredCpf'));
console.log('sss ', isLoading);

  return (
	  <S.Container>
		  <TextField
			  placeholder="Digite um CPF válido"
			  type="text"
			  value={cpf}
			  maxLength={14}
			  onChange={(e) => setCpf(maskCpf(e))}
		  />
		  <S.Actions>
			  <ButtonDefault
				  variant='iconPrimary'
				  aria-label="Reload de dados"
				  onClick={() => refetch()}
				  icon={<S.RefreshIcon refresh={isLoading}/>}
			  />
			  <ButtonDefault
				  label='Nova Admissão'
				  onClick={() => goToNewAdmissionPage()}
			  />
		  </S.Actions>
	  </S.Container>
  );
};
