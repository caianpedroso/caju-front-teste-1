import * as S from "./styles";
import {
	HiOutlineMail,
	HiOutlineUser,
	HiOutlineCalendar,
	HiOutlineTrash,
} from "react-icons/hi";
import { useDeleteRegistration, useUpdateRegistration } from "~/pages/Dashboard/components/RegistrationCard/viewModel.ts";
import { ButtonDefault, Modal } from "~/components";
import { Props } from "~/pages/Dashboard/components/RegistrationCard/models.ts";

export const RegistrationCard = (props: Props) => {
	const {
		handleReprove,
		handleApprove,
		handleReview,
		// loading,
		// error,

	} = useUpdateRegistration(props.data.id, props.data.employeeName);

	console.log(props);
	const {
		deleteRegistration
	} = useDeleteRegistration(props.data.id, props.data.employeeName);

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

				{props.column !== 'REPROVED' && (
					<ButtonDefault
						label="Reprovar"
						variant="danger"
						onClick={handleReprove}
					/>
				)}

				{props.column !== 'APPROVED' && (
					<ButtonDefault
						label="Aprovar"
						variant="success"
						onClick={handleApprove}
					/>
				)}

				{props.column !== 'REVIEW' && (
					<ButtonDefault
						label="Revisar novamente"
						variant="warning"
						onClick={handleReview}
					/>
				)}
				<HiOutlineTrash onClick={deleteRegistration}/>
				<Modal />
			</S.Actions>
		</S.Card>
	);
};

