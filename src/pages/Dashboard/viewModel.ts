import { apiBase } from "~/api/axios.ts";
import { useQuery } from "react-query";
import { Registration } from "~/common/interfaces/registration.ts";
import {queryClient} from "~/api/query-client.ts";
import {useState} from "react";
import {unmaskCpf} from "~/common/masks";
import {validateCPF} from "~/common/validations";

export const fetchRegistrations = async (): Promise<Registration[]> => {
	const { data } = await apiBase.get('/registrations')
	return data;
};

export const useQueryRegistrations = () => useQuery({ queryKey: ["registrations"], queryFn: fetchRegistrations })

export const useRegistration = () => {
	const { data, status, isLoading, isFetching } = useQueryRegistrations()
	const [cpf, setCpf] = useState("")

	const search = (cpf: string) => {
		setCpf(unmaskCpf(cpf))


		if(validateCPF(cpf)) {
			queryClient.invalidateQueries({
				queryKey: ["registrations"],
			})
		}
	}

	const refetch = () => {
		queryClient.invalidateQueries(["registrations"])
	}

	const registrations = validateCPF(cpf) ? data?.filter((registration) => cpf === registration.cpf) : data

	return {
		status,
		registrations,
		refetch,
		search,
		loading: isLoading || isFetching
	}
}