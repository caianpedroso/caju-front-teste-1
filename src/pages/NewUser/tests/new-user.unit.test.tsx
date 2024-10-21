import React from 'react';
import { screen, fireEvent } from '@testing-library/dom';
import { act, waitFor } from '@testing-library/react';
import { NewUserPage } from '../view';
import { useNewUser } from '~/pages';
import { render } from '~/test-utils';

jest.mock('~/pages', () => ({
  useNewUser: jest.fn(),
}));

jest.mock('~/common/masks', () => ({
  maskCpf: jest.fn(value => value),
}));

jest.mock('~/common/masks', () => ({
  maskCpf: jest.fn(value => value),
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
    expect(screen.getByTestId('button-submit')).toBeInTheDocument();
  });

  it('calls goToHome when back button is clicked', () => {
    render(<NewUserPage />);

    const backButton = screen.getByTestId('button-back');
    fireEvent.click(backButton);

    expect(mockGoToHome).toHaveBeenCalled();
  });

  it('submits the form with valid data', async () => {
    render(<NewUserPage />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText('CPF'), { target: { value: '123.456.789-09' } });
      fireEvent.change(screen.getByLabelText('Data de admissão'), { target: { value: '01/01/2023' } });
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('button-submit'));
    });
  });

  it('displays error messages for invalid form data', async () => {
    render(<NewUserPage />);

    fireEvent.click(screen.getByTestId('button-submit'));

    await waitFor(() => {
      expect(screen.getByText('Nome muito curto')).toBeInTheDocument();
      expect(screen.getByText('Formato de e-mail inválido')).toBeInTheDocument();
      expect(screen.getByText('O CPF deve ter 11 dígitos.')).toBeInTheDocument();
      expect(screen.getByText('Data obrigatória')).toBeInTheDocument();
    });
  });
});
