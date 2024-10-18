import { z } from "zod";
import { validateCPF, validateData } from "~/commom/validations";

export const validation = z.object({
	name: z
		.string()
		.min(2, { message: "Nome muito curto" })
		.regex(/^(?!\d)[A-Za-zÀ-ÖØ-öø-ÿ]{2,}(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]{2,})+$/, {
			message: "Nome inválido",
		}),
	email: z.string().email("Formato de e-mail inválido").nonempty("O e-mail é obrigatório"),
	document: z
		.string({ required_error: "CPF obrigatório" })
		.min(11, { message: "O CPF deve ter 11 dígitos." }) // 14 caracteres com máscara
		.refine(validateCPF, { message: "CPF inválido" }),
	date: z
		.string()
		.refine(validateData, { message: "Data inválida. Use o formato DD/MM/YYYY." }),
});