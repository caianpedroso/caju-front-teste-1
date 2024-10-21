import { HiOutlineArrowLeft } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as S from "./styles";
import { maskCpf } from "~/common/masks";
import { ButtonDefault, TextField, Modal } from "~/components";

import { useNewUser } from "~/pages";
import { validation } from "~/pages/NewUser/validation.ts";
import { ResendFormData } from "~/pages/NewUser/model.ts";

export const NewUserPage = () => {
	const {
		onSubmit,
		goToHome,
		loading
	} = useNewUser();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
	} = useForm<ResendFormData>({
		resolver: zodResolver(validation),
		mode: "onBlur"
	});

  return (
    <S.Container>
      <S.Card>
	      <ButtonDefault
		      variant='iconPrimary'
		      aria-label="Voltar para dahboard"
		      onClick={() => goToHome()}
		      icon={<HiOutlineArrowLeft size={24} />}
	      />
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
		      <S.ButtonSubmitContainer>
		        <ButtonDefault
			        disabled={!isValid}
			        loading={loading}
			        label="Cadastrar"
			        type="submit"
		        />
		      </S.ButtonSubmitContainer>
	      </S.Form>
	      <Modal />
      </S.Card>
    </S.Container>
  );
};
