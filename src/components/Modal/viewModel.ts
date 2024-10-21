import { useMutation, useQueryClient } from "react-query";
import { ModalState, ModalConfig } from "~/components";
const MODAL_STATE_KEY = 'globalModal';

export const useGlobalModal = () => {
	const queryClient = useQueryClient();

	const openModal = useMutation({
		mutationFn: async (config: ModalConfig) => ({
			isOpen: true,
			config,
		}),
		onSuccess: (data: any) => queryClient.setQueryData([MODAL_STATE_KEY], data),
	});

	const closeModal = useMutation({
		mutationFn: async () => ({
			isOpen: false,
			config: null,
		}),
		onSuccess: (data: any) => queryClient.setQueryData([MODAL_STATE_KEY], data),
	});

	return {
		openModal: openModal.mutate,
		closeModal: closeModal.mutate,
	};
};

export const useModalState = () => {
	const queryClient = useQueryClient();
	return queryClient.getQueryData<ModalState>([MODAL_STATE_KEY]) || {
		isOpen: false,
		config: null,
	};
};
