import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from '../view';
import { useHistory } from 'react-router-dom';
import { SearchbarProps } from '../models';
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider} from "styled-components";
import {theme} from "~/common/styles";

jest.mock('react-router-dom', () => ({
	useHistory: jest.fn(),
}));

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactNode) =>
	render(
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>{ui}</ThemeProvider>
		</QueryClientProvider>
	);

describe('SearchBar Component', () => {
	const mockOnChange = jest.fn();
	const mockRefetch = jest.fn();
	const mockPush = jest.fn();

	beforeEach(() => {
		(useHistory as jest.Mock).mockReturnValue({ push: mockPush });
	});

	const defaultProps: SearchbarProps = {
		loading: false,
		refetch: mockRefetch,
		onChange: mockOnChange,
	};

	it('should render the input and buttons correctly', () => {
		renderWithProviders(<SearchBar {...defaultProps} loading={true} />);

		expect(screen.getByPlaceholderText('Digite um CPF válido')).toBeInTheDocument();
		expect(screen.getByLabelText('Reload de dados')).toBeInTheDocument();
		expect(screen.getByText('Nova Admissão')).toBeInTheDocument();
	});

	it('should not log warning for non-boolean attribute', () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

		renderWithProviders(<SearchBar {...defaultProps} />);

		expect(consoleSpy).not.toHaveBeenCalledWith(
			expect.stringContaining(
				'Warning: Received `false` for a non-boolean attribute `refresh`'
			)
		);

		consoleSpy.mockRestore();
	});

	it('should display an error message for invalid CPF', async () => {
		renderWithProviders(<SearchBar {...defaultProps} />);

		const input = screen.getByPlaceholderText('Digite um CPF válido');
		fireEvent.change(input, { target: { value: '123.456.789-00' } });

		expect(await screen.findByText('Digite um CPF válido')).toBeInTheDocument();
	});

	it('should call refetch when reload button is clicked', () => {
		renderWithProviders(<SearchBar {...defaultProps} />);

		const reloadButton = screen.getByLabelText('Reload de dados');
		fireEvent.click(reloadButton);

		expect(mockRefetch).toHaveBeenCalled();
	});

	it('should navigate to the new admission page on button click', () => {
		renderWithProviders(<SearchBar {...defaultProps} />);

		const newAdmissionButton = screen.getByText('Nova Admissão');
		fireEvent.click(newAdmissionButton);

		expect(mockPush).toHaveBeenCalledWith('/new-user');
	});

	it('should call onChange with debounce when typing in the input', async () => {
		renderWithProviders(<SearchBar {...defaultProps} />);

		const input = screen.getByPlaceholderText('Digite um CPF válido');
		fireEvent.change(input, { target: { value: '12345678909' } });

		await waitFor(() => expect(mockOnChange).toHaveBeenCalledWith('12345678909'), {
			timeout: 600,
		});
	});
});
