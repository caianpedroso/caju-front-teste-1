import { useState, useEffect } from 'react';
import { ButtonViewModelProps } from './models';

export function useButtonViewModel({ disabled = false, loading = false }: ButtonViewModelProps) {
	const [isDisabled, setIsDisabled] = useState(disabled || loading);

	useEffect(() => {
		setIsDisabled(disabled || loading);
	}, [disabled, loading]);

	const enable = () => setIsDisabled(false);
	const disable = () => setIsDisabled(true);

	return { isDisabled, enable, disable };
}