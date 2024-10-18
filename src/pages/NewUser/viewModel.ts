import * as React from "react";
import { ResendFormData } from "~/pages/NewUser/model.ts";
import routes from "~/router/routes.ts";
import { useHistory } from "react-router-dom";
import { apiBase } from "~/services/base-api.ts";

export function useNewUser() {
	const history = useHistory();

	const goToHome = () => {
		history.push(routes.dashboard);
	};

	const handleCreateUser = React.useCallback(
		async (data: any) => {
			try {
				await apiBase.post("/registrations", {
					admissionDate: data.date,
					email: data.email,
					employeeName: data.name,
					cpf: data.document,
					status: "REVIEW",
				});
				console.log(data);
				goToHome();
			} catch (error) {
				console.error(error);
			}
		},
		[]
	);

	const onSubmit = (data: ResendFormData, event: React.BaseSyntheticEvent | undefined) => {
		event?.preventDefault();
		handleCreateUser(data);
	};

	return { onSubmit, goToHome };
}