import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { TextField } from "~/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { maskCpf } from "~/commom/masks";
import { useNewUser } from "./viewModel.ts";
import { validation } from "~/pages/NewUser/validation.ts";
import { ResendFormData } from "~/pages/NewUser/model.ts";

const NewUserPage = () => {
	const { onSubmit } = useNewUser();
  const history = useHistory();
	
  const goToHome = () => {
    history.push(routes.dashboard);
  };

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
		        {...register("document")}
		        error={errors.document?.message}
		        onChange={maskCpf}
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
		        disabled={isSubmitting}
	        />
	        <Button isLoading={isSubmitting} type="submit">Cadastrar</Button>
	      </S.Form>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
