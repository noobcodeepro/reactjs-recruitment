function formatPhoneNumber(phoneNumber: string): string {
	const cleaned = phoneNumber.replace(/\D/g, ""); // Loại bỏ tất cả các ký tự không phải số
	const formatted = cleaned.replace(
		/(\d{3})(\d{3})(\d{4})/,
		"$1 $2 $3",
	); // Định dạng số điện thoại thành 012 345 6789
	return formatted;
}

export default formatPhoneNumber;
