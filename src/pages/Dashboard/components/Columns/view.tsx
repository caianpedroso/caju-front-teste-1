import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import {ALL_COLUMNS, Props} from "./models.ts"
import {Registration, RegistrationStatus} from "~/common/interfaces/registration.ts";
import {useMemo} from "react";


function normalizeStatusWord(status: string) {
	switch (status.toUpperCase()) {
		case "APROVED":
		case "APPROVED":
			return RegistrationStatus.APPROVED

		case "REPROVED":
			return RegistrationStatus.REPROVED

		default:
			return RegistrationStatus.REVIEW

	}
}

export const Columns = (props: Props) => {

	const data = useMemo(() => props.registrations?.reduce((acc, registration: Registration) => {
		const status = normalizeStatusWord(registration.status)
		const group = acc[status]
		group.push(registration)
		acc[status] = group
		return acc
	}, {
		APPROVED: [],
		REPROVED: [],
		REVIEW: []
	}), [props])

	console.log({data})

	return (
		<S.Container>
			{ALL_COLUMNS.map((column) => {
				const registrationByStatus = data[column?.status] || []
				return (
					<S.Column status={column.status} key={column.title}>
						<>
							<S.TitleColumn status={column.status}>
								{column.title}
							</S.TitleColumn>
							<S.CollumContent>
								{registrationByStatus.map((registration) => {
									return (
										<RegistrationCard
											data={registration}
											key={registration.id}
										/>
									);
								})}
							</S.CollumContent>
						</>
					</S.Column>
				);
			})}
		</S.Container>
	);
};

