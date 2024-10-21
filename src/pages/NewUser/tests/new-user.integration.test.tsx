import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { NewUserPage } from '../view';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { apiBase } from '~/api/axios.ts';

// Mocks
// const mockPost = jest.fn();
const mockHistoryPush = jest.fn();

jest.mock('~/api/axios.ts', () => ({
    apiBase: {
        post: jest.fn(),
    },
}));

jest.mock('react-hot-toast', () => ({
    toast: {
        error: jest.fn(),
    },
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

describe('NewUserPage Integration Tests', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient();
        jest.clearAllMocks();
    });

    const renderNewUserPage = () => {
        return render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <NewUserPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    };

    it('should successfully add a new user', async () => {
        (apiBase.post as jest.Mock).mockResolvedValueOnce({ data: {}, status: 200 });
        renderNewUserPage();

        fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText('CPF'), { target: { value: '123.456.789-00' } });
        fireEvent.change(screen.getByLabelText('Data de admissão'), { target: { value: '2023-01-01' } });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));
        });

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Usuário cadastrado com sucesso!');
            expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard');
        });
    });

    it('should display an error message when adding a new user fails', async () => {
        (apiBase.post as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
        renderNewUserPage();

        fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText('CPF'), { target: { value: '123.456.789-00' } });
        fireEvent.change(screen.getByLabelText('Data de admissão'), { target: { value: '2023-01-01' } });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));
        });

        await waitFor(() => {
            expect(apiBase.post).toHaveBeenCalledWith('/registrations', expect.any(Object));
            expect(toast.error).toHaveBeenCalledWith('Houve um erro ao tentar cadastrar um novo candidato!');
        });
    });

    it('should navigate to dashboard when back button is clicked', () => {
        renderNewUserPage();

        fireEvent.click(screen.getByLabelText('back'));

        expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
});
