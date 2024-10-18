import { Collumns } from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";

export const DashboardPage = () => {
  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={[]} />
    </S.Container>
  );
};
