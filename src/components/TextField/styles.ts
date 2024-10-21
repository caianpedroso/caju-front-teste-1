import styled from "styled-components";
import { theme } from "~/common/styles";

export const Input = styled.input`
  padding: 0 8px;
  vertical-align: middle;
  width: calc(100% - 16px);
  min-height: 36px;
  background-color: ${theme.colors.white};
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
  border-radius:8px;
	margin-top: 8px;
  :focus {
    outline: none;
    border: 1px solid ${theme.colors.warning};
    box-shadow: inset 0 0 0 1px ${theme.colors.warning};
  }
`;

export const Error = styled.span`
  font-size: 12px;
  line-height: 14px;
  margin-top: 8px;
  display: block;
	color: ${theme.colors.danger};
`;