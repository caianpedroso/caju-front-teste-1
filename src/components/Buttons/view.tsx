import React from 'react';
import { ButtonProps } from "~/components/Buttons/models.ts";

import * as S from "~/components/Buttons/styles";
import { useButtonViewModel } from "~/components/Buttons/viewModel.ts";

export const ButtonDefault: React.FC<ButtonProps> = ({
	icon,
	label,
	onClick,
	variant = 'primary',
	disabled,
	loading,
	...rest
}) => {
	const { isDisabled } = useButtonViewModel({ disabled, loading });

	return (
		<S.Button
			onClick={onClick}
			variant={variant}
			disabled={isDisabled}
			aria-disabled={isDisabled}
			{...rest}
		>
			{loading ? (
				<S.Spinner />
			) : (
				<>
					{icon && <S.IconWrapper>{icon}</S.IconWrapper>}
					{label && <span>{label}</span>}
				</>
			)}
		</S.Button>
	);
};


