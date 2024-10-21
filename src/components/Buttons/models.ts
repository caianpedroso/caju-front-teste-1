import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'iconPrimary';

export type StyledButtonProps = {
	variant: ButtonVariant;
};

export type ButtonProps = {
	icon?: React.ReactNode;
	label?: string;
	type?: "submit" | "reset" | "button" | undefined;
	onClick?: () => void;
	variant?: ButtonVariant;
	disabled?: boolean;
	loading?: boolean;
};

export type ButtonViewModelProps = {
	disabled?: boolean;
	loading?: boolean;
};