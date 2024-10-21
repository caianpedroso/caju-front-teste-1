import styled, { css, keyframes } from "styled-components";
import { HiRefresh } from "react-icons/hi";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

const spin = keyframes` 
	from {
		transform: rotate(360deg);
	}
	to {
		transform: rotate(0deg);
	}
`;

export const RefreshIcon = styled(HiRefresh)<{ refresh: boolean }>`
  ${({ refresh }) => css`
    animation: ${refresh ? spin : "none"} 0.6s linear infinite;
  `}
`;