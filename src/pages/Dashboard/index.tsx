import { Columns } from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useRegistration } from "~/pages/Dashboard/viewModel.ts";

export const DashboardPage = () => {
	const { registrations, status, refetch, loading, search } = useRegistration();

  return (
    <S.Container>
      <SearchBar refetch={refetch} onChange={search} loading={loading} />
      <Columns registrations={registrations} status={status} loading={loading} />
    </S.Container>
  );
};
