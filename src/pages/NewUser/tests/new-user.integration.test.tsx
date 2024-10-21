import { waitFor, act, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { apiBase } from '~/api/axios.ts';
import { useNewUser } from '../viewModel';
import { RegistrationStatus } from '~/common/interfaces/registration';

const mockHistoryPush = jest.fn();

jest.mock('~/api/axios.ts', () => ({
  apiBase: {
    post: jest.fn(),
  },
}));

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
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

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('[hook] should successfully add a new user', async () => {
    const dataExpected = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      document: '123.456.789-00',
      date: '2023-01-01',
      status: RegistrationStatus.REVIEW,
    };

    (apiBase.post as jest.Mock).mockResolvedValueOnce(dataExpected);

    const { result } = renderHook(() => useNewUser(), { wrapper });

    await act(async () => {
      result.current.mutation.mutate({
        employeeName: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678900',
        admissionDate: '2023-01-01',
        status: RegistrationStatus.REVIEW,
      });
    });

    await waitFor(() => {
      expect(apiBase.post).toHaveBeenCalledWith('/registrations', {
        employeeName: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678900',
        admissionDate: '2023-01-01',
        status: RegistrationStatus.REVIEW,
      });
      expect(result.current.mutation.isSuccess).toBeTruthy();
      expect(result.current.mutation.data).toEqual(dataExpected);
    });
  });
});
