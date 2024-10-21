import * as S from './styles';
import { HiOutlineCalendar, HiOutlineMail, HiOutlineTrash, HiOutlineUser } from 'react-icons/hi';
import { useDeleteRegistration, useUpdateRegistration } from '~/pages/Dashboard/components/RegistrationCard/viewModel.ts';
import { ButtonDefault, Modal } from '~/components';
import { Props } from '~/pages/Dashboard/components/RegistrationCard/models.ts';
import { Spinner } from '~/components/Buttons/styles.ts';
import { RegistrationStatus } from '~/common/interfaces/registration.ts';

export const RegistrationCard = (props: Props) => {
  const { handleReprove, handleApprove, handleReview, loading } = useUpdateRegistration(props.data.id, props.data.employeeName);

  const { deleteRegistration, loading: deleteLoading } = useDeleteRegistration(props.data.id, props.data.employeeName);

  return (
    <S.Card data-testid="registration-card">
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{props.data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{props.data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{props.data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {loading || deleteLoading ? (
          <Spinner />
        ) : (
          <>
            {props.column === RegistrationStatus.REVIEW && (
              <>
                <ButtonDefault label="Reprovar" variant="danger" onClick={handleReprove} disabled={loading} />
                <ButtonDefault label="Aprovar" variant="success" onClick={handleApprove} disabled={loading} />
              </>
            )}

            {props.column !== RegistrationStatus.REVIEW && (
              <ButtonDefault label="Revisar novamente" variant="warning" onClick={handleReview} disabled={loading} />
            )}
          </>
        )}
        <HiOutlineTrash onClick={deleteRegistration} />
        <Modal />
      </S.Actions>
    </S.Card>
  );
};
