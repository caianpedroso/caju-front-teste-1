// RegistrationCard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RegistrationCard, useUpdateRegistration, useDeleteRegistration} from '~/pages/Dashboard/components/RegistrationCard';
import { RegistrationStatus } from '~/common/interfaces/registration';
import { theme } from '~/common/styles';

jest.mock('../viewModel', () => ({
	useUpdateRegistration: jest.fn(),
	useDeleteRegistration: jest.fn(),
}));

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactNode) =>
	render(
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>{ui}</ThemeProvider>
		</QueryClientProvider>
	);

describe('RegistrationCard Component', () => {
	const mockHandleApprove = jest.fn();
	const mockHandleReprove = jest.fn();
	const mockHandleReview = jest.fn();
	const mockDeleteRegistration = jest.fn();

	beforeEach(() => {
		(useUpdateRegistration as jest.Mock).mockReturnValue({
			handleApprove: mockHandleApprove,
			handleReprove: mockHandleReprove,
			handleReview: mockHandleReview,
			loading: false,
		});

		(useDeleteRegistration as jest.Mock).mockReturnValue({
			deleteRegistration: mockDeleteRegistration,
			loading: false,
		});
	});

	const mockRegistration = {
		id: '1',
		employeeName: 'Caian Egidio',
		admissionDate: '2024-01-01',
		email: 'caian@test.com',
		cpf: '12345678901',
		status: RegistrationStatus.REVIEW,
	};

	const mockRegistrationApproved = {
		id: '2',
		employeeName: 'Caian Egidio',
		admissionDate: '2024-01-01',
		email: 'caian@test.com',
		cpf: '12345678901',
		status: RegistrationStatus.APPROVED,
	};

	it('should render the registration details', () => {
		renderWithProviders(
			<RegistrationCard data={mockRegistration} column={RegistrationStatus.REVIEW} />
		);

		expect(screen.getByText('Caian Egidio')).toBeInTheDocument();
		expect(screen.getByText('2024-01-01')).toBeInTheDocument();
		expect(screen.getByText('caian@test.com')).toBeInTheDocument();
	});

	it('should call handleApprove when "Aprovar" button is clicked', () => {
		renderWithProviders(
			<RegistrationCard data={mockRegistration} column={RegistrationStatus.REVIEW} />
		);
		fireEvent.click(screen.getByText('Aprovar'));
		expect(mockHandleApprove).toHaveBeenCalled();
	});

	it('should call handleReprove when "Reprovar" button is clicked', () => {
		renderWithProviders(
			<RegistrationCard data={mockRegistration} column={RegistrationStatus.REVIEW} />
		);
		fireEvent.click(screen.getByText('Reprovar'));
		expect(mockHandleReprove).toHaveBeenCalled();
	});

	it('should call handleReview when "Revisar novamente" button is clicked', () => {
		renderWithProviders(
			<RegistrationCard data={mockRegistrationApproved} column={RegistrationStatus.APPROVED} />
		);

		const reviewButton = screen.getByRole('button', { name: /revisar novamente/i });
		fireEvent.click(reviewButton);

		expect(mockHandleReview).toHaveBeenCalled();
	});

	it('should call deleteRegistration when delete icon is clicked', () => {
		renderWithProviders(
			<RegistrationCard data={mockRegistrationApproved} column={RegistrationStatus.APPROVED} />
		);
		fireEvent.click(screen.getByTestId('delete-icon'));
		expect(mockDeleteRegistration).toHaveBeenCalled();
	});

	it('should display a spinner when loading', () => {
		(useUpdateRegistration as jest.Mock).mockReturnValueOnce({
			handleApprove: mockHandleApprove,
			handleReprove: mockHandleReprove,
			handleReview: mockHandleReview,
			loading: true,
		});

		renderWithProviders(
			<RegistrationCard data={mockRegistrationApproved} column={RegistrationStatus.APPROVED} />
		);

		expect(screen.getByTestId('spinner')).toBeInTheDocument();
	});
});
