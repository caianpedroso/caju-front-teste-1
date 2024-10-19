import * as React from "react";
import { ResendFormData } from "~/pages/NewUser/model.ts";
import routes from "~/router/routes.ts";
import { useHistory } from "react-router-dom";
import { apiBase } from "~/api/axios.ts";
import {Registration, RegistrationStatus} from "~/common/interfaces/registration.ts";
import {useMutation} from "react-query";
import {queryClient} from "~/api/query-client.ts";
import {unmaskCpf} from "~/common/masks";
import toast from "react-hot-toast";


export const addNewUser = async (payload: Registration) => {
	return apiBase.post("/registrations", payload)
}

export function useNewUser()  {
	const history = useHistory();

	const goToHome = () => {
		history.push(routes.dashboard);
	};
	const addNewUserMutation = useMutation({
		mutationFn: addNewUser,
		onSuccess: () => {
			toast.success("Novo candidato cadastrado!");
			queryClient.invalidateQueries({
				queryKey: ["registrations"],
			})
			goToHome()
		},
		onError: () => {
			toast.error("Houve um erro ao tentar cadastrar um novo candidato!");
		}
	})

	const onSubmit = (data: ResendFormData, event: React.BaseSyntheticEvent | undefined) => {
		event?.preventDefault();
		addNewUserMutation.mutate({
			admissionDate: data.date,
			email: data.email,
			employeeName: data.name,
			cpf: unmaskCpf(data.document),
			status: RegistrationStatus.REVIEW,
		})
	};

	return { onSubmit, goToHome, loading: addNewUserMutation.isLoading, error: addNewUserMutation.isError };
}