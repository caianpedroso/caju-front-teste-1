import * as S from "./styles";
import { Props }  from "./models.ts"
import { forwardRef } from "react";

export const TextField = forwardRef<HTMLInputElement, Props>(
	({ id, label, error, ...inputProps }, ref) => {
		return (
		<div>
			<label htmlFor={id}>{label}</label>
			<S.Input
				id={id}
				ref={ref}
				aria-invalid={!!error}
				aria-describedby={error ? `${id}-error` : undefined}
				{...inputProps}
			/>
			{error && (
				<S.Error id={`${id}-error`} role="alert">
					{error}
				</S.Error>
			)}
		</div>
	);
});
