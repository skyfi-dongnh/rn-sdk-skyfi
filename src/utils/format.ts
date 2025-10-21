export function toCurrency( price: number, currency = 'VND' ) {
	// check if price is a number
	if ( isNaN( price ) ) {
		return '0 ' + currency;
	}
	return price?.toLocaleString( 'vi' ) + currency;
}
export function toNumber( price: number ) {
	return price.toLocaleString( 'vi' ) + '';
}
export function formatPhoneNumber( phoneNumber: string ) {

	const cleanedNumber = phoneNumber.replace( /\D/g, '' );

	const formattedNumber = cleanedNumber.replace( /(\d{4})(\d{3})(\d{3})/, '$1 $2 $3' );

	return formattedNumber;
}