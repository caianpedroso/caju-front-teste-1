// NewUserPage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { NewUserPage, useNewUser } from "~/pages";

jest.mock('./viewModel');

describe('NewUserPage', () => {
	const mockOnSubmit = jest.fn();
	const mockGoToHome = jest.fn();

	beforeEach(() => {
		(useNewUser as jest.Mock).mockReturnValue({
			onSubmit: mockOnSubmit,
			goToHome: mockGoToHome,
		});

		render(<NewUserPage />);
	});

	it('should render form fields', () => {
		expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/data de admissão/i)).toBeInTheDocument();
	});

	it('should call onSubmit with correct data when form is submitted', async () => {
		fireEvent.input(screen.getByLabelText(/nome/i), {
			target: { value: 'Teste' },
		});
		fireEvent.input(screen.getByLabelText(/email/i), {
			target: { value: 'teste@exemplo.com' },
		});
		fireEvent.input(screen.getByLabelText(/cpf/i), {
			target: { value: '12345678901' },
		});
		fireEvent.input(screen.getByLabelText(/data de admissão/i), {
			target: { value: '2023-10-10' },
		});

		fireEvent.click(screen.getByText(/cadastrar/i));

		expect(mockOnSubmit).toHaveBeenCalledWith({
			name: 'Teste',
			email: 'teste@exemplo.com',
			document: '12345678901',
			date: '2023-10-10',
		});
	});

	it('should navigate to home on back button click', () => {
		fireEvent.click(screen.getByLabelText(/back/i));
		expect(mockGoToHome).toHaveBeenCalled();
	});
});
