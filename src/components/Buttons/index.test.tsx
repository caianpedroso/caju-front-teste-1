import { renderHook, act } from '@testing-library/react';
import { useButtonViewModel } from './viewModel';

describe('useButtonViewModel', () => {
	it('deve iniciar desabilitado se `disabled` ou `loading` for true', () => {
		const { result } = renderHook(() => useButtonViewModel({ disabled: true }));
		expect(result.current.isDisabled).toBe(true);
	});

	it('deve habilitar o botão usando a função enable', () => {
		const { result } = renderHook(() => useButtonViewModel({ disabled: true }));

		act(() => {
			result.current.enable();
		});

		expect(result.current.isDisabled).toBe(false);
	});

	it('deve desabilitar o botão usando a função disable', () => {
		const { result } = renderHook(() => useButtonViewModel({ disabled: false }));

		act(() => {
			result.current.disable();
		});

		expect(result.current.isDisabled).toBe(true);
	});

	it('deve atualizar `isDisabled` quando `loading` mudar', () => {
		const { result, rerender } = renderHook(
			({ loading }) => useButtonViewModel({ loading }),
			{ initialProps: { loading: false } }
		);

		expect(result.current.isDisabled).toBe(false);

		rerender({ loading: true });

		expect(result.current.isDisabled).toBe(true);
	});
});

