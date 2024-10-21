import styled from "styled-components";
import {theme} from "~/common/styles";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
	height: calc(100vh - 64px);
	background-color: ${theme.colors.white};	
`;

export const Card = styled.div`
  border: 2px solid #f0f0f0;
  width: 500px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ButtonSubmitContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 16px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;
