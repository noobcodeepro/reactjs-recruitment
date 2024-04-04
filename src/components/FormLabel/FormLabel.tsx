const FormLabel = ({
	label,
	className = "",
}: {
	label: string;
	className?: string;
}) => {
	return (
		<div className={`font-semibold text-base ${className}`}>
			{label}
		</div>
	);
};

export default FormLabel;
