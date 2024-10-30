import { apiBase } from "~/api/axios.ts";
import {Registration, RegistrationStatus} from "~/common/interfaces/registration.ts";
import { useMutation } from "react-query";
import { queryClient } from "~/api/query-client.ts";
import toast from "react-hot-toast";
import { useGlobalModal } from "~/components";

export const updateRegistration = async (payload: Registration) => {
	return apiBase.put(`/registrations/${payload.id}`, payload)
}

export const deleteRegistration = async (id: string) => {
	return apiBase.delete(`/registrations/${id}`)
}

export function useUpdateRegistration(data: Registration)  {
	const { openModal } = useGlobalModal();

	const updateRegistrationMutation = useMutation({
		mutationFn: updateRegistration,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["registrations"],
			})
			toast.success("Registro atualizado com sucesso!")
		},
		onError: () => {
			toast.error("Houve um erro ao tentar atualizar o registro!")
		}
	})

	const handleStatusRegistration = ({ status }: { status: RegistrationStatus }) => updateRegistrationMutation.mutate({
		...data,
		status
	});

	const handleApprove = () => {
		openModal({
			title: data.employeeName,
			message: 'Tem certeza que deseja aprovar este candidato ?',
			onConfirm: () => handleStatusRegistration({
				status: RegistrationStatus.APPROVED
			}),
		});
	};

	const handleReprove = () => {
		openModal({
			title: data.employeeName,
			message: 'Tem certeza que deseja reprovar este candidato ?',
			onConfirm: () => handleStatusRegistration({
				status: RegistrationStatus.REPROVED
			}),
		});
	};

	const handleReview = () => {
		openModal({
			title: data.employeeName,
			message: 'Tem certeza que deseja revisar este candidato ?',
			onConfirm: () => handleStatusRegistration({
				status: RegistrationStatus.REVIEW
			}),
		});
	};

	return {
		handleApprove,
		handleReprove,
		handleReview,
		loading: updateRegistrationMutation.isLoading,
		error: updateRegistrationMutation.isError,
	}
}

export function useDeleteRegistration(id: string, name: string)  {
	const { openModal } = useGlobalModal();

	const deleteRegistrationMutation = useMutation({
		mutationFn: deleteRegistration,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["registrations"],
			})
			toast.success("Registro deletado com sucesso!")
		},
		onError: () => {
			toast.error("Houve um erro ao tentar deletar o registro!")
		}
	})

	const handleOpenModal = () => {
		openModal({
			title: name,
			message: 'Tem certeza que deseja excluir este candidato?',
			onConfirm: () => deleteRegistrationMutation.mutate(id),
		});
	};

	return {
		deleteRegistration: () => handleOpenModal(),
		loading: deleteRegistrationMutation.isLoading,
		error: deleteRegistrationMutation.isError,
	}
}
