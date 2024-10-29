import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { ButtonDefault } from '~/components';
import { theme } from '~/common/styles/theme';

const renderWithTheme = (ui: React.ReactNode) =>
	render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('ButtonDefault Component', () => {
	it('should render the button with the correct label', () => {
		renderWithTheme(<ButtonDefault label="Click me" dataTestId="button" />);
		expect(screen.getByTestId('button')).toHaveTextContent('Click me');
	});

	it('should render the icon when provided', () => {
		renderWithTheme(<ButtonDefault icon={<span data-testid="icon">Icon</span>} dataTestId="button" />);
		expect(screen.getByTestId('icon')).toBeInTheDocument();
	});

	it('should render a spinner when loading', () => {
		renderWithTheme(<ButtonDefault loading={true} dataTestId="button" />);
		expect(screen.getByTestId('button').querySelector('span')).toBeNull();
		expect(screen.getByTestId('spinner')).toBeInTheDocument();
	});

	it('should call onClick function when clicked', () => {
		const handleClick = jest.fn();
		renderWithTheme(<ButtonDefault onClick={handleClick} dataTestId="button" />);
		fireEvent.click(screen.getByTestId('button'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('should disable the button when loading or disabled', () => {
		const { rerender } = renderWithTheme(<ButtonDefault loading={true} dataTestId="button" />);
		expect(screen.getByTestId('button')).toBeDisabled();

		rerender(
			<ThemeProvider theme={theme}>
				<ButtonDefault disabled={true} dataTestId="button" />
			</ThemeProvider>
		);
		expect(screen.getByTestId('button')).toBeDisabled();
	});
});
