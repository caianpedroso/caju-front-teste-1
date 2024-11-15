export enum RegistrationStatus {
		REVIEW = "REVIEW",
		APPROVED = "APPROVED",
		REPROVED = "REPROVED",
}

export type Registration = {
	admissionDate: string;
	email: string;
	employeeName: string;
	status: RegistrationStatus;
	cpf: string;
	id?: string;
}