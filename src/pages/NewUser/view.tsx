import { HiOutlineArrowLeft } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as S from "./styles";
import { maskCpf } from "~/commom/masks";

import { IconButton } from "~/components/Buttons/IconButton";
import Button from "~/components/Buttons";
import { TextField } from "~/components";

import { useNewUser } from "~/pages";
import { validation } from "~/pages/NewUser/validation.ts";
import { ResendFormData } from "~/pages/NewUser/model.ts";

export const NewUserPage = () => {
	const { onSubmit, goToHome } = useNewUser();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ResendFormData>({
		resolver: zodResolver(validation),
		mode: "onBlur"
	});

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
	      <S.Form onSubmit={handleSubmit(onSubmit)}>
	        <TextField
		        id="name"
		        placeholder="Nome"
		        label="Nome"
		        type="text"
		        error={errors.name?.message}
		        disabled={isSubmitting}
		        {...register("name")}
	        />
	        <TextField
		        id="email"
		        placeholder="Email"
		        label="Email"
		        type="email"
		        error={errors.email?.message}
		        disabled={isSubmitting}
		        {...register("email")}
	        />
	        <TextField
		        id="document"
		        placeholder="CPF"
		        label="CPF"
		        type="text"
		        {...register("document", {
			        onChange: maskCpf
		        })}
		        error={errors.document?.message}
		        maxLength={14}
		        disabled={isSubmitting}
	        />
	        <TextField
		        id="date"
		        label="Data de admissão"
		        type="date"
		        {...register("date")}
		        placeholder="DD/MM/YYYY"
		        max="9999-12-31"
		        min="1900-01-01"
		        disabled={isSubmitting}
	        />
	        <Button type="submit">Cadastrar</Button>
	      </S.Form>
      </S.Card>
    </S.Container>
  );
};
