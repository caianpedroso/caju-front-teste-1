import styled, { css } from 'styled-components';
import { ButtonVariant, StyledButtonProps } from "~/components/Buttons/models.ts";

const getButtonStyles = (variant: ButtonVariant, theme: any) => {
	const variants = {
		primary: css`
      color: ${theme.colors.white};
      background-color: ${theme.colors.primary};
      &:hover {
        background-color: ${theme.colors.primaryHover};
      }
    `,
		secondary: css`
      color: ${theme.colors.white};	
      background-color: ${theme.colors.secondary};
      &:hover {
        background-color: ${theme.colors.secondaryHover};
      }
    `,
		success: css`
      color: ${theme.colors.black};
      background-color: ${theme.colors.success};
    `,
		warning: css`
      color: ${theme.colors.black};	
      background-color: ${theme.colors.warning};
    `,
		danger: css`
      color: ${theme.colors.black};
      background-color: ${theme.colors.danger};
    `,
		iconPrimary: css`
      cursor: pointer;
      border: 2px solid ${theme.colors.primary};
      width: fit-content;
      padding: 4px;
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;

      svg {
        color: ${theme.colors.primary};
      }
    `,
	};

	return variants[variant];
};

export const Button = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  gap: 8px;

  ${({ variant, theme }) => getButtonStyles(variant, theme)}

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
`;

export const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid gray;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
