import { apiBase } from "~/api/axios.ts";
import { useQuery } from "react-query";
import { Registration } from "~/common/interfaces/registration.ts";

export const fetchRegistrations = async (): Promise<Registration[]> => {
	const { data } = await apiBase.get('/registrations')
	return data;
};

export const useQueryRegistrations = () => useQuery({ queryKey: ["registrations"], queryFn: fetchRegistrations })

export const useRegistration = () => {
	const { data, status } = useQueryRegistrations()

	return {
		status,
		registrations: data || []
	}
}