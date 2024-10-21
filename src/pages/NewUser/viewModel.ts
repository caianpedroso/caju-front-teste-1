import * as React from "react";
import { ResendFormData } from "~/pages/NewUser/model.ts";
import routes from "~/router/routes.ts";
import { useHistory } from "react-router-dom";
import { apiBase } from "~/api/axios.ts";
import { Registration, RegistrationStatus } from "~/common/interfaces/registration.ts";
import { useMutation } from "react-query";
import { queryClient } from "~/api/query-client.ts";
import { unmaskCpf } from "~/common/masks";
import toast from "react-hot-toast";
import {useGlobalModal} from "~/components";

export const addNewUser = async (payload: Registration) => {
	return apiBase.post("/registrations", payload)
}

export function useNewUser()  {
	const { openModal } = useGlobalModal();
	const history = useHistory();

	const goToHome = () => {
		history.push(routes.dashboard);
	};

	const addNewUserMutation = useMutation({
		mutationFn: addNewUser, 
		onSuccess: () => {
			toast.success("Novo candidato cadastrado!", {
				duration: 5000,
				id: "new-user-success"
			});
			queryClient.invalidateQueries({
				queryKey: ["registrations"],
			})
			goToHome()
		},
		onError: () => {
			toast.error("Houve um erro ao tentar cadastrar um novo candidato!", { id: "new-user-error" });
		}
	})
 
	const onSubmit = (data: ResendFormData, event: React.BaseSyntheticEvent | undefined) => {
		event?.preventDefault();

		openModal({
			title: data.name,
			message: 'Tem certeza que deseja cadastrar este candidato?',
			onConfirm: () => {
				addNewUserMutation.mutate({
					admissionDate: data.date,
					email: data.email,
					employeeName: data.name,
					cpf: unmaskCpf(data.document),
					status: RegistrationStatus.REVIEW,
				})
			},
		});
	};

	return {
		onSubmit,
		goToHome,
		loading: addNewUserMutation.isLoading,
		error: addNewUserMutation.isError,
	};
}