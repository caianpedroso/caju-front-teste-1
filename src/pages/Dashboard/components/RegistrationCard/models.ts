import {RegistrationStatus} from "~/common/interfaces/registration.ts";

export type RegistrationPayload = {
	id: string,
	status: RegistrationStatus
}