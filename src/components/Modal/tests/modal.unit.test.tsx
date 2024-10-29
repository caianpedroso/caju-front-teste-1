import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Modal, useGlobalModal, useModalState } from '~/components';
import { ThemeProvider } from "styled-components";
import { theme } from "~/common/styles";

jest.mock('../viewModel', () => ({ // Ajuste no caminho do mock
	useGlobalModal: jest.fn(),
	useModalState: jest.fn(),
}));

const queryClient = new QueryClient();

const renderWithTheme = (ui: React.ReactNode) =>
	render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

const renderWithQueryClient = (ui: React.ReactNode) =>
	renderWithTheme(
		<QueryClientProvider client={queryClient}>
			{ui}
		</QueryClientProvider>
	);

describe('Modal Component', () => {
	const mockCloseModal = jest.fn();
	const mockOnConfirm = jest.fn();

	beforeEach(() => {
		(useGlobalModal as jest.Mock).mockReturnValue({
			closeModal: mockCloseModal,
		});

		(useModalState as jest.Mock).mockReturnValue({
			isOpen: true,
			config: {
				title: 'Teste de Título',
				message: 'Mensagem de Teste',
				onConfirm: mockOnConfirm,
			},
		});
	});

	it('should render the modal with the correct title and message', () => {
		renderWithQueryClient(<Modal />);
		expect(screen.getByRole('dialog')).toBeInTheDocument();
		expect(screen.getByText('Teste de Título')).toBeInTheDocument();
		expect(screen.getByText('Mensagem de Teste')).toBeInTheDocument();
	});

	it('should close the modal when "Cancelar" is clicked', () => {
		renderWithQueryClient(<Modal />);
		fireEvent.click(screen.getByTestId('button-cancel'));
		expect(mockCloseModal).toHaveBeenCalled();
	});

	it('should call onConfirm and close the modal when "Confirmar" is clicked', () => {
		renderWithQueryClient(<Modal />);
		fireEvent.click(screen.getByTestId('button-confirm'));
		expect(mockOnConfirm).toHaveBeenCalled();
		expect(mockCloseModal).toHaveBeenCalled();
	});

	it('should not render the modal when isOpen is false', () => {
		(useModalState as jest.Mock).mockReturnValue({
			isOpen: false,
			config: null,
		});

		renderWithQueryClient(<Modal />);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});
});
