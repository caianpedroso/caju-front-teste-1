import { ButtonDefault, TextField } from '~/components';
import * as S from './styles';
import { maskCpf } from '~/common/masks';
import { useSearchBar } from "~/pages/Dashboard/components/Searchbar/viewModel.ts";
import { SearchbarProps } from "~/pages/Dashboard/components/Searchbar/models.ts";

export const SearchBar = (props: SearchbarProps) => {
	const {cpf, setCpf, error, goToNewAdmissionPage} = useSearchBar(props)

	return (
		<S.Container>
			<TextField
				placeholder="Digite um CPF válido"
				type="text"
				value={maskCpf(cpf)}
				maxLength={14}
				onChange={e => setCpf(e.target.value)}
				error={error}
				data-testid="search-input"
			/>
			<S.Actions>
				<ButtonDefault
					variant="iconPrimary"
					aria-label="Reload de dados"
					loading={props.loading || false}
					onClick={() => props.refetch()}
					icon={<S.RefreshIcon refresh={Boolean(props.loading)} />}
				/>
				<ButtonDefault label="Nova Admissão" onClick={() => goToNewAdmissionPage()} />
			</S.Actions>
		</S.Container>
	);
};
