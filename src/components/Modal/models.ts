export type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title?: string;
	message?: string;
	cancelText?: string;
	confirmText?: string;
};

export type ModalConfig = {
	title: string;
	message: string;
	onConfirm?: () => void;
};

export type ModalState = {
	isOpen: boolean;
	config: ModalConfig | null;
};