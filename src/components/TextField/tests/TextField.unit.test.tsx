import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TextField } from '~/components';

describe('TextField Component', () => {
	it('should render the input with the correct label', () => {
		render(<TextField id="name" label="Nome" />);
		const input = screen.getByLabelText('Campo Nome');
		expect(input).toBeInTheDocument();
	});

	it('should display an error message when there is an error', () => {
		render(<TextField id="email" label="Email" error="Email inválido" />);
		const errorMessage = screen.getByTestId('error-message');
		expect(errorMessage).toBeInTheDocument();
		expect(errorMessage).toHaveTextContent('Email inválido');
		expect(errorMessage).toHaveAttribute('role', 'alert');
	});

	it('should apply input attributes correctly', () => {
		render(<TextField id="password" label="Senha" placeholder="Digite sua senha" />);
		const input = screen.getByPlaceholderText('Digite sua senha');
		expect(input).toBeInTheDocument();
	});

	it('should set aria-invalid and aria-describedby when there is an error', () => {
		render(<TextField id="username" label="Usuário" error="Nome de usuário é obrigatório" />);
		const input = screen.getByLabelText('Campo Usuário');
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input).toHaveAttribute('aria-describedby', 'username-error');
	});

	it('should call onChange when typing in the input', () => {
		const handleChange = jest.fn();
		render(<TextField id="phone" label="Telefone" onChange={handleChange} />);
		const input = screen.getByLabelText('Campo Telefone');

		fireEvent.change(input, { target: { value: '12345' } });
		expect(handleChange).toHaveBeenCalledTimes(1);
		expect((input as HTMLInputElement).value).toBe('12345');
	});
});
