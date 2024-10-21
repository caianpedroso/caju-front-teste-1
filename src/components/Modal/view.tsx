import React from 'react';
import * as S from "./styles";
import { ModalProps } from "~/components/Modal/models.ts";
import { ButtonDefault } from "~/components";
import {useGlobalModal, useModalState} from "~/components/Modal/viewModel.ts";

export const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	title = 'Confirmar Ação',
	message = 'Tem certeza que deseja continuar?',
	cancelText = 'Cancelar',
	confirmText = 'Confirmar',
}) => {
	if (!isOpen) return null;

	return (
		<S.Overlay>
			<S.ModalContainer>
				<h2>{title}</h2>
				<p>{message}</p>
				<S.ButtonContainer>
					<ButtonDefault
						label={cancelText}
						variant='danger'
						onClick={onClose}
					/>
					<ButtonDefault
						label={confirmText}
						variant='success'
						onClick={onConfirm}
					/>
				</S.ButtonContainer>
			</S.ModalContainer>
		</S.Overlay>
	);
};

export const ModalProvider: React.FC = () => {
	const { isOpen, config } = useModalState();
	const { closeModal } = useGlobalModal();

	if (!isOpen || !config) return null;

	const { title, message, onConfirm } = config;

	return (
		<S.Overlay>
			<S.ModalContainer role="dialog" aria-labelledby="modal-title" aria-describedby="modal-message">
				<h2 id="modal-title">{title}</h2>
				<p id="modal-message">{message}</p>
				<S.ButtonContainer>
					<ButtonDefault
						label='Cancelar'
						variant='danger'
						onClick={() => closeModal()}
					/>

					<ButtonDefault
						label='Confirmar'
						variant='success'
						onClick={() => {
							if (onConfirm) {
								onConfirm();
							}
							closeModal();
						}}
					/>
				</S.ButtonContainer>
			</S.ModalContainer>
		</S.Overlay>
	);
};

