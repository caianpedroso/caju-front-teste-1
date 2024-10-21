import React from 'react';
import { ButtonProps } from "~/components/Buttons/models.ts";

import * as S from "~/components/Buttons/styles";

export const ButtonDefault: React.FC<ButtonProps> = ({
	icon,
	label,
	onClick,
	variant = 'primary',
	disabled,
	loading,
	...rest
}) => {

	const isDisabled = loading || disabled

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


