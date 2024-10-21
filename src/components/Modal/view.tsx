import React from 'react';
import * as S from "./styles";
import { ButtonDefault } from "~/components";
import { useGlobalModal, useModalState } from "~/components/Modal/viewModel.ts";

export const Modal: React.FC = () => {
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

