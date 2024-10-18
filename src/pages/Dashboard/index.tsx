import {Columns} from "./components/Columns";
import * as S from "./styles";
import {SearchBar} from "./components/Searchbar";
import {useRegistration} from "~/pages/Dashboard/viewModel.ts";

export const DashboardPage = () => {
	const { registrations, status } = useRegistration()
  return (
    <S.Container>
      <SearchBar />
      <Columns registrations={registrations} status={status} />
    </S.Container>
  );
};
