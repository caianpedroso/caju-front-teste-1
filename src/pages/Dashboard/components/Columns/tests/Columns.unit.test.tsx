import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Columns } from '../view';
import { useColumns } from '../viewModel';

jest.mock('../viewModel', () => ({
	useColumns: jest.fn(),
}));

jest.mock('~/pages/Dashboard/components/RegistrationCard', () => ({
	RegistrationCard: jest.fn(() => <div data-testid="registration-card" />),
}));

describe('Columns Component', () => {
	const mockUseColumns = useColumns as jest.Mock;

	beforeEach(() => {
		mockUseColumns.mockReturnValue({
			data: {
				APPROVED: [{ id: 1, status: 'APPROVED', cpf: '12345678901' }],
				REPROVED: [{ id: 2, status: 'REPROVED', cpf: '98765432100' }],
				REVIEW: [{ id: 3, status: 'REVIEW', cpf: '45678912300' }],
			},
		});
	});

	it('should render all columns with their titles', () => {
		render(<Columns registrations={[]} loading={false} status="success" />);

		expect(screen.getByText('Pronto para revisar')).toBeInTheDocument();
		expect(screen.getByText('Aprovado')).toBeInTheDocument();
		expect(screen.getByText('Reprovado')).toBeInTheDocument();
	});

	it('should render the correct number of registration cards', () => {
		render(<Columns registrations={[]} loading={false} status="success" />);

		const cards = screen.getAllByTestId('registration-card');
		expect(cards).toHaveLength(3);
	});

	it('should not render registration cards when there are no registrations', () => {
		mockUseColumns.mockReturnValue({ data: {} });

		render(<Columns registrations={[]} loading={false} status="success" />);

		const cards = screen.queryAllByTestId('registration-card');
		expect(cards).toHaveLength(0);
	});

	it('should handle empty data gracefully', () => {
		mockUseColumns.mockReturnValue({ data: null });

		render(<Columns registrations={[]} loading={false} status="idle" />);

		expect(screen.queryAllByTestId('registration-card')).toHaveLength(0);
	});
});
