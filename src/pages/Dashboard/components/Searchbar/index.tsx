import { useHistory } from "react-router-dom";
import { ButtonDefault, TextField } from "~/components";
import routes from "~/router/routes";
import * as S from "./styles";
import { useEffect, useState } from "react";
import { maskCpf } from "~/common/masks";
import {validateCPF} from "~/common/validations";


export const SearchBar = (props: any) => {
  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

	const [cpf, setCpf] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {

		if(!validateCPF(cpf) && cpf.length === 14) {
			setError("Digite um CPF válido")
		} else {
			setError("")
		}

		const timeoutId = setTimeout(() => props.onChange(cpf), 500)
		return () => clearTimeout(timeoutId);
	}, [cpf]);

  return (
	  <S.Container>
		  <TextField
			  placeholder="Digite um CPF válido"
			  type="text"
			  value={maskCpf(cpf)}
			  maxLength={14}
			  onChange={(e) => setCpf(e.target.value)}
			  error={error}

		  />
		  <S.Actions>
			  <ButtonDefault
				  variant='iconPrimary'
				  aria-label="Reload de dados"
				  loading={props.loading}
				  onClick={() => props.refetch()}
				  icon={<S.RefreshIcon refresh={props.loading}/>}
			  />
			  <ButtonDefault
				  label='Nova Admissão'
				  onClick={() => goToNewAdmissionPage()}
			  />
		  </S.Actions>
	  </S.Container>
  );
};
