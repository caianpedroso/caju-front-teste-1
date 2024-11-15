import { useHistory } from "react-router-dom";
import routes from "~/router/routes.ts";
import { useEffect, useState } from "react";
import { validateCPF } from "~/common/validations";
import { SearchbarProps } from "~/pages/Dashboard/components/Searchbar/models.ts";

export const useSearchBar = (props: SearchbarProps) => {

	const history = useHistory();

	const goToNewAdmissionPage = () => {
		history.push(routes.newUser);
	};

	const [cpf, setCpf] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		if (!validateCPF(cpf) && cpf.length === 14) {
			setError('Digite um CPF válido');
		} else {
			setError('');
		}

		const timeoutId = setTimeout(() => props.onChange(cpf), 500);
		return () => clearTimeout(timeoutId);
	}, [cpf]);

	return {
		cpf,
		setCpf,
		error,
		goToNewAdmissionPage
	};

}