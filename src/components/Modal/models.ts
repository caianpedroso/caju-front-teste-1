export type ModalConfig = {
	title: string;
	message: string;
	onConfirm?: () => void;
};

export type ModalState = {
	isOpen: boolean;
	config: ModalConfig | null;
};