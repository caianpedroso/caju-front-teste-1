export type SearchbarProps = {
	loading: boolean;
	refetch: () => void;
	onChange: (value: string) => void;
};