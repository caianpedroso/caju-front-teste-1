import {RegistrationStatus} from "~/common/interfaces/registration.ts";

export type RegistrationPayload = {
	id: string,
	status: RegistrationStatus
}

export type Props = {
	data: any;
	column: RegistrationStatus;
};