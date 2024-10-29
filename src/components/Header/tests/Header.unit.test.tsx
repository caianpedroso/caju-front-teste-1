import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from "~/components";

describe('Header Component', () => {
	it('should render the header with the correct title', () => {
		render(<Header />);
		const titleElement = screen.getByRole('heading', { name: /caju front teste/i });
		expect(titleElement).toBeInTheDocument();
	});
});