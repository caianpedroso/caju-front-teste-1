import { RegistrationStatus } from "~/common/interfaces/registration.ts";

export type Props = {
	registrations?: any[];
	status: "error" | "loading" | "success" | "idle";
};

export const ALL_COLUMNS = [
	{ status: RegistrationStatus.REVIEW, title: "Pronto para revisar" },
	{ status: RegistrationStatus.APPROVED, title: "Aprovado" },
	{ status: RegistrationStatus.REPROVED, title: "Reprovado" },
];