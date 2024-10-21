import { Registration, RegistrationStatus } from "~/common/interfaces/registration.ts";
import { useMemo } from "react";
import { Props } from "~/pages/Dashboard/components/Columns/models.ts";

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

export const useColumns = (props: Props) => {
	const data = useMemo(() => props?.registrations?.reduce((acc, registration: Registration) => {
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


	return {
		data
	}
}