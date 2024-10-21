// import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { useDeleteRegistration, useUpdateRegistration } from "~/pages/Dashboard/components/RegistrationCard/viewModel.ts";
import {ButtonDefault, Modal} from "~/components";

type Props = {
  data: any;
};

const RegistrationCard = (props: Props) => {
	const {
		handleReprove,
		handleApprove,
		handleReview,
		loading,
		// error
	} = useUpdateRegistration(props.data.id);
	const {
		deleteRegistration,
		deleteIsOpenModal,
		deleteSetIsOpenModal
	} = useDeleteRegistration();

  return (
    <S.Card>
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
        <ButtonDefault
	        label="Reprovar"
	        variant="danger"
	        onClick={handleReprove}
        />
	      <ButtonDefault
		      label="Aprovar"
		      variant="success"
		      onClick={handleApprove}
	      />
	      <ButtonDefault
		      label="Revisar novamente"
		      variant="warning"
		      onClick={handleReview}
	      />
        <HiOutlineTrash onClick={() => deleteRegistration(props.data.id)}/>
      </S.Actions>
	    <Modal
		    isOpen={deleteIsOpenModal}
		    onClose={() => deleteSetIsOpenModal(false)}
		    // onConfirm={() => deleteRegistration(props.data.id)}
		    onConfirm={() => { }}
	    />
    </S.Card>
  );
};

export default RegistrationCard;
