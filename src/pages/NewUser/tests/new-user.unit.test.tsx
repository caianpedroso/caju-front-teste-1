import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import { NewUserPage } from '../view';
import { useNewUser } from '~/pages';

jest.mock('~/pages', () => ({
    useNewUser: jest.fn(),
}));

jest.mock('~/common/masks', () => ({
    maskCpf: jest.fn((value) => value),
}));
jest.mock('~/common/masks', () => ({
    maskCpf: jest.fn((value) => value),
}));

describe('NewUserPage Unit Tests', () => {
    const mockOnSubmit = jest.fn();
    const mockGoToHome = jest.fn();

    beforeEach(() => {
        (useNewUser as jest.Mock).mockReturnValue({
            onSubmit: mockOnSubmit,
            goToHome: mockGoToHome,
        });
    });

    it('renders the form fields correctly', () => {
        render(<NewUserPage />);

        expect(screen.getByLabelText('Nome')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('CPF')).toBeInTheDocument();
        expect(screen.getByLabelText('Data de admissão')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeInTheDocument();
    });

    it('calls goToHome when back button is clicked', () => {
        render(<NewUserPage />);

        const backButton = screen.getByLabelText('back');
        fireEvent.click(backButton);

        expect(mockGoToHome).toHaveBeenCalled();
    });

    it('submits the form with valid data', async () => {
        render(<NewUserPage />);

        fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText('CPF'), { target: { value: '123.456.789-00' } });
        fireEvent.change(screen.getByLabelText('Data de admissão'), { target: { value: '2023-01-01' } });

        fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));
    });

    it('displays error messages for invalid form data', async () => {
        render(<NewUserPage />);

        fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

        await waitFor(() => {
            expect(screen.getByText('Nome muito curto')).toBeInTheDocument();
            expect(screen.getByText('Formato de e-mail inválido')).toBeInTheDocument();
            expect(screen.getByText('O CPF deve ter 11 dígitos.')).toBeInTheDocument();
        });
    });

});