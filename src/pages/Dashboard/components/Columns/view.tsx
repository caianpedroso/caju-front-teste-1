import * as S from './styles';
import { ALL_COLUMNS, Props } from './models.ts';
import { Registration } from '~/common/interfaces/registration.ts';
import { RegistrationCard } from '~/pages/Dashboard/components/RegistrationCard';
import { useColumns } from '~/pages/Dashboard/components/Columns/viewModel.ts';

export const Columns = (props: Props) => {
  const { data } = useColumns(props);

  return (
    <S.Container>
      {ALL_COLUMNS?.map(column => {
        const registrationByStatus = (data && data[column?.status]) || [];
        return (
          <S.Column status={column?.status} key={column?.title}>
            <>
              <S.TitleColumn status={column.status}>{column.title}</S.TitleColumn>
              <S.CollumContent>
                {registrationByStatus.map((registration: Registration) => {
                  return <RegistrationCard data={registration} key={registration.id} column={column.status} />;
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
