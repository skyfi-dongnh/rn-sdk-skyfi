import { useEffect, useState } from "react";

function useDebounce<T>( value:T , delay = 500 ) {
	const [ debouncedValue, setDebouncedValue ] = useState<T>( value );

	useEffect( () => {
		const handler = setTimeout( () => {
			setDebouncedValue( value );
		}, delay );

		return () => {
			clearTimeout( handler );
		};
	}, [ delay, value ] );

	return debouncedValue;
}
export default useDebounce;