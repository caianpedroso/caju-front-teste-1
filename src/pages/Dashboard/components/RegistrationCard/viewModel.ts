import {apiBase} from "~/api/axios.ts";
import {Registration, RegistrationStatus} from "~/common/interfaces/registration.ts";
import {useMutation} from "react-query";
import {queryClient} from "~/api/query-client.ts";
import {RegistrationPayload} from "~/pages/Dashboard/components/RegistrationCard/models.ts";
import toast from "react-hot-toast";


export const updateRegistration = async (payload: { id: string, status: RegistrationStatus}) => {
	return apiBase.patch(`/registrations/${payload.id}`, payload)
}
export const deleteRegistration = async (id: string) => {
	return apiBase.delete(`/registrations/${id}`)
}

export function useUpdateRegistration(id: string)  {
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
		id,
		status
	})

	const handleApprove = () => handleStatusRegistration({
		status: RegistrationStatus.APPROVED
	})

	const handleReprove = () => handleStatusRegistration({
		status: RegistrationStatus.REPROVED
	})

	const handleReview = () => handleStatusRegistration({
		status: RegistrationStatus.REVIEW
	})

	return {
		handleApprove,
		handleReprove,
		handleReview,
		loading: updateRegistrationMutation.isLoading,
		error: updateRegistrationMutation.isError,
	}
}
export function useDeleteRegistration()  {
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

	const handleDeleteRegistration = (id: string) => deleteRegistrationMutation.mutate(id)

	return {
		deleteRegistration: handleDeleteRegistration,
		loading: deleteRegistrationMutation.isLoading,
		error: deleteRegistrationMutation.isError,
	}
}
